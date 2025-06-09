import React from 'react';
import { withRouter } from 'next/router';

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    const productId = props.router?.query?.id || null;

    this.state = {
      productId,
      form: {
        product_key: '',
        product_name: '',
        product_category_id: '',
        color_id: '',
        qty: '',
        stock: '',
        purchase_price: '',
        lot: '',
        shipping_cost_piece: '',
        total_cost_including_shipping: '',
        sell_price_1: '',
        sell_price_2: '',
        sell_price_3: '',
        product_status: '',
        is_shopee: '',
        is_lazada: ''
      },
      colors: [],
      categories: [],
      loading: false,
      error: '',
      validationErrors: {},
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
      this.setState({ productId: currentId }, () => {
        if (currentId) {
          this.loadProduct(currentId);
        } else {
          this.setState({
            form: {
              product_key: '',
              product_name: '',
              product_category_id: '',
              color_id: '',
              qty: '',
              stock: '',
              purchase_price: '',
              lot: '',
              shipping_cost_piece: '',
              total_cost_including_shipping: '',
              sell_price_1: '',
              sell_price_2: '',
              sell_price_3: '',
              product_status: '',
              is_shopee: '',
              is_lazada: '',
            },
            error: '',
            validationErrors: {},
          });
        }
      });
    }
  }

  loadColors() {
    fetch('/api/colors')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch colors: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Colors loaded:', data);
        this.setState({ colors: data });
      })
      .catch(err => {
        console.error('Error loading colors:', err);
        this.setState({ colors: [] });
      });
  }

  loadCategories() {
    console.log('Calling loadCategories()...');
    fetch('/api/product_categories')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Categories loaded:', data);
        this.setState({ categories: data });
      })
      .catch(err => {
        console.error('Error loading categories:', err);
        this.setState({ categories: [] });
      });
  }

  loadProduct(productId) {
    this.setState({ loading: true, error: '' });
    fetch(`/api/products?id=${productId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load product data');
        return res.json();
      })
      .then(data => {
        this.setState({
          form: {
            product_key: data.product_key || '',
            product_name: data.product_name || '',
            product_category_id: data.product_category_id ? String(data.product_category_id) : '',
            color_id: data.color_id ? String(data.color_id) : '',
            qty: data.qty || '',
            stock: data.stock || '',
            purchase_price: data.purchase_price || '',
            lot: data.lot || '',
            shipping_cost_piece: data.shipping_cost_piece || '',
            total_cost_including_shipping: data.total_cost_including_shipping || '',
            sell_price_1: data.sell_price_1 || '',
            sell_price_2: data.sell_price_2 || '',
            sell_price_3: data.sell_price_3 || '',
            product_status: data.product_status || '',
            is_shopee: data.is_shopee !== undefined && data.is_shopee !== null ? String(data.is_shopee) : '',
            is_lazada: data.is_lazada !== undefined && data.is_lazada !== null ? String(data.is_lazada) : '',
          },
          loading: false,
          validationErrors: {},
        });
      })
      .catch(err => this.setState({ error: err.message, loading: false }));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(state => {
      const validationErrors = { ...state.validationErrors };
      if (value.trim() !== '') {
        delete validationErrors[name];
      }

      return {
        form: {
          ...state.form,
          [name]: String(value),
        },
        validationErrors,
      };
    });
  };

  validateForm() {
    const { form } = this.state;
    const validationErrors = {};
    const requiredFields = [
      'product_key',
      'product_name',
      'product_category_id',
      'color_id',
      'qty',
      'stock',
      'purchase_price',
      'lot',
      'shipping_cost_piece',
      'total_cost_including_shipping',
      'sell_price_1',
      'sell_price_2',
      'sell_price_3',
      'product_status',
      'is_shopee',
      'is_lazada'
    ];

    const fieldLabels = {
      product_key: 'รหัสสินค้า',
      product_name: 'ชื่อสินค้า',
      product_category_id: 'ประเภทสินค้า',
      color_id: 'สี',
      qty: 'จำนวน',
      stock: 'สต็อก',
      purchase_price: 'ราคาซื้อ',
      lot: 'ล็อต',
      shipping_cost_piece: 'ค่าขนส่งต่อชิ้น',
      total_cost_including_shipping: 'ราคารวมค่าขนส่ง',
      sell_price_1: 'ราคาขาย 1',
      sell_price_2: 'ราคาขาย 2',
      sell_price_3: 'ราคาขาย 3',
      product_status: 'สถานะสินค้า',
      is_shopee: 'Shopee',
      is_lazada: 'Lazada',
    };

    requiredFields.forEach(field => {
      if (
        form[field] === '' ||
        form[field] === null ||
        (typeof form[field] === 'string' && form[field].trim() === '')
      ) {
        validationErrors[field] = `กรุณากรอก${fieldLabels[field]}`;
      }
    });

    return validationErrors;
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: '' });

    const validationErrors = this.validateForm();
    if (Object.keys(validationErrors).length > 0) {
      this.setState({ validationErrors, loading: false });
      return;
    }

    try {
      const { router } = this.props;
      const { form, productId } = this.state;

      const method = productId ? 'PUT' : 'POST';
      const url = productId ? `/api/products?id=${productId}` : '/api/products';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to save product');
      }

      alert(productId ? 'แก้ไขสินค้าเรียบร้อย' : 'เพิ่มสินค้าเรียบร้อย');
      router.push('/ProductList');
    } catch (err) {
      this.setState({ error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { form, colors, categories, loading, error, validationErrors, productId } = this.state;

    if (loading) return <div>Loading...</div>;

    const renderLabel = (text, fieldName) => (
      <label htmlFor={fieldName} className="form-label">
        {text} <span style={{ color: 'red' }}>*</span>
      </label>
    );

    return (
      <div className="container py-3">
        <h2>{productId ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={this.handleSubmit} noValidate>
          {/* รหัสสินค้า */}
          <div className="mb-3">
            {renderLabel('รหัสสินค้า', 'product_key')}
            <input
              type="text"
              id="product_key"
              name="product_key"
              className={`form-control ${validationErrors.product_key ? 'is-invalid' : ''}`}
              value={form.product_key}
              onChange={this.handleChange}
              required
            />
            {validationErrors.product_key && (
              <div className="invalid-feedback">{validationErrors.product_key}</div>
            )}
          </div>

          {/* ชื่อสินค้า */}
          <div className="mb-3">
            {renderLabel('ชื่อสินค้า', 'product_name')}
            <input
              type="text"
              id="product_name"
              name="product_name"
              className={`form-control ${validationErrors.product_name ? 'is-invalid' : ''}`}
              value={form.product_name}
              onChange={this.handleChange}
              required
            />
            {validationErrors.product_name && (
              <div className="invalid-feedback">{validationErrors.product_name}</div>
            )}
          </div>

          {/* ประเภทสินค้า */}
          <div className="mb-3">
            {renderLabel('ประเภทสินค้า', 'product_category_id')}
            <select
              id="product_category_id"
              name="product_category_id"
              className={`form-select ${validationErrors.product_category_id ? 'is-invalid' : ''}`}
              value={form.product_category_id}
              onChange={this.handleChange}
              required
            >
              <option value="">-- เลือกประเภทสินค้า --</option>
              {categories.map(cat => (
                <option key={cat.product_category_id} value={String(cat.product_category_id)}>
                  {cat.product_category_name}
                </option>
              ))}
            </select>
            {validationErrors.product_category_id && (
              <div className="invalid-feedback">{validationErrors.product_category_id}</div>
            )}
          </div>

          {/* สี */}
          <div className="mb-3">
            {renderLabel('สี', 'color_id')}
            <select
              id="color_id"
              name="color_id"
              className={`form-select ${validationErrors.color_id ? 'is-invalid' : ''}`}
              value={form.color_id}
              onChange={this.handleChange}
              required
            >
              <option value="">-- เลือกสี --</option>
              {colors.map(color => (
                <option key={color.color_id} value={String(color.color_id)}>
                  {color.color_name}
                </option>
              ))}
            </select>
            {validationErrors.color_id && (
              <div className="invalid-feedback">{validationErrors.color_id}</div>
            )}
          </div>

          {/* จำนวน */}
          <div className="mb-3">
            {renderLabel('จำนวน', 'qty')}
            <input
              type="number"
              id="qty"
              name="qty"
              className={`form-control ${validationErrors.qty ? 'is-invalid' : ''}`}
              value={form.qty}
              onChange={this.handleChange}
              required
              min={0}
            />
            {validationErrors.qty && (
              <div className="invalid-feedback">{validationErrors.qty}</div>
            )}
          </div>

          {/* สต็อก */}
          <div className="mb-3">
            {renderLabel('สต็อก', 'stock')}
            <input
              type="number"
              id="stock"
              name="stock"
              className={`form-control ${validationErrors.stock ? 'is-invalid' : ''}`}
              value={form.stock}
              onChange={this.handleChange}
              required
              min={0}
            />
            {validationErrors.stock && (
              <div className="invalid-feedback">{validationErrors.stock}</div>
            )}
          </div>

          {/* ราคาซื้อ */}
          <div className="mb-3">
            {renderLabel('ราคาซื้อ', 'purchase_price')}
            <input
              type="number"
              id="purchase_price"
              name="purchase_price"
              className={`form-control ${validationErrors.purchase_price ? 'is-invalid' : ''}`}
              value={form.purchase_price}
              onChange={this.handleChange}
              required
              min={0}
              step="0.01"
            />
            {validationErrors.purchase_price && (
              <div className="invalid-feedback">{validationErrors.purchase_price}</div>
            )}
          </div>

          {/* ล็อต */}
          <div className="mb-3">
            {renderLabel('ล็อต', 'lot')}
            <input
              type="text"
              id="lot"
              name="lot"
              className={`form-control ${validationErrors.lot ? 'is-invalid' : ''}`}
              value={form.lot}
              onChange={this.handleChange}
              required
            />
            {validationErrors.lot && (
              <div className="invalid-feedback">{validationErrors.lot}</div>
            )}
          </div>

          {/* ค่าขนส่งต่อชิ้น */}
          <div className="mb-3">
            {renderLabel('ค่าขนส่งต่อชิ้น', 'shipping_cost_piece')}
            <input
              type="number"
              id="shipping_cost_piece"
              name="shipping_cost_piece"
              className={`form-control ${validationErrors.shipping_cost_piece ? 'is-invalid' : ''}`}
              value={form.shipping_cost_piece}
              onChange={this.handleChange}
              required
              min={0}
              step="0.01"
            />
            {validationErrors.shipping_cost_piece && (
              <div className="invalid-feedback">{validationErrors.shipping_cost_piece}</div>
            )}
          </div>

          {/* ราคารวมค่าขนส่ง */}
          <div className="mb-3">
            {renderLabel('ราคารวมค่าขนส่ง', 'total_cost_including_shipping')}
            <input
              type="number"
              id="total_cost_including_shipping"
              name="total_cost_including_shipping"
              className={`form-control ${validationErrors.total_cost_including_shipping ? 'is-invalid' : ''}`}
              value={form.total_cost_including_shipping}
              onChange={this.handleChange}
              required
              min={0}
              step="0.01"
            />
            {validationErrors.total_cost_including_shipping && (
              <div className="invalid-feedback">{validationErrors.total_cost_including_shipping}</div>
            )}
          </div>

          {/* ราคาขาย 1 */}
          <div className="mb-3">
            {renderLabel('ราคาขาย 1', 'sell_price_1')}
            <input
              type="number"
              id="sell_price_1"
              name="sell_price_1"
              className={`form-control ${validationErrors.sell_price_1 ? 'is-invalid' : ''}`}
              value={form.sell_price_1}
              onChange={this.handleChange}
              required
              min={0}
              step="0.01"
            />
            {validationErrors.sell_price_1 && (
              <div className="invalid-feedback">{validationErrors.sell_price_1}</div>
            )}
          </div>

          {/* ราคาขาย 2 */}
          <div className="mb-3">
            {renderLabel('ราคาขาย 2', 'sell_price_2')}
            <input
              type="number"
              id="sell_price_2"
              name="sell_price_2"
              className={`form-control ${validationErrors.sell_price_2 ? 'is-invalid' : ''}`}
              value={form.sell_price_2}
              onChange={this.handleChange}
              required
              min={0}
              step="0.01"
            />
            {validationErrors.sell_price_2 && (
              <div className="invalid-feedback">{validationErrors.sell_price_2}</div>
            )}
          </div>

          {/* ราคาขาย 3 */}
          <div className="mb-3">
            {renderLabel('ราคาขาย 3', 'sell_price_3')}
            <input
              type="number"
              id="sell_price_3"
              name="sell_price_3"
              className={`form-control ${validationErrors.sell_price_3 ? 'is-invalid' : ''}`}
              value={form.sell_price_3}
              onChange={this.handleChange}
              required
              min={0}
              step="0.01"
            />
            {validationErrors.sell_price_3 && (
              <div className="invalid-feedback">{validationErrors.sell_price_3}</div>
            )}
          </div>

          {/* สถานะสินค้า */}
          <div className="mb-3">
            {renderLabel('สถานะสินค้า', 'product_status')}
            <select
              id="product_status"
              name="product_status"
              className={`form-select ${validationErrors.product_status ? 'is-invalid' : ''}`}
              value={form.product_status}
              onChange={this.handleChange}
              required
            >
              <option value="">-- เลือกสถานะสินค้า --</option>
              <option value="available">พร้อมขาย</option>
              <option value="out_of_stock">หมดสต็อก</option>
              <option value="discontinued">เลิกขาย</option>
            </select>
            {validationErrors.product_status && (
              <div className="invalid-feedback">{validationErrors.product_status}</div>
            )}
          </div>

          {/* Shopee */}
          <div className="mb-3">
            {renderLabel('Shopee', 'is_shopee')}
            <select
              id="is_shopee"
              name="is_shopee"
              className={`form-select ${validationErrors.is_shopee ? 'is-invalid' : ''}`}
              value={form.is_shopee}
              onChange={this.handleChange}
              required
            >
              <option value="">-- เลือก --</option>
              <option value="1">ใช่</option>
              <option value="0">ไม่ใช่</option>
            </select>
            {validationErrors.is_shopee && (
              <div className="invalid-feedback">{validationErrors.is_shopee}</div>
            )}
          </div>

          {/* Lazada */}
          <div className="mb-3">
            {renderLabel('Lazada', 'is_lazada')}
            <select
              id="is_lazada"
              name="is_lazada"
              className={`form-select ${validationErrors.is_lazada ? 'is-invalid' : ''}`}
              value={form.is_lazada}
              onChange={this.handleChange}
              required
            >
              <option value="">-- เลือก --</option>
              <option value="1">ใช่</option>
              <option value="0">ไม่ใช่</option>
            </select>
            {validationErrors.is_lazada && (
              <div className="invalid-feedback">{validationErrors.is_lazada}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            {productId ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(ProductForm);
