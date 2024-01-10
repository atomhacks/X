import Link from 'next/link'
import { PropsWithChildren } from 'react'

type Props = {
  bgColor: string
  outlineColor: string
  href: string
}

export default function NavButton(props: PropsWithChildren<Props>) {
  return (
    <Link
      href={props.href}
      className={`flex w-32 justify-center rounded-xl border border-b border-neutral-800 bg-zinc-800/30 from-inherit p-3 transition-colors ${props.bgColor} ${props.outlineColor}`}
    >
      {props.children}
    </Link>
  )
}
