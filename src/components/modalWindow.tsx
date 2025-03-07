'use client'
import { useModalStore } from '@/store/ModalWindowState'
import Button1 from './button1';
import '../styles/modalWindow.css'



export default function ModalWindow() {
    const { isOpen, content, closeModal } = useModalStore();

    if (!isOpen) return null;

return (
    <div className={`modal-window-container`}>
        <h1 className='modal-window-header'>{content?.title}</h1>
        <Button1 
        title={content?.buttonText}
        href={content?.buttonLink}
        onClick={content?.onConfirm && closeModal}
        clas='button-global' />
    </div>
)
}