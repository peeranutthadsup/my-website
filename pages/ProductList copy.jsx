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
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [shopeeHover, setShopeeHover] = useState(false);
  const [lazadaHover, setLazadaHover] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch('/api/products')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async (productId) => {
    if (!confirm('คุณแน่ใจจะลบสินค้านี้หรือไม่?')) return;
    try {
      const res = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('ลบสินค้าไม่สำเร็จ');
      alert('ลบสินค้าเรียบร้อย');
      setProducts(products.filter(p => p.product_id !== productId));
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    if (typeof status === 'number') {
      return status <= 0 ? 'bg-danger text-white' : 'bg-success text-white';
    }
    if (!status) return 'bg-secondary text-white';
    const s = status.toLowerCase();
    return statusColors[s] || 'bg-secondary text-white';
  };

  const getStatusLabel = (status) => {
    if (typeof status === 'number') {
      return status <= 0 ? 'Out' : 'Stock';
    }
    return status || '';
  };

  // กรองสินค้าโดยใช้ searchTerm (ค้นหาชื่อสินค้าแบบไม่แยกพิมพ์เล็กใหญ่)
  const filteredProducts = products.filter(product =>
    product.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export Excel จาก filteredProducts
  const exportToExcel = () => {
    const dataToExport = filteredProducts.map(p => ({
      'รหัสสินค้า': p.product_id ?? '',
      'ชื่อสินค้า': p.product_name ?? '',
      'ประเภทสินค้า': p.product_category_name ?? '',
      'สี': p.color_name ?? '',
      'Qty': p.qty ?? '',
      'Stock': p.stock ?? '',
      'ราคาซื้อ': p.purchase_price ?? '',
      'lot': p.lot ?? '',
      'ค่าขนส่ง/ชิ้น': p.shipping_cost_piece ?? '',
      'ต้นทุนรวมค่าขนส่ง': p.total_cost_including_shipping ?? '',
      'ขาย1': p.sell_price_1 ?? '',
      'ขาย2': p.sell_price_2 ?? '',
      'ขาย3': p.sell_price_3 ?? '',
      'สถานะ': p.product_status ?? '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'สินค้า');

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'รายการสินค้า.xlsx');
  };

  if (loading)
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center text-primary fs-4 fw-semibold">
        Loading...
      </div>
    );

  return (
    <div className="min-vh-100 bg-light py-3">
      <div className="container-fluid px-2">
        <div className="card shadow-lg">
          <div className="card-header bg-primary text-white d-flex align-items-center">
            <div className="flex-grow-1 d-flex justify-content-center">
              <h2 className="mb-0">📦 รายการสินค้า</h2>
            </div>
            <div>
              <Link href="/ProductForm" legacyBehavior>
                <a className="btn btn-success">➕ เพิ่มสินค้า</a>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="p-3">
            <input
              type="text"
              className="form-control"
              placeholder="ค้นหาสินค้าตามชื่อ..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            {/* ปุ่ม Export Excel 2 ปุ่ม อยู่ใต้ Search และชิดขวา */}
            <div className="mt-2 d-flex justify-content-end gap-2">
              <button
                className="btn d-flex align-items-center"
                onClick={exportToExcel}
                onMouseEnter={() => setShopeeHover(true)}
                onMouseLeave={() => setShopeeHover(false)}
                style={{
                  color: shopeeHover ? 'white' : 'orange',
                  backgroundColor: shopeeHover ? 'orange' : 'transparent',
                  border: '1px solid orange',
                }}
              >
                <span style={{ marginRight: 6, fontSize: '1.2rem' }}>📥</span>
                Export Shopee
              </button>

              <button
                className="btn d-flex align-items-center"
                onClick={() => alert('Export Lazada')}
                onMouseEnter={() => setLazadaHover(true)}
                onMouseLeave={() => setLazadaHover(false)}
                style={{
                  color: lazadaHover ? 'white' : 'blue',
                  backgroundColor: lazadaHover ? 'blue' : 'transparent',
                  border: '1px solid blue',
                }}
              >
                <span style={{ marginRight: 6, fontSize: '1.2rem' }}>📤</span>
                Export Lazada
              </button>
            </div>
          </div>

          <div className="card-body table-responsive p-2">
            <table className="table table-striped table-hover table-bordered align-middle">
              <thead className="table-primary text-uppercase">
                <tr>
                  <th className="text-center" style={{ minWidth: '70px' }}>รหัส</th>
                  <th className="text-center" style={{ minWidth: '160px' }}>รหัสสินค้า</th>
                  <th className="text-center" style={{ minWidth: '160px' }}>ชื่อสินค้า</th>
                  <th className="text-center" style={{ minWidth: '120px' }}>ประเภทสินค้า</th>
                  <th className="text-center">สี</th>
                  <th className="text-center">Qty</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center" style={{ minWidth: '100px' }}>ราคาซื้อ</th>
                  <th className="text-center">lot</th>
                  <th className="text-center" style={{ minWidth: '120px' }}>ค่าขนส่ง/ชิ้น</th>
                  <th className="text-center" style={{ minWidth: '160px' }}>ต้นทุนรวมค่าขนส่ง</th>
                  <th className="text-center">ขาย1</th>
                  <th className="text-center">ขาย2</th>
                  <th className="text-center">ขาย3</th>
                  <th className="text-center" style={{ minWidth: '100px' }}>สถานะ</th>
                  <th className="text-center" style={{ minWidth: '100px' }}>จัดการ</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, i) => (
                    <tr key={product.product_id ?? i}>
                      <td className="text-nowrap">{product.product_id || ''}</td>
                      <td className="text-nowrap">{product.product_key || ''}</td>
                      <td className="fw-semibold text-nowrap">{product.product_name || ''}</td>
                      <td className="text-nowrap">{product.product_category_name || ''}</td>
                      <td className="text-nowrap">{product.color_name || ''}</td>
                      <td className="text-center text-nowrap">{product.qty ?? ''}</td>
                      <td className="text-center text-nowrap">{product.stock ?? ''}</td>
                      <td className="text-nowrap">
                        {product.purchase_price != null ? numberFormatter.format(product.purchase_price) : ''}
                      </td>
                      <td className="text-nowrap">{product.lot || ''}</td>
                      <td className="text-nowrap">
                        {product.shipping_cost_piece != null
                          ? numberFormatter.format(product.shipping_cost_piece)
                          : ''}
                      </td>
                      <td className="text-nowrap">
                        {product.total_cost_including_shipping != null
                          ? numberFormatter.format(product.total_cost_including_shipping)
                          : ''}
                      </td>
                      <td className="text-nowrap">
                        {product.sell_price_1 != null ? numberFormatter.format(product.sell_price_1) : ''}
                      </td>
                      <td className="text-nowrap">
                        {product.sell_price_2 != null ? numberFormatter.format(product.sell_price_2) : ''}
                      </td>
                      <td className="text-nowrap">
                        {product.sell_price_3 != null ? numberFormatter.format(product.sell_price_3) : ''}
                      </td>
                      <td className="text-center text-nowrap">
                        <span
                          className={`badge ${getStatusColor(product.product_status)}`}
                          style={{
                            minWidth: '70px',
                            display: 'inline-block',
                            textAlign: 'center',
                          }}
                        >
                          {getStatusLabel(product.product_status)}
                        </span>
                      </td>
                      <td className="text-center text-nowrap">
                        <Link href={`/ProductForm?id=${product.product_id}`} legacyBehavior>
                          <a className="btn btn-sm btn-outline-primary me-1" title="แก้ไข">
                            ✏️
                          </a>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger me-1"
                          title="ลบ"
                          onClick={() => handleDelete(product.product_id)}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={15} className="text-center text-secondary py-3">
                      ไม่พบสินค้าที่ค้นหา
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
