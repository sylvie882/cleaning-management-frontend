/* eslint-disable no-unused-vars */
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import socketService from "./services/socketService";
import GlobalCopyProtection from "./components/CopyProtection/GlobalCopyProtection";
import "./styles/protect.css";

// Public Pages
import HomePage from "./pages/public/HomePage";
import AboutPage from "./pages/public/AboutPage.jsx";
import ServicesPage from "./pages/public/ServicesPage";
import ContactPage from "./pages/public/ContactPage";
import BookingForm from "./pages/public/BookingForm.jsx";
import BookingSuccess from "./pages/public/BookingSuccess";
import RatingPage from "./pages/public/RatingPage";
import PaymentPage from "./pages/public/PaymentPage";
import BudgetApprovalPage from "./pages/public/BudgetApprovalPage";
import ResidentialCleaning from "./pages/public/ResidentialCleaning";
import CommercialCleaning from "./pages/public/CommercialCleaning";
import DeepCleaning from "./pages/public/DeepCleaning";
import SpecializedCleaning from "./pages/public/SpecializedCleaning";



// Auth Pages
import Login from "./pages/Login";

// Common Dashboard Pages
import UserSettings from "./pages/UserSettings";
import UserProfile from "./pages/UserProfile";

// Staff Pages (Protected)
import CleanerDashboard from "./pages/Cleaner/Dashboard";
import TaskDetails from "./pages/Cleaner/TaskDetails";
import TaskUpdate from "./pages/Cleaner/TaskUpdate";
import TaskHistory from "./pages/Cleaner/TaskHistory";

import HeadDashboard from "./pages/HeadOfCleaning/Dashboard";
import HeadBookings from "./pages/HeadOfCleaning/Bookings";
import CleanerList from "./pages/HeadOfCleaning/CleanerList";
import AssignmentPage from "./pages/HeadOfCleaning/AssignmentPage";

import AccountantDashboard from "./pages/Accountant/Dashboard";
import PaymentsList from "./pages/Accountant/PaymentsList";
import FinancialReports from "./pages/Accountant/FinancialReports";

import ManagerDashboard from "./pages/Manager/Dashboard";
import ManagerAnalytics from "./pages/Manager/Analytics";
import ManagerBookings from "./pages/Manager/Bookings";
import ManagerStaff from "./pages/Manager/Staff";
import ManagerFinances from "./pages/Manager/Finances";

import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import ServiceManagement from "./pages/Admin/ServiceManagement";
import SystemSettings from "./pages/Admin/SystemSettings";
import ArticleManagement from "./pages/Admin/ArticleManagement";
import DebugPasteTest from "./pages/Admin/DebugPasteTest";

// New Admin Booking Management Pages
import BookingDetail from "./pages/Admin/BookingDetail";
import AdminScheduleVisitPage from "./pages/Admin/ScheduleVisitPage";
import CompleteVisitPage from "./pages/Admin/CompleteVisitPage";
import AdminAssignmentPage from "./pages/Admin/AssignmentPage";
import TaskUpdatePage from "./pages/Admin/TaskUpdatePage";

// Layout Components
import PublicLayout from "./components/layouts/PublicLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import PrivateRoute from "./components/common/PrivateRoute";

import ScheduleVisitPage from "./pages/HeadOfCleaning/ScheduleVisitPage";
import CompleteAssessmentPage from "./pages/HeadOfCleaning/CompleteAssessmentPage";
import { useLocation } from "react-router-dom";
import ProjectsPage from "./pages/public/ProjectsPage";
import CompletePreVisitPage from "./pages/HeadOfCleaning/CompletePreVisitPage";
import ServiceDetailPage from "./pages/public/ServiceDetailPage";
import BlogPage from "./pages/public/BlogPage";
import ArticleDetailPage from "./pages/public/ArticleDetailPage";

// Socket connection component
const SocketConnectionManager = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      socketService.initSocketConnection();
    } else {
      socketService.disconnectSocket();
    }

    return () => {
      socketService.disconnectSocket();
    };
  }, [user]);

  return null;
};

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function AppContent() {
  return (
    <>
      <SocketConnectionManager />
      <Router>
        <GlobalCopyProtection>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/book" element={<BookingForm />} />
              <Route path="/booking/success" element={<BookingSuccess />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<ArticleDetailPage />} />
              <Route path="/rate/:bookingId/:token" element={<RatingPage />} />
              <Route path="/services/residential" element={<ResidentialCleaning />} />
              <Route path="/services/commercial" element={<CommercialCleaning />} />
              <Route path="/services/deep-cleaning" element={<DeepCleaning />} />
              <Route path="/services/specialized" element={<SpecializedCleaning />} />


              <Route
                path="/payment/:bookingId/:token"
                element={<PaymentPage />}
              />
              <Route
                path="/approve-budget/:bookingId/:token"
                element={<BudgetApprovalPage />}
              />
              <Route path="/services/:id" element={<ServiceDetailPage />} />
            </Route>

            {/* Admin Login */}
            <Route path="/admin-login" element={<Login />} />

            {/* Dashboard Routes */}
            <Route element={<DashboardLayout />}>
              {/* Common Routes for all roles */}
              <Route path="/dashboard/profile" element={<UserProfile />} />
              <Route path="/dashboard/settings" element={<UserSettings />} />

              {/* Cleaner Routes */}
              <Route
                path="/dashboard/cleaner"
                element={<PrivateRoute role="cleaner" />}
              >
                <Route index element={<CleanerDashboard />} />
                <Route path="tasks" element={<CleanerDashboard />} />
                <Route path="task/:id" element={<TaskDetails />} />
                <Route
                  path="task/:id/start"
                  element={<TaskUpdate mode="start" />}
                />
                <Route
                  path="task/:id/complete"
                  element={<TaskUpdate mode="complete" />}
                />
                <Route path="history" element={<TaskHistory />} />
              </Route>

              {/* Head of Cleaning Routes */}
              <Route
                path="/dashboard/head"
                element={<PrivateRoute role="head_cleaner" />}
              >
                <Route index element={<HeadDashboard />} />
                <Route path="bookings" element={<HeadBookings />} />
                <Route path="cleaners" element={<CleanerList />} />
                <Route path="assign/:id" element={<AssignmentPage />} />
                <Route
                  path="schedule-visit/:id"
                  element={<ScheduleVisitPage />}
                />
                <Route
                  path="complete-visit/:id"
                  element={<CompletePreVisitPage />}
                />
                <Route
                  path="complete-assessment/:id"
                  element={<CompleteAssessmentPage />}
                />
                <Route path="task/:id" element={<TaskDetails />} />
              </Route>

              {/* Accountant Routes */}
              <Route
                path="/dashboard/accountant"
                element={<PrivateRoute role="accountant" />}
              >
                <Route index element={<AccountantDashboard />} />
                <Route path="payments" element={<PaymentsList />} />
                <Route path="reports" element={<FinancialReports />} />
              </Route>

              {/* Manager Routes */}
              <Route
                path="/dashboard/manager"
                element={<PrivateRoute role="manager" />}
              >
                <Route index element={<ManagerDashboard />} />
                <Route path="reports" element={<ManagerAnalytics />} />
                <Route path="bookings" element={<ManagerBookings />} />
                <Route path="staff" element={<ManagerStaff />} />
                <Route path="finances" element={<ManagerFinances />} />
              </Route>

              {/* Admin Routes */}
              <Route
                path="/dashboard/admin"
                element={<PrivateRoute role="admin" />}
              >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="services" element={<ServiceManagement />} />
                <Route path="articles" element={<ArticleManagement />} />
                <Route path="settings" element={<SystemSettings />} />
                <Route path="debug-paste" element={<DebugPasteTest />} />

                {/* New Admin Booking Management Routes */}
                <Route path="booking/:id" element={<BookingDetail />} />
                <Route
                  path="schedule-visit/:id"
                  element={<AdminScheduleVisitPage />}
                />
                <Route
                  path="complete-visit/:id"
                  element={<CompleteVisitPage />}
                />
                <Route path="assign/:id" element={<AdminAssignmentPage />} />
                <Route path="task/:id" element={<TaskUpdatePage />} />
              </Route>
            </Route>
          </Routes>
          <FloatingWhatsApp />
        </GlobalCopyProtection>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
