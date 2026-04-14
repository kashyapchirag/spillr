import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="bg-black w-full min-h-screen">
      <Outlet />
    </div>
  );
};

export default AppLayout;
