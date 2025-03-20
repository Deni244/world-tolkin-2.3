import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import Header from "@/components/Header";
import BurgerMenu from "@/components/burgerMenu";
import LogIn from "@/components/logIn";
import ModalWindow from "@/components/modalWindow";
import { getUser } from "@/lib/authAction";
import "./layout.css";
import { kurale, yesevaOne, rubikDirt } from "@/lib/fonts";


export const metadata: Metadata = {
  title: "Світ Толкіна",
  description: "Світ Толкіна",
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getUser();
  console.log(userData?.user);
  
  
  return (
    <html lang="en" className={`${kurale.variable} ${yesevaOne.variable} ${rubikDirt.variable}`}>
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
