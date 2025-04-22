import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import routes from "./routes";
import './styles/theme.css';
import './styles/scrollbar.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
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
