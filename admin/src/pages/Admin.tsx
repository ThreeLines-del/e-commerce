import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Outlet />
    </div>
  );
};

export default Admin;
