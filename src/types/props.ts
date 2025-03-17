export type Props ={
    onclick?: () => void;
    classes?: string;
    message?: string;
}

export type BooksProps = {
    id?: string;
    name: string;
    description: string;
    photo: string;
    price: string;
}