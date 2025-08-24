const db = require("../config/db.config");

// post district
const createDistrict = (req, res) => {
  const { name } = req.body;
  db.query(
    `INSERT INTO district (name) VALUES (?)`,
    [name],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          errorMessage: error.message,
          message: "Error adding new district",
          error: "Internal Server Error",
        });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New district added",
        id: results.insertId,
      });
    }
  );
};
// get district
const getDistrict = (req, res) => {
  const getQuery = `SELECT * FROM district`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  district",
        error: "Internal Server Error",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "district retrieved successfully",
      data: result,
    });
  });
};

//findByName
const findByName = (req, res) =>{
  const {name} = req.query;
  const searchPattern = `%${name}%`;
  
  const findByNameQuery = `SELECT * FROM district WHERE name LIKE ?`;
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
      message: "find by name retrieved successfully",
      data: result[0],
    });
  });
};


// get one district
const getOneDistrict = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM district WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting a district",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A district not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a district retrieved successfully",
      data: result[0],
    });
  });
};

// update district
const updateDistrict = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const updateQuery = `UPDATE district SET name = ? WHERE id = ?`;

  db.query(updateQuery, [name, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating a district",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a district updated successfully",
      data: result.affectedRows,
    });
  });
};

// delete district
const deleteDistrict = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM district where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one district",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a district deleted successfully",
      data: result.affectedRows,
    });
  });
};

module.exports = {
  createDistrict,
  getDistrict,
  findByName,
  getOneDistrict,
  deleteDistrict,
  updateDistrict,
};
