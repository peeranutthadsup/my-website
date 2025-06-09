// import Link from 'next/link';

// export default function Home() {
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//         <div className="container">
//           <Link href="/" legacyBehavior>
//             <a className="navbar-brand fw-bold">SellerShopee</a>
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item">
//                 <Link href="/product/list" legacyBehavior>
//                   <a className="nav-link">รายการสินค้า</a>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link href="/product/add" legacyBehavior>
//                   <a className="nav-link">เพิ่มสินค้า</a>
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <main className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light p-4">
//         <h1 className="mb-4 text-primary">Welcome to SellerShopee</h1>
//         <p className="mb-4 fs-5 text-secondary">
//           ระบบจัดการสินค้าของคุณ เริ่มต้นด้วยการดูรายการหรือเพิ่มสินค้าใหม่
//         </p>
//         <div>
//           <Link href="/product/list" legacyBehavior>
//             <a className="btn btn-outline-primary btn-lg me-3 shadow-sm">
//               ดูรายการสินค้า
//             </a>
//           </Link>
//           <Link href="/product/add" legacyBehavior>
//             <a className="btn btn-primary btn-lg shadow-sm">
//               เพิ่มสินค้าใหม่
//             </a>
//           </Link>
//         </div>
//       </main>
//     </>
//   );
// }

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center flex-column">
      <h1>ยินดีต้อนรับสู่ระบบจัดการสินค้า</h1>
      <Link href="/product/list" legacyBehavior>
        <a className="btn btn-primary mt-3">ไปหน้ารายการสินค้า</a>
      </Link>
    </div>
  );
}
