'use client'
import { FormEventHandler } from "react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/customHooks/useForm";
import { User } from "@/types";
import { validateFormFun } from "@/store/validateFormFunction";
import { useModalStore } from "@/store/ModalWindowState";
import Button1 from "@/components/button1";
import { signIn } from "next-auth/react";
import { kurale } from "@/lib/fonts";

import '../../styles/formRegistry.css'

export default function Registration() {
    const {registry, user} = useAuth();
    const {openModal, closeModal} = useModalStore();
    const {validateName, validateEmail, validatePassword} = validateFormFun();
    const { formData, handleChange, resetForm, errors, validateFormReg } = useForm(
        {
          name: "",
          email: "",
          password: "",
          sex: "",
        },
        {
            name: validateName,
          email: validateEmail,
          password: validatePassword,
        }
      );

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
        const user: User = {name: formData.name, email: formData.email, password: formData.password, sex: formData.sex}
        const result = await registry(user);
        if (result.success) {
          resetForm()
        }
        openModal({title: result.message, buttonText: 'Продовжити', onConfirm: closeModal})
        console.log(result);
    }
    if (user) {
      return <div className="user-registry-container">
        <h1 className={`user-registry-title ${kurale.className}`}>Ви вже авторизовані!</h1>
        <Button1 title="Перейти до профіля" clas="button-global" href={`/profile/${user.id}`} />
        <Button1 title="Повернутися назад" clas="button-global" onClick={()=>window.history.back()} />
      </div>
    }

    return (
        <div className={`form-registry-container ${kurale.className}`}>
          <h1>Реєстрація</h1>
         <form className="container-log-in" onSubmit={handleSubmit}>
            <input className="form-reg-input" type="text" name="name" value={formData.name} onChange={handleChange} onBlur={(e)=> validateFormReg(e.target.name)} placeholder="Ім'я" required />
            <p className="form-reg-error">{errors.name}</p>
           <input className="form-reg-input" type="email" name="email" value={formData.email} onChange={handleChange} onBlur={(e)=> validateFormReg(e.target.name)} placeholder="Email" required />
           <p className="form-reg-error">{errors.email}</p>
           <input className="form-reg-input" type="password" name="password" value={formData.password} onChange={handleChange} onBlur={(e)=> validateFormReg(e.target.name)} placeholder="Пароль" required />
           <p className="form-reg-error">{errors.password}</p>
           <label>Стать:</label>
           <div className="container-input-radio">
            <input
                    type="radio"
                    name="sex"
                    value="male"
                    onChange={handleChange}
                />
                <label>Чоловік</label>

                <input
                    type="radio"
                    name="sex"
                    value="female"
                    onChange={handleChange}
                />
                <label>Жінка</label>

           </div>
           <button className="button-global" type="submit">Зареєструватися</button>
        </form>
        <h3>Або Увійдіть за допомогою:</h3>
        <Button1 title="Увійти через Google" clas="button-global" onClick={()=>signIn('google')} />
        </div>
    )
}



