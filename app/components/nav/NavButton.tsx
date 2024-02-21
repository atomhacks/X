import Link from 'next/link'
import { AnchorHTMLAttributes, PropsWithChildren } from 'react'

type Props = {
  linecolor: string
  href: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

export default function NavButton({href, ...props}: PropsWithChildren<Props>) {
  return (
    <Link
      href={href}
      {...props}
    >
      <p className={`mx-2 text-xl underline underline-offset-[6px] decoration-[3px] decoration-white transition-colors ${props.linecolor}`}>{props.children}</p>
    </Link>
  )
}
