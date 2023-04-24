import './App.css';
import Home from './Component/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './Component/Cart';
import Header from './Component/Home/Header';
import ProductDetails from './Component/ProductDetails';
import Footer from './common/Footer';

function App() {
  return (
  <>
  <Router>
    <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/item/:id' element={<ProductDetails/>}/>
  </Routes>
  <Footer/>
  </Router>
  </>);
}

export default App;
