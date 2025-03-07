'use client'
import '../styles/menuButton.css'
type Props ={
    onClick: () => void;
}

export default function MenuButton({onClick}: Props) {
    
    return (
        <div className="container-burger-btn">
            <div className="nav-btn" onClick={onClick}>
                <div className="nav-btn-line1"></div>
                <div className="nav-btn-line2"></div>
                <div className="nav-btn-line3"></div>
            </div>
        </div>
    )
}