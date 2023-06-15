import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyClasses = () => {
    const { user, loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const { data: myClasses = [], refetch } = useQuery({
        queryKey: ["myClasses"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/instructor/my-classes/${user?.email}`)
            return res.data;
        }
    })

    return [myClasses, refetch];
};

export default useMyClasses;