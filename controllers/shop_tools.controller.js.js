const db = require("../config/db.config");

// post ShopTool
const createShopTool = (req, res) => {
  const { shop_id, tool_id, rent_price} = req.body;
  db.query(
    `INSERT INTO shop_tool (shop_id, tool_id, rent_price) VALUES (?, ?, ?)`,
    [shop_id, tool_id, rent_price],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          errorMessage: error.message,
          message: "Error adding new ShopTool",
          error: "Internal Server Error",
        });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New ShopTool added",
        id: results.insertId,
      });
    }
  );
};
// get ShopTool
const getShopTool = (req, res) => {
  const getQuery = `SELECT * FROM shop_tool`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  ShopTool",
        error: "Internal Server Error",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "ShopTool retrieved successfully",
      data: result,
    });
  });
};

//findByPrice
const findByPrice = (req, res) =>{
  const {rent_price} = req.query;
  const searchPattern = `%${rent_price}%`;
  
  const findByNameQuery = `SELECT * FROM shop_tool WHERE rent_price LIKE ?`;
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
      message: "a find by rent_price retrieved successfully",
      data: result,
    });
  });
};


// get one ShopTool
const getOneShopTool = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM shop_tool WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one ShopTool",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A ShopTool not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a ShopTool retrieved successfully",
      data: result[0],
    });
  });
};

// update ShopTool
const updateShopTool = (req, res) => {
  const id = req.params.id;
  const { shop_id, tool_id, rent_price } = req.body;

  const updateQuery = `UPDATE shop_tool SET shop_id=?, tool_id=?, rent_price = ? WHERE id = ?`;

  db.query(updateQuery, [shop_id, tool_id, rent_price, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating an ShopTool",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "an ShopTool updated successfully",
      data: result.affectedRows,
    });
  });
};

// delete ShopTool
const deleteShopTool = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM shop_tool where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one ShopTool",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a ShopTool deleted successfully",
      data: result.affectedRows,
    });
  });
};


module.exports = {
  createShopTool,
  getShopTool,
  findByPrice,
  getOneShopTool,
  deleteShopTool,
  updateShopTool,
};
