import { useDispatch, useSelector } from "react-redux";
import Cartitem from "./Cartitem";
import { clearCart } from "../features/cartSlice";
import { EMPTY_CART } from "../utils/constants";
import { Link } from "react-router";

const Cart = () => {
    const cartItems = useSelector(store => store.cartSlice.cartItems);

    const dispatch = useDispatch();

    let clearHandler = () => {
        dispatch(clearCart())
    }

    let total = 0;
    const caculateTotal = (items) => {
         items.map((i) => {
            total += (Math.round(i.price * 8000)/100) * i.quantity;
        })
        return total;
    }

    console.log(cartItems[0]);
    return cartItems.length === 0 ? (<div className="center-item">
        <img src={EMPTY_CART}/><br/>
        <h3>Awww, your cart is empty</h3>
        <Link className="btn-small mt-16" to="/">Explore Products</Link>
    </div>) : (
        <div>
            <div className="cart-action">
                <div>
                    <h2 className="mb-28 mt-28">Cart List ({cartItems.length})</h2>
                </div>
                <div>
                    <p>
                        <b className="clear-cart" onClick={clearHandler} >Clear Cart</b>
                    </p>
                </div>
            </div>

            {
                cartItems.map(item => {
                    return (<Cartitem key={item.id} item={item}></Cartitem>)
                })
            }

            <div className="mt-28">
                <div className="ml-30">
                    Total Price <b>₹{caculateTotal(cartItems)}</b>
                </div>
            </div>
        </div>
    )
}

export default Cart;