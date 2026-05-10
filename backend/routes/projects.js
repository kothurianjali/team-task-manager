const express = require('express');
const router = express.Router();
const db = require('../database');
const auth = require('../middleware/authMiddleware');
router.post('/', auth, (req, res) => {
const { title, description } = req.body;
db.run(
`INSERT INTO projects(title,description,createdBy) VALUES(?,?,?)`,
[title, description, req.user.id],
function (err) {
if (err) return res.status(500).json(err);
res.json({ message: 'Project Created' });
}
);
});
router.get('/', auth, (req, res) => {
db.all(`SELECT * FROM projects`, [], (err, rows) => {
res.json(rows);
});
});
module.exports = router;