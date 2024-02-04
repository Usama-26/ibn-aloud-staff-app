import axios from "axios";
const { createContext, useReducer, useContext } = require("react");

function reducer(state, action) {
  switch (action.type) {
    case "get/allProducts":
      return { ...state, allProducts: action.payload, isLoading: false };

    case "get/allSuppliers":
      return { ...state, allSuppliers: action.payload, isLoading: false };

    case "get/allCompanies":
      return { ...state, allCompanies: action.payload, isLoading: false };

    case "insert/product":
      return { ...state, newProduct: action.payload, isLoading: false };

    case "insert/invoice":
      return { ...state, newInvoice: action.payload, isLoading: false };

    case "get/invoices":
      return { ...state, invoices: action.payload, isLoading: false };

    case "loading":
      return { ...state, isLoading: true, error: "" };

    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
  }
}

const initialState = {
  allProducts: [],
  allCompanies: [],
  allSuppliers: [],
  newProduct: null,
  newInvoice: null,
  invoices: [],
  isLoading: false,
  error: "",
};

const GeneralContext = createContext();

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

function GeneralProvider({ children }) {
  const [
    {
      allProducts,
      allSuppliers,
      allCompanies,
      newProduct,
      newInvoice,
      invoices,
      isLoading,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const fetchAllProducts = async (queryObj) => {
    dispatch({ type: "loading" });

    try {
      const response = await axios.post(backendUrl, queryObj);
      dispatch({ type: "get/allProducts", payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      return error.message;
    }
  };

  const fetchAllSuppliers = async (queryObj) => {
    dispatch({ type: "loading" });

    try {
      const response = await axios.post(backendUrl, queryObj);
      dispatch({ type: "get/allSuppliers", payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      return error.message;
    }
  };

  const fetchAllCompanies = async (queryObj) => {
    dispatch({ type: "loading" });

    try {
      const response = await axios.post(backendUrl, queryObj);
      dispatch({ type: "get/allCompanies", payload: response.data });
      return response.data;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      return error.message;
    }
  };

  const addProduct = async (queryObj) => {
    dispatch({ type: "loading" });

    try {
      const response = await axios.post(backendUrl, queryObj);
      dispatch({ type: "insert/product", payload: response.data });

      return response;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      return error.message;
    }
  };

  const fetchInvoices = async (queryObj) => {
    dispatch({ type: "loading" });

    try {
      const response = await axios.post(backendUrl, queryObj);
      dispatch({ type: "get/invoices", payload: response.data });

      return response;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      return error.message;
    }
  };

  const addInvoice = async (queryObj) => {
    dispatch({ type: "loading" });

    try {
      const response = await axios.post(backendUrl, queryObj);
      console.log(response);
      dispatch({ type: "insert/invoice", payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
      console.log(error);
      return error;
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        allProducts,
        allSuppliers,
        allCompanies,
        newProduct,
        newInvoice,
        invoices,
        isLoading,
        error,
        fetchAllProducts,
        fetchAllSuppliers,
        fetchAllCompanies,
        fetchInvoices,
        addProduct,
        addInvoice,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

function useProduct() {
  const context = useContext(GeneralContext);
  const {
    allProducts,
    allCompanies,
    allSuppliers,
    isLoading,
    newProduct,
    newInvoice,
    invoices,
    error,
    fetchAllProducts,
    fetchAllSuppliers,
    fetchAllCompanies,
    fetchInvoices,
    addProduct,
    addInvoice,
  } = context;

  return {
    allProducts,
    allCompanies,
    allSuppliers,
    newProduct,
    newInvoice,
    isLoading,
    invoices,
    error,
    fetchAllProducts,
    fetchAllSuppliers,
    fetchAllCompanies,
    fetchInvoices,
    addProduct,
    addInvoice,
  };
}

export { GeneralProvider, useProduct };
