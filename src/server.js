// import app from "./app/app.js";
import app from "./app/app.js";
import database from "./database/database.js";

const PORT = process.env.PORT || 7000;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/hackathon";

app.listen(PORT, () => {
  database(mongoURI);
  console.info(`API Server Started at Port: ${PORT}`);
});
