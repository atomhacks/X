import { Lexend } from 'next/font/google';
import Link from 'next/link'
import { PropsWithChildren } from 'react'

const lexend = Lexend({ subsets: ['latin'] });

type Props = {
  lineColor: string
  href: string
}

export default function NavButton(props: PropsWithChildren<Props>) {
  return (
    <Link
      href={props.href}
    >
      <p className={`${lexend.className} mx-2 text-xl underline underline-offset-[6px] decoration-[3px] decoration-white transition-colors ${props.lineColor}`}>{props.children}</p>
    </Link>
  )
}
