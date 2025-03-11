import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 p-6 max-w-4xl mx-auto">{children}</body>
    </html>
  );
}
