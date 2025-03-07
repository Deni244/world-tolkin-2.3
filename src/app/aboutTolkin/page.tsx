import {tolkinBiography} from '@/data/aboutTolkin'
import { kurale } from '@/lib/fonts'
import '@/styles/aboutTolkin.css'


export default function AboutTolkin() {
    
    return (
       <div className={`${kurale.className} about-tolkin-kontent`}>
        {
            tolkinBiography.map(elem =>(
                <>
                <h1>{elem.title}</h1>
                <div key={elem.id}>
                    <p>{elem.description}</p>
                </div>

                </>
            ))
        }
       </div>
    )
}