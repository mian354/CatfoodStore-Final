import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([]);
  const [errorItem, setErrorItem] = useState(null);   // ⭐ แจ้งเตือนสินค้าไหนเกิน stock

  /* -------- LOAD CART -------- */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(mergeDuplicates(saved));
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

  /* -------- SELECT ITEM (TICK) -------- */
  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  /* -------- DELETE SELECTED ITEMS -------- */
  const deleteSelected = () => {
    const updated = cart.filter((item) => !selected.includes(item.id));
    updateCart(updated);
    setSelected([]);
  };

  /* -------- QUANTITY + (LIMIT BY STOCK) -------- */
  const increase = (id) => {
    const updated = cart.map((item) => {
      if (item.id === id) {
        if (item.quantity >= item.stock) {
          setErrorItem(id); // ⭐ แสดงแจ้งเตือนตัวนี้
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    updateCart(updated);

    // ซ่อนข้อความเตือนใน 2 วิ
    setTimeout(() => setErrorItem(null), 2000);
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

  /* -------- CLEAR CART -------- */
  const clearCart = () => {
    updateCart([]);
    setSelected([]);
  };

  /* -------- TOTAL PRICE -------- */
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ============================ */
  /* EMPTY CART UI                */
  /* ============================ */
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
            {/* CHECKBOX */}
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              onChange={() => toggleSelect(item.id)}
              className="h-5 w-5 accent-red-600"
            />

            <img
              src={item.image_url}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <div className="flex-1">
              {/* ชื่อ + น้ำหนัก */}
              <h2 className="font-semibold text-lg">
                {item.name}{" "}
                <span className="font-semibold text-gray-800">{item.weight}</span>
              </h2>

              {/* ราคา */}
              <p className="text-red-600 font-bold mt-1">{item.price} ฿</p>

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

              {/* ⭐ แจ้งเตือนเมื่อเกิน stock */}
              {errorItem === item.id && (
                <p className="text-red-600 text-sm mt-2 font-medium">
                  ❗ เพิ่มไม่ได้ค่ะ — สินค้ามีทั้งหมด {item.stock} ชิ้น
                </p>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex justify-between items-center">
        <button
          disabled={selected.length === 0}
          onClick={deleteSelected}
          className={`px-5 py-3 rounded-lg font-medium transition 
            ${
              selected.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }
          `}
        >
          ลบรายการที่เลือก
        </button>

        <button
          onClick={clearCart}
          className="text-gray-600 hover:text-red-600 underline"
        >
          ล้างตะกร้าทั้งหมด
        </button>
      </div>

      {/* SUMMARY */}
      <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-sm border">
        <h3 className="text-xl font-bold mb-4">สรุปคำสั่งซื้อ</h3>

        <div className="flex justify-between text-lg mb-4">
          <span>ยอดรวมสินค้า:</span>
          <span className="font-semibold">{total} ฿</span>
        </div>

        <Link
          to="/checkout"
          className="w-full text-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 text-lg font-semibold block"
        >
          ดำเนินการชำระเงิน →
        </Link>
      </div>
    </div>
  );
}
