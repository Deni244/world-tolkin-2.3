'use client'

import Button1 from "@/components/button1";
import { kurale, rubikDirt } from '@/lib/fonts';
import '../styles/error.css'

export default function ErrorPage({ error }: { error: Error }) {

  return (
    <div className={`error-container`}>
      <h1 className={`title-error ${kurale.className}`}><span className={rubikDirt.className}>ERROR</span>  Виникла помилка!</h1>
      <h2 className={kurale.className}>Помилка:</h2>
      <p className="error-message">{error.message}</p>
      <Button1 clas="button-global" onClick={()=>window.location.href='/'} title='Повернутися на головну'/>
    </div>
  );
}