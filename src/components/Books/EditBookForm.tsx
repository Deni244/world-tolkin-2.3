'use client'

import { useModalState } from "@/store/ModalState";
import { BooksProps } from "@/types";
import { useForm } from "@/customHooks/useForm";
import '../../styles/EditBookForm.css'
import { useEffect, useRef, useState } from "react";


export default function EditBookForm({book}:{book: BooksProps}) {
    const {isopenModal, closeModalState} = useModalState();
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { formData, handleChange, resetForm, errors, validateFormReg, setFormData } = useForm<{
        name: string;
        description: string;
        price: string;
        photo: string | File;
      }>(
        {
          name: book.name,
          description: book.description,
          price: book.price,
          photo: book.photo,
        },
        {}
      );
//Еффект для зміни вхідного параметра book(для сторінки \Books)
      useEffect(() => {
        setFormData({
          name: book.name,
          description: book.description,
          price: book.price,
          photo: book.photo,
        });
      }, [book, setFormData]);
//Еффект для переходу до форми після відкриття
      useEffect(() => {
        if (isopenModal === "editBook" && formRef.current) {
          formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, [isopenModal, {book}]);
//Функція обробки форми
    const handleSubmit = async ()=>{

    }
//Функції події перетягування елемента
    const handleDrop = async (e: React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
        e.stopPropagation();
        const files = e.dataTransfer.files;
        if(files.length > 0){
            const file = files[0];
            handleFileChange(file);
        }

    }
    const handleDragOver = async (e: React.DragEvent<HTMLDivElement>)=>{
        e.preventDefault();
    }
//Функція для отримання шляху до фото для попереднього перегляду
    const getPhotoUrl = (photo: File | string) => {
        if (photo instanceof File) {
          return URL.createObjectURL(photo);
        }
        return photo;
      };
// Функція події input поля для фалів(фото)
const handleInputPhoto = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0] || null;
    console.log(file);
    
    handleFileChange(file);
}
//Функція перевірки файлу і збереження у стані форми
    const handleFileChange = (file: File | null)=>{
        if(file && file.type.startsWith('image/')){
            setFormData((prev) => ({
                ...prev,
                photo: file,
              }));
            setError(null);
        }else {
            setError('Це не фото!');
          }
    }
   

    
    if (isopenModal !== "editBook") return null;

    return (
        <div className="form-edit-book-container">
            <form ref={formRef} className="form-edit-book" onChange={handleSubmit}>
                <label>Назва книги:</label>
                <input 
                    id="form-name-book" 
                    name="name"  
                    type="text" 
                    placeholder="Назва книги" 
                    value={formData.name} 
                    onChange={handleChange}
                 />
                <label>Ціна:</label>
                <input 
                    id="form-price-book" 
                    name="price"  
                    type="text" 
                    placeholder="Назва книги" 
                    value={formData.price} 
                    onChange={handleChange}
                 />
        
                <label>Опис книги:</label>
                <textarea 
                name="description" 
                className="form-description-book" 
                placeholder="Опис книги" 
                value={formData.description} 
                onChange={handleChange}
                ></textarea>

                <label>Фото книги:</label>
                
                    <div className="drop-photo-book" onDrop={handleDrop} onDragOver={handleDragOver} >
                       {!error && formData.photo ? (<img className="" id="previewImage" src={getPhotoUrl(formData.photo)} alt="Попередній перегляд" />):
                       <p className="sms-book-photo-error">Це не Фотографія!</p>}
                       {<p className="sms1-cnt-photo">Перетягніть сюди фото<br></br>
                            Або натисніть вибрати фото
                        </p>}
                    </div>
                    <label className="basket-button" htmlFor="form-photo-book">Вибрати фото</label>
                    <input 
                        id="form-photo-book" 
                        type="file" 
                        accept="image/*" 
                        name="photo"
                        onChange={handleInputPhoto}
                    />
                <button className="button-book-admin" type="submit">Зберегти Зміни</button>
                
            </form>
            <button className="btn-edit-book-cansel button-global" onClick={()=>{resetForm();closeModalState();}}>Скасувати Зміни</button>
        </div>
    )
}