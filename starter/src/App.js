import { useEffect } from "react";
import NavBar from "./components/NavBar";
import CartContainer from "./components/cartContainer";
import { useSelector, useDispatch } from "react-redux";
import { calculateAmountAndTotals } from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateAmountAndTotals());
  }, [cartItems]);

  return (
    <main>
      {isOpen && <Modal />}

      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
