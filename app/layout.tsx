import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Renan Gomes | Portfólio",
    template: "%s | Renan Gomes",
  },
  description:
    "Portfólio de Renan Gomes, desenvolvedor de software focado em automação, integrações e IA aplicada.",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} bg-[var(--bg)] font-sans text-[var(--text)] antialiased`}>{children}</body>
    </html>
  );
}
