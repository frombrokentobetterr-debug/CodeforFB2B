import { useState, useEffect } from "react";
import { globalCSS } from "./styles/theme";

// Components
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import EventsPage from "./components/EventsPage";
import AuthModal from "./components/AuthModal";
import OnboardingFlow from "./components/OnboardingFlow";
import BookingModal from "./components/BookingModal";
import BlogPage from "./components/blog/BlogPage";
import GiveBackPage from "./components/GiveBackPage";
import ArticlePage from "./components/blog/ArticlePage";

// In-memory database (replace with real DB later)
const mockDB = { users: {}, sessions: {} };

export default function App() {
  const [page, setPage] = useState("landing");
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState(null);
  const [healingData, setHealingData] = useState(null);
  const [bookingEvent, setBookingEvent] = useState(null);
  const [pendingHealingData, setPendingHealingData] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [showGiveBack, setShowGiveBack] = useState(false);

  // Inject global styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ─── Auth Handlers ──────────────────────────────────────────────────────────
  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
    const existing = mockDB.users[userData.email];
    if (existing?.healingData) {
      setHealingData(existing.healingData);
      setPage("dashboard");
    } else if (pendingHealingData) {
      mockDB.users[userData.email] = { ...userData, healingData: pendingHealingData };
      setHealingData(pendingHealingData);
      setPendingHealingData(null);
      setPage("dashboard");
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
      setPage("dashboard");
    } else {
      mockDB.users[userData.email] = userData;
      setUser(userData);
      setShowAuth(false);
      setShowOnboarding(true);
    }
  };

  // Called when questionnaire + AI generation is complete
  const handleOnboardingComplete = (data) => {
    if (user) {
      mockDB.users[user.email] = { ...mockDB.users[user.email], healingData: data };
      setHealingData(data);
      setShowOnboarding(false);
      setPage("dashboard");
    } else {
      // Save answers, show signup
      setPendingHealingData(data);
      setShowOnboarding(false);
      setAuthMode("signup");
      setShowAuth(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setHealingData(null);
    setPendingHealingData(null);
    setPage("landing");
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="app-container" style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Nav
        user={user}
        page={page}
        setPage={(p) => { setPage(p); setCurrentArticle(null); }}
        onLogin={() => { setAuthMode("login"); setShowAuth(true); }}
        onSignup={() => { setAuthMode("signup"); setShowAuth(true); }}
        onLogout={handleLogout}
      />

      {/* Pages */}
      {page === "landing" && (
        <LandingPage
          onStart={() => setShowOnboarding(true)}
          onSignin={() => { setAuthMode("login"); setShowAuth(true); }}
        />
      )}

      {page === "dashboard" && user && healingData && (
        <Dashboard
          user={user}
          data={healingData}
          setPage={setPage}
          onBook={setBookingEvent}
          onGiveBack={() => setShowGiveBack(true)}
        />
      )}

      {page === "events" && (
        <EventsPage
          onBook={setBookingEvent}
          onGiveBack={() => setShowGiveBack(true)}
          user={user}
          onLogin={() => { setAuthMode("login"); setShowAuth(true); }}
        />
      )}

      {page === "blog" && !currentArticle && (
        <BlogPage onReadArticle={setCurrentArticle} />
      )}

      {page === "blog" && currentArticle && (
        <ArticlePage
          article={currentArticle}
          onBack={() => setCurrentArticle(null)}
          onStart={() => setShowOnboarding(true)}
        />
      )}

      <Footer
        setPage={(p) => { setPage(p); setCurrentArticle(null); }}
        onStart={() => setShowOnboarding(true)}
      />

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
