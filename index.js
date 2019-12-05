const express = require("express")
const hubs = require("./hubs/hubs-model.js")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
  res.send("<h2>Welcome to the Lambda Hubs API</h>")
})

server.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Hubs API" })
})

server.get("/api/hubs", (req, res) => {
  hubs.find()
    .then(hubs => {
      res.status(200).json(hubs)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the hubs",
      })
    })
})

server.get("/api/hubs/:id", (req, res) => {
  hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub)
      } else {
        res.status(404).json({ message: "Hub not found" })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving the hub",
      })
    })
})

server.post("/api/hubs", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Missing hub name" })
  }

  hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error adding the hub",
      })
    })
})

server.put("/api/hubs/:id", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Missing hub name" })
  }

  hubs.update(req.params.id, req.body)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub)
      } else {
        res.status(404).json({ message: "The hub could not be found" })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error updating the hub",
      })
    })
})

server.delete("/api/hubs/:id", (req, res) => {
  hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The hub has been nuked" })
      } else {
        res.status(404).json({ message: "The hub could not be found" })
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error removing the hub",
      })
    })
})

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n")
})
