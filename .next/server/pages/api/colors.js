"use strict";
(() => {
var exports = {};
exports.id = 132;
exports.ids = [132];
exports.modules = {

/***/ 2418:
/***/ ((module) => {

module.exports = require("mysql2/promise");

/***/ }),

/***/ 3146:
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
        const [rows] = await connection.execute("SELECT color_id, color_name, color_code, is_action FROM color WHERE is_action = 1");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({
            message: "Failed to load colors",
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
var __webpack_exports__ = (__webpack_exec__(3146));
module.exports = __webpack_exports__;

})();