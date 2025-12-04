// src/layouts/MainLayout.jsx

import { useNavigate } from "react-router-dom";
import MainLayoutView from "./MainLayoutView.jsx";

const TOKEN_KEY = "HOMECAREPRO_ADMIN_TOKEN";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const isAdminLoggedIn = !!localStorage.getItem(TOKEN_KEY);

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate("/admin/login", { replace: true });
  };

  return (
    <MainLayoutView isAdminLoggedIn={isAdminLoggedIn} onLogout={handleLogout}>
      {children}
    </MainLayoutView>
  );
}

export default MainLayout;
