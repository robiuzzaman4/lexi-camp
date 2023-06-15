import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useMyPaymentHistory = () => {
    const { user, loading } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const { data: myPaymentHistory = [], refetch } = useQuery({
        queryKey: ["myPaymentHistory"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/payments-history/${user?.email}`);
            return res.data;
        }
    })
    return [myPaymentHistory, refetch];
};

export default useMyPaymentHistory;