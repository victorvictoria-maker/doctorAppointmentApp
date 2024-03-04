import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsDetails from "../pages/Doctors/DoctorsDetails";

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/doctors' element={<Doctors />} />
      <Route path='/doctors/:id' element={<DoctorsDetails />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/services' element={<Services />} />
    </Routes>
  );
};

export default Routers;
