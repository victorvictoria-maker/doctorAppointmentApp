import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsDetails from "../pages/Doctors/DoctorsDetails";
import MyAccount from "../dashboard/user-account/MyAccount";
import Dashboard from "../dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/doctors' e lement={<Doctors />} />
      <Route path='/doctors/:id' element={<DoctorsDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/services' element={<Services />} />
      <Route
        path='/users/profile/me'
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path='/doctors/profile/me'
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
