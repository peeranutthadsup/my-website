"use strict";
exports.id = 360;
exports.ids = [360];
exports.modules = {

/***/ 4360:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);



class ProductForm extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {
    constructor(props){
        super(props);
        this.handleChange = (e)=>{
            const { name, value } = e.target;
            this.setState((state)=>{
                const validationErrors = {
                    ...state.validationErrors
                };
                if (value.trim() !== "") {
                    delete validationErrors[name];
                }
                return {
                    form: {
                        ...state.form,
                        [name]: String(value)
                    },
                    validationErrors
                };
            });
        };
        this.handleSubmit = async (e)=>{
            e.preventDefault();
            this.setState({
                loading: true,
                error: ""
            });
            const validationErrors = this.validateForm();
            if (Object.keys(validationErrors).length > 0) {
                this.setState({
                    validationErrors,
                    loading: false
                });
                return;
            }
            try {
                const { router } = this.props;
                const { form, productId } = this.state;
                const method = productId ? "PUT" : "POST";
                const url = productId ? `/api/products?id=${productId}` : "/api/products";
                const res = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.message || "Failed to save product");
                }
                alert(productId ? "แก้ไขสินค้าเรียบร้อย" : "เพิ่มสินค้าเรียบร้อย");
                router.push("/ProductList");
            } catch (err) {
                this.setState({
                    error: err.message
                });
            } finally{
                this.setState({
                    loading: false
                });
            }
        };
        const productId = props.router?.query?.id || null;
        this.state = {
            productId,
            form: {
                product_key: "",
                product_name: "",
                product_category_id: "",
                color_id: "",
                qty: "",
                stock: "",
                purchase_price: "",
                lot: "",
                shipping_cost_piece: "",
                total_cost_including_shipping: "",
                sell_price_1: "",
                sell_price_2: "",
                sell_price_3: "",
                product_status: "",
                is_shopee: "",
                is_lazada: ""
            },
            colors: [],
            categories: [],
            loading: false,
            error: "",
            validationErrors: {}
        };
    }
    componentDidMount() {
        this.loadColors();
        this.loadCategories();
        if (this.state.productId) {
            this.loadProduct(this.state.productId);
        }
    }
    componentDidUpdate(prevProps) {
        const prevId = prevProps.router?.query?.id || null;
        const currentId = this.props.router?.query?.id || null;
        if (currentId !== prevId) {
            this.setState({
                productId: currentId
            }, ()=>{
                if (currentId) {
                    this.loadProduct(currentId);
                } else {
                    this.setState({
                        form: {
                            product_key: "",
                            product_name: "",
                            product_category_id: "",
                            color_id: "",
                            qty: "",
                            stock: "",
                            purchase_price: "",
                            lot: "",
                            shipping_cost_piece: "",
                            total_cost_including_shipping: "",
                            sell_price_1: "",
                            sell_price_2: "",
                            sell_price_3: "",
                            product_status: "",
                            is_shopee: "",
                            is_lazada: ""
                        },
                        error: "",
                        validationErrors: {}
                    });
                }
            });
        }
    }
    loadColors() {
        fetch("/api/colors").then((res)=>{
            if (!res.ok) throw new Error(`Failed to fetch colors: ${res.status}`);
            return res.json();
        }).then((data)=>{
            console.log("Colors loaded:", data);
            this.setState({
                colors: data
            });
        }).catch((err)=>{
            console.error("Error loading colors:", err);
            this.setState({
                colors: []
            });
        });
    }
    loadCategories() {
        console.log("Calling loadCategories()...");
        fetch("/api/product_categories").then((res)=>{
            if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
            return res.json();
        }).then((data)=>{
            console.log("Categories loaded:", data);
            this.setState({
                categories: data
            });
        }).catch((err)=>{
            console.error("Error loading categories:", err);
            this.setState({
                categories: []
            });
        });
    }
    loadProduct(productId) {
        this.setState({
            loading: true,
            error: ""
        });
        fetch(`/api/products?id=${productId}`).then((res)=>{
            if (!res.ok) throw new Error("Failed to load product data");
            return res.json();
        }).then((data)=>{
            this.setState({
                form: {
                    product_key: data.product_key || "",
                    product_name: data.product_name || "",
                    product_category_id: data.product_category_id ? String(data.product_category_id) : "",
                    color_id: data.color_id ? String(data.color_id) : "",
                    qty: data.qty || "",
                    stock: data.stock || "",
                    purchase_price: data.purchase_price || "",
                    lot: data.lot || "",
                    shipping_cost_piece: data.shipping_cost_piece || "",
                    total_cost_including_shipping: data.total_cost_including_shipping || "",
                    sell_price_1: data.sell_price_1 || "",
                    sell_price_2: data.sell_price_2 || "",
                    sell_price_3: data.sell_price_3 || "",
                    product_status: data.product_status || "",
                    is_shopee: data.is_shopee !== undefined && data.is_shopee !== null ? String(data.is_shopee) : "",
                    is_lazada: data.is_lazada !== undefined && data.is_lazada !== null ? String(data.is_lazada) : ""
                },
                loading: false,
                validationErrors: {}
            });
        }).catch((err)=>this.setState({
                error: err.message,
                loading: false
            }));
    }
    validateForm() {
        const { form } = this.state;
        const validationErrors = {};
        const requiredFields = [
            "product_key",
            "product_name",
            "product_category_id",
            "color_id",
            "qty",
            "stock",
            "purchase_price",
            "lot",
            "shipping_cost_piece",
            "total_cost_including_shipping",
            "sell_price_1",
            "sell_price_2",
            "sell_price_3",
            "product_status",
            "is_shopee",
            "is_lazada"
        ];
        const fieldLabels = {
            product_key: "รหัสสินค้า",
            product_name: "ชื่อสินค้า",
            product_category_id: "ประเภทสินค้า",
            color_id: "สี",
            qty: "จำนวน",
            stock: "สต็อก",
            purchase_price: "ราคาซื้อ",
            lot: "ล็อต",
            shipping_cost_piece: "ค่าขนส่งต่อชิ้น",
            total_cost_including_shipping: "ราคารวมค่าขนส่ง",
            sell_price_1: "ราคาขาย 1",
            sell_price_2: "ราคาขาย 2",
            sell_price_3: "ราคาขาย 3",
            product_status: "สถานะสินค้า",
            is_shopee: "Shopee",
            is_lazada: "Lazada"
        };
        requiredFields.forEach((field)=>{
            if (form[field] === "" || form[field] === null || typeof form[field] === "string" && form[field].trim() === "") {
                validationErrors[field] = `กรุณากรอก${fieldLabels[field]}`;
            }
        });
        return validationErrors;
    }
    render() {
        const { form, colors, categories, loading, error, validationErrors, productId } = this.state;
        if (loading) return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: "Loading..."
        });
        const renderLabel = (text, fieldName)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
                htmlFor: fieldName,
                className: "form-label",
                children: [
                    text,
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        style: {
                            color: "red"
                        },
                        children: "*"
                    })
                ]
            });
        return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "container py-3",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                    children: productId ? "แก้ไขสินค้า" : "เพิ่มสินค้าใหม่"
                }),
                error && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "alert alert-danger",
                    children: error
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                    onSubmit: this.handleSubmit,
                    noValidate: true,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("รหัสสินค้า", "product_key"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "text",
                                    id: "product_key",
                                    name: "product_key",
                                    className: `form-control ${validationErrors.product_key ? "is-invalid" : ""}`,
                                    value: form.product_key,
                                    onChange: this.handleChange,
                                    required: true
                                }),
                                validationErrors.product_key && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.product_key
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ชื่อสินค้า", "product_name"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "text",
                                    id: "product_name",
                                    name: "product_name",
                                    className: `form-control ${validationErrors.product_name ? "is-invalid" : ""}`,
                                    value: form.product_name,
                                    onChange: this.handleChange,
                                    required: true
                                }),
                                validationErrors.product_name && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.product_name
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ประเภทสินค้า", "product_category_id"),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                    id: "product_category_id",
                                    name: "product_category_id",
                                    className: `form-select ${validationErrors.product_category_id ? "is-invalid" : ""}`,
                                    value: form.product_category_id,
                                    onChange: this.handleChange,
                                    required: true,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "",
                                            children: "-- เลือกประเภทสินค้า --"
                                        }),
                                        categories.map((cat)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: String(cat.product_category_id),
                                                children: cat.product_category_name
                                            }, cat.product_category_id))
                                    ]
                                }),
                                validationErrors.product_category_id && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.product_category_id
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("สี", "color_id"),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                    id: "color_id",
                                    name: "color_id",
                                    className: `form-select ${validationErrors.color_id ? "is-invalid" : ""}`,
                                    value: form.color_id,
                                    onChange: this.handleChange,
                                    required: true,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "",
                                            children: "-- เลือกสี --"
                                        }),
                                        colors.map((color)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                                value: String(color.color_id),
                                                children: color.color_name
                                            }, color.color_id))
                                    ]
                                }),
                                validationErrors.color_id && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.color_id
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("จำนวน", "qty"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "number",
                                    id: "qty",
                                    name: "qty",
                                    className: `form-control ${validationErrors.qty ? "is-invalid" : ""}`,
                                    value: form.qty,
                                    onChange: this.handleChange,
                                    required: true,
                                    min: 0
                                }),
                                validationErrors.qty && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.qty
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("สต็อก", "stock"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "number",
                                    id: "stock",
                                    name: "stock",
                                    className: `form-control ${validationErrors.stock ? "is-invalid" : ""}`,
                                    value: form.stock,
                                    onChange: this.handleChange,
                                    required: true,
                                    min: 0
                                }),
                                validationErrors.stock && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.stock
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ราคาซื้อ", "purchase_price"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "number",
                                    id: "purchase_price",
                                    name: "purchase_price",
                                    className: `form-control ${validationErrors.purchase_price ? "is-invalid" : ""}`,
                                    value: form.purchase_price,
                                    onChange: this.handleChange,
                                    required: true,
                                    min: 0,
                                    step: "0.01"
                                }),
                                validationErrors.purchase_price && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.purchase_price
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ล็อต", "lot"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "text",
                                    id: "lot",
                                    name: "lot",
                                    className: `form-control ${validationErrors.lot ? "is-invalid" : ""}`,
                                    value: form.lot,
                                    onChange: this.handleChange,
                                    required: true
                                }),
                                validationErrors.lot && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.lot
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ค่าขนส่งต่อชิ้น", "shipping_cost_piece"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "number",
                                    id: "shipping_cost_piece",
                                    name: "shipping_cost_piece",
                                    className: `form-control ${validationErrors.shipping_cost_piece ? "is-invalid" : ""}`,
                                    value: form.shipping_cost_piece,
                                    onChange: this.handleChange,
                                    required: true,
                                    min: 0,
                                    step: "0.01"
                                }),
                                validationErrors.shipping_cost_piece && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.shipping_cost_piece
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ราคารวมค่าขนส่ง", "total_cost_including_shipping"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "number",
                                    id: "total_cost_including_shipping",
                                    name: "total_cost_including_shipping",
                                    className: `form-control ${validationErrors.total_cost_including_shipping ? "is-invalid" : ""}`,
                                    value: form.total_cost_including_shipping,
                                    onChange: this.handleChange,
                                    required: true,
                                    min: 0,
                                    step: "0.01"
                                }),
                                validationErrors.total_cost_including_shipping && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.total_cost_including_shipping
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ราคาขาย 1", "sell_price_1"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "number",
                                    id: "sell_price_1",
                                    name: "sell_price_1",
                                    className: `form-control ${validationErrors.sell_price_1 ? "is-invalid" : ""}`,
                                    value: form.sell_price_1,
                                    onChange: this.handleChange,
                                    required: true,
                                    min: 0,
                                    step: "0.01"
                                }),
                                validationErrors.sell_price_1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.sell_price_1
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ราคาขาย 2", "sell_price_2"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "number",
                                    id: "sell_price_2",
                                    name: "sell_price_2",
                                    className: `form-control ${validationErrors.sell_price_2 ? "is-invalid" : ""}`,
                                    value: form.sell_price_2,
                                    onChange: this.handleChange,
                                    required: true,
                                    min: 0,
                                    step: "0.01"
                                }),
                                validationErrors.sell_price_2 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.sell_price_2
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("ราคาขาย 3", "sell_price_3"),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                    type: "number",
                                    id: "sell_price_3",
                                    name: "sell_price_3",
                                    className: `form-control ${validationErrors.sell_price_3 ? "is-invalid" : ""}`,
                                    value: form.sell_price_3,
                                    onChange: this.handleChange,
                                    required: true,
                                    min: 0,
                                    step: "0.01"
                                }),
                                validationErrors.sell_price_3 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.sell_price_3
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("สถานะสินค้า", "product_status"),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                    id: "product_status",
                                    name: "product_status",
                                    className: `form-select ${validationErrors.product_status ? "is-invalid" : ""}`,
                                    value: form.product_status,
                                    onChange: this.handleChange,
                                    required: true,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "",
                                            children: "-- เลือกสถานะสินค้า --"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "available",
                                            children: "พร้อมขาย"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "out_of_stock",
                                            children: "หมดสต็อก"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "discontinued",
                                            children: "เลิกขาย"
                                        })
                                    ]
                                }),
                                validationErrors.product_status && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.product_status
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("Shopee", "is_shopee"),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                    id: "is_shopee",
                                    name: "is_shopee",
                                    className: `form-select ${validationErrors.is_shopee ? "is-invalid" : ""}`,
                                    value: form.is_shopee,
                                    onChange: this.handleChange,
                                    required: true,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "",
                                            children: "-- เลือก --"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "1",
                                            children: "ใช่"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "0",
                                            children: "ไม่ใช่"
                                        })
                                    ]
                                }),
                                validationErrors.is_shopee && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.is_shopee
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3",
                            children: [
                                renderLabel("Lazada", "is_lazada"),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("select", {
                                    id: "is_lazada",
                                    name: "is_lazada",
                                    className: `form-select ${validationErrors.is_lazada ? "is-invalid" : ""}`,
                                    value: form.is_lazada,
                                    onChange: this.handleChange,
                                    required: true,
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "",
                                            children: "-- เลือก --"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "1",
                                            children: "ใช่"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("option", {
                                            value: "0",
                                            children: "ไม่ใช่"
                                        })
                                    ]
                                }),
                                validationErrors.is_lazada && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "invalid-feedback",
                                    children: validationErrors.is_lazada
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            type: "submit",
                            className: "btn btn-primary",
                            children: productId ? "บันทึกการแก้ไข" : "เพิ่มสินค้า"
                        })
                    ]
                })
            ]
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_router__WEBPACK_IMPORTED_MODULE_2__.withRouter)(ProductForm));


/***/ })

};
;