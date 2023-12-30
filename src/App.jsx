import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./pages/BuySell/Home/Home";
import SignUp from "./pages/Auth/SignUp";
import LogIn from "./pages/Auth/LogIn";
import AddProduct from "./components/AddProduct/addProduct";
import SingleProduct from "./pages/BuySell/SingleProduct/SingleProduct";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import Landing from "./pages/Landing/Landing";

import ProtectedRoute from "./pages/ProtectedRoutes";
import Dashboard from "./pages/Profile/DashBoard"
import NotFound from "./pages/Auth/Warning/NotFound";
import EmailVerifyMessage from "./pages/Auth/Warning/EmailVerifyMessage";
import ForgotPassword from "./pages/Auth/ForgotPassword"
import ResetPassword from "./pages/Auth/ResetPassword";
import { Toast } from "./components/Toaster/CustomToast";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>}>
          <Route path="singleProduct" element={<SingleProduct />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="products" element={<Products />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="singleProduct/:productId" element={<SingleProduct />} />

        </Route>

        <Route path="/landing" element={<Landing />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<LogIn />} />
        <Route path="/user/verify-email" element={<VerifyEmail />} />
        <Route path="notfound" element={<NotFound />} />
        <Route path="emailverifymessage" element={<EmailVerifyMessage />} />
        <Route path="/user/forget-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
      </Routes>
    {Toast()}
    </BrowserRouter>
  );
}
const Home = () => {
  return (
    <div>
      <Navbar />

      <Outlet />
      {/* <Footer/> */}
    </div>
  );
};
export default App;
