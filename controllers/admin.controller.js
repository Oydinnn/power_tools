const db = require("../config/db.config");

// post admin
const createAdmin = (req, res) => {
  const { full_name, email, password, phone_number, is_active = false, is_creator = false } = req.body;
  db.query(
    `INSERT INTO admin (full_name, email, password, phone_number, is_active, is_creator) VALUES (?, ?, ?, ?, ?, ?)`,
    [full_name, email, password, phone_number, is_active, is_creator],
    (error, results) => {
      if (error) {
        console.log(error);

        console.log("Yangi adminni qushishda xatolik");

        return res.status(500).json({
          message: error.message,
          message: "Error adding new admin",
          error: "Internal Server Error",
        });
      }
      console.log(results);
      res.status(201).json({
        statusCode: 201,
        message: "New admin added",
        id: results.insertId,
      });
    }
  );
};


module.exports = {
  createAdmin,
};
