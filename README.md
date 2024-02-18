# DON'T USE NPM, USE PNPM. RUN `npm i -g pnpm` AND USE PNPM INSTEAD OF NPM. ALL COMMANDS SHOULD BE THE SAME.


# Learning from AtomHacks IX

If you're seeing this, I'm assuming it's time for the AtomHacks X website to be created. Before you begin, here are some considerations and solutions that I have noted from the previous AtomHacks.

---
## Start Earlier

Please, if you're seeing this, start this thing earlier.

---
## Databases

Last year, the database (hosted on Digital Ocean), quickly became overloaded in the final hour before the submissions deadline. This completely shut down the site for most users, even though Vercel, Next.js, and Prisma were all operational.

Solutions:

- Simply use a more durable and efficient cloud computing service (AWS, Azure, Googel Cloud)
- Implement a queue system that would automatically detect when there are too many connections and properly redirect users to a page explaining the situation, rather than a panic-inducing error screen

---
## Collaboration

Big props to Fahim, Warren, and (maybe me) for basically carrying the entire project last year. However, (mostly me and Fahim) would work on various features synchronously, when led to major merge conflicts that resulted in the loss of someone else's work. In general, people were just working on things they wanted to, and it wasn't very coordinated.

Solutions:

- Make use of GitHub Projects and allow users to clock-in what tasks they are working on, with each task clearly mentioning what files would be modified
- Force everyone to use pull requests rather than directly committing?
- Don't branch (it may seem useful but someone will tryhard commit on the `main` branch and the other branches will be like 20 commits behind full of merge conflicts)

---
## Communication (with Attendees)

I think it would be worthwhile to setup an automated email system using a `no-reply` address.

Examples:

- On sign up, send a confirmational email
- After submitting a project, send an email

It would also be worthwhile to have a live feed on the official website that would automatically post an announcement to the Discord. This maximizes the chance that all attendees would see that announcement.

---
## Admin System

Even though we had spent countless nights working on the website, we still resorted to sending submissions via email because of any risks of failure. I think an admin system that allows us to automatically queue and open people's submissions would be handy.

When submitting, users would also select what service they uploaded their submission on (Replit, Scratch, Unity, etc). In general, there should be a more complex questionaire that would take user's inputs and make it easier for us to cycle between submissions without logging in and out between attendees.

---
Thank you for coming to my Ted Talk, I guess.

@wd7bxscience