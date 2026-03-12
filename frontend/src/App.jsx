import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { globalCSS } from "./styles/theme";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { supabase } from "./lib/supabase";


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
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import BecomeAGuide from "./pages/BecomeAGuide";
import BecomeAProfessional from "./pages/BecomeAProfessional";
import ResetPassword from "./pages/ResetPassword";
import CommunityPage from "./pages/community/CommunityPage";
import QuestionPage from "./pages/community/QuestionPage";
import AskQuestion from "./pages/community/AskQuestion";

// Modals
import AuthModal from "./components/AuthModal";
import OnboardingFlow from "./components/OnboardingFlow";
import BookingModal from "./components/BookingModal";

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
  const navigate = useNavigate();

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

  // Supabase session persistence
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // ─── Auth Handlers ────────────────────────────────────────────────────────
  const openAuth = (mode = "login") => { setAuthMode(mode); setShowAuth(true); };

  const handleLogin = () => {
    setShowAuth(false);
    if (pendingHealingData) {
      setHealingData(pendingHealingData);
      setPendingHealingData(null);
    }
    navigate("/dashboard");
  };

  const handleSignup = () => {
    setShowAuth(false);
  };

  const handleOnboardingComplete = (data) => {
    if (user) {
      setHealingData(data);
      setShowOnboarding(false);
      navigate("/dashboard");
    } else {
      setPendingHealingData(data);
      setShowOnboarding(false);
      setAuthMode("signup");
      setShowAuth(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setHealingData(null);
    navigate("/");
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <HelmetProvider>
    <div className="app-container" style={{ maxWidth: "100vw", overflowX: "hidden", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Nav onStart={() => setShowOnboarding(true)} onSignup={() => openAuth("signup")} user={user} onLogout={handleLogout} />

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
          <Route path="/become-a-guide"        element={<BecomeAGuide />} />
          <Route path="/apply-as-professional" element={<BecomeAProfessional />} />
          <Route path="/community"       element={<CommunityPage user={user} onStart={() => setShowOnboarding(true)} />} />
          <Route path="/community/ask"   element={<AskQuestion   user={user} />} />
          <Route path="/community/:slug" element={<QuestionPage  user={user} onStart={() => setShowOnboarding(true)} />} />

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

          {/* Auth routes */}
          <Route path="/signin"         element={<AuthPage mode="login"  onLogin={handleLogin} onSignup={handleSignup} />} />
          <Route path="/register"       element={<AuthPage mode="signup" onLogin={handleLogin} onSignup={handleSignup} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin"          element={<AdminPage />} />
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
        />
      )}

      {showOnboarding && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          onCancel={() => setShowOnboarding(false)}
          userName={user?.user_metadata?.full_name}
        />
      )}

      {showGiveBack && (
        <GiveBackPage onBack={() => setShowGiveBack(false)} />
      )}

      {bookingEvent && (
        <BookingModal
          event={bookingEvent}
          onClose={() => setBookingEvent(null)}
        />
      )}

      <Analytics />
      <SpeedInsights />
    </div>
    </HelmetProvider>
  );
}
