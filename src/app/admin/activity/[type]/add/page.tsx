'use client'
import ManageActivityPage from "@/app/components/ManageActivityPage/ManageActivityPage"
import { TypeActivityParams } from "@/app/components/ManageActivityPage/activity"

interface AddActivityPageProps {
  params: TypeActivityParams
}

export default function AddtActivityPage({ params }: AddActivityPageProps) {

  return (
    <ManageActivityPage typeAction="add" typeActivity={params.type} />
  )
}