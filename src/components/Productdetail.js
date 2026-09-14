import { Link, useParams } from "react-router";
import ShimmerProductCard from "./ShimmerProductCard";
import RecommandedProducts from "./RecommandedProduct";
import useProductDetails from "../utils/useProductDetails";
import useProducts from "../utils/useProducts";
import useGroupByProductCategory from "../utils/useGroupByProductCategory";

const Productdetail = () => {

    const { prodId } = useParams();

    const prodDetail = useProductDetails(prodId);
    const productList = useProducts();
    console.log(productList);
    console.log(prodId);

    const groupByProducts = useGroupByProductCategory(productList);

    let findProductGroup = groupByProducts[prodDetail?.category];

    findProductGroup = findProductGroup?.filter((prod) => prod.id != Number(prodId));

    return prodDetail == null ? <ShimmerProductCard></ShimmerProductCard> : (
        <>
            <div className="product-detail-container">
                <div className="prod-detail-image">
                    <img src={prodDetail.image}
                        alt={prodDetail.title?.split(' ')?.slice(0, 3)?.join('')} />
                </div>
                <div className="prod-detail-data">
                    <h2>{prodDetail.title}</h2>
                    <p className="mb-16">
                        <b>₹{Math.round(prodDetail.price * 8000) / 100 || ''} </b>
                    </p>
                    <p className="mb-16">
                        <b>Description:</b> {prodDetail.description}
                    </p>
                    <p className="mb-16">
                        <b>Rating</b> {prodDetail.rating?.rate} ({prodDetail.rating?.count})
                    </p>
                </div>

            </div>
            <div className="mt-16">
                <h2>Recommanded Products</h2>
            </div>
            <div className="prod-lists">
                {
                    findProductGroup?.map((product) => {
                        return <Link to={`/product/${product.id}`} key={product.id}>
                            <RecommandedProducts product={product} />
                        </Link>
                    })
                }
            </div>


        </>
    )
}

export default Productdetail;