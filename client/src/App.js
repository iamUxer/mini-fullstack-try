import Products from "./Products";
import Product from "./Product";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h2>Hello World!</h2>} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/products/:id/edit" element={<EditProduct />} />
      <Route path="/products/new" element={<NewProduct />} />
    </Routes>
  );
}

export default App;
