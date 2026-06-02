import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

/**
 * 🔐 Simple rate limiter (IP + Email)
 */
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;
const store = new Map();

function rateLimit(key) {
  const now = Date.now();

  if (!store.has(key)) {
    store.set(key, { count: 1, timestamp: now });
    return true;
  }

  const data = store.get(key);

  if (now - data.timestamp > WINDOW_MS) {
    store.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (data.count >= RATE_LIMIT) return false;

  data.count++;
  return true;
}

/**
 * 🔐 Input validation
 */
function validateInput(name, email, password) {
  if (!name || !email || !password) return "All fields required";

  if (!email.includes("@")) return "Invalid email";

  if (password.length < 6) return "Password must be at least 6 characters";

  if (name.length < 2) return "Invalid name";

  return null;
}

/**
 * 🔐 CSRF protection
 */
function validateOrigin(req) {
  const origin = req.headers.get("origin");

  if (!origin) return false;

  return origin.includes("localhost:3000") || origin.includes("keptalive.in");
}

export async function POST(req) {
  try {
    const { userName, userEmail, userPassword } = await req.json();

    /**
     * 🔐 Rate limiting
     */
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const key = `${ip}_${userEmail}`;

    if (!rateLimit(key)) {
      return NextResponse.json(
        { message: "Too many attempts. Try again later." },
        { status: 429 },
      );
    }

    /**
     * 🔐 CSRF check
     */
    if (!validateOrigin(req)) {
      return NextResponse.json(
        { message: "Invalid request origin" },
        { status: 403 },
      );
    }

    /**
     * 🔐 Input validation
     */
    const validationError = validateInput(userName, userEmail, userPassword);

    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    /**
     * 🔐 Split name
     */
    const nameParts = userName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    /**
     * 🔐 Shopify register
     */
    const registerMutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          customerUserErrors {
            message
          }
        }
      }
    `;

    const { body } = await shopifyFetch({
      query: registerMutation,
      variables: {
        input: {
          firstName,
          lastName,
          email: userEmail,
          password: userPassword,
        },
      },
    });

    const errors = body?.data?.customerCreate?.customerUserErrors;

    if (errors && errors.length > 0) {
      console.log("Shopify Registration Errors:", errors);

      return NextResponse.json(
        {
          message: errors[0]?.message || "Registration failed",
          errors,
        },
        { status: 400 },
      );
    }

    /**
     * 🔥 OPTIONAL: Auto-login after register
     */
    const loginMutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
        }
      }
    `;

    const loginRes = await shopifyFetch({
      query: loginMutation,
      variables: {
        input: {
          email: userEmail,
          password: userPassword,
        },
      },
    });

    const tokenData =
      loginRes?.body?.data?.customerAccessTokenCreate?.customerAccessToken;

    const response = NextResponse.json({
      message: "Registration successful",
      success: true,
    });

    /**
     * 🔐 Set cookie if login success
     */
    if (tokenData?.accessToken) {
      response.cookies.set({
        name: "shopify_customer_token",
        value: tokenData.accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(tokenData.expiresAt),
      });
    }

    return response;
  } catch (error) {
    console.error("Register error");

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
