import NavButton from "@/app/components/NavButton";
import SignOut from "./SignOut";

export default function Navbar() {
  const routes = [
    {
      name: "Team",
      path: "/dashboard/team/manage",
      color: "hover:decoration-purple-400"
    },
    {
      name: "Submission",
      path: "/dashboard/submissions/create",
      color: "hover:decoration-pink-400"
    },
    {
      name: "Submission Gallery",
      path: "/dashboard/submissions",
      color: "hover:decoration-cyan-400"
    },
  ];


  return (
    <div className="sticky top-0 z-50 flex min-w-full items-center justify-end gap-x-4 p-4">
      <SignOut />
      <NavButton href="/" lineColor="hover:decoration-green-400">
        Back to Home
      </NavButton>
      <NavButton className="mr-auto" href="/dashboard" lineColor="hover:decoration-green-400">
        Dashboard
      </NavButton>
      {routes.map((route, index) => (
        <NavButton key={index} href={route.path} lineColor={route.color}>
          {route.name}
        </NavButton>
      ))}
    </div>
  );
}
