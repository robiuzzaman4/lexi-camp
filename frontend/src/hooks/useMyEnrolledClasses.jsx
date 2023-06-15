import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyEnrolledClasses = () => {
    const { user, loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const { data: myEnrolledClasses = [], refetch } = useQuery({
        queryKey: ["myEnrolledClasses"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/my-enrolled-classes/${user?.email}`);
            return res.data;
        }
    })
    return [myEnrolledClasses, refetch];
};

export default useMyEnrolledClasses;