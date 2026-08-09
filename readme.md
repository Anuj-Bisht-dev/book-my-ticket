# 🎟️ Book My Ticket

A backend-focused ticket booking system built with **TypeScript, Node.js, Express, PostgreSQL, and Drizzle ORM**.

The project focuses on building a reliable booking backend with authentication, email verification, password recovery, protected routes, database migrations, and seat booking logic.

> **Book My Ticket** was developed as a practical backend project to explore real-world API architecture, authentication, database transactions, and concurrency challenges involved in a ticket booking system.

---

# 📌 Project Scope

Book My Ticket is primarily a **backend ticket-booking system** focused on:

* Authentication
* User verification
* Password recovery
* JWT authorization
* Seat management
* Ticket booking
* PostgreSQL database management
* Database migrations
* Transaction-oriented booking logic
* Email communication

The project is designed as a practical backend application rather than just a basic CRUD API.

---

## 🧰 Tech Stack

| Technology        | Purpose                                   |
| ----------------- | ----------------------------------------- |
| **TypeScript**    | Type-safe application development         |
| **Node.js**       | JavaScript runtime                        |
| **Express 5**     | Backend web framework                     |
| **PostgreSQL 17** | Relational database                       |
| **Drizzle ORM**   | Type-safe database queries and schema     |
| **Drizzle Kit**   | Database migrations and development tools |
| **JWT**           | Authentication and token management       |
| **Zod**           | Request/data validation                   |
| **Resend**        | Transactional emails                      |
| **Docker**        | PostgreSQL containerization               |

The dependencies above are based on the repository's current `package.json`.

---

## 🏗️ Project Architecture

The application follows a modular backend architecture.

```text
Client
   │
   ▼
Express Application
   │
   ├── Authentication Module
   │      ├── Routes
   │      ├── Controllers
   │      ├── Services
   │      ├── Models
   │      └── Middleware
   │
   ├── Booking Module
   │      ├── Routes
   │      ├── Controllers
   │      ├── Services
   │      ├── Models
   │      └── Middleware
   │
   ├── Common Layer
   │      ├── Configuration
   │      ├── Middleware
   │      ├── Utilities
   │      └── Email Templates
   │
   ▼
Drizzle ORM
   │
   ▼
PostgreSQL
```

This separation keeps authentication, booking, shared utilities, configuration, and database concerns organized independently.

---

## 📁 Project Structure

```text
book-my-ticket/
│
├── .vscode/
│
├── drizzle/
│   └── 20260722171620_silent_iron_man/
│       └── ...
│
├── public/
│
├── src/
│   │
│   ├── common/
│   │   ├── config/
│   │   │   ├── config.env.ts
│   │   │   ├── db.schema.ts
│   │   │   ├── email.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── email-pages/
│   │   │   ├── email.forgotpasswordtoken.pages.ts
│   │   │   └── email.verificationtoken.pages.ts
│   │   │
│   │   ├── middlewares/
│   │   │   └── authentication.middleware.ts
│   │   │
│   │   └── utils/
│   │       ├── api-error.ts
│   │       ├── api-response.ts
│   │       └── tokens.utils.ts
│   │
│   ├── modules/
│   │   │
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.middleware.ts
│   │   │   ├── auth.models.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.services.ts
│   │   │
│   │   ├── booking/
│   │   │   ├── booking.controller.ts
│   │   │   ├── booking.middleware.ts
│   │   │   ├── booking.models.ts
│   │   │   ├── booking.routes.ts
│   │   │   └── booking.services.ts
│   │   │
│   │   └── app.ts
│   │
│   └── index.ts
│
├── .gitignore
├── docker-compose.yml
├── drizzle.config.js
├── index.html
├── index.mjs
├── package-lock.json
├── package.json
├── seats.sql
├── tsconfig.json
└── README.md
```

The high-level tree above reflects the repository currently available on GitHub, including the `src/common`, `src/modules`, `drizzle`, `public`, and root configuration files.

---

## 🗃️ Database Schema

The project currently uses PostgreSQL with Drizzle ORM.

### Users

The `users` table handles authentication and account verification.

```text
users
├── id
├── name
├── email
├── verify_email
├── verification_token
├── verification_token_expires_in
├── password
├── refresh_token
├── created_at
└── updated_at
```

### Seats

The `seats` table stores ticket/seat availability.

```text
seats
├── id
├── name
└── isbooked
```

The current Drizzle schema defines `users` with UUID identifiers and `seats` with serial identifiers.

---

# 🚀 Getting Started

Follow the steps below to run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/Anuj-Bisht-dev/book-my-ticket.git
```

Move into the project:

```bash
cd book-my-ticket
```

---

## 2. Install Dependencies

Make sure Node.js and npm are installed.

Then run:

```bash
npm install
```

---

# 🐘 PostgreSQL Setup with Docker

This project uses **PostgreSQL 17**.

The repository already contains a `docker-compose.yml` file for running PostgreSQL through Docker.

### Recommended Docker Compose configuration

```yaml
services:
  postgresdb:
    image: postgres:17
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: sandy
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgresdb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Start PostgreSQL

Run:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

You should see the PostgreSQL container running on:

```text
localhost:5432
```

---

## 3. Database Connection

The application expects a `DATABASE_URL` environment variable.

Create a `.env` file in the project root:

```env
PORT=8080
ENVIORNMENT=development

DATABASE_URL=postgresql://sandy:password@localhost:5432/postgresdb

ACCESS_TOKEN=your_access_token_secret
ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d

RESEND_API_KEY=your_resend_api_key
```

> **Important:** Never commit your real `.env` file, database credentials, JWT secrets, or Resend API key to GitHub.

The current application configuration expects `PORT`, `ENVIORNMENT`, `DATABASE_URL`, access-token settings, refresh-token settings, and `RESEND_API_KEY`.

---

# 🧬 Database Migration

After PostgreSQL is running and your `DATABASE_URL` is configured, generate the Drizzle migration:

```bash
npm run drizzle:build
```

Then apply the migration:

```bash
npm run drizzle:migrate
```

The project defines these commands through Drizzle Kit in `package.json`.

---

# 🌱 Database Flow

The basic setup flow is:

```text
Docker
   │
   ▼
PostgreSQL 17
   │
   │ DATABASE_URL
   ▼
Drizzle ORM
   │
   ▼
Drizzle Schema
   │
   ▼
Migration
   │
   ▼
Application
```

---

# 🧪 Drizzle Studio (Inspect Databases)

You can inspect your database using Drizzle Studio.

Run:

```bash
npm run studio
```

This is useful for inspecting tables and verifying that migrations and records are being created correctly.

---

# 💻 Running the Application

## Development

Start the TypeScript development server:

```bash
npm run dev
```

The development script uses `tsc-watch` and starts the compiled application after TypeScript compilation succeeds.

The server is configured through the `PORT` environment variable.

For example:

```text
http://localhost:8080
```

---

## Production Build

Compile the TypeScript project:

```bash
npm run build
```

This generates the compiled JavaScript output according to the project's TypeScript configuration.

Then run the compiled application:

```bash
node dist/index.js
```

---


# 🔒 Security Considerations

The project includes several security-oriented practices:

* Password hashing using `bcryptjs`
* JWT-based authentication
* Refresh/access token architecture
* HTTP cookie handling
* Protected routes
* Input validation using Zod
* Environment-based secrets
* CORS configuration
* Token expiration

For deployment, make sure to replace all development credentials and secrets with strong production values.

---

# 🛠️ Development Workflow (After project setup complete)

A typical development workflow looks like this:

```bash
# Clone
git clone https://github.com/Anuj-Bisht-dev/book-my-ticket.git

# Enter project
cd book-my-ticket

# Install dependencies
npm install

# Start PostgreSQL
docker compose up -d

# Create/apply database migrations
npm run drizzle:build
npm run drizzle:migrate

# Start development server
npm run dev
```

---

# 📚 What I Learned From This Project

This project helped me work with several concepts that are important when building real backend applications:

* Designing modular Express applications
* Structuring controllers and services
* JWT authentication
* Access and refresh tokens
* Password hashing
* Email verification
* Password reset flows
* PostgreSQL
* Drizzle ORM
* Database migrations<b>
* Transactions (ACID Compliance)
* Concurrency in booking systems</b>
* Request validation
* Middleware architecture
* Dockerized databases
* Environment configuration
* API error handling

---

# 👨‍💻 Author

**Anuj Singh Bisht**

Backend-focused developer interested in building practical applications and learning how systems work behind the scenes.

### Connect

* GitHub: [@Anuj-Bisht-dev](https://github.com/Anuj-Bisht-dev)

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

---

<p align="center">
  Built with TypeScript, Express, PostgreSQL & Drizzle ORM
</p>
