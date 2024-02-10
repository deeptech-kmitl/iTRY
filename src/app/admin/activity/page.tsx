
import React from 'react';
import { useState } from 'react';
import { CardActivityAdmin } from '../../components/CardActivity';


export default function ActivityPage() {
  
  return (
    <div>
      <div className="pb-5">
        <h1 className="text-3xl text-extrabold text-center">กิจกรรมทั้งหมด</h1>
      </div>
      <CardActivityAdmin />
    </div>
  );
}
