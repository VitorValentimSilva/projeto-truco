import type { Metadata } from "next";
import "./globals.css";
import { UsuarioProvider } from "./contexts/Provider/UsuarioProvider";
import { SalaProvider } from "./contexts/Provider/SalaProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <UsuarioProvider>
          <SalaProvider>
            {children}
          </SalaProvider>
        </UsuarioProvider>
      </body>
    </html>
  )
}
