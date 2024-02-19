'use client'

import { ToastContainer } from "react-toastify";
import Providers from "./components/Providers";

export default function ITryApp({
  children,
}: {
  children?: React.ReactNode
}) {

  return (
    <Providers>
      {children}
      <ToastContainer />
    </Providers>
  )
}