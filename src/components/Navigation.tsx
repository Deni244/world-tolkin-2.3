'use client'
import { usePathname } from "next/navigation"
import { navItems } from "@/data/navItems";
import { useAuth } from "@/context/AuthContext";
import Button1 from "./button1";
import { useModalState } from "@/store/ModalState";
import MenuButton from "./menuButton";

export default function Navigation() {
    const pathName = usePathname();
    const {user, logout} = useAuth();
    const {openModalState} = useModalState();

    return (
        <>
        <ul className="nav-link">
            {
                navItems.map(item =>(
                    <li key={item.id} className="nav-link-li">
                        <Button1 title={item.title} clas={`${pathName === item.path && 'activeLink' } nav-link-li-a`} href={item.path}/>
                    </li>
                ))
            }
            {
                user ? (<>
                <li className="nav-link-li"><Button1 title="Вихід"  onClick={logout} clas="button-global"  /></li>
                <li className="nav-link-li"><Button1 title={user.name}  href={`/profile/${user.id}`} clas="button-global"  /></li>
                </>) : (<>
                <li className="nav-link-li"><Button1 title="Вхід" clas="button-global" onClick={()=>openModalState('login')} /></li>
                <li className="nav-link-li"><Button1 title="Реєстрація" clas= 'button-global' href='/registration'/></li>
                </>)
            }
        </ul>
        <MenuButton onClick={()=>openModalState('burgerMenu')} />
        </>
    )
}