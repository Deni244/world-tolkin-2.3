'use client'
import { useState } from "react"

type Errors<T> = Partial<Record<keyof T, string>>;

const useForm = <T extends Record<string, any>>(initialState: T, validators: Partial<Record<keyof T, (value: any) => string | null>>) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<Errors<T>>({});
//Функція збереження даних з input полів
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => {
      const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      const { name, type, value } = target;
      let newValue: string | globalThis.File | null = type === "radio" ? value : value;

      if(type === "radio") newValue = value;

      if (type === "file" && target instanceof HTMLInputElement && target.files) {
        newValue = target.files && target.files.length > 0 ? target.files[0] : null;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));

    };

//Функція для валідації полів
    const validateFormReg = (name: string)=>{
        const validate = validators[name as keyof T];    
        const error = validate ? validate(formData[name as keyof T]) : null;
        setErrors((prev) => ({
            ...prev,
            [name]: error,
          }));
    }
    const resetForm = () => {
      setFormData(initialState);
      setErrors({});
    };
    return { formData, handleChange, resetForm, errors, validateFormReg, setFormData };
}
export {useForm}