import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { StudentsProvider } from "./context/StudentsContext";
import AppRoutes from "./routes/AppRoutes";

// App entry point — wraps the router with all global providers
const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <StudentsProvider>
            <AppRoutes />
          </StudentsProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;