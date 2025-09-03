import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <PublicNavbar />
      <main className="public-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
