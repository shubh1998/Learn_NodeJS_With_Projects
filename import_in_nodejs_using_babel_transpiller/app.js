import express from "express";
import sum from "./module"

const app = express();
const PORT = 3000 | process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server is running on ${PORT}`);
  } else {
    console.log(err);
  }
})

console.log(sum(1,2))