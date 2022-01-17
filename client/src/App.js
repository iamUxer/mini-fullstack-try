import { createContext } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Products, Product, NewProduct, EditProduct } from "./pages/products";
import { EditOrder, NewOrder, Order, Orders } from "./pages/orders";
import NavigationBar from "./components/layout/NavigationBar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import useLocalStorage from "./utils/UseLocalStorage";
import Signup from "./components/auth/Signup";

export const UserContext = createContext();

function UserProvider(props) {
  const [userInfo, setUserInfo] = useLocalStorage("user"); //커스텀 훅
  const value = [userInfo, setUserInfo];
  return <UserContext.Provider value={value} {...props} />;
}

const StyledRoutes = styled.div`
  padding: 20px;
  & .ant-page-header {
    padding: 16px 0;
  }
`;

function App() {
  return (
    <UserProvider>
      <NavigationBar />
      <StyledRoutes>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          {/* detail page */}
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<Order />} /> {/* detail page */}
          <Route path="/orders/:id/edit" element={<EditOrder />} />
          <Route path="/orders/new" element={<NewOrder />} />
        </Routes>
      </StyledRoutes>
    </UserProvider>
  );
}

export default App;
