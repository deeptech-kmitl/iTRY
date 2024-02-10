import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function useAddRoute() {
    const schema = yup.object().shape({
        routeDetail: yup.string(),
    });

    const { register, setValue, getValues, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data:any) => {
        console.log(data)
    }


    return {
        register,
        setValue,
        getValues,
        handleSubmit,
        errors,
        onSubmit
    }

}