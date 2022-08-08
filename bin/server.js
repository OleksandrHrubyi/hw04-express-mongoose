const app = require("../app");
const db = require("../model/db");

const PORT = process.env.PORT || 3000;

db.then(() => {
  try {
    app.listen(PORT, () => {
      console.log("Database connection successful", PORT);
    });
  } catch (err) {
    console.log("Server is not running");
  }
});
