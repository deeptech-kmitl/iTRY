import { updateTravel } from "@/app/api/travel/route";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function useAddRoute(
  routeId: string,
  closeEditModal: () => void
) {
  const schema = yup.object().shape({
    routeDetail: yup.string(),
  });

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    const result = (await updateTravel({ data, routeId })) as any;
    closeEditModal();
    router.refresh();
  };

  return {
    register,
    setValue,
    getValues,
    handleSubmit,
    errors,
    onSubmit,
  };
}
