import Navigation from "./Navigation";
import '@/styles/header.css'
import Button1 from "./button1";
import { rubikDirt } from "@/lib/fonts";

export default function Header() {

    return (
        <header>
             <nav className="navigation">
                <div className="nav-logo-link">
                    <Button1 title="Світ Толкіна" clas={`logo ${rubikDirt.className}`} href="/"/>
                </div>
                <Navigation />
            </nav>
        </header>
    )
}