import React, { ReactNode } from "react";

type Props = {
  bgColor: string,
  icon: ReactNode
} & React.ComponentProps<"div">

export default function FeedbackBanner({
  bgColor,
  icon,
  ...props
}: Props) {
  return (
        <div
          className={`my-4 flex items-center ${bgColor} p-2 leading-none text-indigo-100 lg:inline-flex lg:rounded-full`}
          {...props}
        >
          <span className="justify-center mr-3 flex h-7 w-7 items-center rounded-full object-contain">
            {icon}
          </span>
          <span className="mr-2 flex-auto text-left font-semibold">This team name is already taken</span>
        </div>
  )
}