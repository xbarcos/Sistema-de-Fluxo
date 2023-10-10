import Show from "./pages/show.jsx";
import Navbar from "./components/navbar.jsx";
import Sidebar from "./components/sidebar.jsx";
import NoPage from "./pages/noPage.jsx";
import Home from "./pages/home.jsx";
import Profile from "./pages/profile.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pagination from "./components/pagination.jsx";
import Next from "./pages/next.jsx";
import moment from "moment";
import Dashboard from "./pages/dashboard.jsx";
import Bill from "./pages/bill/index.jsx";
import ToastEffect from "./components/toastEffect.jsx";

export default function App() {
  moment.locale("pt-br");
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar page={<Home />} />} />
          <Route index path="home" element={<Sidebar page={<Home />} />} />
          <Route path="/dashboard" element={<Sidebar page={<Dashboard />} />} />
          <Route path="/bill/:id" element={<Sidebar page={<Bill />} />} />
          <Route path="show" element={<Sidebar page={<Show />} />} />
          <Route path="next" element={<Sidebar page={<Next />} />} />
          <Route path="profile" element={<Sidebar page={<Profile />} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}
