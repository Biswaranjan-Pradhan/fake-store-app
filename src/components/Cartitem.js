import { useDispatch } from "react-redux";
import {ADD_TO_CART_ICON, DELETE_ICON} from "../utils/constants";
import { addToCart, removeToCart } from "../features/cartSlice";
import { toast } from 'sonner';

const Cartitem = (item) => {
    console.log(item)
    const dispatch = useDispatch();

    const addItem = (item) => {
        dispatch(addToCart(item));
        toast('', {
            theme: 'light',
            description: (
                <>
                    <strong style={{ color: 'blueviolet' }}>
                        {item.title}
                    </strong> added to cart.
                </>
            ),
            closeButton: true
        });
    }

    const removeItem = (item) => {
        console.log(item);
        toast('', {
            theme: 'light',
            description: (
                <>
                    <strong style={{ color: 'blueviolet' }}>
                        {item.title}
                    </strong> removed from cart.
                </>
            ),
            closeButton: true
        });
        dispatch(removeToCart(item));
    }
    return (
        <div className="cart-list mt-16">
            <div className="prod-detail-image">
                <img src={item.item.image} width={40} height={40}/>
            </div>
            <div className="prod-detail-data cart-action">
                <div>
                    <p>
                        <b>{item.item.title}</b>
                    </p>
                    <p>
                        <span className="mr-16">
                            Quantity: {item.item.quantity}
                        </span>
                        <span>
                            Price: ₹{Math.round(item.item.price * 8000)/100}
                        </span>
                    </p>
                </div>
                <div>
                    <span>
                        <img 
                            title="Add to Cart" 
                            className="mr-16 img-hover" 
                            width={20} 
                            height={20} 
                            src={ADD_TO_CART_ICON} 
                            onClick={() => addItem(item.item)}/>
                        <img 
                            title="Remove from Cart" 
                            className="img-hover" 
                            width={20} 
                            height={20} 
                            src={DELETE_ICON} 
                            onClick={() => removeItem(item.item)}/>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Cartitem;