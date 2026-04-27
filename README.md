# Simple Customer Management Dashboard

Full-stack customer dashboard built as per assignment requirements, with:

- Frontend: React + TypeScript + Vite + Redux Toolkit + Tailwind CSS + Toast
- Backend: Node.js + Express + TypeScript (MVC structure) + Swagger/OpenAPI

---

## Assignment Cross-Verification

### Frontend requirements

- Form fields:
  - Name
  - Email
  - Phone Number
  - Submit button
- Customer table columns:
  - Name
  - Email
  - Phone
  - Delete button

Status: Covered

### Backend requirements

- `POST /customers` -> Add new customer
- `GET /customers` -> Get all customers
- `DELETE /customers/:id` -> Delete customer
- In-memory array storage

Status: Covered (implemented under `/api/customers`, with same functionality)

---

## Project Structure

```text
arali/
  frontend/   # React app
  backend/    # Express API
```

---

## Prerequisites

- Node.js 18+ (recommended latest LTS)
- npm 9+

---

## Environment Variables

### Frontend

File: `frontend/.env`

```env
VITE_API_URL=https://arali.onrender.com/api
```

---

## Live Deployment

- Frontend (Vercel): `https://arali-rho.vercel.app/`
- Backend (Render): `https://arali.onrender.com`
- Production API Base URL: `https://arali.onrender.com/api`

---

## Installation

From project root:

```bash
cd frontend && npm install
cd ../backend && npm install
```

---

## Run the Project

Use 2 terminals.

### 1) Start backend

```bash
cd backend
npm run dev
```

Backend runs at:

- API base URL: `http://localhost:5000/api`
- Swagger docs: `http://localhost:5000/api-docs`

### 2) Start frontend

```bash
cd frontend
npm run dev
```

Frontend runs at Vite local URL shown in terminal (usually `http://localhost:5173`).

---

## Build Commands

### Frontend build

```bash
cd frontend
npm run build
```

### Backend build

```bash
cd backend
npm run build
```

---

## API Endpoints

Base URL: `https://arali.onrender.com/api`

- `POST /customers`
- `GET /customers`
- `DELETE /customers/:id`

### Example: Create customer

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210"
}
```

Success response:

```json
{
  "success": true,
  "message": "Customer created successfully.",
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210"
  }
}
```

Error response shape:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

---

## Implemented Extras

- Black + silver theme in light and dark mode (default light)
- Error Boundary in frontend
- Toast notifications for add/delete failures and success
- Country code selector with full country list
- Table row hover effect
- Swagger/OpenAPI documentation with request/response/error examples

