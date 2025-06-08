import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './ProductList';
import ProductForm from './ProductForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/add" element={<ProductForm />} />
        <Route path="/product/edit/:id" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}