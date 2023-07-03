import css from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Layout = () => {

  const { pathname } = useLocation()


  return (
    <div className={css.container}>
      <Sidebar />


      {pathname === "/" && <Navigate to="/board" />}


      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div></div>
          <div></div>
          <div></div>
        </div>


        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
