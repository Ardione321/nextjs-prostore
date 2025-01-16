import Link from "next/link";
import { getAllProducts, deleteProduct } from "@/lib/actions/product.actions";
import { formatCurrency, formatId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paginations from "@/components/shared/pagination";
import DeleteDialog from "@/components/shared/delete-dialog";
import Image from "next/image";

const AdminProductPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const category = searchParams.category || "";
  const products = await getAllProducts({
    query: searchText,
    page,
    category,
  });

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <h1 className="h2-bold">Products</h1>
          {searchText && (
            <div>
              Filtered by <i>&quot;{searchText}&quot;</i>{" "}
              <Link href="/admin/products">
                <Button variant="outline" size="sm">
                  Removed filter
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant="default">
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">NAME</TableHead>
            <TableHead className="text-right">PRICE</TableHead>
            <TableHead className="text-center">CATEGORY</TableHead>
            <TableHead className="text-center">STOCK</TableHead>
            <TableHead className="text-center">RATING</TableHead>
            <TableHead className="w-[100px] text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="text-center">
                {formatId(product.id)}
              </TableCell>
              <TableCell className="text-center">
                {/* <Link
                  href={`/product/${product.slug}`}
                  className="flex item-center"
                >
                  
                  <span className="px-2 pt-4"> {product.name} </span>
                </Link> */}
                <div className="flex items-center justify-center space-x-2">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={60}
                    height={60}
                  />
                  <span>{product.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(product.price)}
              </TableCell>
              <TableCell className="text-center">{product.category}</TableCell>
              <TableCell className="text-center">{product.stock}</TableCell>
              <TableCell className="text-center">{product.rating}</TableCell>
              <TableCell className="flex gap-1">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <DeleteDialog id={product.id} action={deleteProduct} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products.totalPages > 1 && (
        <Paginations
          page={page}
          totalPages={products.totalPages}
          numberOfPages={products.numberOfPages}
        />
      )}
    </div>
  );
};

export default AdminProductPage;
