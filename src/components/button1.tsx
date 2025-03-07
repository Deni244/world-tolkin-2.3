'use client'
import Link from "next/link";
type Props = {
        title?: string;
        href?: string | null;
        clas?: string | ' ';
        onClick?: () => void;
}

const Button1 = ({title, href, clas, onClick}: Props) => {
    if (href) {
        return (
          <Link href={href} className={clas} onClick={onClick}>
            {title}
          </Link>
        );
      }
      return (
        <button onClick={onClick} className={clas}>
          {title ? title : 'ok'}
        </button>
      );
}

export default Button1;