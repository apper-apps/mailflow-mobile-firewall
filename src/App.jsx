import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import Campaigns from "@/components/pages/Campaigns";
import Contacts from "@/components/pages/Contacts";
import Providers from "@/components/pages/Providers";
import Analytics from "@/components/pages/Analytics";
import Settings from "@/components/pages/Settings";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="providers" element={<Providers />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;