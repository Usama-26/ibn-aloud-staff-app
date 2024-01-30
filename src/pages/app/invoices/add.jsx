import Selectbox from "@/components/Selectbox";
import SimpleTable from "@/components/Tables/Simple";
import { useProduct } from "@/context/GeneralContext";
import AppLayout from "@/layouts/AppLayout";
import { classNames } from "@/utils/generics";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";
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
  const [list, setList] = useState([]);
  const { fetchAllProducts, allProducts, error, isLoading } = useProduct();
  const productsList =
    allProducts.length > 0
      ? allProducts.map((e) => ({
          id: e.product_name,
          name: e.product_name_arabic,
          total_qty: e.product_stock,
          price: e.product_price,
        }))
      : [];

  const addItem = () => {
    setList((prev) => [...prev, itemEntry]);
  };

  const popItem = (index) => {
    setList((prev) => {
      const newList = [...prev];
      newList.splice(index, 1);
      return newList;
    });
  };

  useEffect(() => {
    const query =
      "SELECT TOP (100) product_id product_name, product_name_arabic, product_stock, product_cost, product_price FROM products";
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
          }}
        >
          {({ values }) => (
            <Form className=" mt-4 flex justify-between gap-4">
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
            </Form>
          )}
        </Formik>
        <div className="mt-10">
          <SimpleTable headers={headers}>
            {list.length > 0
              ? list.map((item, index) => (
                  <Formik key={index} initialValues={item}>
                    {({ values, setFieldValue }) => (
                      <tr key={index} className="border-b">
                        <td className="whitespace-nowrap p-3 text-sm font-medium ">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm font-medium ">
                          {productsList.length > 0 ? (
                            <Selectbox
                              items={productsList}
                              defaultItem={productsList[0]}
                              onSelect={(item) => {
                                setFieldValue("total_qty", item.quantity);
                                setFieldValue("product_name", item.name);
                                setFieldValue("product_price", item.price);
                              }}
                            />
                          ) : (
                            <span className="inline-block p-4 rounded-md animate-pulse"></span>
                          )}
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm font-medium ">
                          <Field
                            type="number"
                            name="quantity"
                            value={values.quantity}
                            className="input-text"
                          />
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm">
                          <b>{values.product_price || 0}</b> OMR
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm">
                          <b>{values.quantity * values.product_price || 0}</b>{" "}
                          OMR
                        </td>
                        <td className="whitespace-nowrap p-3 text-sm">
                          <button
                            type="button"
                            onClick={() => popItem(index)}
                            className="rounded-full p-1 group hover:bg-red-50 hover:text-red-500"
                          >
                            <TrashIcon className="w-6 h-6 inline-block" />
                          </button>
                        </td>
                      </tr>
                    )}
                  </Formik>
                ))
              : null}
            <tr>
              <td colSpan={6} className="p-2">
                <button
                  onClick={addItem}
                  className="w-1/2 mx-auto py-2 rounded-md font-medium border-gray-300 bg-gray-50 border flex justify-center items-center text-gray-700 hover:border-gray-500 hover:text-gray-900 hover:bg-white gap-x-2"
                >
                  <PlusIcon className="w-5 h-5 stroke-gray-700" />
                  <span>Add Item</span>
                </button>
              </td>
            </tr>
          </SimpleTable>
        </div>
      </div>
    </AppLayout>
  );
}
