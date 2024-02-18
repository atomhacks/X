"use client";

import { useState } from "react";
import Hamburger from "hamburger-react";
import { routes } from "./NavBar";
import NavButton from "./NavButton";

export default function NavBarMobile() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="z-20 sticky top-0 lg:hidden">
      <div className="flex justify-end">
        <Hamburger toggled={isOpen} size={30} toggle={setOpen} />
        {isOpen && (
          <div className="shadow-4xl fixed left-0 right-0 top-[3.5rem] z-20 m-1 rounded-lg bg-ocean-300 px-2 py-4 pt-0">
            <ul className="flex flex-col gap-2">
              {routes.map((route, i) => {
                return (
                  <div key={i} className="mt-4">
                    <NavButton key={i} href={route.href} lineColor={route.real}>
                      {route.title}
                    </NavButton>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
