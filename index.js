const express = require("express");
const helmet = require("helmet");
const db = require("./data/dbConfig");
const server = express();

server.use(express.json());
server.use(helmet());

// getAll
server.get("/zoos", (req, res) => {
  db("zoos")
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// getById
server.get("/zoos/:id", (req, res) => {
  const id = req.params.id;
  db("zoos")
    .where({ id })
    .first()
    .then(ids => {
      if (ids) {
        res.status(200).json(ids);
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// post
server.post("/zoos/", (req, res) => {
  const body = req.body;
  db("zoos")
    .insert(body)
    .then(zoo => {
      res.status(201).json(zoo);
    })
    .catch(err => {
      res.status(500).json({ error: err, message: "you need a name" });
    });
});

// update
server.put("/zoos/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  db("zoos")
    .where({ id })
    .update(body)
    .then(ids => {
      if (ids) {
        res.status(200).json(ids);
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
// delete
server.delete("/zoos/:id", (req, res) => {
  const id = req.params.id;
  db("zoos")
    .where({ id })
    .del(id)
    .then(ids => {
      if (ids) {
        res.status(200).json(ids);
      } else {
        res.status(404).json({ message: "id not found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
