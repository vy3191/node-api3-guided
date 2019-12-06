const express = require("express")
const hubRouter = require("./routers/hub")
const welcomeRouter = require("./routers/welcome")

const server = express()

server.use(express.json())
// Bring all our subroutes into the main application
// (Remember, subroutes can have more children routers)
server.use("/", welcomeRouter)
server.use("/api/hubs", hubRouter)

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n")
})
