import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Admin = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* <NavBar /> */}
      <Outlet />
    </div>
  );
};

export default Admin;
