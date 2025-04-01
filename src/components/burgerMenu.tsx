'use client'
import { useAuth } from "@/context/AuthContext";
import { navItems } from "@/data/navItems";
import Button1 from "./button1";
import ButtonClose from "./buttonClose";
import { useModalState } from "@/store/ModalState";
import '../styles/burgerMenu.css'


export default function BurgerMenu (){
    const {user, logout} = useAuth();
    const {isopenModal, closeModalState, openModalState} = useModalState();
    if (isopenModal !== "burgerMenu") return null;

    return (
    <>
        <div className={`burger-menu`}>
            <ul className="nav-link-burger">
                <li>
                    <ButtonClose onclick={()=> closeModalState()} classes="btn-close-burger" />
                   
                </li>
                <li >
                    <Button1 title="На головну" onClick={() => closeModalState()} clas={`bg`} href="/" />
                </li>
                {
                    navItems.map(item =>(
                        <li key={item.id} >
                            <Button1 title={item.title} onClick={() => closeModalState()} clas={`bg`} href={item.path}/>
                        </li>
                    ))
                }
                {
                    user ? (<>
                    <li >
                        <Button1 
                            title="Вихід" 
                            clas= {`bg`} 
                            onClick={() =>{ closeModalState(); logout();}}
                        />
                    </li>
                    <li >
                        <Button1 
                            title={user.name}  
                            href={`/profile/${user.id}`} 
                            clas={`bg`} 
                            onClick={()=>closeModalState()}
                        />
                    </li>
                    </>) : (<>
                    <li ><Button1 title="Вхід" clas={`bg`} onClick={() => {closeModalState(); openModalState('login');}}/></li>
                    <li ><Button1 title="Реєстрація" href='/registration'  clas={`bg`} onClick={()=>closeModalState()}/></li>
                    </>)
                }
                
            </ul>
        </div>
    </>
    )
}
