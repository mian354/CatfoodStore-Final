import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  /* ======================== ADD FORM ======================== */
  const [showAddForm, setShowAddForm] = useState(false);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [newAge, setNewAge] = useState("kitten");
  const [newCategory, setNewCategory] = useState("dry");

  const [newBreed, setNewBreed] = useState(["all"]);
  const [newHealth, setNewHealth] = useState(["all"]);

  const breedOptions = ["all", "persian", "siamese", "maine_coon"];
  const healthOptions = ["all", "urinary", "hairball", "digestive"];

  /* ======================== EDIT FORM ======================== */
  const [editItem, setEditItem] = useState(null);

  const token = localStorage.getItem("token");

  /* ======================== LOAD PRODUCTS ======================== */
  const fetchProducts = async () => {
    try {
      // ⭐ ใช้ route จริงของ backend
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("FETCH ERROR:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ======================== ADD PRODUCT ======================== */
  const addProduct = async () => {
    try {
      await axios.post(
        "/api/admin/products",
        {
          name: newName,
          description: newDesc,
          price: Number(newPrice),
          weight: newWeight,
          stock: Number(newStock),

          age_group: newAge,
          category: newCategory,
          breed_type: newBreed,
          special_care: newHealth,

          image_url: newImage,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("เพิ่มสินค้าเรียบร้อย");
      setShowAddForm(false);

      setNewName("");
      setNewPrice("");
      setNewImage("");
      setNewDesc("");
      setNewWeight("");
      setNewStock(0);
      setNewAge("kitten");
      setNewCategory("dry");
      setNewBreed(["all"]);
      setNewHealth(["all"]);

      fetchProducts();
    } catch (err) {
      console.error("ADD ERROR:", err);
      alert("เพิ่มสินค้าไม่สำเร็จ");
    }
  };

  /* ======================== UPDATE PRODUCT ======================== */
  const updateProduct = async () => {
    try {
      await axios.put(
        `/api/admin/products/${editItem.id}`,
        editItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("บันทึกสำเร็จ");
      setEditItem(null);
      fetchProducts();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
    }
  };

  /* ======================== DELETE PRODUCT ======================== */
  const deleteProduct = async (id) => {
    if (!window.confirm("ลบสินค้านี้?")) return;

    await axios.delete(`/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
  };

  /* ======================== UI ======================== */
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">จัดการสินค้า</h1>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-5"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        + เพิ่มสินค้าใหม่
      </button>

      {/* ======================== ADD FORM ======================== */}
      {showAddForm && (
        <div className="border p-5 rounded-xl bg-white shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">เพิ่มสินค้าใหม่</h2>

          <div className="grid gap-4">
            <input
              className="border p-2 rounded"
              placeholder="ชื่อสินค้า"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="ราคา"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="น้ำหนัก เช่น 400g / 1kg"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
            />

            <input
              type="number"
              className="border p-2 rounded"
              placeholder="จำนวนสต๊อก"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="ลิงก์รูปสินค้า"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
            />

            <textarea
              className="border p-2 rounded h-24"
              placeholder="รายละเอียดสินค้า"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
            ></textarea>

            {/* AGE */}
            <select
              className="border p-2 rounded"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            >
              <option value="kitten">ลูกแมว</option>
              <option value="adult">โตเต็มวัย</option>
              <option value="special_care">Special care</option>
            </select>

            {/* CATEGORY */}
            <select
              className="border p-2 rounded"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option value="dry">อาหารเม็ด</option>
              <option value="wet">อาหารเปียก</option>
              <option value="snack">ขนม</option>
            </select>

            {/* BREED TYPE */}
            <div>
              <p className="font-semibold">สายพันธุ์ที่เหมาะสม</p>
              {breedOptions.map((b) => (
                <label key={b} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newBreed.includes(b)}
                    onChange={() =>
                      setNewBreed((prev) =>
                        prev.includes(b)
                          ? prev.filter((x) => x !== b)
                          : [...prev, b]
                      )
                    }
                  />
                  {b}
                </label>
              ))}
            </div>

            {/* SPECIAL CARE */}
            <div>
              <p className="font-semibold">สุขภาพเฉพาะทาง</p>
              {healthOptions.map((h) => (
                <label key={h} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newHealth.includes(h)}
                    onChange={() =>
                      setNewHealth((prev) =>
                        prev.includes(h)
                          ? prev.filter((x) => x !== h)
                          : [...prev, h]
                      )
                    }
                  />
                  {h}
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={addProduct}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            เพิ่มสินค้า
          </button>
        </div>
      )}

      {/* ======================== PRODUCT LIST ======================== */}
      <div className="mt-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border p-4 rounded-lg mb-4 bg-white shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={p.image_url}
                alt={p.name}
                className="w-20 h-20 object-cover rounded border"
              />
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-gray-600">{p.price} บาท</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditItem(p)}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                แก้ไข
              </button>

              <button
                onClick={() => deleteProduct(p.id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ======================== EDIT MODAL ======================== */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[420px] shadow-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">แก้ไขสินค้า</h2>

            <input
              className="border p-2 w-full mb-3"
              value={editItem.name}
              onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            />

            <input
              type="number"
              className="border p-2 w-full mb-3"
              value={editItem.price}
              onChange={(e) =>
                setEditItem({ ...editItem, price: Number(e.target.value) })
              }
            />

            <input
              className="border p-2 w-full mb-3"
              value={editItem.image_url}
              onChange={(e) =>
                setEditItem({ ...editItem, image_url: e.target.value })
              }
            />

            <textarea
              className="border p-2 w-full mb-3 h-24"
              value={editItem.description}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
            ></textarea>

            <input
              className="border p-2 w-full mb-3"
              value={editItem.weight}
              onChange={(e) =>
                setEditItem({ ...editItem, weight: e.target.value })
              }
            />

            <input
              type="number"
              className="border p-2 w-full mb-3"
              value={editItem.stock}
              onChange={(e) =>
                setEditItem({ ...editItem, stock: Number(e.target.value) })
              }
            />

            <select
              className="border p-2 w-full mb-3"
              value={editItem.age_group}
              onChange={(e) =>
                setEditItem({ ...editItem, age_group: e.target.value })
              }
            >
              <option value="kitten">ลูกแมว</option>
              <option value="adult">โตเต็มวัย</option>
              <option value="special_care">Special care</option>
            </select>

            <select
              className="border p-2 w-full mb-3"
              value={editItem.category}
              onChange={(e) =>
                setEditItem({ ...editItem, category: e.target.value })
              }
            >
              <option value="dry">อาหารเม็ด</option>
              <option value="wet">อาหารเปียก</option>
              <option value="snack">ขนม</option>
            </select>

            {/* BREED TYPE */}
            <div className="mb-3">
              <p className="font-semibold">สายพันธุ์ที่เหมาะสม</p>
              {breedOptions.map((b) => (
                <label key={b} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editItem.breed_type?.includes(b)}
                    onChange={() => {
                      let updated = editItem.breed_type || [];
                      updated = updated.includes(b)
                        ? updated.filter((x) => x !== b)
                        : [...updated, b];

                      setEditItem({ ...editItem, breed_type: updated });
                    }}
                  />
                  {b}
                </label>
              ))}
            </div>

            {/* SPECIAL CARE */}
            <div className="mb-3">
              <p className="font-semibold">สุขภาพเฉพาะทาง</p>
              {healthOptions.map((h) => (
                <label key={h} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editItem.special_care?.includes(h)}
                    onChange={() => {
                      let updated = editItem.special_care || [];
                      updated = updated.includes(h)
                        ? updated.filter((x) => x !== h)
                        : [...updated, h];

                      setEditItem({ ...editItem, special_care: updated });
                    }}
                  />
                  {h}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setEditItem(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                ยกเลิก
              </button>

              <button
                onClick={updateProduct}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
