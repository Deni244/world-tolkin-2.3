import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import Header from "@/components/Header";
import "@/styles/globals.css";
import BurgerMenu from "@/components/burgerMenu";
import LogIn from "@/components/logIn";
import ModalWindow from "@/components/modalWindow";
import { getUser } from "@/lib/authAction";


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
  alert(userData?.user)
  
  return (
    <html lang="en">
      <AuthProvider initialUser={userData?.user || null}>
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
