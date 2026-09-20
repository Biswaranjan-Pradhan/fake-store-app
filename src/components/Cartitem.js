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
        <div className="flex justify-start align-center p-2 m-2 rounded-md hover:shadow-md">
            <div className="">
                <img src={item.item.image} width={50} height={50}/>
            </div>
            <div className="flex justify-between align-center w-full">
                <div className="flex justify-center align-center flex-col ml-5">
                    <p>
                        <b>{item.item.title}</b>
                    </p>
                    <p>
                        <span className="mr-4">
                            Quantity: {item.item.quantity}
                        </span>
                        <span>
                            Price: ₹{Math.round(item.item.price * 8000)/100}
                        </span>
                    </p>
                </div>
                <div>
                    <span className="flex justify-start items-center mt-5">
                        <img 
                            title="Add to Cart" 
                            className="cursor-pointer" 
                            width={20} 
                            height={20} 
                            src={ADD_TO_CART_ICON} 
                            onClick={() => addItem(item.item)}/>
                        <img 
                            title="Remove from Cart" 
                            className="cursor-pointer ml-5" 
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