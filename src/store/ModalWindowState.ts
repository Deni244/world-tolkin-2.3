'use client'
import { create } from "zustand";

type Content ={
    title: string | 'ok';
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    abolition?: boolean;
    onConfirm?: () => void; 
};

interface ModalState {
  isOpen: boolean;
  content: Content | null;
  openModal: (content: Content ) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null, 
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: null,}),
}));