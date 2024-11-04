import GuestMenu from "@/components/menu/GuestMenu";
import { useAuthContext } from "@/providers/auth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="min-h-screen w-full relative pt-14">
      <GuestMenu />
      <main className="flex items-center justify-center sm:px-4 py-6 w-full min-h-[calc(100vh-3.5rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default GuestLayout;
