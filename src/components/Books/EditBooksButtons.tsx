'use client'
import { useModalStore } from "@/store/ModalWindowState"
import Button1 from "@/components/button1"
import { deleteBook } from "@/store/booksFunction";
import { useAuth } from "@/context/AuthContext";
import { useModalState } from "@/store/ModalState";
import '../../styles/EditBookButtons.css'
import { BooksProps } from "@/types";


export default function EditBooksButtons({ book } : { book : BooksProps }) {
     const { user } = useAuth();
    const {openModal, closeModal} = useModalStore();
    const {openModalState} = useModalState();

       const handleDeleBook = async (id: string) =>{
            const res = await deleteBook(id);
            openModal({title: res.message, onConfirm: closeModal})
        }
    if (user?.isadmin){
    return (
    <div className="book-admin-panel">
        < Button1 clas="button-book-admin" title="Видалити" onClick={()=>{openModal({title: 'Ви впевнені що хочете видалити книгу?', buttonText: 'Видалити', abolition: true, onConfirm: ()=>handleDeleBook(book.id!)})} } />
        < Button1 clas="button-book-admin" title="Редагувати" onClick={()=> openModalState('editBook')} />
    </div>
    )
}else return null;
}