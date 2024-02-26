"use client";

import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEventHandler, Fragment, useState } from "react";
import SubmitButton from "../../../components/buttons/SubmitButton";
import FeedbackBanner from "@/app/components/FeedbackBanner";

type Props = {
  users: User[];
};

export default function CreateTeamForm({ users }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [selectedUsers, _setSelectedUsers] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) => {
          return user.name?.toLowerCase().includes(query.toLowerCase());
        });

  const setSelectedUsers = (users: any) => {
    if (users.length >= 4) {
      return;
    }
    _setSelectedUsers(users);
    setQuery("");
  };

  const isValid = () => name != "" && selectedUsers.length <= 3;

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    if (!isValid()) {
      return;
    }

    let body: any = {
      name,
      users: selectedUsers,
    };
    console.log(body);
    const res = await fetch("/api/team/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      router.push("/dashboard?complete");
      router.refresh();
    } else {
      setError(true);
      setSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      {error && (
        <FeedbackBanner bgColor="bg-rose-900" icon={<XMarkIcon />}/>
      )}
      <label className="text-xl" htmlFor="name">
        Team Name
      </label>
      <input
        className="mb-4 mt-1 block max-w-md rounded-md bg-ocean-400 p-2 text-base shadow-lg focus:border-green-600 focus:outline-none focus:ring focus:ring-green-600"
        type="text"
        id="name"
        name="name"
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
        placeholder="School Appropriate Please"
      ></input>
      <label className="w-full text-base">Other Team Members (leave blank if none)</label>
      <Combobox value={selectedUsers} onChange={setSelectedUsers} multiple>
        {selectedUsers.length > 0 && (
          <ul className="m-2 flex gap-2">
            {selectedUsers.map((id) => (
              <li className="inline-block max-w-36 rounded-2xl bg-ocean-400 p-3 text-green-400" key={id}>
                {users.find((user) => user.id == id)!.name}
              </li>
            ))}
          </ul>
        )}
        <div className="relative mb-4 mt-1">
          <Combobox.Input
            className="relative h-12 w-fit min-w-[25%] cursor-pointer rounded-lg bg-ocean-400 py-2 pl-3 pr-10 text-left text-lg shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
          ></Combobox.Input>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Combobox.Options className="absolute mt-1 max-h-60 w-96 overflow-auto rounded-md bg-ocean-400 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredUsers.map((user) => (
                <Combobox.Option
                  key={user.id}
                  className={({ active }) =>
                    `relative cursor-default cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-ocean-200 text-green-500" : "text-neutral-200"
                    }`
                  }
                  value={user.id}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{user.name}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <CheckIcon className="h-5 w-5 text-teal-400" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
      <div className="mt-4 py-2">
        <SubmitButton disabled={submitting || (isValid() ? false : true)} loading={submitting}>
          Create
        </SubmitButton>
      </div>
    </form>
  );
}
