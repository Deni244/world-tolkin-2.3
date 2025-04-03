'use client'

import Button1 from "./button1"

export default function NotFoundButton() {
    return <Button1 clas="button-global" onClick={()=>{window.location.href = '/'}} title="Повернутися на головну"/>
}