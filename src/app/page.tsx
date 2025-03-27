import '@/styles/home.css'
import { kurale } from '@/lib/fonts';

export default async function Home() {
  return (
    <div className="content-head-page">
      <h1 className ={`${kurale.className} content-head-page-title`}>
          <p>Світ Толкіна - це не лише захоплюючі битви і красиві пейзажі,</p>
          <p>а також музика, романтика й мистецтво</p>
      </h1>
      <div className="image-logo">
      <span><img src='/logo.png' alt="Логотип"/></span>
      </div>
  </div>
  );
}
