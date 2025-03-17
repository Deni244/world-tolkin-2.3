import Navigation from "./Navigation";
import '@/styles/header.css'
import Button1 from "./button1";

export default function Header() {

    return (
        <header>
             <nav className="navigation">
                <div className="nav-logo-link">
                    <Button1 title="Світ Толкіна" clas='logo' href="/"/>
                </div>
                <Navigation />
            </nav>
        </header>
    )
}