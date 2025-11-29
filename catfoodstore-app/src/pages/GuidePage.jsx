import React from "react";
import { useNavigate } from "react-router-dom";

export default function GuidePage() {
  const navigate = useNavigate();

  // ฟังก์ชันพาไปหน้ารวมสินค้า พร้อม query
  function goFilter(params) {
    const q = new URLSearchParams(params).toString();
    navigate(`/products?${q}`);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            เลือกสูตรที่เหมาะกับแมวของคุณ
          </h1>
          <p className="text-gray-600 text-lg">
            เลือกตามช่วงวัย ประเภทอาหาร และสายพันธุ์ได้เลย
          </p>
        </div>

        {/* AGE */}
        <SectionTitle title="เลือกตามอายุแมว" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <ClickableCard
            title="ลูกแมว (Kitten)"
            desc="2–12 เดือน ต้องการโปรตีนสูง"
            img="/catfood/images/kitten.jpg"
            onClick={() => goFilter({ age: "kitten" })}
          />
          <ClickableCard
            title="แมวโต (Adult)"
            desc="โภชนาการสมดุลสำหรับแมวโต"
            img="/catfood/images/adult cat.jpg"
            onClick={() => goFilter({ age: "adult" })}
          />
          <ClickableCard
            title="สุขภาพพิเศษ"
            desc="ดูแลปัญหาระบบปัสสาวะ ขน น้ำหนัก"
            img="/catfood/icons/health.png"
            onClick={() => goFilter({ age: "special_care" })}
          />
        </div>

        {/* FOOD TYPE */}
        <SectionTitle title="เลือกตามประเภทอาหาร" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <ClickableCard
            title="อาหารเม็ด (Dry)"
            desc="เหมาะกับแมวส่วนมาก"
            img="/catfood/icons/dry.png"
            onClick={() => goFilter({ type: "dry" })}
          />
          <ClickableCard
            title="อาหารเปียก (Wet)"
            desc="เพิ่มความชุ่มชื้น"
            img="/catfood/icons/wet.png"
            onClick={() => goFilter({ type: "wet" })}
          />
          <ClickableCard
            title="ขนมแมว"
            desc="เพิ่มความสุขให้เจ้านาย"
            img="/catfood/icons/snack.png"
            onClick={() => goFilter({ type: "snack" })}
          />
        </div>

        {/* BREED */}
        <SectionTitle title="เลือกตามสายพันธุ์แมว" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <ClickableCard
            title="ทุกสายพันธุ์"
            desc="เหมาะกับแมวทั่วไป"
            img="/catfood/icons/all-breeds.png"
            onClick={() => goFilter({ breed: "all" })}
          />
          <ClickableCard
            title="เปอร์เซีย"
            desc="สายพันธุ์ขนยาว ดูแลขนเป็นพิเศษ"
            img="/catfood/icons/persian.png"
            onClick={() => goFilter({ breed: "เปอร์เซีย" })}
          />
          <ClickableCard
            title="บริติชช็อตแฮร์"
            desc="เน้นควบคุมน้ำหนัก"
            img="/catfood/icons/british.png"
            onClick={() => goFilter({ breed: "บริติชช็อตแฮร์" })}
          />
        </div>
      </div>
    </div>
  );
}

/* --------------------------
   Components
--------------------------- */

function SectionTitle({ title }) {
  return (
    <h2 className="text-2xl font-bold mb-5 border-l-4 border-red-600 pl-3">
      {title}
    </h2>
  );
}

function ClickableCard({ title, desc, img, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 w-full text-left"
    >
      <div className="flex flex-col items-center">
        <img
          src={img}
          alt=""
          className="h-24 w-24 object-contain mb-4"
        />
        <h3 className="font-bold text-xl mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
        <div className="mt-3 text-red-600 font-semibold">
          ดูสูตรที่เหมาะ →
        </div>
      </div>
    </button>
  );
}
