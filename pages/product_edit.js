import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [product, setProduct] = useState({
    product_name: '',
    product_category_name: '',
    color_name: '',
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
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error('Error fetching product:', err));
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/products/${id}` : '/api/products';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
      .then(res => {
        if (!res.ok) throw new Error('Save failed');
        navigate('/');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="container py-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>{isEdit ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'}</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">ชื่อสินค้า</label>
                <input type="text" className="form-control" name="product_name" value={product.product_name} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">ประเภทสินค้า</label>
                <input type="text" className="form-control" name="product_category_name" value={product.product_category_name} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">สี</label>
                <input type="text" className="form-control" name="color_name" value={product.color_name} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Qty</label>
                <input type="number" className="form-control" name="qty" value={product.qty} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Stock</label>
                <input type="number" className="form-control" name="stock" value={product.stock} onChange={handleChange} />
              </div>
              {/* เพิ่ม field อื่นๆ ได้ตามต้องการ */}
              <div className="col-12 text-end">
                <button className="btn btn-secondary me-2" type="button" onClick={() => navigate('/')}>
                  ยกเลิก
                </button>
                <button type="submit" className="btn btn-primary">
                  บันทึก
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}