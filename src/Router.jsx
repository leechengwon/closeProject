import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollTop/ScrollTop';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';
import Gateway from './pages/Gateway/Gateway';

const Router = ({ isLogin }) => {
  return (
    <BrowserRouter basename="/money-protector">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/main" element={<Main />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
