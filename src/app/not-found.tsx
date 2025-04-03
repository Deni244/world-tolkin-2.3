
import NotFoundButton from "@/components/Not-FoundButton";
import { kurale, rubikDirt } from '@/lib/fonts';
import '../styles/notFound.css'

export default function NotFound() {

    return (
        <div className={`not-found-container ${kurale.className}`}>
            <h1 className={`title-not-found`}><span className={rubikDirt.className}>404</span> Сторінку не знайдено!</h1>
            <p className="text-not-found">Такої сторінки не існує або вона недоступна</p>
            <NotFoundButton />
      </div>
    );
  }