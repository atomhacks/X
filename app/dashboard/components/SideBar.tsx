"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SideBar() {
  const { data, status } = useSession();
  let [routes, setRoutes] = useState([
    // {
    //   name: "Submissions",
    //   path: "/dashboard/submissions",
    // },
    // {
    //   name: "Create Team",
    //   path: "/dashboard/team/create",
    // },
    // {
    //   name: "Create Submission",
    //   path: "/dashboard/submissions/create",
    // },
  ]);

  useEffect(() => {
    fetch("/api/user/info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        res.json().then((user) => {
          if (user.team) {
            setRoutes(
              routes.map((route, index) => {
                if (index == 1) {
                  return {
                    name: "My Team",
                    path: "/dashboard/team/manage",
                  };
                }
                if (index == 2 && user.team.submission) {
                  return {
                    name: "My Submission",
                    path: `/dashboard/submissions/${user.team.submission.id}`,
                  };
                }
                return route;
              }),
            );
          }
        });
      }
    });
  }, [routes]);

  return (
    <div className="bg-ocean-200 fixed flex h-screen w-56 flex-col space-y-4 border-r border-black bg-neutral-950 text-lg text-neutral-200">
      <ul className="flex h-full flex-col">
        <div className="p-4">
          <li className="mb-2">
            {/* DO NOT DELETE THE ?COMPLETE IT IS NECESSARY FOR DASHBOARD PAGE TO RELOAD AFTER FORM SUBMIT */}
            <Link href="/dashboard?complete">
              <h1 className="text-2xl font-bold transition duration-200 hover:text-teal-300">Dashboard</h1>
            </Link>
          </li>
          <span className="mb-4 block w-full bg-neutral-800 p-px"></span>
          <div className="space-y-4">
            {routes.map((route, i) => (
              <li key={i}>
                <Link href={`${route.path}?fix${i}`} className="text-xl transition duration-200 hover:text-teal-300">
                  {route.name}
                </Link>
              </li>
            ))}
          </div>
        </div>
        {status == "authenticated" && (
          <div className="mt-auto">
            <li className="flex items-center p-2">
              {data!.user!.image && (
                <Image
                  src={data!.user!.image}
                  className="mr-2 rounded-full"
                  width={48}
                  height={48}
                  alt="Profile Picture"
                />
              )}
              <h1 className="text-xl">{data!.user!.name}</h1>
            </li>
            <li>
              <button
                className="bg-ocean-100 h-14 w-full text-xl font-bold transition hover:text-red-500"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <p className="p-2">Sign Out</p>
              </button>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
}