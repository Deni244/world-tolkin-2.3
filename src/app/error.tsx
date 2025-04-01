'use client'

import Button1 from "@/components/button1";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <div className="div-container">
      <h1>Виникла помилка!</h1>
      <p>{error.message}</p>
      <Button1 clas="button-global" onClick={() => window.location.href = '/'} title="Повернутися на головну"/>
    </div>
  );
}