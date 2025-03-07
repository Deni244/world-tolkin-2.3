'use client'
import { FormEventHandler, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ButtonClose from "./buttonClose";
import { useModalStore } from "@/store/ModalWindowState";
import { useModalState } from "@/store/ModalState";
import '../styles/formLogIn.css'

export default function LogIn() {
    const [formDataLogIn, setFormDataLogIn] = useState({
        email: '',
        password: ''
    })
    const [messageError, setMessageError] = useState('');
    const {openModal, closeModal} = useModalStore();
    const {isopenModal, closeModalState} = useModalState();
    const {login} = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDataLogIn ((prev) => ({ ...prev, [name]: value }));
      };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
        const result = await login(formDataLogIn.email, formDataLogIn.password);
        console.log(result);
        if(result.success) {
            setMessageError('');
            setFormDataLogIn({email:'', password: ''})
            closeModalState();
            openModal({title: result.message, buttonText: 'Продовжити', onConfirm: closeModal});
        } 
        else {
            setMessageError(result.message);
        }
            
    }

        if (isopenModal !== "login") return null;
    return (
        <div className="form-log-in-bg">
            <div className={`container-form-log-in`}>
                <ButtonClose onclick={()=>{setMessageError(''); setFormDataLogIn({email:'', password: ''}); closeModalState();}} classes="btn-close-form-log-in" />
                <form className="form-log-in" onSubmit={handleSubmit}>
                    <label>Введіть Логін</label>
                    <input type="email" name="email" value={formDataLogIn.email} onChange={handleChange} placeholder="Email" required />
                    <label>Введіть Пароль</label>
                    <input type="password" name="password" value={formDataLogIn.password} onChange={handleChange} placeholder="Пароль" required />
                    { messageError !== '' && <p className="form-log-in-error-sms">{messageError}</p> }
                    <button className="btn-log-in-form" type="submit">Увійти</button>
                </form>
            </div>
        </div>

    )
}