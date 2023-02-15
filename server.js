const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("strictQuery", false);

const { DB_HOST, PORT = 3000 } = process.env;

(async function main() {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();