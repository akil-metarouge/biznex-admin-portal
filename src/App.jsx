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
import UserDetails from "./pages/users/UserDetails";
import UserReportedPostDetails from "./pages/users/UserReportedPostDetails";
import ReportManagement from "./pages/ReportManagement";
import PostManagement from "./pages/PostManagement";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/metadata"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user-details"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user-reported-post-details"
          element={
            <ProtectedRoute>
              <UserReportedPostDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/communities"
          element={
            <ProtectedRoute>
              <CommunityListing />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/communities/:id"
          element={
            <ProtectedRoute>
              <CommunityDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/post-management"
          element={
            <ProtectedRoute>
              <PostManagement />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportManagement />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/create-events"
          element={
            <ProtectedRoute>
              <CreateEvents />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/events-details/:id"
          element={
            <ProtectedRoute>
              <EventsDetails />
            </ProtectedRoute>
          }
        />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
