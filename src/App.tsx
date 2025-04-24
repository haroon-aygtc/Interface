import { Suspense, useEffect } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import routes from "./routes";
import "./styles/theme.css";
import "./styles/scrollbar.css";
import { TempoDevtools } from "tempo-devtools";

// Handle tempo-routes import dynamically
import type { RouteObject } from 'react-router-dom';
const tempoRoutes: RouteObject[] = [];

// Try to initialize Tempo if it's available
const initTempo = () => {
  try {
    TempoDevtools.init();
  } catch (error) {
    console.warn("Tempo devtools initialization failed:", error);
  }
};

function App() {
  useEffect(() => {
    // Initialize Tempo Devtools
    initTempo();
  }, []);

  // Tempo routes for storyboards
  const tempoRoutesElement =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(tempoRoutes) : null;

  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          }
        >
          {/* Tempo routes */}
          {tempoRoutesElement}

          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>

          {/* Global Toaster for notifications */}
          <Toaster />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
