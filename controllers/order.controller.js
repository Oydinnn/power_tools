const db = require("../config/db.config");

// post Order
const createOrder = (req, res) => {
  const { client_id, shop_tool_id, order_date, period, total_price } = req.body;
  db.query(
    "INSERT INTO `order` ( client_id, shop_tool_id, order_date, period, total_price ) VALUES (?, ?, ?, ?, ?)",
    [ client_id, shop_tool_id, order_date, period, total_price ],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          errorMessage: error.message,
          message: "Error adding new Order",
          error: "Internal Server Error",
        });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New Order added",
        id: results.insertId,
      });
    }
  );
};
// get Order
const getOrder = (req, res) => {
  const getQuery = `SELECT * FROM 'order'`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  Order",
        error: "Internal Server Error",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "Order retrieved successfully",
      data: result,
    });
  });
};

//findByName
const findByName = (req, res) =>{
  const {name} = req.query;
  const searchPattern = `%${name}%`;
  
  const findByNameQuery = `SELECT * FROM 'order' WHERE name LIKE ?`;
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


// get one Order
const getOneOrder = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM 'order' WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one Order",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A Order not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a Order retrieved successfully",
      data: result[0],
    });
  });
};

// update Order
const updateOrder = (req, res) => {
  const id = req.params.id;
  const {  client_id, shop_tool_id, order_date, period, total_price  } = req.body;

  const updateQuery = "UPDATE `order` SET client_id =?, shop_tool_id =?, order_date =?, period =?, total_price = ? WHERE id = ?";

  db.query(updateQuery, [client_id, shop_tool_id, order_date, period, total_price, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating an Order",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "an Order updated successfully",
      data: result.affectedRows,
    });
  });
};

// delete Order
const deleteOrder = (req, res) => {
  const id = req.params.id;
  const deleteQuery = "DELETE FROM `order` where id = ?";
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one Order",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a Order deleted successfully",
      data: result.affectedRows,
    });
  });
};


module.exports = {
  createOrder,
  getOrder,
  findByName,
  getOneOrder,
  deleteOrder,
  updateOrder,
};
