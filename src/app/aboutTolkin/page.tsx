import {tolkinBiography} from '@/data/aboutTolkin'
import { kurale } from '@/lib/fonts'
import '@/styles/aboutTolkin.css'


export default function AboutTolkin() {
    
    return (
       <div className={`${kurale.className} about-tolkin-kontent`}>
        {
            tolkinBiography.map(elem =>(
                <div key={elem.id} className='content-container'>
                    <h1 className='content-title'>{elem.title}</h1>
                    <div>
                        <p className='content-description'>{elem.description}</p>
                    </div>
                </div>
            ))
        }
       </div>
    )
}