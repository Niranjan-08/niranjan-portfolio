const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "db.json");

async function readDB() {
  try {
    const content = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(content);
  } catch (err) {
    return { notes: [] };
  }
}

async function writeDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}

// List notes
app.get("/api/notes", async (req, res) => {
  const db = await readDB();
  // Optionally support query params for search / tag later
  res.json(db.notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)));
});

// Get single note
app.get("/api/notes/:id", async (req, res) => {
  const db = await readDB();
  const note = db.notes.find((n) => n.id === req.params.id);
  if (!note) return res.status(404).json({ error: "Not found" });
  res.json(note);
});

// Create
app.post("/api/notes", async (req, res) => {
  const { title = "", content = "" } = req.body;
  const db = await readDB();
  const newNote = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  db.notes.push(newNote);
  await writeDB(db);
  res.status(201).json(newNote);
});

// Update
app.put("/api/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const db = await readDB();
  const idx = db.notes.findIndex((n) => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });

  db.notes[idx] = {
    ...db.notes[idx],
    title: title !== undefined ? title : db.notes[idx].title,
    content: content !== undefined ? content : db.notes[idx].content,
    updatedAt: new Date().toISOString()
  };

  await writeDB(db);
  res.json(db.notes[idx]);
});

// Delete
app.delete("/api/notes/:id", async (req, res) => {
  const db = await readDB();
  const idx = db.notes.findIndex((n) => n.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const removed = db.notes.splice(idx, 1)[0];
  await writeDB(db);
  res.json(removed);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});