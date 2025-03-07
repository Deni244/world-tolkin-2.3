'use client'
import { useState } from "react"

type Errors<T> = Partial<Record<keyof T, string>>;

const useForm = <T extends Record<string, any>>(initialState: T, validators: Partial<Record<keyof T, (value: any) => string | null>>) => {
    const [formData, setFormData] = useState<T>(initialState);
    const [errors, setErrors] = useState<Errors<T>>({});
//Функція збереження даних з input полів
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) => {
      const { name, type, value } = e.target as HTMLInputElement;
      
      let newValue = type === "radio" ? value : value;
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
    return { formData, handleChange, resetForm, errors, validateFormReg };
}
export {useForm}