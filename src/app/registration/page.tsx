'use client'
import { FormEventHandler } from "react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "@/customHooks/useForm";
import { User } from "@/types";
import { validateFormFun } from "@/store/validateFormFunction";
import { useModalStore } from "@/store/ModalWindowState";
import '../../styles/formRegistry.css'

export default function Registration() {
    const {registry} = useAuth();
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

    return (
        <div className="form-registry-container">
         <form className="container-log-in" onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={(e)=> validateFormReg(e.target.name)} placeholder="Ім'я" required />
            <p className="form-reg-error">{errors.name}</p>
           <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={(e)=> validateFormReg(e.target.name)} placeholder="Email" required />
           <p className="form-reg-error">{errors.email}</p>
           <input type="password" name="password" value={formData.password} onChange={handleChange} onBlur={(e)=> validateFormReg(e.target.name)} placeholder="Пароль" required />
           <p className="form-reg-error">{errors.password}</p>
           <div className="container-input-radio">
           <label>Стать:</label>
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
           <button type="submit">Зареєструватися</button>
        </form>
        </div>
    )
}



