'use client'
import Link from "next/link";
import { kurale } from '@/lib/fonts';
type Props = {
        title?: string;
        href?: string | null;
        clas?: string | ' ';
        onClick?: () => void;
}

const Button1 = ({title, href, clas, onClick}: Props) => {
    if (href) {
        return (
          <Link href={href} className={`${clas} ${kurale.className}`} onClick={onClick}>
            {title}
          </Link>
        );
      }
      return (
        <button onClick={onClick} className={`${clas} ${kurale.className}`}>
          {title ? title : 'ok'}
        </button>
      );
}

export default Button1;