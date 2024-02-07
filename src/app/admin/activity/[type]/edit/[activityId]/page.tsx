'use client'
import ManageActivityPage from "@/app/components/ManageActivityPage/ManageActivityPage"
import { TypeActivityParams } from "@/app/components/ManageActivityPage/activity"

interface EditActivityPageProps {
  params: TypeActivityParams
}

export default function EdittActivityPage({ params }: EditActivityPageProps) {

  return (
    <ManageActivityPage typeAction="edit" typeActivity={params.type} />
  )
}