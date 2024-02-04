import NavButton from './NavButton'

export default function Navbar() {
  return (
    <div className="flex min-w-full items-center justify-end gap-x-4 p-4">
      <NavButton href="/" lineColor="hover:decoration-green-400">
        Home
      </NavButton>
      <NavButton href="/#about" lineColor="hover:decoration-pink-500">
        About
      </NavButton>
      <NavButton href="/#sponsors" lineColor="hover:decoration-purple-400">
        Sponsors
      </NavButton>
      <NavButton href="/gallery" lineColor="hover:decoration-cyan-400">
        Gallery
      </NavButton>
    </div>
  )
}
