"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProduct } from "@/store/actions/admin/product";
import BillingForm from "@/components/checkout/BillingAddress";
import ShippingAddress from "@/components/checkout/ShippingAddress";

const ManualInvoicePage = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState<any[]>([]);
  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });
  const [billingAddress, setBillingAddress] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");

  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [discount, setDiscount] = useState<number>(0);
  const [billingErrors, setBillingErrors] = useState<any>({});
  const [shippingErrors, setShippingErrors] = useState<any>({});
  const [sameAsBilling, setSameAsBilling] = useState<boolean>(true);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [selectedShipping, setSelectedShipping] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        fetchProducts(search);
      } else {
        setProducts([]);
        setShowDropdown(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const fetchProducts = async (searchTerm: string) => {
    try {
      setLoading(true);
      const res = await dispatch(getProduct({ search: searchTerm, page: 1 })).unwrap();
      if (res.success) {
        setProducts(res.data.result);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = (index: number, key: string, value: any) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const addProductToInvoice = (product: any) => {
    setItems([...items, { description: product.name, price: product.regular_price, quantity: 1 }]);
    setSearch("");
    setShowDropdown(false);
  };

  const total = items.reduce((sum, item) => sum + (item.quantity || 1) * (item.price || 0), 0);
  const discountAmount = (total * discount) / 100;
  const totalAfterDiscount = total - discountAmount;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 bg-white  mt-10 rounded-2xl space-y-10 text-gray-800">
      <h1 className="text-4xl font-bold border-b pb-4">🧾 Create Manual Invoice</h1>

      {/* Customer Info */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">👤 Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-blue-500"
          />
          <input
            type="email"
            placeholder="Customer Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            className="border px-4 py-2 rounded-lg shadow-sm focus:outline-blue-500"
          />
        </div>
      </div>

      {/* Billing & Shipping */}
      <div className="space-y-6">
        <BillingForm
          setBillingErrors={setBillingErrors}
          billingErrors={billingErrors}
          setBillingAddress={setBillingAddress}
          billingAddress={billingAddress}
        />
        <ShippingAddress
          setShippingPrice={setShippingPrice}
          setSelectedShipping={setSelectedShipping}
          setSelectedMethod={setSelectedMethod}
          shippingErrors={shippingErrors}
          sameAsBilling={sameAsBilling}
          setSameAsBilling={setSameAsBilling}
          shippingAddress={shippingAddress}
          setShippingAddress={setShippingAddress}
        />
      </div>

      {/* Product Search */}
      <div className="relative">
        <h2 className="text-2xl font-semibold mb-2">🛒 Add Products</h2>
        <input
          type="text"
          placeholder="Search for a product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-blue-500"
        />
        {loading && <span className="absolute right-4 top-3 text-gray-400 text-sm">Loading...</span>}
        {showDropdown && products.length > 0 && (
          <ul className="absolute z-50 bg-white border rounded shadow w-full mt-2 max-h-60 overflow-y-auto">
            {products.map((product: any) => (
              <li
                key={product._id}
                onClick={() => addProductToInvoice(product)}
                className="px-4 py-2 hover:bg-gray-100 flex justify-between cursor-pointer"
              >
                <span>{product.name}</span>
                <span className="text-gray-500">${product.regular_price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Invoice Items */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">📦 Invoice Items</h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(index, "description", e.target.value)}
                className="border px-3 py-2 rounded-lg"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", +e.target.value)}
                className="border px-3 py-2 rounded-lg"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => updateItem(index, "price", +e.target.value)}
                className="border px-3 py-2 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Discount & Totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">💸 Discount (%)</label>
          <input
            type="number"
            placeholder="Discount"
            value={discount}
            onChange={(e) => setDiscount(+e.target.value)}
            className="border px-4 py-2 rounded-lg w-full shadow-sm"
          />
        </div>
        <div className="text-right space-y-1">
          <div className="text-lg font-medium">Subtotal: <span className="font-semibold">${total.toFixed(2)}</span></div>
          <div className="text-lg font-medium">Discount: <span className="text-red-500">-${discountAmount.toFixed(2)}</span></div>
          <div className="text-xl font-bold border-t pt-2">Total: <span className="text-green-600">${totalAfterDiscount.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default ManualInvoicePage;
