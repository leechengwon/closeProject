import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollTop/ScrollTop';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Gateway from './pages/Gateway/Gateway';
import Login from './pages/Login/Login';
import Calender from './pages/Calender/Calender';
import Join from './pages/Join/Join';
import Statistics from './pages/Statistics/Statistics';
import AccountBook from './pages/AccountBook/AccountBook';

const Router = () => {
  return (
    <BrowserRouter basename="/money-protector">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/join" element={<Join />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/accountbook" element={<AccountBook />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
