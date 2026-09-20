import { useDispatch } from 'react-redux';
import { FEMALE_TAGGED_PRODUCTS } from '../utils/constants';
import { Link } from "react-router";
import { addToCart } from '../features/cartSlice';
import { toast } from 'sonner';

const Productlist = (props) => {
    const { productInfo } = props;
    const {image, title, price, description, rating} = productInfo;

    const dispatch = useDispatch();

    let handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast('', {
            theme: 'light',
            description: (
                <>
                    <strong style={{ color: 'blueviolet' }}>
                        {product.title}
                    </strong> has been added to your cart.
                </>
            ),
            closeButton: true
        });
    }

    return (
        <div className="w-62.5 m-1 p-2 rounded-md hover:shadow-md">
            <img src={image} width={200} height={200} />
            <div className="p-2">
                <Link  key={productInfo.id} to={`/product/${productInfo.id}`}>
                    <h3>{title?.split(' ')?.slice(0, 3)?.join(' ')}</h3>
                </Link>
                <p className="text-lg font-bold">₹{Math.round(price * 8000)/100}</p>
                <p>{description?.split(' ')?.slice(0, 6)?.join(' ')}</p>
                <p className="text-sm text-gray-600">
                    Ratings {rating?.rate} ({rating?.count})
                </p>
                <p>
                    <button className='text-fuchsia-800 rounded-md ml-1 cursor-pointer p-1 hover:bg-fuchsia-800 hover:text-white' onClick={() => handleAddToCart(productInfo)}>
                        Add to cart
                    </button>
                </p>
            </div>
        </div>
    )
}

export const womenTaggedProduct = (Productlist) => {
    return (prods) => {
        return (
            <div className="relative">
                <span className="block absolute top-0 left-1 z-10">
                    <img src={FEMALE_TAGGED_PRODUCTS} alt="female" width={40} height={40}/>
                </span>
                <Productlist {...prods}/>
            </div>
        )
    }
}

export default Productlist;