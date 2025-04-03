import {tolkinBiography} from '@/data/aboutTolkin'
import { kurale } from '@/lib/fonts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/styles/aboutTolkin.css'
export const metadata: Metadata = {
    title: "Про Толкіна",
    description: "Про Толкіна, дитинство Толкіна, шкільні та університетські роки",
    
  };

export default function AboutTolkin() {
    if (!tolkinBiography || tolkinBiography.length === 0) {
        return notFound()
    }
    return (
       <div className={`about-tolkin-kontent`}>
        {
            tolkinBiography.map(elem =>(
                <div key={elem.id} className='content-container'>
                    <h1 className={`${kurale.className} content-title`}>{elem.title}</h1>
                    <div>
                        <p className={`${kurale.className} content-description`}>{elem.description}</p>
                    </div>
                </div>
            ))
        }
       </div>
    )
}