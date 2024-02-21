import NavButton from "./NavButton";
import NavBarMobile from "./NavBarMobile";

export const routes = [
  {
    title: "Dashboard",
    href: "/dashboard",
    color: "hover:decoration-blue-500",
    real: "decoration-blue-500",
  },
  {
    title: "Home",
    href: "/",
    color: "hover:decoration-green-400",
    real: "decoration-green-400",
  },
  {
    title: "About",
    href: "/#about",
    color: "hover:decoration-pink-500",
    real: "decoration-pink-500",
  },
  {
    title: "FAQ",
    href: "/#faq",
    color: "hover:decoration-orange-500",
    real: "decoration-orange-500",
  },
  {
    title: "Sponsors",
    href: "/#sponsors",
    color: "hover:decoration-indigo-500",
    real: "decoration-indigo-500",
  },
  {
    title: "Gallery",
    href: "/gallery",
    color: "hover:decoration-cyan-400",
    real: "decoration-cyan-400",
  },
];

export interface Route {
  title: string,
  href: string,
  color: string,
  real: string,
}

export default function NavBar() {
  return (
    <>
      <div className="sticky top-0 z-50 hidden min-w-full gap-x-4 p-4 lg:flex lg:items-center lg:justify-end">
        {routes.map((route, i) =>
          i <= 0 ? (
            <div key={i} className="mr-auto">
              <NavButton href={route.href} lineColor={route.color}>
                {route.title}
              </NavButton>
            </div>
          ) : (
            <NavButton key={i} href={route.href} lineColor={route.color}>
              {route.title}
            </NavButton>
          ),
        )}
      </div>
      <NavBarMobile />
    </>
  );
}
