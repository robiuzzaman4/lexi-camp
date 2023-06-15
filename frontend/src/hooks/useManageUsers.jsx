import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useManageUsers = () => {
    const { loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/manage-users")
            return res.data;
        }
    })

    return [users, refetch];
};

export default useManageUsers;
