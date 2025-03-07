import { rubikDirt } from "@/lib/fonts";
import Navigation from "./Navigation";
import BurgerMenu from "./burgerMenu";
import '@/styles/header.css'
import Button1 from "./button1";

export default function Header() {

    return (
        <header>
             <nav className="navigation">
                <div className="nav-logo-link">
                    <Button1 title="Світ Толкіна" clas={`${ rubikDirt.className} logo`} href="/"/>
                </div>
                <Navigation />
            </nav>
        </header>
    )
}