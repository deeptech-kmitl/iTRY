import Image from "next/image";
import ITryButton from "../Button";

interface ManageableImageProps {
  itemId: string;
  itemImageUrl: string;
  deleteFunc: (id: string) => void;
}

export default function ManageableImage({
  itemId,
  itemImageUrl,
  deleteFunc,
}: ManageableImageProps) {
  return (
    <>
      <Image
        className="w-full aspect-video object-cover object-center"
        src={itemImageUrl}
        alt={itemImageUrl}
        width={700}
        height={300}
      />
      <ITryButton
        customWidthClassName="w-full"
        onClick={() => {
          deleteFunc(itemId);
        }}
      >
        ลบ
      </ITryButton>
    </>
  );
}
