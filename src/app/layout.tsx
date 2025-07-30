import "./globals.css";
import { ReduxProvider } from "@/store";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <ReduxProvider>
          <Navbar />
          <main className="p-6 flex justify-center">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
