<p align="center">
  <img src="tableplanner_logo.png" alt="TablePlanner logo" width="90" />
</p>

<h1 align="center">TablePlanner - Frontend</h1>

The frontend for **TablePlanner**, a web application that lets restaurants manage
their tables, guests, and reservations. This repository contains the Vue
single-page application (SPA).

The matching backend lives in [TablePlanner-Backend](https://github.com/adamtfa/TablePlanner-Backend).

## What the app can do

After registering and logging in, a restaurant gets a clean, single-page
interface to run its day-to-day operations:

- **Register & log in** — create a restaurant account and sign in. The session
  is kept via a JWT that is automatically attached to every request.
- **Tables** — add, edit, and delete tables, each showing a live availability
  status (`Available` / "Reserved") that updates automatically.
- **Customers** — maintain a guest database (add, edit, delete).
- **Reservations** — create, edit, and delete reservations that link a customer
  and a table at a chosen date and time.
- **Input validation** — every form validates its fields before submitting and
  shows inline error messages on the affected inputs.
- **Graceful error handling** — conflicts (e.g. deleting a table still used by a
  reservation) surface as a red banner that auto-dismisses after 3 seconds.
- **Protected routes** — all management pages require authentication; only the
  login and register pages are public.

## Tech stack & methods

- **Vue 3** with the **Composition API** (`<script setup>`)
- **TypeScript** throughout
- **Vite** as the build tool and dev server
- **Vue Router** with a global navigation guard for auth-protected routes
- **Fetch API**, wrapped in an `authFetch` helper that attaches the Bearer token
- **CSS** — a custom dark/gold theme via CSS variables, scoped per component,
  no UI framework
- **Vitest** with **@vue/test-utils** for unit tests

## Developer Team
- Nando Patton
- Adam Tuffaha
