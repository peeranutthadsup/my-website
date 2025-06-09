import { useRouter } from 'next/router';
import ProductForm from '../../../components/ProductForm';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  console.log("id ==> ",id);
  

  if (!id) return <div className="p-4">Loading...</div>;

  return <ProductForm mode="edit" productId={id} />;
}