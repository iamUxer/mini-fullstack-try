import Products from "./Products";
import Product from "./Product";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
    </Routes>
  );
}

export default App;
