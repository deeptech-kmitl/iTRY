'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

async function getActivityOpen() {
  try {
    const response = await axios.get('http://localhost:3000/api/allActivity/camper');
    return response.data; // ส่งค่าข้อมูลที่ได้รับกลับ
  } catch (error) {
    console.error(error);
    return null; // หากเกิดข้อผิดพลาดในการเรียก API
  }
}

export default function ActivityOpen() {
  const [activityData, setActivityData] = useState<any[]>([]); // กำหนดให้ activityData มีชนิดข้อมูลเป็น any[] เริ่มต้นด้วยการกำหนดค่าเป็น []

  useEffect(() => {
    async function fetchData() {
      const data = await getActivityOpen(); // เรียกใช้ฟังก์ชันใน useEffect
      if (data) {
        setActivityData(data.Items); // อัพเดท state ด้วยข้อมูลที่ได้รับ หากมีข้อมูลที่ถูกต้อง
        console.log("dataActivity :", data)
      }
    }
    fetchData();
  }, []); // ใช้งาน useEffect() เพื่อเรียกใช้ getActivityOpen() หลังจากคอมโพเนนต์ถูกโหลดเสร็จ

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-BlueO md:border-2 md:border-neonBlue rounded-xl my-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 md:gap-4">
        {activityData.length > 0 ? (
          <div>
            {activityData.slice(0, 6).map((item, key) => (
              <div key={key} className="flex flex-col items-center p-3 md:p-5 max-w-xs">
                <img src={item.imageUrl} alt={item.activityId} width="120" height="120" className="object-cover w-full h-full rounded-image border-2 border-neonBlue" />
                <div className="text-center pt-3">
                  <p className="text-sm md:text-ls">{item.activityName}</p>
                  <p className="text-xs md:text-base text-slate-400">กำลังเปิดรับสมัคร</p>
                </div>
              </div>
            ))}</div>) : (
          <p className="text-lg text-center">ยังไม่มีกิจกรรมที่เปิดรับสมัครในช่วงนี้</p>
        )}
      </div>
    </div>
  );
}
