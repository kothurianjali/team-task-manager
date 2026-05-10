const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, (req, res) => {
    const { title, status, dueDate, assignedTo, projectId } = req.body;

    db.run(
        `INSERT INTO tasks(title,status,dueDate,assignedTo,projectId)
        VALUES(?,?,?,?,?)`,
        [title, status, dueDate, assignedTo, projectId],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Task Created' });
        }
    );
});

router.get('/', auth, (req, res) => {
    db.all(`SELECT * FROM tasks`, [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

router.patch('/:id/status', auth, (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }

    const { id } = req.params;
    const { status } = req.body;

    db.run(
        `UPDATE tasks SET status = ? WHERE id = ?`,
        [status, id],
        function (err) {
            if (err) return res.status(500).json(err);
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json({ message: 'Task status updated' });
        }
    );
});

module.exports = router;