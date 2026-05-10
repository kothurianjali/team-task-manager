const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/taskmanager.db');
// Users Table
db.serialize(() => {
db.run(`
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
email TEXT UNIQUE,
password TEXT,
role TEXT
)
`);
db.run(`
CREATE TABLE IF NOT EXISTS projects (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT,
description TEXT,
createdBy INTEGER
)
`);
db.run(`
CREATE TABLE IF NOT EXISTS tasks (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT,
status TEXT,
dueDate TEXT,
assignedTo INTEGER,
projectId INTEGER
)
`);
});
module.exports = db;