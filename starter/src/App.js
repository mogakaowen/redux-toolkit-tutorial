import { useEffect } from "react";
import NavBar from "./components/NavBar";
import CartContainer from "./components/cartContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  calculateAmountAndTotals,
  fetchCartItems,
} from "./features/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart); // access redux store's state (cartItems and isLoading are properties of the cart slice's state object)
  const { isOpen } = useSelector((store) => store.modal); // access state redux store's state

  const dispatch = useDispatch(); // access redux dispatch function

  useEffect(() => {
    dispatch(calculateAmountAndTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(fetchCartItems("Random name"));
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      {/* isOpen is controlled by modalSlice when button is clicked in the Modal(change from false to true or true to false) => this is accessing the state of the store using useSelector */}

      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;
