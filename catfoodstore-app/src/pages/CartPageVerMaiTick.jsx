import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  /* -------- LOAD CART -------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    const merged = mergeDuplicates(saved);
    setCart(merged);
  }, []);

  /* -------- MERGE DUPLICATES -------- */
  const mergeDuplicates = (items) => {
    const map = {};

    items.forEach((item) => {
      if (map[item.id]) {
        map[item.id].quantity += item.quantity || 1;
      } else {
        map[item.id] = { ...item, quantity: item.quantity || 1 };
      }
    });

    return Object.values(map);
  };

  /* -------- SAVE CART + NOTIFY NAVBAR -------- */
  const updateCart = (updated) => {
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  /* -------- QUANTITY + -------- */
  const increase = (id) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  /* -------- QUANTITY - -------- */
  const decrease = (id) => {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((i) => i.quantity > 0);

    updateCart(updated);
  };

  /* -------- REMOVE ITEM -------- */
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  /* -------- CLEAR CART -------- */
  const clearCart = () => updateCart([]);

  /* -------- TOTAL PRICE -------- */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* EMPTY CART UI */
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">ตะกร้าว่างเปล่า</h1>
        <p className="text-gray-600 mb-6">ยังไม่มีสินค้าในตะกร้าเลยค่ะ 🎀</p>

        <Link
          to="/products"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          เลือกซื้อสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-6">ตะกร้าสินค้า</h1>

      {/* CART ITEMS */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border"
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-red-600 font-bold">{item.price} ฿</p>

              {/* QUANTITY BUTTONS */}
              <div className="flex items-center mt-2">
                <button
                  onClick={() => decrease(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                >
                  –
                </button>

                <span className="px-4 py-1 border-t border-b">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increase(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-600 font-bold text-lg hover:text-red-800 px-3"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold mb-4">สรุปคำสั่งซื้อ</h3>

        <div className="flex justify-between text-lg mb-4">
          <span>ยอดรวมสินค้า:</span>
          <span className="font-semibold">{total} ฿</span>
        </div>

        <button
          onClick={clearCart}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg mb-4 hover:bg-gray-300"
        >
          ล้างตะกร้าทั้งหมด
        </button>

        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 text-lg font-semibold"
        >
          ดำเนินการชำระเงิน →
        </button>
      </div>
    </div>
  );
}