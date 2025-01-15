import ProductForm from "@/components/admin/product-form";
import { getProductById } from "@/lib/actions/product.actions";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update Product",
};
const AdminProductUpdatePage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const product = await getProductById(id);

  if (!product) notFound();
  return (
    <>
      <h2 className="h2-bold">Update Product</h2>
      <div className="my-8">
        <ProductForm type="Update" product={product} productId={product.id} />
      </div>
    </>
  );
};

export default AdminProductUpdatePage;
