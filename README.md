# Memotest with Next.js and GraphQL

## Introduction

Classic Memo-test game created by Next.Js for the frontend and Laravel with GraphQL for the backend.

This project is divided in two repositories, frontend (this repo) and backend ([laravel-memo-test](https://github.com/EzeLamar/laravel-memo-test)).

For the implementation of this project it was used [Laravel Breeze](https://laravel.com/docs/starter-kits) application / authentication starter kit frontend in [Next.js](https://nextjs.org). All of the authentication boilerplate is powered by [Laravel Sanctum](https://laravel.com/docs/sanctum).

Also Typescript and Storybook was added to the project.

## Documentation

### Pre-requisites

The backend of the project is allocated on [laravel-memo-test](https://github.com/EzeLamar/laravel-memo-test) repository.

Follow the instructions and configure the backend, then continue with the Frontend installation step.

### Installation

Clone this repository on your local machine, open a terminal and move to the root folder of the project (nextjs-memo-test):

```bash
cd nextjs-memo-test
npm install
```

#### Localhost Configuration

On the root folder of the project, create a new file **.env.local** with the same content than **.env.example**. This file will include the environment variable with the URL of our backend

```bash
.env.local:
NEXT_PUBLIC_BACKEND_URL<BACKEND_URL>
```

#### Usage

Finally, on the root folder run the application with the command:

```
npm run dev
```

The application will be available at `http://localhost:3000`:

### Login/Register

In order to acces and play with all the MemoTests, we need to login with a previously created account. Navigate to **Register** link on `http://localhost:3000` to create a new account or Login with the **Signin** link on `http://localhost:3000`

### Storybook

Use the next command on the root of the project to run the storybook server:

```
npm run storybook
```
