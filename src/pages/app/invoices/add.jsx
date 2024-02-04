import Selectbox from "@/components/Selectbox";
import SimpleTable from "@/components/Tables/Simple";
import { useProduct } from "@/context/GeneralContext";
import AppLayout from "@/layouts/AppLayout";
import { PlusIcon, PrinterIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Field, FieldArray, Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";

import dayjs from "dayjs";
const headers = [
  "Item Name",
  "Quantity",
  "Available",
  "Unit Price",
  "Total Price",
  "Action",
];

const itemEntry = {
  product_name: "",
  quantity: 0,
  available_qty: 0,
  total_qty: 0,
  product_price: 0,
  total_price: 0,
};

export default function AddInvoice() {
  const {
    fetchAllProducts,
    allProducts,
    addInvoice,
    addProduct,
    error,
    isLoading,
  } = useProduct();
  const productsList =
    allProducts.length > 0
      ? allProducts.map((e) => ({
          id: e.product_id,
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
            gross_bill: 0,
            net_bill: 0,
            discount: 0,
            list: [
              {
                product_id: 0,
                product_name: "",
                quantity: 0,
                available_qty: 0,
                total_qty: 0,
                product_price: 0,
                total_price: 0,
              },
            ],
          }}
          onSubmit={(values) => {
            const {
              customer_name,
              phone_no,
              bill_head_date,
              gross_bill,
              net_bill,
              discount,
              list,
            } = values;

            const filteredList = list.map(
              ({ product_name, quantity, product_price, total_price }) => {
                return {
                  product_name,
                  quantity,
                  product_price,
                  total_price,
                };
              }
            );
            const arrString = `${JSON.stringify(filteredList)}`;
            const query = `INSERT INTO billhead (bill_head_id, customer_name, phone_no, bill_head_date, gross_bill, net_bill, bill_discount, product_list) VALUES (${
              allProducts.length + 1
            }, '${customer_name}', '${phone_no}', '${bill_head_date}', ${gross_bill}, ${net_bill}, ${discount}, '${arrString}')`;
            const result = addInvoice({ query: query });

            const results = values.list.map((item) => {
              const query = `UPDATE products SET product_stock = ${item.available_qty} WHERE product_id = ${item.id}`;

              return addProduct({ query: query });
            });
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mt-4 flex items center gap-x-4">
                <Field
                  name="customer_name"
                  className="input-text"
                  placeholder="Customer Name"
                  required
                />
                <Field
                  name="phone_no"
                  className="input-text"
                  placeholder="Phone Number"
                  required
                />
                <Field
                  type="date"
                  name="bill_head_date"
                  className="input-text"
                  placeholder="Invoice Date"
                  required
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
                              <td className="whitespace-nowrap p-3 text-sm ">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm ">
                                {productsList.length > 0 ? (
                                  <Selectbox
                                    items={productsList}
                                    defaultItem={productsList[0]}
                                    onSelect={(selected) => {
                                      setFieldValue(
                                        `list.${index}.product_id`,
                                        selected.id
                                      );
                                      setFieldValue(
                                        `list.${index}.total_qty`,
                                        selected.total_qty
                                      );
                                      setFieldValue(
                                        `list.${index}.availabe_qty`,
                                        selected.total_qty - item.quantity
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
                              <td className="whitespace-nowrap p-3 text-sm ">
                                <Field
                                  type="number"
                                  min={1}
                                  max={item.total_qty}
                                  className="input-text"
                                  name={`list.${index}.quantity`}
                                  required
                                  onChange={(e) => {
                                    setFieldValue(
                                      `list.${index}.quantity`,
                                      +e.target.value
                                    );
                                    setFieldValue(
                                      `list.${index}.total_price`,
                                      +e.target.value * item.product_price
                                    );
                                    setFieldValue(
                                      `list.${index}.available_qty`,
                                      item.total_qty - +e.target.value
                                    );
                                  }}
                                />
                              </td>

                              <td className="whitespace-nowrap p-3 text-sm">
                                <b>{item.total_qty - item.quantity || 0}</b>
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm">
                                <b>{item.product_price.toFixed(1) || 0}</b> OMR
                              </td>
                              <td className="whitespace-nowrap p-3 text-sm">
                                <b>{item.total_price.toFixed(1)}</b> OMR
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
                              type="button"
                              onClick={() => push(itemEntry)}
                              className="w-1/2 mx-auto py-2 rounded-md border-gray-300 bg-gray-50 border flex justify-center items-center text-gray-700 hover:border-gray-500 hover:text-gray-900 hover:bg-gray-100 gap-x-2"
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
              <div className="flex  justify-between items-center">
                <CalculateBill />
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

function CalculateBill() {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue(
      "gross_bill",
      values.list.reduce((accu, item) => {
        return accu + item.total_price;
      }, 0)
    );
  }, [values.list]);

  useEffect(() => {
    setFieldValue(
      "net_bill",
      values.gross_bill - (values.discount / 100) * values.gross_bill
    );
  }, [values.gross_bill, values.discount]);

  return (
    <div className="flex flex-col gap-y-2 justify-end font-bold text-gray-800 text-xl mb-4">
      <div className="flex items-center gap-x-2">
        <dt>Gross Bill :</dt>
        <dd>{values.gross_bill.toFixed(1)}</dd>
      </div>
      <div className="flex items-center gap-x-2">
        <dt>Discount :</dt>
        <dd>
          <Field
            type="number"
            name={`discount`}
            className="input-text"
            min={0}
            max={100}
          />
        </dd>
        %
      </div>
      <div className="flex items-center gap-x-2">
        <dt>Net Bill :</dt>
        <dd>{values.net_bill.toFixed(1)}</dd>
      </div>
    </div>
  );
}
