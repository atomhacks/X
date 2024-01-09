import NavButton from './NavButton'

export default function Navbar() {
  return (
    <div className="flex min-w-full items-center justify-end gap-x-4 p-8">
      <NavButton href="/#about" outlineColor="hover:border-pink-500/40" bgColor="hover:bg-pink-500">
        About
      </NavButton>
      <NavButton href="/#sponsors" outlineColor="hover:border-pink-500/40" bgColor="hover:bg-pink-500">
        Sponsors
      </NavButton>
      <NavButton href="/gallery" outlineColor="hover:border-cyan-500/40" bgColor="hover:bg-cyan-500">
        Gallery
      </NavButton>
    </div>
  )
}
