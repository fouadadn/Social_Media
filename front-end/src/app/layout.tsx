import type { Metadata } from "next";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Social Media App",
  description: "Social Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
