import Image from "next/image";
import ITryButton from "../Button";

interface ManageableImageProps {
  itemId: string;
  itemImageUrl: string;
  onDelete: (id: string) => void;
}

export default function ManageableImage({ itemId, itemImageUrl, onDelete }: ManageableImageProps) {
  return (
    <>
      <Image priority className="w-full aspect-video object-cover object-top" src={itemImageUrl} alt={itemImageUrl} width={700} height={300} />
      <ITryButton customWidthClassName="w-full" onClick={() => onDelete(itemId)}>ลบ</ITryButton>
    </>
  )
}