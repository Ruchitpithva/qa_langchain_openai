const express = require("express");
const cors = require("cors");
const qaRoute = require("./routes/qaRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", qaRoute);

app.use("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to question answer using langchain & openai." });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});