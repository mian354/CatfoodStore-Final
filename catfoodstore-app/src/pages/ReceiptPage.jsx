import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ReceiptPage() {
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [loaded, setLoaded] = useState(false); // ⭐ ป้องกัน render ก่อนโหลดข้อมูลจริง

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(saved); // ⭐ เก็บข้อมูลไว้ก่อน
    setOrderId("CF-" + Date.now().toString().slice(-6));

    setLoaded(true); // ⭐ บอกว่าข้อมูลโหลดเสร็จแล้ว

    // ⭐ เคลียร์หลังจากโหลดเสร็จเท่านั้น (delay 100ms ให้ react set state ก่อน)
    setTimeout(() => {
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cart-updated"));
    }, 100);

  }, []);

  if (!loaded) {
    return (
      <div className="text-center py-20 text-gray-500">
        กำลังโหลดใบเสร็จ...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">ไม่พบข้อมูลคำสั่งซื้อ</h1>
        <Link
          to="/products"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          เลือกซื้อสินค้า
        </Link>
      </div>
    );
  }

  const total = cart.reduce(
    (sum, i) => sum + i.price * (i.quantity || 1),
    0
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">🧾 ใบเสร็จคำสั่งซื้อ</h1>

      <div className="bg-white shadow-md rounded-xl p-6 space-y-4 border">

        <p><strong>หมายเลขคำสั่งซื้อ:</strong> {orderId}</p>
        <p><strong>วันที่:</strong> {new Date().toLocaleDateString()}</p>

        <hr />

        <h2 className="text-xl font-bold mb-3">รายการสินค้า</h2>

        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>{item.price * item.quantity} ฿</span>
            </div>
          ))}
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>ยอดรวมทั้งหมด:</span>
          <span>{total} ฿</span>
        </div>

      </div>

      <div className="text-center mt-8">
        <Link
          to="/"
          className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold"
        >
          กลับไปหน้าแรก
        </Link>
      </div>
    </div>
  );
}
