# Restaurant Management System

This project is a web-based application for managing restaurant reservations and table assignments. It features role-based access for Customers, Employees, and Administrators, each with varying levels of permissions. Developed using Node.js, Express, Pug, and Passport, the system allows seamless management of reservations and tables while ensuring user authentication and secure session handling.

## Features

### Roles and Permissions

- Customer: Can log in and view their reservation details.
- Employee: Can manage table statuses (occupied/reserved).
- Administrator: Has full access, including creating, updating, deleting, and viewing reservations and tables.

### Reservation Management (CRUD)

- GET: Fetch all reservations or a specific reservation by ID or customer last name.
- POST: Create a new reservation.
- PUT: Update an existing reservation by ID.
- DELETE: Remove a reservation by ID.

### Table Management (CRUD)

- GET: Fetch all tables or a specific table.
- POST: Add a new table (admin only).
- PUT: Update table status (occupied/reserved).
- DELETE: Remove a table.

### Authentication

Utilized **Passport** for authentication, including session and cookie management to ensure secure user access and maintain active sessions.

## API Endpoints

### Reservations

|     Operation      |              View Route               |               API Route                |
| :----------------: | :-----------------------------------: | :------------------------------------: |
|     Fetch All      |    /reservations/all-reservations     |           /api/reservations            |
|     Fetch One      | /reservations/detail-reservation/:id  |         /api/reservations/:id          |
|       Create       |         /reservations/created         |           /api/reservations            |
|       Update       | /reservations/updated-reservation/:id |         /api/reservations/:id          |
|       Delete       |       /reservations/delete/:id        |         /api/reservations/:id          |
| Fetch by Last Name |  /reservations/last-name/:last_name   | /api/reservations/last-name/:last_name |

### Tables

| Operation |              View Route              |    API Route    |
| :-------: | :----------------------------------: | :-------------: |
| Fetch One | /reservations/detail-reservation/:id |   /api/tables   |
|  Create   |           /tables/created            |   /api/tables   |
|  Update   |      /tables/updated-tables/:id      | /api/tables/:id |
|  Delete   |          /tables/delete/:id          | /api/tables/:id |

## Technology Stack

**Backend**: Node.js, Express

**Authentication**: Passport.js

**Templating**: Pug

**Utilities**: UUID for unique ID generation

**Testing**: Manual testing through Postman.

## Setup Instructions

Clone the repository:

```bash
git clone <https://github.com/Raisitae/stellaris-restaurant>
```

Install dependencies:

```bash
npm install
Start the application:
```

Using nodemon:

```bash
npm run dev
```

Using node:

```bash
npm start
```

Access the app in your browser at: http://localhost:3000.

## Usage

**Admin Dashboard**: Create, update, and delete reservations or tables. View all reservations.

**Employee Dashboard**: Manage table statuses. Manage researvations through a search bar.

**Customer Access**: View reservation details. Manage your reservations.
