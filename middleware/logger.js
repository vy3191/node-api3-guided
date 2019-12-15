module.exports =() => (req,res, next) => {
   console.log(`Line2 logger ${req.ip} - ${req.protocol} - ${req.method} - ${req.url} - ${req.get("User-Agent")}`);
   next();
}