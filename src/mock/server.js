const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/bets", (req, res) => {
  const db = router.db;
  const bets = db.get("bets");

  const newBet = req.body;
  bets.push(newBet).write();

  res.status(201).json({
    message: "Bet saved successfully",
    bet: newBet,
  });
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`json-server running on http://localhost:${PORT}`);
});
