import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollTop/ScrollTop';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
<<<<<<< HEAD
import Gateway from './pages/Gateway/Gateway';
=======
import Login from './pages/Login/Login';
>>>>>>> e7b542e1256fdec38c3706bfeb6af957b1a14685

const Router = ({ isLogin }) => {
  return (
    <BrowserRouter basename="/money-protector">
      <ScrollToTop />
      <Header />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Gateway />} />
=======
        <Route path="/" element={<Login />} />
>>>>>>> e7b542e1256fdec38c3706bfeb6af957b1a14685
        <Route path="/main" element={<Main />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
