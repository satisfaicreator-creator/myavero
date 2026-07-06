import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { I18nProvider } from "@/lib/i18n";
import { SettingsProvider } from "@/lib/settings";

function App() {
  return (
    <div className="App">
      <I18nProvider>
        <SettingsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </BrowserRouter>
          <Toaster position="top-right" theme="dark" />
        </SettingsProvider>
      </I18nProvider>
    </div>
  );
}

export default App;
