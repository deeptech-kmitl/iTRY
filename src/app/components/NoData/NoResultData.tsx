interface NoResultDataProps {
  text?: string;
}

export default function NoResultData({ text = "ไม่มีข้อมูลที่คุณต้องการ" }: NoResultDataProps) {
  return (
    <h1 className="font-bold text-base md:text-xl lg:text-2xl">{text}</h1>
  )
}