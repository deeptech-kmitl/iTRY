'use client'

import Providers from "./components/Providers";

export default function ITryApp({
  children,
}: {
  children?: React.ReactNode
}) {

  return (
    <Providers>{children}</Providers>
  )
}