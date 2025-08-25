const db = require("../config/db.config");

// post Shop
const createShop = (req, res) => {
  const { name, email, password, phone_number, is_active = false, role, address } = req.body;
  db.query(
    `INSERT INTO shop (name, phone_number, email, password,is_active, role, address) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, password, phone_number, is_active, role, address],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          errorMessage: error.message,
          message: "Error adding new Shop",
          error: "Internal Server Error",
        });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New Shop added",
        id: results.insertId,
      });
    }
  );
};
// get Shop
const getShop = (req, res) => {
  const getQuery = `SELECT * FROM shop`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  Shop",
        error: "Internal Server Error",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Shop retrieved successfully",
      data: result,
    });
  });
};

//findByName
const findByName = (req, res) =>{
  const {name} = req.query;
  const searchPattern = `%${name}%`;
  
  const findByNameQuery = `SELECT * FROM shop WHERE name LIKE ?`;
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


// get one Shop
const getOneShop = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM shop WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one Shop",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A Shop not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a Shop retrieved successfully",
      data: result[0],
    });
  });
};

// update Shop
const updateShop = (req, res) => {
  const id = req.params.id;
  const { name, email, password, phone_number, is_active, role, address } = req.body;

  const updateQuery = `UPDATE shop SET name = ?, email = ?, password = ?, phone_number = ?, is_active = ?, role = ?, address = ? WHERE id = ?`;

  db.query(updateQuery, [name, email, password, phone_number, is_active, role, address, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating an Shop",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "an Shop updated successfully",
      data: result.affectedRows,
    });
  });
};

// delete Shop
const deleteShop = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM shop where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one Shop",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a Shop deleted successfully",
      data: result.affectedRows,
    });
  });
};


module.exports = {
  createShop,
  getShop,
  findByName,
  getOneShop,
  deleteShop,
  updateShop,
};
