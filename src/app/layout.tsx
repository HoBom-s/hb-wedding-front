import type { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const metadata: Metadata = {
  title: "HoBom Wedding",
  description: "For mobile wedding invitation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ErrorBoundary errorComponent={() => <div>Error</div>}>
        <QueryClientProvider client={queryClient}>
          <body>{children}</body>
        </QueryClientProvider>
      </ErrorBoundary>
    </html>
  );
}
