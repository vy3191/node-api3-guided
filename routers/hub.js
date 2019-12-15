const express = require("express")
const messageRouter = require("./message")
const {validateHubId, validateHubData} = require("../middleware/validate");
const hubs = require("../hubs/hubs-model.js")

// Creates a new router, or "sub-application" within our app
// Routers can have their own endpoints, middleware, etc.
const router = express.Router()

// We can nest routers within routers, as deep as we want
router.use("/:id/messages", messageRouter)

// The endpoint is built off of the parent router's endpoint.
// So this endpoint is accessed at /api/hubs/:id
router.get("/", (req, res) => {
  const opts = {
    // These values all comes from the URL's query string
    // (everthing after the question mark)
    limit: req.query.limit,
    sortby: req.query.sortby,
    sortdir: req.query.sortdir,
  }

  hubs.find(opts)
    .then(hubs => {
      res.status(200).json(hubs)
    })
    .catch(error => {
      // console.log(error)
      // res.status(500).json({
      //   message: "Error retrieving the hubs",
      // })
      next(500);
    })
})

router.get("/:id", validateHubId(), (req, res) => {
   res.json(req.hub)
})

router.post("/",validateHubData(), (req, res) => {
  hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub)
    })
    .catch(error => {
      // console.log(error)
      // res.status(500).json({
      //   message: "Error adding the hub",
      // })
      next(500)
    })
})

router.put("/:id",validateHubData(),validateHubId(), (req, res) => {
   hubs.update(req.params.id, req.body)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub)
      } 
    })
    .catch(error => {
      // console.log(error)
      // res.status(500).json({
      //   message: "Error updating the hub",
      // })
      next(error);
    })
})

router.delete("/:id",validateHubId(), (req, res) => {
  hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The hub has been nuked" })
      } 
    })
    .catch(error => {
      // console.log(error)
      // res.status(500).json({
      //   message: "Error removing the hub",
      // })
      next(error);
    })
})

module.exports = router