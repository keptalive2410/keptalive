import { Suspense } from "react";
import ProductsClient from "./productClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ProductsClient />
    </Suspense>
  );
}