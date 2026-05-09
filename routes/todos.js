const express = require('express');
const router = express.Router();
const AppError = require('../errors/AppError');
const catchAsync = require('../utils/catchAsync');

let todos = [
    { id: 1, title: 'Learn Node.js', completed: true },
    { id: 2, title: 'Learn Express', completed: true },
    { id: 3, title: 'Build an API', completed: false },
];
let nextId = 4; // simple id counter

// ─── GET /api/todos ──────────────────────────────────────────────────────────────
// Returns all todos. Optional query: ?completed=true or ?completed=false
router.get('/', catchAsync(async (req, res) => {
    const { completed } = req.query;

    let results = [...todos];

    // Filter by completed status if query param is provided
    if (completed !== undefined) {
        const isDone = completed === 'true'; // query strings are always strings
        results = results.filter(t => t.completed === isDone);
    }

    res.status(200).json({
        status: 'success',
        count: results.length,
        data: results,
    });
}));

// ─── GET /api/todos/:id ───────────────────────────────────────────────
// Returns a single todo by id
router.get('/:id', catchAsync(async (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        throw new AppError('Todo not found', 404);
    }

    res.status(200).json({
        status: 'success',
        data: todo,
    });
}));

// ─── POST /api/todos ───────────────────────────────────────────────────
// Creates a new todo - requires { title } in request body
router.post('/', catchAsync(async (req, res) => {
    const { title } = req.body;

    // Validation - title is required
    if (!title || title.trim() === '') {
        throw new AppError('Title is required', 400);
    }

    const newTodo = {
        id: nextId++,
        title: title.trim(),
        completed: false,   // always starts as not completed
    };
    
    todos.push(newTodo);

    res.status(201).json({
        status: 'success',
        data: newTodo,
    });
}));

// ─── PUT /api/todos/:id ───────────────────────────────────────────────
//Updates a todo - accepts { title } and /or { completed }
router.put('/:id', catchAsync (async (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        throw new AppError('Todo not found', 404);
    }

    const { title, completed } = req.body;

    // Only update fields that were actually sent
    if (title !== undefined) {
        if (title.trim() === '') {
            throw new AppError('Title cannot be empty', 400);
        }
        todos[index].title = title.trim();
    }

    if (completed !== undefined) {
        if (typeof completed !== 'boolean') {
            throw new AppError('Completed must be true or false', 400);
        }
        todos[index].completed = completed;
    }

    res.status(200).json({
        status: 'success',
        data: todos[index],
    });
}));

// ─── DELETE /api/todos/:id ─────────────────────────────────────────────
// Deletes a todo permanently
router.delete('/:id', catchAsync(async (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        throw new AppError('Todo not found', 404);
    }

    todos.splice(index, 1);  // remove 1 item at this index

    res.status(204).send();  // 204 = success with no content to return
}));

module.exports = router;