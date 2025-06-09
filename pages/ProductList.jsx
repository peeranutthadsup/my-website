import { useEffect, useState } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const numberFormatter = new Intl.NumberFormat('th-TH');

const statusColors = {
  active: 'bg-success text-white',
  ใช้งาน: 'bg-success text-white',
  inactive: 'bg-danger text-white',
  ไม่ใช้งาน: 'bg-danger text-white',
  pending: 'bg-warning text-dark',
  รอดำเนินการ: 'bg-warning text-dark',
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [shopeeHover, setShopeeHover] = useState(false);
  const [lazadaHover, setLazadaHover] = useState(false);
  const [filterShopee, setFilterShopee] = useState(false);
  const [filterLazada, setFilterLazada] = useState(false);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products
    .filter(p => p.product_name?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(p => {
      if (filterShopee) return Number(p.is_shopee) === 1;
      if (filterLazada) return Number(p.is_lazada) === 1;
      return true;
    });

  const exportShopeeExcel = () => {
    const data = filteredProducts
      .filter(p => Number(p.is_shopee) === 1)
      .map(p => ({
        'รหัสสินค้า': p.product_id,
        'ชื่อสินค้า': p.product_name,
        'ประเภท': p.product_category_name,
        'สี': p.color_name,
        'Qty': p.qty,
        'Stock': p.stock,
        'ราคาซื้อ': p.purchase_price,
        'lot': p.lot,
        'ค่าขนส่ง/ชิ้น': p.shipping_cost_piece,
        'ต้นทุนรวม': p.total_cost_including_shipping,
        'ขาย1': p.sell_price_1,
        'ขาย2': p.sell_price_2,
        'ขาย3': p.sell_price_3,
        'สถานะ': p.product_status,
      }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Shopee');
    const wbout = XLSX.write(wb, { bookType:'xlsx', type:'array' });
    saveAs(new Blob([wbout]), 'Shopee_รายการสินค้า.xlsx');
  };

  const exportLazadaExcel = () => {
    const data = filteredProducts
      .filter(p => Number(p.is_lazada) === 1)
      .map(p => ({
        'รหัสสินค้า': p.product_id,
        'ชื่อสินค้า': p.product_name,
        'ประเภท': p.product_category_name,
        'สี': p.color_name,
        'Qty': p.qty,
        'Stock': p.stock,
        'ราคาซื้อ': p.purchase_price,
        'lot': p.lot,
        'ค่าขนส่ง/ชิ้น': p.shipping_cost_piece,
        'ต้นทุนรวม': p.total_cost_including_shipping,
        'ขาย1': p.sell_price_1,
        'ขาย2': p.sell_price_2,
        'ขาย3': p.sell_price_3,
        'สถานะ': p.product_status,
      }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Lazada');
    const wbout = XLSX.write(wb, { bookType:'xlsx', type:'array' });
    saveAs(new Blob([wbout]), 'Lazada_รายการสินค้า.xlsx');
  };

  const handleDelete = async (productId) => {
    if (!confirm('คุณแน่ใจจะลบสินค้านี้หรือไม่?')) return;
    await fetch(`/api/products?id=${productId}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.product_id !== productId));
  };

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center text-primary fs-4 fw-semibold">
      Loading...
    </div>
  );

  return (
    <div className="min-vh-100 bg-light py-3">
      <div className="container-fluid px-2">
        <div className="card shadow-lg">
          {/* Header */}
          <div className="card-header bg-primary text-white d-flex align-items-center">
            <div className="flex-grow-1 d-flex justify-content-center">
              <h2 className="mb-0">📦 รายการสินค้า</h2>
            </div>
            <Link href="/ProductForm" legacyBehavior>
              <a className="btn btn-success">➕ เพิ่มสินค้า</a>
            </Link>
          </div>

          <div className="p-3">
            {/* แถวแรก: ค้นหา */}
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="ค้นหาสินค้าตามชื่อ..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* แถวสอง: filters ทางซ้าย, export ปุ่มชิดขวา */}
            <div className="d-flex align-items-center mt-2">
              {/* กลุ่ม checkbox */}
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="shopeeFilter"
                    checked={filterShopee}
                    onChange={e => {
                      setFilterShopee(e.target.checked);
                      if (e.target.checked) setFilterLazada(false);
                    }}
                  />
                  <label className="form-check-label" htmlFor="shopeeFilter">
                    เฉพาะ Shopee
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="lazadaFilter"
                    checked={filterLazada}
                    onChange={e => {
                      setFilterLazada(e.target.checked);
                      if (e.target.checked) setFilterShopee(false);
                    }}
                  />
                  <label className="form-check-label" htmlFor="lazadaFilter">
                    เฉพาะ Lazada
                  </label>
                </div>
              </div>

              {/* สร้าง space ด้านซ้ายให้กลุ่ม checkbox */}
              <div className="flex-grow-1"></div>

              {/* Export buttons ชิดขวา */}
              <div className="d-flex gap-2">
                <button
                  className="btn d-flex align-items-center"
                  onClick={exportShopeeExcel}
                  disabled={!filterShopee}
                  onMouseEnter={() => setShopeeHover(true)}
                  onMouseLeave={() => setShopeeHover(false)}
                  style={{
                    color: shopeeHover ? 'white' : 'orange',
                    backgroundColor: shopeeHover ? 'orange' : 'transparent',
                    border: '1px solid orange',
                    opacity: filterShopee ? 1 : 0.5,
                    cursor: filterShopee ? 'pointer' : 'not-allowed'
                  }}
                >
                  <span style={{ marginRight: 6, fontSize: '1.2rem' }}>📥</span>
                  Export Shopee
                </button>

                <button
                  className="btn d-flex align-items-center"
                  onClick={exportLazadaExcel}
                  disabled={!filterLazada}
                  onMouseEnter={() => setLazadaHover(true)}
                  onMouseLeave={() => setLazadaHover(false)}
                  style={{
                    color: lazadaHover ? 'white' : 'blue',
                    backgroundColor: lazadaHover ? 'blue' : 'transparent',
                    border: '1px solid blue',
                    opacity: filterLazada ? 1 : 0.5,
                    cursor: filterLazada ? 'pointer' : 'not-allowed'
                  }}
                >
                  <span style={{ marginRight: 6, fontSize: '1.2rem' }}>📤</span>
                  Export Lazada
                </button>
              </div>
            </div>
          </div>


          {/* Product Table */}
          <div className="card-body table-responsive p-2">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-primary text-uppercase">
                <tr>
                  <th>รหัส</th><th>รหัสสินค้า</th><th>ชื่อสินค้า</th><th>ประเภท</th>
                  <th>สี</th><th>Qty</th><th>Stock</th><th>ราคาซื้อ</th>
                  <th>lot</th><th>ค่าขนส่ง/ชิ้น</th><th>ต้นทุนรวม</th>
                  <th>ขาย1</th><th>ขาย2</th><th>ขาย3</th><th>สถานะ</th><th>shopee</th><th>lazada</th><th>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p, i) => (
                    <tr key={i}>
                      <td>{p.product_id}</td>
                      <td>{p.product_key}</td>
                      <td>{p.product_name}</td>
                      <td>{p.product_category_name}</td>
                      <td>{p.color_name}</td>
                      <td className="text-center">{p.qty}</td>
                      <td className="text-center">{p.stock}</td>
                      <td>{numberFormatter.format(p.purchase_price)}</td>
                      <td>{p.lot}</td>
                      <td>{numberFormatter.format(p.shipping_cost_piece)}</td>
                      <td>{numberFormatter.format(p.total_cost_including_shipping)}</td>
                      <td>{numberFormatter.format(p.sell_price_1)}</td>
                      <td>{numberFormatter.format(p.sell_price_2)}</td>
                      <td>{numberFormatter.format(p.sell_price_3)}</td>
                      <td className="text-center">
                        <span className={`badge ${getStatusColor(p.product_status)}`}>
                          {getStatusLabel(p.product_status)}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${getStatusColor_shopee_lazada(p.is_shopee)}`}>
                          {getStatusShopee(p.is_shopee)}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${getStatusColor_shopee_lazada(p.is_lazada)}`}>
                          {getStatusLazada(p.is_lazada)}
                        </span>
                      </td>
                      <td className="text-center">
                        <Link href={`/ProductForm?id=${p.product_id}`} legacyBehavior>
                          <a className="btn btn-sm btn-outline-primary me-1">✏️</a>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(p.product_id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={18} className="text-center text-secondary py-3">
                      ไม่พบสินค้าตามเงื่อนไข
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  if (typeof status === 'number') return status <= 0 ? 'bg-danger text-white' : 'bg-success text-white';
  if (!status) return 'bg-secondary text-white';
  const s = status.toLowerCase();
  return statusColors[s] || 'bg-secondary text-white';
}
function getStatusLabel(status) {
  if (typeof status === 'number') return status <= 0 ? 'Out' : 'Stock';
  return status || '';
}

function getStatusLazada(status) {
  if (typeof status === 'number') return status <= 0 ? 'มีแล้ว' : 'ยังไม่มี';
  return status || '';
}
function getStatusShopee(status) {
  if (typeof status === 'number') return status <= 0 ? 'มีแล้ว' : 'ยังไม่มี';;
  return status || '';
}

function getStatusColor_shopee_lazada(status) {
  if (typeof status === 'number') return status == 1 ? 'bg-danger text-white' : 'bg-success text-white';
  if (!status) return 'bg-secondary text-white';
  const s = status.toLowerCase();
  return statusColors[s] || 'bg-secondary text-white';
}


