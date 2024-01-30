import TableSkeleton from "@/components/Loaders/Skeleton/Table";
import Spinner from "@/components/Loaders/Spinner";
import AddProductModal from "@/components/Modals/AddProduct";
import Pagination from "@/components/Pagination";
import SimpleTable from "@/components/Tables/Simple";
import { useProduct } from "@/context/GeneralContext";
import AppLayout from "@/layouts/AppLayout";
import { classNames } from "@/utils/generics";
import { useEffect, useState } from "react";

const headers = [
  "Product Id",
  "Production Company",
  "Product Name",
  "Product Arabic Name",
  "Cost",
  "Quantity",
];

export default function Products() {
  const { allProducts, newProduct, error, isLoading, fetchAllProducts } =
    useProduct();
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const query =
      "SELECT TOP (100) p.product_id, p.produced_company_id, p.product_name, p.product_name_arabic, p.product_cost, p.product_stock, p.stock_alert,company.produced_company_name FROM products p JOIN produced_company company ON p.produced_company_id = company.produced_company_id";
    fetchAllProducts({ query: query });
  }, [newProduct]);

  return (
    <>
      <AddProductModal open={showAddProduct} setOpen={setShowAddProduct} />
      <AppLayout>
        <div className="">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6">Products</h1>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                onClick={() => setShowAddProduct(true)}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Product
              </button>
            </div>
          </div>

          {allProducts.length === 0 ? (
            <TableSkeleton headers={headers} />
          ) : (
            <>
              <SimpleTable headers={headers}>
                {allProducts.map((product, index) => (
                  <tr
                    key={product.product_id}
                    className={classNames(
                      index % 2 === 0 ? undefined : "bg-gray-50",
                      `${
                        product.product_stock <= product.stock_alert &&
                        "bg-red-700 text-gray-100"
                      }`
                    )}
                  >
                    <td className="whitespace-nowrap p-3 text-sm font-medium ">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm font-medium ">
                      {product.product_id}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm">
                      {product.produced_company_name}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm">
                      {product.product_name}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm">
                      {product.product_name_arabic}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm">
                      <b>{product.product_cost}</b> OMR
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm">
                      {product.product_stock}
                      {product.product_stock <= product.stock_alert && (
                        <span className="ml-1 px-2 text-xs rounded-full bg-red-500 ">
                          Low Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </SimpleTable>
              <Pagination
                currentPage={1}
                totalPages={10}
                handleClick={() => {}}
              />
            </>
          )}
        </div>
      </AppLayout>
    </>
  );
}
