
import '../styles/buttonClose.css'
import { Props } from '@/types'

export default function ButtonClose({onclick, classes}: Props) {
    return (
            <div className={`button-close-burger ${classes}`} onClick={onclick}>
                <div className="bcb-line1"></div>
                <div className="bcb-line2"></div>
            </div>
            )
}