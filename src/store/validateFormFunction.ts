'use client'

export function validateFormFun() {
    const validateName = (value: string) => {
        
        return value.length < 3 ? "Ім'я повинно містити мінімум 3 символи" : null;
      };
      
      const validateEmail = (value: string) => {
        return !/^\S+@\S+\.\S+$/.test(value) ? "Введіть коректний email" : null;
      };
      
      const validatePassword = (value: string) => {
        return value.length < 6 ? "Пароль повинен містити мінімум 6 символів" : null;
      };
      return {validateName, validateEmail, validatePassword }
}