"use client"

import { useState } from "react"

export default function useActivity() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = () => {
      setIsDialogOpen(true);
    };
  
    const closeDialog = () => {
      setIsDialogOpen(false);
    };
  
    const handleDelete = () => {
      console.log("ลบ");
      closeDialog();
    };
}