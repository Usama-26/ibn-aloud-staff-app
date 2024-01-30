import { useEffect } from "react";
import { useProduct } from "@/context/GeneralContext";
import SimpleToggle from "@/components/Toggles/Simple";
import { Field, Form, Formik } from "formik";
import Spinner from "@/components/Loaders/Spinner";
import ModalLayout from "../ModalLayout";

export default function AddProductModal({ open, setOpen }) {
  const {
    allCompanies,
    allSuppliers,
    fetchAllCompanies,
    fetchAllSuppliers,
    addProduct,
    isLoading,
    error,
  } = useProduct();

  const initialValues = {
    supplier_id: allSuppliers[0]?.supplier_id || 0,
    produced_company_id: allCompanies[0]?.produced_company_id || 0,
    product_name: "",
    product_name_arabic: "",
    product_cost: 0.0,
    product_price: 0.0,
    product_stock: 0,
    stock_alert: 0,
    product_unit: "piece",
    p_color: "red",
    p_size: "",
    isvat: false,
  };

  useEffect(() => {
    const companyQuery = "SELECT * FROM produced_company";
    const supplierQuery = "SELECT * FROM suppliers";

    fetchAllCompanies({ query: companyQuery });
    fetchAllSuppliers({ query: supplierQuery });
  }, []);

  return (
    <ModalLayout open={open} setOpen={setOpen}>
      <div className="sm:my-8 sm:w-full sm:max-w-4xl">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const insertQuery = `INSERT INTO products 
                    (supplier_id, produced_company_id, product_name, product_name_arabic, product_cost, product_price, product_stock, stock_alert, product_unit, p_color, p_size) VALUES ( ${values.supplier_id}, ${values.produced_company_id}, '${values.product_name}', '${values.product_name_arabic}', ${values.product_cost}, ${values.product_price}, ${values.product_stock}, ${values.stock_alert}, '${values.product_unit}', '${values.p_color}', '${values.p_size}')`;
            const result = await addProduct({ query: insertQuery });
            if (result.status === 200) {
              setOpen(false);
            } else {
              console.log(result.status);
            }
          }}
        >
          {({ values, errors, setFieldValue }) => (
            <Form>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <h1 className="text-xl font-medium text-gray-900">
                  Add Product
                </h1>
                <div className="flex gap-6 my-8 divide-x">
                  {/* GENERAL INFO */}
                  <div className="basis-3/4 space-y-6">
                    <div className="flex lg:flex-row flex-col gap-4">
                      <div className="basis-full">
                        <label
                          htmlFor="supplier_id"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Supplier
                        </label>
                        <Field
                          id="supplier_id"
                          name="supplier_id"
                          className="input-select"
                          as="select"
                        >
                          {allSuppliers.length > 0
                            ? allSuppliers.map((supplier) => (
                                <option
                                  value={supplier.supplier_id}
                                  key={supplier.supplier_id}
                                >
                                  {supplier.supplier_name}
                                </option>
                              ))
                            : null}
                        </Field>
                      </div>
                      <div className="basis-full">
                        <label
                          htmlFor="produced_company_id"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Production Company
                        </label>
                        <Field
                          id="produced_company_id"
                          name="produced_company_id"
                          className="input-select"
                          as="select"
                        >
                          {allCompanies.length > 0
                            ? allCompanies.map((company) => (
                                <option
                                  value={company.produced_company_id}
                                  key={company.produced_company_id}
                                >
                                  {company.produced_company_name}
                                </option>
                              ))
                            : null}
                        </Field>
                      </div>
                      <div className="basis-full">
                        <label
                          htmlFor="product_unit"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Unit
                        </label>
                        <Field
                          id="product_unit"
                          name="product_unit"
                          className="input-select"
                          as="select"
                        >
                          <option value="piece">Piece</option>
                        </Field>
                      </div>
                    </div>
                    <div className="flex lg:flex-row flex-col gap-4">
                      <div className="basis-1/2">
                        <label
                          htmlFor="product_name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Name
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            name="product_name"
                            id="product_name"
                            className="input-text"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      <div className="basis-1/2">
                        <label
                          htmlFor="product_name_arabic"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Product Name Arabic
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            name="product_name_arabic"
                            id="product_name_arabic"
                            className="input-text"
                            placeholder="Enter Arabic Name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex lg:flex-row flex-col gap-4">
                      <div className="basis-full">
                        <label
                          htmlFor="p_color"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Color
                        </label>
                        <Field
                          id="p_color"
                          name="p_color"
                          className="input-select"
                          as="select"
                        >
                          <option value="red">Red</option>
                          <option value="green">Green</option>
                          <option value="blue">Blue</option>
                        </Field>
                      </div>
                      <div className="basis-full">
                        <label
                          htmlFor="p_model"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Model
                        </label>
                        <Field
                          id="p_model"
                          name="p_model"
                          className="input-select"
                          as="select"
                        >
                          <option value="2018-2020">2018-2020</option>
                          <option value="2015-2017">2015-2017</option>
                        </Field>
                      </div>
                      <div className="basis-full">
                        <label
                          htmlFor="p_size"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Size
                        </label>
                        <div className="mt-2">
                          <Field
                            type="text"
                            name="p_size"
                            id="p_size"
                            className="input-text"
                            placeholder="Enter Size"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <SimpleToggle
                        enabled={values.isvat}
                        setEnabled={(value) => setFieldValue("isvat", value)}
                      >
                        <span className="font-medium text-gray-900 mr-4">
                          VAT Product ?
                        </span>
                      </SimpleToggle>
                    </div>
                  </div>
                  {/* COST & STOCK */}
                  <div className="basis-1/4 flex flex-col gap-4 px-4">
                    <div>
                      <label
                        htmlFor="product_cost"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cost
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <Field
                          type="number"
                          name="product_cost"
                          id="product_cost"
                          className="block w-full rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0.00"
                          min={0}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">OMR</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="product_price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <Field
                          type="number"
                          name="product_price"
                          id="product_price"
                          className="block w-full rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0.00"
                          min={0}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm">OMR</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="product_stock"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Product Stock
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <Field
                          type="number"
                          name="product_stock"
                          id="product_stock"
                          className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0"
                          min={0}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="stock_alert"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Stock Alert
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <Field
                          type="number"
                          name="stock_alert"
                          id="stock_alert"
                          className="block w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="0"
                          min={0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-500 sm:ml-3 sm:w-auto"
                  // onClick={() => setOpen(false)}
                >
                  {isLoading ? <Spinner /> : "Add Product"}
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
}
