const db = require("../config/db.config");

// post Tool
const createTool = (req, res) => {
  const { name, brand, description, tool_price } = req.body;
  db.query(
    `INSERT INTO Tool ( name, brand, description, tool_price ) VALUES (?, ?, ?, ?)`,
    [ name, brand, description, tool_price ],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: error.message,
          message: "Error adding new Tool",
          error: "Internal Server Error",
        });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New Tool added",
        id: results.insertId,
      });
    }
  );
};
// get Tool
const getTool = (req, res) => {
  const getQuery = `SELECT * FROM tool`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  Tool",
        error: "Internal Server Error",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Tool retrieved successfully",
      data: result,
    });
  });
};

//findByName
const findByName = (req, res) =>{
  const {name} = req.query;
  const searchPattern = `%${name}%`;
  
  const findByNameQuery = `SELECT * FROM tool WHERE name LIKE ?`;
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
      data: result[0],
    });
  });
};


// get one Tool
const getOneTool = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM tool WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one Tool",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A Tool not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a Tool retrieved successfully",
      data: result[0],
    });
  });
};

// update Tool
const updateTool = (req, res) => {
  const id = req.params.id;
  const { name, brand, description, tool_price  } = req.body;

  const updateQuery = `UPDATE tool SET  name = ?, brand = ?, description = ?, tool_price = ? WHERE id = ?`;

  db.query(updateQuery, [ name, brand, description, tool_price , id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating an Tool",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "an Tool updated successfully",
      data: result.affectedRows,
    });
  });
};

// delete Tool
const deleteTool = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM tool where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one Tool",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a Tool deleted successfully",
      data: result.affectedRows,
    });
  });
};

module.exports = {
  createTool,
  getTool,
  findByName,
  getOneTool,
  deleteTool,
  updateTool,
};
