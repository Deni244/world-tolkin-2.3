'use client'
import {create} from 'zustand';
type ModalType = "login" | "burgerMenu" | null;
interface ModalState {
    isopenModal: ModalType;
    openModalState: (modal: ModalType) => void;
    closeModalState: () => void;
}

export const useModalState = create<ModalState>((set)=> ({
    isopenModal: null,
    openModalState: (modal) => set({ isopenModal: modal }),
    closeModalState: () => set({ isopenModal: null })
}))