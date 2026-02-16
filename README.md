# Secure RBAC REST API

A scalable REST API built with Node.js, Express, TypeScript, Prisma, and PostgreSQL featuring JWT authentication and Role-Based Access Control (RBAC).

This project demonstrates secure backend architecture, proper API design, and clean frontend integration.

---

## Features

### Authentication
- User Registration (USER / ADMIN)
- Secure Login with JWT
- HTTP-only Cookie Authentication
- Logout Route
- Get Current User (`/auth/me`)

### Role-Based Access Control (RBAC)
- USER and ADMIN roles
- Admin-only routes
- Ownership-based permissions
- Protected CRUD operations

###  Task Management (CRUD)
- Create Task
- Get Tasks (Role-based filtering)
- Update Task (Owner or Admin)
- Delete Task (Admin only)

###  API Documentation
- Swagger UI available at:
```
http://localhost:PORT/api-docs
```

### Docker Support
- Backend containerized
- Environment-based configuration
- Prisma migration support

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**
- **Swagger (OpenAPI 3)**
- **Docker**

---

## 📂 Project Structure
```
backend/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   └── server.ts
│
├── prisma/
│   └── schema.prisma
│
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

- backend/
```
PORT=BACKEND_PORT
DATABASE_URL=postgresql://username:password@host:5432/dbname
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

```

- frontend/
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api/v1
```

> If using Docker with local Postgres, use `host.docker.internal` instead of `localhost`.

---

## 🧪 Local Development

### 1️⃣ Install dependencies

```bash
npm install

npx prisma migrate dev

npx prisma generate

npm run dev


```
Backend running on : http://localhost:BACKEND_PORT

##  Run with Docker=
### Build and start container

```bash
docker-compose up --build
```

```
http://localhost:PORT
```

# Swagger Docs
```
http://localhost:PORT/api-docs
```


# Scalability Considerations
### ⚡ Redis Caching
- Implemented Redis caching for `GET /tasks` endpoint
- Role-based cache keys:
  - `tasks:admin`
  - `tasks:user:{userId}`
- Automatic cache invalidation on:
  - Task creation
  - Task update
  - Task deletion
- TTL-based expiration to prevent stale data
- Reduces database load and improves response time


- **Redis** (Caching Layer)

---

REDIS_URL=redis://localhost:6379

---

# ⚡ Redis Caching Strategy

To optimize performance:

- `GET /tasks` responses are cached in Redis
- Role-based cache separation for ADMIN and USER
- Cache invalidated on write operations (Create/Update/Delete)
- TTL-based expiration to ensure fresh data

---

### Implemented Scalability Features

- Stateless JWT authentication
- Redis caching for read-heavy endpoints
- Role-based query filtering
- Modular service structure
- Dockerized environment

### This application is designed with modular layered architecture:

```
Routes → Controllers → Services → Database
```

### Future scalability improvements:
	-	Horizontal scaling behind load balancer
	-	Separate Auth and Task services into microservices
	-	Database indexing & read replicas
	-	Container orchestration using Kubernetes

## 🚀 Final Notes

This backend system is designed with real-world production considerations in mind — including stateless authentication, strict access control, containerization, and clean architectural separation.

The project can be extended easily into microservices, scaled horizontally, and deployed in cloud environments.

Engineered for security. Structured for scalability.