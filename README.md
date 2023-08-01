# Ricordati - an app to track lent and borrowed items
### WIP ⚠️
## Overview
Where are all my spare keys? Who did I lend my electric heater to? Someone has my inflatable mattress but I can't remember who I gave it to.
Apparently, I'm one of the few in the world with this issue, as I couldn't find any proper app to track items that I am lending to others, or that I am borriwing from friends. So I decided to build **Ricordati**.

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

## Demo
Ricordati is deployed [HERE: ricordati.vercel.app](https://ricordati.vercel.app/). 
