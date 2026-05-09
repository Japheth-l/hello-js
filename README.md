# Todos REST API

A RESTful API built with Node.js and Express for managing todos.

## Tech Stack
- Node.js
- Express.js
- Morgan (request logging)

## Getting Started

### Prerequisites
- Node.js v18+

### Installation

```bash
git clone https://github.com/Japheth-l/hello-js.git
cd hello-js
npm install
```

### Setup
Create a `.env` file in the root folder:
```
PORT=3000
NODE_ENV=development
```

### Run the server
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todos | Get all todos |
| GET | /api/todos/:id | Get a single todo |
| POST | /api/todos | Create a new todo |
| PUT | /api/todos/:id | Update a todo |
| DELETE | /api/todos/:id | Delete a todo |

### Query Parameters
- `GET /api/todos?completed=true` — returns only completed todos
- `GET /api/todos?completed=false` — returns only incomplete todos

### Example Request
```bash
POST /api/todos
Content-Type: application/json

{
  "title": "Learn Node.js"
}
```

### Example Response
```json
{
  "status": "success",
  "data": {
    "id": 4,
    "title": "Learn Node.js",
    "completed": false
  }
}
```