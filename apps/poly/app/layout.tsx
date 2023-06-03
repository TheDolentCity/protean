import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "Protean Poly",
  description: "A realtime messaging and dice rolling solution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <div
          className="flex flex-col w-screen h-[100svh] overflow-hidden font-sans text-default bg-black"
          style={{ colorScheme: "dark" }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
