import { updateTravel } from "@/app/api/travel/route";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export default function useAddRoute(routeId: string) {
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

  const onSubmit = async (data: any) => {
    const result = await updateTravel({data, routeId}) as any;
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
