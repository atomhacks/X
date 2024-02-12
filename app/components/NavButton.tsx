import Link from 'next/link'
import { AnchorHTMLAttributes, PropsWithChildren } from 'react'


type Props = {
  lineColor: string
  href: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export default function NavButton({href, ...props}: PropsWithChildren<Props>) {
  return (
    <Link
      href={href}
      {...props}
    >
      <p className={`mx-2 text-xl underline underline-offset-[6px] decoration-[3px] decoration-white transition-colors ${props.lineColor}`}>{props.children}</p>
    </Link>
  )
}
