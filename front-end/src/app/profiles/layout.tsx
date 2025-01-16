import type { Metadata } from "next";
import "../../styles/index.css";
import Header from "@/components/header";
import ShareProvider from "@/context/contextApi";
import ReduxProvider from "@/store/reduxprovider";

export const metadata: Metadata = {
    title: "Profile",
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
                <Header />
                <ReduxProvider>
                    <ShareProvider>
                        {children}
                    </ShareProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
