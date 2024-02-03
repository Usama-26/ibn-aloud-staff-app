import Selectbox from "@/components/Selectbox";
import SimpleTable from "@/components/Tables/Simple";
import { useProduct } from "@/context/GeneralContext";
import AppLayout from "@/layouts/AppLayout";
import { PlusIcon, PrinterIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Field, FieldArray, Form, Formik } from "formik";
import { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
const headers = [
  "Item Name",
  "Quantity",
  "Unit Price",
  "Total Price",
  "Action",
];

const itemEntry = {
  product_name: "",
  quantity: 0,
  total_qty: 0,
  product_price: 0,
  total_price: 0,
};

export default function AddInvoice() {
  const { fetchAllProducts, allProducts, error, isLoading } = useProduct();
  const productsList =
    allProducts.length > 0
      ? allProducts.map((e) => ({
          id: e.product_name,
          name: e.product_name,
          total_qty: e.product_stock,
          price: e.product_price,
        }))
      : [];

  useEffect(() => {
    const query =
      "SELECT product_id, product_name, product_stock, product_cost, product_price FROM products";
    fetchAllProducts({ query: query });
  }, []);

  return (
    <AppLayout>
      <div className="">
        <h1 className="text-base font-semibold leading-6">New Invoice</h1>
        <Formik
          initialValues={{
            customer_name: "",
            phone_no: "",
            bill_head_date: dayjs().format("YYYY-MM-DD"),
            list: [
              {
                product_name: "",
                quantity: 0,
                total_qty: 0,
                product_price: 0,
                total_price: 0,
              },
            ],
            bill_net: 0,
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mt-4 flex items center gap-x-4">
                <Field
                  name="customer_name"
                  className="input-text"
                  placeholder="Customer Name"
                />
                <Field
                  name="phone_no"
                  className="input-text"
                  placeholder="Phone Number"
                />
                <Field
                  type="date"
                  name="bill_head_date"
                  className="input-text"
                  placeholder="Invoice Date"
                />
              </div>
              <div className="mt-10 mb-5">
                <SimpleTable headers={headers}>
                  <FieldArray name="list">
                    {({ push, pop }) => (
                      <>
                        {values.list.length > 0 &&
                          values.list.map((item, index) => (
                            <tr key={index} className="border-b">
                              <td className="whitespace-nowrap p-3 text-sm font-medium ">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm font-medium ">
                                {productsList.length > 0 ? (
                                  <Selectbox
                                    items={productsList}
                                    defaultItem={productsList[0]}
                                    onSelect={(selected) => {
                                      setFieldValue(
                                        `list.${index}.total_qty`,
                                        selected.quantity
                                      );
                                      setFieldValue(
                                        `list.${index}.product_name`,
                                        selected.name
                                      );
                                      setFieldValue(
                                        `list.${index}.product_price`,
                                        selected.price
                                      );
                                      setFieldValue(
                                        `list.${index}.total_price`,
                                        selected.price * item.quantity
                                      );
                                    }}
                                  />
                                ) : (
                                  <span className="w-full inline-block p-4 rounded-md animate-pulse"></span>
                                )}
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm font-medium ">
                                <Field
                                  type="number"
                                  name={`list.${index}.quantity`}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `list.${index}.quantity`,
                                      e.target.value
                                    );
                                    setFieldValue(
                                      `list.${index}.total_price`,
                                      e.target.value * item.product_price
                                    );
                                  }}
                                  className="input-text"
                                  min={0}
                                  max={7}
                                />
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm">
                                <b>{item.product_price || 0}</b> OMR
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm">
                                <b>{item.total_price}</b> OMR
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm">
                                <button
                                  type="button"
                                  onClick={pop}
                                  className="rounded-full p-1 group hover:bg-red-50 hover:text-red-500"
                                >
                                  <TrashIcon className="w-6 h-6 inline-block" />
                                </button>
                              </td>
                            </tr>
                          ))}

                        <tr>
                          <td colSpan={6} className="p-2">
                            <button
                              onClick={() => push(itemEntry)}
                              className="w-1/2 mx-auto py-2 rounded-md font-medium border-gray-300 bg-gray-50 border flex justify-center items-center text-gray-700 hover:border-gray-500 hover:text-gray-900 hover:bg-white gap-x-2"
                            >
                              <PlusIcon className="w-5 h-5 stroke-gray-700" />
                              <span>Add Item</span>
                            </button>
                          </td>
                        </tr>
                      </>
                    )}
                  </FieldArray>
                </SimpleTable>
              </div>
              <div className="text-end">
                <dt>Total Bill</dt>
                <dd>
                  {values.list.reduce(
                    (accu, item) => accu + item.total_price,
                    0
                  )}
                </dd>
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PrinterIcon className="w-5 h-5 stroke-white" />
                  <span>Save & Print</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}
