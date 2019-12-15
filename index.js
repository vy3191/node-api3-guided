const express = require("express");
const helmet = require("helmet");
const agent = require("./middleware/agent");
const morgan = require("morgan");
const hubRouter = require("./routers/hub");
const welcomeRouter = require("./routers/welcome");
const logger = require("./middleware/logger");

const server = express();

//Third-party middleware from NPM.
server.use(helmet());
server.use(morgan('tiny'));
//Custom middleware.
server.use(agent("insomnia"));
server.use(logger());
//Build-in middleware.
server.use(express.json())
// Bring all our subroutes into the main application
// (Remember, subroutes can have more children routers)
server.use("/", welcomeRouter);
server.use("/api/hubs", hubRouter);
server.use((req,res) => {
   res.status(404).json({
      message: "Route is not found"
   })
});

server.use((err,req,res,next) => {
   console.log(err);
   res.status(500).json({
      message:"An internal error occured",
   })
})

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n")
})
