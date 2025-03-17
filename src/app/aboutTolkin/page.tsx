import {tolkinBiography} from '@/data/aboutTolkin'
import '@/styles/aboutTolkin.css'
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Про Толкіна",
    description: "Про Толкіна, дитинство Толкіна, шкільні та університетські роки",
    
  };


export default function AboutTolkin() {
    
    return (
       <div className={`about-tolkin-kontent`}>
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