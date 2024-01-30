import TableSkeleton from "@/components/Loaders/Skeleton/Table";
import Pagination from "@/components/Pagination";
import SimpleTable from "@/components/Tables/Simple";
import { useProduct } from "@/context/GeneralContext";
import AppLayout from "@/layouts/AppLayout";
import { classNames } from "@/utils/generics";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect } from "react";

const headers = [
  "Invoice Id",
  "Customer Name",
  "Created By",
  "Total",
  "Action",
];
export default function Invoices() {
  const { invoices, error, isLoading, fetchInvoices } = useProduct();
  const router = useRouter();

  useEffect(() => {
    const query =
      "SELECT TOP (100) bill_head_id, customer_name, user_name, total FROM billhead ORDER BY bill_head_id DESC ";
    fetchInvoices({ query: query });
  }, []);

  return (
    <AppLayout>
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6">Invoices</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => {
                router.push("invoices/add");
              }}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Invoice
            </button>
          </div>
        </div>
        {invoices.length === 0 ? (
          <TableSkeleton headers={headers} />
        ) : (
          <>
            <SimpleTable headers={headers}>
              {invoices.map((invoice, index) => (
                <tr
                  key={invoice.bill_head_id}
                  className={classNames(
                    index % 2 === 0 ? undefined : "bg-gray-50"
                  )}
                >
                  <td className="whitespace-nowrap p-3 text-sm font-medium ">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm font-medium ">
                    {invoice.bill_head_id}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm font-medium ">
                    {invoice.customer_name}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    {invoice.user_name}
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    <b>{invoice.total}</b> OMR
                  </td>
                  <td className="whitespace-nowrap p-3 text-sm">
                    <button type="button" className="mx-auto p-1 rounded-full">
                      <EyeIcon className="w-6 h-6" />
                    </button>
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
  );
}
