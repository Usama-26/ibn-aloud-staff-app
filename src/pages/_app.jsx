import { GeneralProvider } from "@/context/GeneralContext";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export default function App({ Component, pageProps }) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <GeneralProvider>
        <Component {...pageProps} />
      </GeneralProvider>
    </main>
  );
}
