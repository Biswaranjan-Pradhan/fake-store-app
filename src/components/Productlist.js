import { useDispatch } from 'react-redux';
import { FEMALE_TAGGED_PRODUCTS } from '../utils/constants';
import { Link } from "react-router";
import { addToCart } from '../features/cartSlice';

const Productlist = (props) => {
    const { productInfo } = props;
    const {image, title, price, description, rating} = productInfo;

    const dispatch = useDispatch();

    let handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    return (
        <div className="prod-card">
            <img src={image} width={200} height={200} />
            <div className="prod-details">
                <Link  key={productInfo.id} to={`/product/${productInfo.id}`}>
                    <h3>{title?.split(' ')?.slice(0, 3)?.join(' ')}</h3>
                </Link>
                <p className="price-tag">₹{Math.round(price * 8000)/100}</p>
                <p>{description?.split(' ')?.slice(0, 6)?.join(' ')}</p>
                <p className="rating">
                    Ratings {rating?.rate} ({rating?.count})
                </p>
                <p>
                    <button className='btn-small' onClick={() => handleAddToCart(productInfo)}>
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
            <div>
                <span className="women-tag">
                    <img src={FEMALE_TAGGED_PRODUCTS} alt="female" width={40} height={40}/>
                </span>
                <Productlist {...prods}/>
            </div>
        )
    }
}

export default Productlist;