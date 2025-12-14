const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const todosRouter = require("./routes/todos");
const path = require('path');

app.use(express.json());
app.use("/todos", todosRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
