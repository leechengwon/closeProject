import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollTop/ScrollTop';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import Gateway from './pages/Gateway/Gateway';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import Statistics from './pages/Statistics/Statistics';

const Router = () => {
  return (
    <BrowserRouter basename="/money-protector">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/join" element={<Join />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
