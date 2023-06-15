import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMySelectedClasses = () => {
    const { user, loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const { data: mySelectedClasses = [], refetch } = useQuery({
        queryKey: ["mySelectedClasses"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/my-selected-classes/${user?.email}`);
            return res.data
        }
    })
    return [mySelectedClasses, refetch];
};

export default useMySelectedClasses;