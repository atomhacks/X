"use client";

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup } from "@headlessui/react";
import Spinner from "@/app/components/Spinner";

function SubmitButton({
  loading,
  className,
  children,
  ...props
}: { loading?: boolean; children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="submit"
      className={
        className
          ? className
          : "inline-flex justify-center rounded-md border border-transparent bg-green-600/80 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-green-600 disabled:opacity-50"
      }
      {...props}
    >
      {loading === true && (
        <span>
          <Spinner />
        </span>
      )}
      {children}
    </button>
  );
}

export default function FormQuestions() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [osis, setOsis] = useState("");
  const [experience, setExperience] = useState("BEGINNER");
  const [year, setYear] = useState("");
  const [confirmation, setConfirmation] = useState("NO");
  const [submitting, setSubmitting] = useState(false);
  const [hasTeam, setHasTeam] = useState(null);
  const [shouldMatchTeam, setMatchTeam] = useState(null);
  const [potentialMembers, setPotentialMembers] = useState("");
  const [shirtSize, setShirtSize] = useState("");
  const experienceLevels = ["None", "Beginner", "Intermediate", "Advanced"];
  const graduationYears = ["2024", "2025", "2026", "2027"];
  const sizes = ["Small", "Medium", "Large", "XL"];
  const confirmations = ["YES", "NO"];

  // We gotta use Formik or something
  const isValid = () => {
    return name.length > 1 && experience && !isNaN(+year) && confirmation == "YES" && osis.length == 9 && !isNaN(+osis) && hasTeam != null && (hasTeam == false ? shouldMatchTeam != null : true) && shirtSize != "";
  };

  // to be updated
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }
    setSubmitting(true);
    const body = JSON.stringify({
      name,
      osis,
      experience,
      year,
      hasTeam,
      shouldMatchTeam: hasTeam ? null : shouldMatchTeam,
      potentialMembers: !hasTeam ? null: potentialMembers,
      shirtSize,
    });
    console.log(body);
    const res = await fetch("/api/user/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (res.status == 201) {
      router.refresh();
      router.push("/dashboard/form/success");
    }
  };
  return (
    <div>
      <div className="mx-auto mt-2 max-w-[1024px] p-4 pt-4 text-neutral-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <h1 className="mt-4 text-6xl font-bold underline decoration-green-500 decoration-4 underline-offset-4 md:text-4xl">
              Atomhacks X Registration
            </h1>
            <div className="space-y-4 text-lg">
              <p>It&apos;s that time of the year again — IT&apos;S ATOMHACKS SEASON!</p>

              <p>
                Our tenth annual hackathon is here! It&apos;s an amazing opportunity for everyone to unite and build
                something they have never thought of before. It will be a creative outlet for people to plug themselves
                in and start creating!
              </p>

              <p>
                NO PRIOR KNOWLEDGE NEEDED. If you don&apos;t know how to code, it&apos;s no problem at all. We welcome
                you to come and learn through our amazing workshops. We have prizes for beginner coders, so come on down
                and create something with your friends, have fun, and take home a grand prize. There will also be swag
                and free lunch and dinner for everyone participating!
              </p>

              <p>
                The event will take place on March 2nd from 8 AM to 8 PM at BRONX SCIENCE. You will be able to present
                to a panel of awesome judges for a chance to win PRIZES! Team up with your friends and learn how to make
                amazing things! There will be workshops and guest speakers as well so make sure to sign up!
              </p>

              <p>
                Please check this website for more information about the schedule and FAQs. If you have any questions
                please email{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-500 underline decoration-2 underline-offset-4"
                  href="mailto:atomhacks@bxscience.edu"
                >
                  atomhacks@bxscience.edu
                </a>
                .
              </p>

              <p>
                NOTE: We will be using Discord for communication throughout the event. After submitting the form, you
                will be given the option to link your account, identifying you in the official AtomHacks server.
              </p>
            </div>
          </div>
          <label className="block text-base text-neutral-400" htmlFor="osis">
            Full Name
          </label>
          <input
            className="bg-ocean-400 mb-4 mt-1 block rounded-md p-2 text-xl shadow-lg focus:border-green-600 focus:outline-none focus:ring focus:ring-green-600"
            type="text"
            value={name}
            id="name"
            name="name"
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            autoComplete="name"
          />
          <label className="block text-base text-neutral-400" htmlFor="osis">
            OSIS:
          </label>
          <input
            className="bg-ocean-400 mb-4 mt-1 block rounded-md p-2 text-xl shadow-lg focus:border-green-600 focus:outline-none focus:ring focus:ring-green-600"
            type="text"
            value={osis}
            id="osis"
            name="osis"
            onInput={(e) => setOsis((e.target as HTMLInputElement).value)}
            autoComplete="OSIS"
          />
          <RadioGroup value={experience} onChange={setExperience}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">What is your level of programming experience?</p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {experienceLevels.map((experience, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-green-600" : "bg-ocean-400"} w-2/5 cursor-pointer rounded-lg px-4 py-2 shadow-md`
                  }
                  key={index}
                  id={experience.toLowerCase()}
                  value={experience.toUpperCase()}
                >
                  <span>{experience}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <RadioGroup value={year} onChange={setYear}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">Graduation Year</p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {graduationYears.map((year, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-green-600" : "bg-ocean-400"} w-2/5 cursor-pointer rounded-lg px-4 py-2 shadow-md`
                  }
                  key={index}
                  id={year.toLowerCase()}
                  value={+year}
                >
                  <span>{year}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <h3>The following questions related to teams are non-binding. You can decide your final team on the day of the event. We just want to get a general sense of how many people need a team.</h3>
          <RadioGroup value={hasTeam} onChange={setHasTeam}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">Do you already have a team? (4 members max, including yourself)</p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {confirmations.map((option, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-green-600" : "bg-ocean-400"} w-2/5 cursor-pointer rounded-lg px-4 py-2 shadow-md`
                  }
                  key={index}
                  id={option.toLowerCase()}
                  value={option == "YES" ? true : false}
                >
                  <span>{option}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          {hasTeam != null && hasTeam ? (
            <>
              <label className="block text-base text-neutral-400">
                Potential Team Members:
              </label>
              <input
                className="bg-ocean-400 mb-4 mt-1 block rounded-md p-2 text-md shadow-lg focus:border-green-600 focus:outline-none focus:ring focus:ring-green-600"
                type="text"
                value={potentialMembers}
                id="members"
                name="members"
                size={40}
                onInput={(e) => setPotentialMembers((e.target as HTMLInputElement).value)}
              />
            </>
          ) : (
          <RadioGroup value={shouldMatchTeam} onChange={setMatchTeam}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">Would you like us to match you with a team on the day of the event?</p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {confirmations.map((option, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-green-600" : "bg-ocean-400"} w-2/5 cursor-pointer rounded-lg px-4 py-2 shadow-md`
                  }
                  key={index}
                  id={option.toLowerCase()}
                  value={option == "YES" ? true : false}
                >
                  <span>{option}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          )}
          <RadioGroup value={shirtSize} onChange={setShirtSize}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">Preferred Shirt Size:</p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {sizes.map((size, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-green-600" : "bg-ocean-400"} w-2/5 cursor-pointer rounded-lg px-4 py-2 shadow-md`
                  }
                  key={index}
                  id={size.toLowerCase()}
                  value={size.toUpperCase()}
                >
                  <span>{size}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <RadioGroup value={confirmation} onChange={setConfirmation}>
            <RadioGroup.Label>
              <p className="mb-2 text-neutral-400">
                Do you agree to the terms of the{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-600 underline decoration-2 underline-offset-4"
                  href="https://docs.google.com/document/d/1fMx-8iApjgRuAs0mH2T4yCz6WGrwTwNGHS854C-fmKQ/edit"
                >
                  Bronx Science AtomHacks Code of Conduct?
                </a>{" "}
                If you do not agree to these terms, you may not participate in this event.
              </p>
            </RadioGroup.Label>
            <div className="space-y-2">
              {confirmations.map((option, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? "bg-green-600" : "bg-ocean-400"} w-2/5 cursor-pointer rounded-lg px-4 py-2 shadow-md`
                  }
                  key={index}
                  id={option.toLowerCase()}
                  value={option}
                >
                  <span>{option}</span>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <div className="mt-4">
            <SubmitButton type="submit" disabled={submitting || (isValid() ? false : true)} loading={submitting}>
              Submit
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
