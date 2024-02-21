"use client";

import { Combobox, Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import SubmitButton from "../../../components/buttons/SubmitButton";

type Props = {
  users: User[];
  closed: boolean;
  disabled: boolean;
  currentLength: number;
  setClose: Dispatch<SetStateAction<boolean>>;
  setDisabled: Dispatch<SetStateAction<boolean>>;
};

export default function AddUsersModal({ users, closed, disabled, currentLength, setClose, setDisabled }: Props) {
  const router = useRouter();
  const [selectedUsers, _setSelectedUsers] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  const filteredUsers =
    query === ""
      ? users
      : users.filter((user) => {
          return user.name?.toLowerCase().includes(query.toLowerCase());
        });

  const setSelectedUsers = (people: any) => {
    if (people.length + currentLength >= 4) {
      return;
    }
    _setSelectedUsers(people);
  };

  const onAdd = async () => {
    if (selectedUsers.length + currentLength >= 4) {
      return;
    }
    const body = {
      users: selectedUsers,
    };

    const res = await fetch("/api/team/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.status == 201) {
      setClose(true);
      router.refresh();
      setDisabled(false);
    }
  };

  return (
    <Transition appear show={!closed} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setClose(true)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-ocean-200 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                  Add Users
                </Dialog.Title>
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
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
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
                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                  {user.name}
                                </span>
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

                <div className="mt-4">
                  <SubmitButton
                    loading={disabled}
                    disabled={disabled || selectedUsers.length == 0 || selectedUsers.length + currentLength >= 4}
                    onClick={() => onAdd()}
                  >
                    Add
                  </SubmitButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
