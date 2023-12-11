import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './containers/Header';
import ProductListing from './containers/ProductListing';
import ProductDetails from './containers/ProductDetails';
import Signin from './containers/Signin';


function App() {
  return (
    <div className="App">
      <Router>
      <Header />
      <Routes>
        <Route path="/" exact Component={ProductListing} />
        <Route path="/signin" Component={Signin} />
        <Route path="/product/:productId" exact Component={ProductDetails} />
        <Route> 404 not found </Route>
      </Routes>
      </Router>
    
    </div>
  );
}

export default App;
