import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { globalCSS } from "./styles/theme";

// Layout
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";

// Existing pages
import LandingPage from "./components/LandingPage";
import EventsPage from "./components/EventsPage";
import Dashboard from "./components/Dashboard";
import BlogPage from "./components/blog/BlogPage";
import ArticlePage from "./components/blog/ArticlePage";
import GiveBackPage from "./components/GiveBackPage";

// New pages
import About from "./pages/About";
import MeetYourPeer from "./pages/MeetYourPeer";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

// Modals
import AuthModal from "./components/AuthModal";
import OnboardingFlow from "./components/OnboardingFlow";
import BookingModal from "./components/BookingModal";

// In-memory database (replace with real DB later)
const mockDB = { users: {}, sessions: {} };

// Maps old page-name strings (used by Dashboard) to router paths
const PAGE_TO_PATH = {
  landing:   "/",
  events:    "/events",
  blog:      "/journal",
  dashboard: "/dashboard",
  about:     "/about",
  contact:   "/contact",
};

// Dashboard needs useNavigate, so it lives in its own route component
function DashboardRoute({ user, healingData, onBook, onGiveBack }) {
  const navigate = useNavigate();
  if (!user || !healingData) return <Navigate to="/" replace />;
  return (
    <Dashboard
      user={user}
      data={healingData}
      setPage={(p) => navigate(PAGE_TO_PATH[p] ?? "/")}
      onBook={onBook}
      onGiveBack={onGiveBack}
    />
  );
}

// Journal handles article sub-view in local state
function JournalRoute({ onStart }) {
  const [currentArticle, setCurrentArticle] = useState(null);
  return currentArticle
    ? <ArticlePage article={currentArticle} onBack={() => setCurrentArticle(null)} onStart={onStart} />
    : <BlogPage onReadArticle={setCurrentArticle} />;
}

export default function App() {
  const [showAuth, setShowAuth]                     = useState(false);
  const [authMode, setAuthMode]                     = useState("login");
  const [showOnboarding, setShowOnboarding]         = useState(false);
  const [user, setUser]                             = useState(null);
  const [healingData, setHealingData]               = useState(null);
  const [bookingEvent, setBookingEvent]             = useState(null);
  const [pendingHealingData, setPendingHealingData] = useState(null);
  const [showGiveBack, setShowGiveBack]             = useState(false);

  // Inject global styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ─── Auth Handlers ────────────────────────────────────────────────────────
  const openAuth = (mode = "login") => { setAuthMode(mode); setShowAuth(true); };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
    const existing = mockDB.users[userData.email];
    if (existing?.healingData) {
      setHealingData(existing.healingData);
    } else if (pendingHealingData) {
      mockDB.users[userData.email] = { ...userData, healingData: pendingHealingData };
      setHealingData(pendingHealingData);
      setPendingHealingData(null);
    } else {
      setShowOnboarding(true);
    }
  };

  const handleSignup = (userData) => {
    if (pendingHealingData) {
      mockDB.users[userData.email] = { ...userData, healingData: pendingHealingData };
      setUser(userData);
      setShowAuth(false);
      setHealingData(pendingHealingData);
      setPendingHealingData(null);
    } else {
      mockDB.users[userData.email] = userData;
      setUser(userData);
      setShowAuth(false);
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = (data) => {
    if (user) {
      mockDB.users[user.email] = { ...mockDB.users[user.email], healingData: data };
      setHealingData(data);
      setShowOnboarding(false);
    } else {
      setPendingHealingData(data);
      setShowOnboarding(false);
      setAuthMode("signup");
      setShowAuth(true);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="app-container" style={{ maxWidth: "100vw", overflowX: "hidden", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Nav />

      <main style={{ flex: 1 }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={
            <LandingPage
              onStart={() => setShowOnboarding(true)}
              onSignin={() => openAuth("login")}
            />
          } />

          {/* New pages */}
          <Route path="/about"          element={<About />} />
          <Route path="/meet-your-peer" element={<MeetYourPeer />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms"          element={<Terms />} />

          {/* Existing pages */}
          <Route path="/events" element={
            <EventsPage
              onBook={setBookingEvent}
              onGiveBack={() => setShowGiveBack(true)}
              user={user}
              onLogin={() => openAuth("login")}
            />
          } />
          <Route path="/journal" element={
            <JournalRoute onStart={() => setShowOnboarding(true)} />
          } />
          <Route path="/dashboard" element={
            <DashboardRoute
              user={user}
              healingData={healingData}
              onBook={setBookingEvent}
              onGiveBack={() => setShowGiveBack(true)}
            />
          } />

          {/* Auth routes — redirect to home (auth is modal-based) */}
          <Route path="/signin"   element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Modals */}
      {showAuth && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onLogin={handleLogin}
          onSignup={handleSignup}
          onClose={() => setShowAuth(false)}
          mockDB={mockDB}
        />
      )}

      {showOnboarding && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          userName={user?.name}
        />
      )}

      {showGiveBack && (
        <GiveBackPage onBack={() => setShowGiveBack(false)} />
      )}

      {bookingEvent && (
        <BookingModal
          event={bookingEvent}
          onClose={() => setBookingEvent(null)}
          mockDB={mockDB}
        />
      )}
    </div>
  );
}
