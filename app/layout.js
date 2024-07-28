import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "@/components/ui/toaster";

const poppin = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Add all available font weights here
});


export const metadata = {
  title: "Enquiry Dashboard",
  description: "An Enquiry dashboard for managing Clients",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppin.className}>
      <AuthProvider>{children}</AuthProvider>
      <Toaster/>
      </body>
    </html>
  );
}