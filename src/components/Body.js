import Productlist, {womenTaggedProduct} from "./Productlist";
import { useEffect, useState } from "react";
import ShimmerProductCard from "../components/ShimmerProductCard";
import useNetworkStatus from "../utils/useNetworkStatus";
import useProducts from "../utils/useProducts";

const Body = () => {
    const [listOfProducts, setListOfProducts] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    let [searchProduct, setSearchProduct] = useState('');
    const networkStatus = useNetworkStatus();

    const WithWomenTagProduct = womenTaggedProduct(Productlist);
    const productList = useProducts();
    useEffect(() => {
        setListOfProducts(productList);
        setFilteredProductList(productList);
    }, [productList]);

    if(networkStatus) return (<h2>You are currently offline, please check your internet connection and try again</h2> )

    return listOfProducts.length == 0 ? <ShimmerProductCard /> : (
        <div className="app-body">
            <div className="filter-options">
                <div>
                    Filter Products:
                    <button onClick={() => {
                        setListOfProducts(filteredProductList);
                    }} className="btn-small">All</button>
                    <button onClick={() => {
                        const filteredProducts = filteredProductList.filter((prod) => prod.rating.rate >= 4);
                        setListOfProducts(filteredProducts);
                    }} className="btn-small">Top Rated</button>
                    <button onClick={() => {
                        const mensClothing = filteredProductList.filter((prod) => prod.category.toLowerCase() === "men's clothing".toLowerCase());
                        setListOfProducts(mensClothing);
                    }}
                        className="btn-small">Men's Clothings</button>
                    <button onClick={() => {
                        const womenClothing = filteredProductList.filter((prod) => prod.category.toLowerCase() === "women's clothing".toLowerCase());
                        setListOfProducts(womenClothing);
                    }} className="btn-small">Women's Clothings</button>
                    <button onClick={() => {
                        const jewelery = filteredProductList.filter((prod) => prod.category.toLowerCase() === "jewelery".toLowerCase());
                        setListOfProducts(jewelery);
                    }} className="btn-small">Jewelery</button>
                    <button onClick={() => {
                        const electronics = filteredProductList.filter((prod) => prod.category.toLowerCase() === "electronics".toLowerCase());
                        setListOfProducts(electronics);
                    }} className="btn-small">Electronics</button>
                </div>
                <div>
                    <input type="text" className="input-filed mr-4" value={searchProduct} onChange={
                        (e) => { setSearchProduct(e?.target?.value); }
                    } placeholder="search product" />
                    <button className="btn-small" onClick={() => {
                        const searchedProducts = filteredProductList.filter((prod) => {
                            return prod.title.toLowerCase().includes(searchProduct.toLowerCase());
                        })
                        setListOfProducts(searchedProducts);
                    }}>Search</button>
                </div>
            </div>
            <div className="total-prod-count">
                Total <span className="highlight-text">{listOfProducts.length}</span> Products Available
            </div>
            <div className="prod-lists">
                {
                    listOfProducts.map((product) => {
                        return product.category === "women's clothing"
                            ? <WithWomenTagProduct key={product.id} productInfo={product} />
                            : <Productlist key={product.id} productInfo={product} />
                    })
                }
            </div>
        </div>
    )
}

export default Body;