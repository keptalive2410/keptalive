import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

/**
 * 🔐 Rate limiter (IP + Email based)
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

  if (data.count >= RATE_LIMIT) {
    return false;
  }

  data.count++;
  return true;
}

/**
 * 🔐 Input validation
 */
function validateInput(email, password) {
  if (!email || !password) return "Missing fields";
  if (!email.includes("@")) return "Invalid email";
  if (password.length < 6) return "Password too short";
  return null;
}

/**
 * 🔐 Origin check (CSRF protection)
 */
function validateOrigin(req) {
  const origin = req.headers.get("origin");

  if (!origin) return false;

  return (
    origin.includes("localhost:3000") ||
    origin.includes("keptalive.in")
  );
}

export async function POST(req) {
  try {
    const { userEmail, userPassword } = await req.json();

    /**
     * 🔐 Build smarter rate limit key
     */
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const key = `${ip}_${userEmail}`;

    if (!rateLimit(key)) {
      return NextResponse.json(
        { message: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    /**
     * 🔐 CSRF protection
     */
    if (!validateOrigin(req)) {
      return NextResponse.json(
        { message: "Invalid origin" },
        { status: 403 }
      );
    }

    /**
     * 🔐 Input validation
     */
    const validationError = validateInput(userEmail, userPassword);

    if (validationError) {
      return NextResponse.json(
        { message: validationError },
        { status: 400 }
      );
    }

    /**
     * 🔐 Shopify login
     */
    const loginMutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            message
          }
        }
      }
    `;

    const { body } = await shopifyFetch({
      query: loginMutation,
      variables: {
        input: {
          email: userEmail,
          password: userPassword,
        },
      },
    });

    const errors =
      body?.data?.customerAccessTokenCreate?.customerUserErrors;

    if (errors && errors.length > 0) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const tokenData =
      body?.data?.customerAccessTokenCreate?.customerAccessToken;

    if (!tokenData?.accessToken) {
      return NextResponse.json(
        { message: "Login failed" },
        { status: 400 }
      );
    }

    /**
     * 🔐 Verify token
     */
    const verifyQuery = `
      query {
        customer(customerAccessToken: "${tokenData.accessToken}") {
          id
        }
      }
    `;

    const verifyRes = await shopifyFetch({ query: verifyQuery });

    if (!verifyRes?.body?.data?.customer?.id) {
      return NextResponse.json(
        { message: "Token invalid" },
        { status: 401 }
      );
    }

    /**
     * 🔐 Set secure cookie
     */
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set({
      name: "shopify_customer_token",
      value: tokenData.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(tokenData.expiresAt),
    });

    return response;
  } catch (error) {
    console.error("Login error");

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}