import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useUserStore } from "../utils/user"; // update the path if needed

const GoogleRedirect = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { login } = useUserStore();
    const success = searchParams.get("success");

    useEffect(() => {
        const getUser = async () => {
            try {
                if (success) {
                    const image = searchParams.get("image");
                    login(image);
                    toast.success("Sucecess");
                    navigate("/");
                } else {
                    toast.error("Failed");
                    navigate("/auth/login");
                }
            } catch (err) {
                toast.error("Google login failed. Please try again.");
                navigate("/auth/login");
            }
        };
        getUser();
    }, []);

    return (
    <div className="fixed inset-0 z-1 flex items-center bg-white">
      <Loader />
    </div>
  )

};

export default GoogleRedirect;
