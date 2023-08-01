# Ricordati - an app to track lent and borrowed items

### WIP ⚠️

## Overview

Where are all my spare keys? Who did I lend my electric heater to? Someone has my inflatable mattress but I can't remember who I gave it to.
Apparently, I'm one of the few in the world with this issue, as I couldn't find any proper app to track items that I am lending to others, or that I am borrowing from friends. So I decided to build **Ricordati**.

## Stack

The app is built in Next JS with TypeScript, and deployed to Vercel. It uses Vercel Postgres as a serverless SQL database, and Prisma as ORM.
There's a session-based authentication (OAuth) via GitHub that checks against the email set in the env file for NEXT_PUBLIC_ALLOWED_USER.

## Setup

1. Clone this repository
2. Navigate into the project directory
   ```bash
   $ cd ricordati
   ```
3. Install the requirements
   ```bash
   $ npm install
   ```
4. Make a copy of the example environment variables file

   On Linux systems:

   ```bash
   $ cp .env.example .env
   ```

   On Windows:

   ```powershell
   $ copy .env.example .env
   ```

5. Replace variable with your own configuration
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Screenshots

<img width="206" alt="Screenshot 2023-08-01 at 17 21 56" src="https://github.com/irenedeni/ricordati/assets/40884485/c2ba5e4a-b12f-4040-a997-e1f08f7a18d5">

<img width="204" alt="Screenshot 2023-08-01 at 17 12 14" src="https://github.com/irenedeni/ricordati/assets/40884485/06623d4f-12e0-4a0c-bf3b-09107aaf3b4c">

<img width="207" alt="Screenshot 2023-08-01 at 17 11 26" src="https://github.com/irenedeni/ricordati/assets/40884485/9985ccda-ab68-42d4-9d05-7e8fecd29f71">

<img width="207" alt="Screenshot 2023-08-01 at 17 14 52" src="https://github.com/irenedeni/ricordati/assets/40884485/6b9ae3cb-3fb7-4f70-8bd0-768753b4716b">

## Demo

Ricordati is deployed [HERE: ricordati.vercel.app](https://ricordati.vercel.app/).
