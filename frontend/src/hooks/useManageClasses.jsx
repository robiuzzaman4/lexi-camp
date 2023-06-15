import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useManageClasses = () => {
    const { loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ["classes"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/manage-classes")
            return res.data;
        }
    })

    return [classes, refetch];
};

export default useManageClasses;