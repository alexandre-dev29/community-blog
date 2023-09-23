# Community Blog

This project is a [NX project](https://nx.dev/) for a complete blog to publish your communioty articles, with tone of
features and other that are comming.
The backend and the front are in the same project😂 i prefered to use monorepo for this and the obvious choice for me was
NX because of the great developer experience.

The frontend is built using [NextJs 13 with App Directory](https://nextjs.org/) and for the UI i have
used [ShadCdn](https://ui.shadcn.com/) for his simple and beautifull design and also highly customizable.

Other library are used for the frontend such as , [TIPTAP](https://tiptap.dev/) for writing articles, and refine for
😏😏 many thnks 😂

The Backend is written in [NESTJS](https://nestjs.com/) with [prisma](http://prisma.io) has ORM of choice 😋😋 , i also
use [Castl](https://casl.js.org/) for authorization and JWT for authentication process

the blog has the admin part or editor to publish and manage their article with a couple of other feature that are admin
only such as create a new editor and management users.

## How to getting start with the project

First of all the project was configure with POSTGRES for the database part but can work with any SQL or NOSQL Thanks to
Prrisma.
ALexandreSupabase29..
first let’s clone the project , hope that git is already install on your machine 😑😑😑

```bash
git clone https://github.com/alexandre-dev29/community-blog.git
```

Then See the differents .env.example in the root of the projectt and create a .env file with the correct values for you
situation.

Once done, time for the famous :

```bash
npm install  #if you are using npm
yarn install # if you are using yarn
pnpm install #if you aree using pnpm(pnpm was used for this project, don't ask me why 🙄)
```

Once done, run

```bash
npx prisma migrate dev
```

This will apply all the migration the the database that you configured in the .env file

once finish , now the fun part

```bash
pnpm turbo run serve # or yarn nx run api:serve if you are using yarn
```

🥳🥳🥳🥳🥳 now you can start publish articles and adding users
with the seeding a default user has been added you can use those credential to login and start work.

### Thanks

For any question fill free to ask and to contribute and most important don’t forget to give a little Star ⭐ to this
repo.
