import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import Header from "@/components/Header";
import BurgerMenu from "@/components/burgerMenu";
import LogIn from "@/components/logIn";
import ModalWindow from "@/components/modalWindow";
import "./global.scss";
import Head from "next/head";


export const metadata: Metadata = {
  title: "Світ Толкіна",
  description: "Світ Толкіна",
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Head>
        <link rel="icon" href="favicon.ico" />
        {children}
        </Head>
      <AuthProvider>
        <body >
          <Header />
          <main>
              {children}
          </main>
          <BurgerMenu />
          <LogIn/>
          <ModalWindow />
        </body>
      </AuthProvider>
    </html>
  );
}
