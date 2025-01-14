import type { Metadata } from "next";
import "../../styles/index.css";
import ReduxProvider from "@/store/reduxprovider";
import ShareProvider from "@/context/contextApi";

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
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@500&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <ShareProvider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ShareProvider>
      </body>
    </html>
  );
}
