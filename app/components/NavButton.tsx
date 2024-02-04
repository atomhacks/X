import Link from 'next/link'
import { PropsWithChildren } from 'react'


type Props = {
  lineColor: string
  href: string
}

export default function NavButton(props: PropsWithChildren<Props>) {
  return (
    <Link
      href={props.href}
    >
      <p className={`mx-2 text-xl underline underline-offset-[6px] decoration-[3px] decoration-white transition-colors ${props.lineColor}`}>{props.children}</p>
    </Link>
  )
}
