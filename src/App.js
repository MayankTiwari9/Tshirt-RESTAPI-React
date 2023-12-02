import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CartProvider";
import ListProvider from "./Store/ListProvider";
import Header from "./Components/UI/Header";
import TshirtForm from "./Components/TShirtForm/TshirtForm";
import TshirtList from "./Components/TShirtList/TshirtList";
function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const count = (data) => {
    const item = data.reduce((acc, item) => acc + 1, 0);
    setCartCount(item);
  }

  const getHandlder = useCallback(async () => {
    try {
      const res = await fetch(
        `https://crudcrud.com/api/ae7f3532c6a8498e8a497fd47cabea40/cart`
      );
      const data = await res.json();
      setProducts(data);
      count(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getHandlder();
  }, [getHandlder]);

  return (
    <ListProvider>
      <CartProvider>
        {cartOpen && <Cart getHandlder={getHandlder} setCartOpen={setCartOpen} />}
        <Header cartCount={cartCount} setCartOpen={setCartOpen} />
        <TshirtForm getHandlder={getHandlder}/>
        <TshirtList products={products}/>
      </CartProvider>
    </ListProvider>
  );
}

export default App;
