import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";
// Import pages
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/utility/PageNotFound";
import Login from "./pages/Login";
import Events from "./pages/events/Events";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import CommunityListing from "./pages/community/CommunityListing";
import Users from "./pages/users/Users";

// Import utility components
import ProtectedRoute from "./utils/ProtectedRoute";
import CommunityDetails from "./pages/community/CommunityDetails";
import CreateEvents from "./pages/events/CreateEvents";
import EventsDetails from "./pages/events/EventsDetails";
import { ToastProvider } from "../contexts/ToastContext";
import MetaData from "./pages/metadata/Metadata";
import UserDetails from "./pages/users/UserDetails";
import UserReportedPostDetails from "./pages/users/UserReportedPostDetails";
import ReportManagement from "./pages/ReportManagement";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  const protectedRoutes = [
    { path: "/", element: <Dashboard /> },
    { path: "/metadata", element: <MetaData /> },
    { path: "/users", element: <Users /> },
    { path: "/user-details", element: <UserDetails /> },
    { path: "/user-reported-post-details", element: <UserReportedPostDetails /> },
    { path: "/communities", element: <CommunityListing /> },
    { path: "/communities/:id", element: <CommunityDetails /> },
    { path: "/events", element: <Events /> },
    { path: "/reports", element: <ReportManagement /> },
    { path: "/create-events", element: <CreateEvents /> },
    { path: "/events-details/:id", element: <EventsDetails /> },
    { path: "/update-events/:id/edit", element: <CreateEvents /> },
  ];

  return (
    <>
      <ToastProvider>
        <Routes>
          {/* Protected Routes */}
          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Fallback */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ToastProvider>
    </>
  );
}

export default App;
