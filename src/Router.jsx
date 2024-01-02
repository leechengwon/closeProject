import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollTop/ScrollTop';
import Main from './pages/Main/Main';

const Router = () => {
  return (
    <BrowserRouter basename="/money-protector">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
