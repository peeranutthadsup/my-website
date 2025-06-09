"use strict";
(() => {
var exports = {};
exports.id = 221;
exports.ids = [221];
exports.modules = {

/***/ 2418:
/***/ ((module) => {

module.exports = require("mysql2/promise");

/***/ }),

/***/ 3590:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2418);
/* harmony import */ var mysql2_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mysql2_promise__WEBPACK_IMPORTED_MODULE_0__);

async function handler(req, res) {
    const connection = await mysql2_promise__WEBPACK_IMPORTED_MODULE_0___default().createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "SellerShopee"
    });
    try {
        if (req.method === "GET") {
            const { id } = req.query;
            if (id) {
                const [rows] = await connection.execute(`SELECT 
            p.product_id,
            p.product_key,
            p.product_name,
            p.product_category_id,
            pc.product_category_name,
            p.color_id,
            c.color_name,
            p.qty,
            p.stock,
            p.purchase_price,
            p.lot,
            p.shipping_cost_piece,
            p.total_cost_including_shipping,
            p.sell_price_1,
            p.sell_price_2,
            p.sell_price_3,
            p.product_status,
            p.is_shopee,
            p.is_lazada
          FROM product p
          LEFT JOIN color c ON c.color_id = p.color_id
          LEFT JOIN product_category pc ON pc.product_category_id = p.product_category_id
          WHERE p.product_id = ?`, [
                    id
                ]);
                if (rows.length === 0) {
                    res.status(404).json({
                        message: "Product not found"
                    });
                    return;
                }
                res.status(200).json(rows[0]);
            } else {
                // Get all products
                const [rows] = await connection.execute(`SELECT 
            p.product_id,
            p.product_key,
            p.product_name,
            p.product_category_id,
            pc.product_category_name,
            p.color_id,
            c.color_name,
            p.qty,
            p.stock,
            p.purchase_price,
            p.lot,
            p.shipping_cost_piece,
            p.total_cost_including_shipping,
            p.sell_price_1,
            p.sell_price_2,
            p.sell_price_3,
            p.product_status,
            p.is_shopee,
            p.is_lazada
          FROM product p
          LEFT JOIN color c ON c.color_id = p.color_id
          LEFT JOIN product_category pc ON pc.product_category_id = p.product_category_id`);
                res.status(200).json(rows);
            }
        } else if (req.method === "POST") {
            const { product_key, product_name, product_category_id, color_id, qty, stock, purchase_price, lot, shipping_cost_piece, total_cost_including_shipping, sell_price_1, sell_price_2, sell_price_3, product_status, is_shopee, is_lazada } = req.body;
            // Validate required fields here if needed
            const [result] = await connection.execute(`INSERT INTO product 
          (product_key, product_name, product_category_id, color_id, qty, stock, purchase_price, lot, shipping_cost_piece, total_cost_including_shipping, sell_price_1, sell_price_2, sell_price_3, product_status,is_shopee,is_lazada)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`, [
                product_key,
                product_name,
                product_category_id,
                color_id,
                qty,
                stock,
                purchase_price,
                lot,
                shipping_cost_piece,
                total_cost_including_shipping,
                sell_price_1,
                sell_price_2,
                sell_price_3,
                product_status,
                is_shopee,
                is_lazada
            ]);
            res.status(201).json({
                message: "Product added",
                product_id: result.insertId
            });
        } else if (req.method === "PUT") {
            let { id } = req.query;
            console.log("PUT request id from query:", id);
            console.log("PUT request body:", req.body);
            if (!id) {
                res.status(400).json({
                    message: "Product ID is required"
                });
                return;
            }
            // Convert id to number (if possible)
            id = Number(id);
            if (isNaN(id)) {
                res.status(400).json({
                    message: "Invalid Product ID"
                });
                return;
            }
            const { product_key, product_name, product_category_id, color_id, qty, stock, purchase_price, lot, shipping_cost_piece, total_cost_including_shipping, sell_price_1, sell_price_2, sell_price_3, product_status, is_shopee, is_lazada } = req.body;
            const [result] = await connection.execute(`UPDATE product SET
          product_key = ?,
          product_name = ?,
          product_category_id = ?,
          color_id = ?,
          qty = ?,
          stock = ?,
          purchase_price = ?,
          lot = ?,
          shipping_cost_piece = ?,
          total_cost_including_shipping = ?,
          sell_price_1 = ?,
          sell_price_2 = ?,
          sell_price_3 = ?,
          product_status = ?,
          is_shopee = ?,
          is_lazada = ?
         WHERE product_id = ?`, [
                product_key,
                product_name,
                product_category_id,
                color_id,
                qty,
                stock,
                purchase_price,
                lot,
                shipping_cost_piece,
                total_cost_including_shipping,
                sell_price_1,
                sell_price_2,
                sell_price_3,
                product_status,
                is_shopee,
                is_lazada,
                id
            ]);
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "Product not found"
                });
            } else {
                res.status(200).json({
                    message: "Product updated"
                });
            }
        } else if (req.method === "DELETE") {
            let { id } = req.query;
            if (!id) {
                res.status(400).json({
                    message: "Product ID is required"
                });
                return;
            }
            // Convert id to number
            id = Number(id);
            if (isNaN(id)) {
                res.status(400).json({
                    message: "Invalid Product ID"
                });
                return;
            }
            const [result] = await connection.execute(`DELETE FROM product WHERE product_id = ?`, [
                id
            ]);
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "Product not found"
                });
            } else {
                res.status(200).json({
                    message: "Product deleted"
                });
            }
        } else {
            res.setHeader("Allow", [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ]);
            res.status(405).json({
                message: `Method ${req.method} Not Allowed`
            });
        }
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    } finally{
        await connection.end();
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3590));
module.exports = __webpack_exports__;

})();