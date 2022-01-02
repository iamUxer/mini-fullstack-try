import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Products, Product, NewProduct, EditProduct } from "./pages/products";
import Order from "./pages/Order";
import NavigationBar from "./components/layout/NavigationBar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import useLocalStorage from "./utils/UseLocalStorage";

export const UserContext = createContext();

function UserProvider(props) {
  const [userInfo, setUserInfo] = useLocalStorage("user");
  const value = [userInfo, setUserInfo];
  return <UserContext.Provider value={value} {...props} />;
}

function App() {
  return (
    <UserProvider>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/orders/:id" element={<Order />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
