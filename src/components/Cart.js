import { useDispatch, useSelector } from "react-redux";
import Cartitem from "./Cartitem";
import { clearCart } from "../features/cartSlice";
import { EMPTY_CART } from "../utils/constants";
import { Link } from "react-router";
import { toast } from 'sonner';

const Cart = () => {
    const cartItems = useSelector(store => store.cartSlice.cartItems);

    const dispatch = useDispatch();

    let clearHandler = () => {
        dispatch(clearCart());
        toast('', {
            theme: 'light',
            description: (
                <>
                    <strong style={{ color: 'blueviolet' }}>
                        Oops, Your cart has been cleared
                    </strong> 
                </>
            ),
            closeButton: true
        });
    }

    let total = 0;
    const caculateTotal = (items) => {
         items.map((i) => {
            total += (Math.round(i.price * 8000)/100) * i.quantity;
        })
        return Math.round(total);
    }

    console.log(cartItems[0]);
    return cartItems.length === 0 ? (<div className="flex align-center flex-col">
        <div>
            <img src={EMPTY_CART}/>
        </div>
        <div className="mb-5">
            <h3>Awww, your cart is empty</h3>
            <Link className="text-fuchsia-800 p-1 rounded hover:bg-fuchsia-800 hover:text-amber-50" to="/">Explore Products</Link>
        </div>
    </div>) : (
        <div>
            <div className="flex justify-between align-center mt-10 mb-10">
                <div>
                    <h2 className="text-2xl">Cart List ({cartItems.length})</h2>
                </div>
                <div>
                    <p>
                        <b className="text-fuchsia-800 cursor-pointer hover:text-white hover:bg-fuchsia-800 p-1 rounded" onClick={clearHandler} >
                            Clear Cart
                        </b>
                    </p>
                </div>
            </div>

            {
                cartItems.map(item => {
                    return (<Cartitem key={item.id} item={item}></Cartitem>)
                })
            }

            <div className="">
                <div className="ml-2 mt-5 text-lg">
                    Total Price <b>₹{caculateTotal(cartItems)}</b>
                </div>
            </div>
        </div>
    )
}

export default Cart;