const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error" });
  }
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });

  try {
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error" });
  }
});

router.patch("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      "UPDATE todos SET completed = $1 WHERE id = $2 RETURNING *",
      [completed, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "DB error" });
  }
});

module.exports = router;
