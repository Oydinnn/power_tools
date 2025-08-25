const db = require("../config/db.config");

// post User
const createUser = (req, res) => {
  const { name, email, password, phone_number, is_active = false, role, address } = req.body;
  db.query(
    `INSERT INTO user (name, email, password, phone_number, is_active, role, address) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, password, phone_number, is_active, role, address],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          errorMessage: error.message,
          message: "Error adding new User",
          error: "Internal Server Error",
        });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New User added",
        id: results.insertId,
      });
    }
  );
};
// get User
const getUser = (req, res) => {
  const getQuery = `SELECT * FROM user`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  User",
        error: "Internal Server Error",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "User retrieved successfully",
      data: result,
    });
  });
};

//findByName
const findByName = (req, res) =>{
  const {name} = req.query;
  const searchPattern = `%${name}%`;
  
  const findByNameQuery = `SELECT * FROM user WHERE name LIKE ?`;
  db.query(findByNameQuery, 
    [searchPattern], 
    (error, result) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    res.json({
      statusCode: 200,
      message: "a find by name retrieved successfully",
      data: result,
    });
  });
};


// get one User
const getOneUser = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM user WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one User",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A User not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a User retrieved successfully",
      data: result[0],
    });
  });
};

// update User
const updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email, password, phone_number, is_active, role, address } = req.body;

  const updateQuery = `UPDATE user SET name = ?, email = ?, password = ?, phone_number = ?, is_active = ?, role = ?, address = ? WHERE id = ?`;

  db.query(updateQuery, [name, email, password, phone_number, is_active, role, address, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating an User",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "an User updated successfully",
      data: result.affectedRows,
    });
  });
};

// delete User
const deleteUser = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM user where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one User",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a User deleted successfully",
      data: result.affectedRows,
    });
  });
};


module.exports = {
  createUser,
  getUser,
  findByName,
  getOneUser,
  deleteUser,
  updateUser,
};
