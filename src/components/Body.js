import Productlist, {womenTaggedProduct} from "./Productlist";
import { useEffect, useState } from "react";
import ShimmerProductCard from "../components/ShimmerProductCard";
import useNetworkStatus from "../utils/useNetworkStatus";
import useProducts from "../utils/useProducts";

const Body = () => {
    const [listOfProducts, setListOfProducts] = useState([]);
    const [filteredProductList, setFilteredProductList] = useState([]);
    let [searchProduct, setSearchProduct] = useState('');
    let [activeFilter, setActiveFilter] = useState('All');
    const networkStatus = useNetworkStatus();

    const WithWomenTagProduct = womenTaggedProduct(Productlist);
    const productList = useProducts();
    useEffect(() => {
        setListOfProducts(productList);
        setFilteredProductList(productList);
    }, [productList]);

    const applyFilter = (label, filterFn) => {
        setActiveFilter(label);
        setListOfProducts(filterFn());
    }

    if(networkStatus) return (<h2>You are currently offline, please check your internet connection and try again</h2> )

    return listOfProducts.length == 0 ? <ShimmerProductCard /> : (
        <div className="app-body">
            <div className="filter-options">
                <div>
                    Filter Products:
                    <button onClick={() => 
                        applyFilter('All', () => filteredProductList)
                    } className={`btn-small ${activeFilter === 'All' ? 'active' : ''}`}>All</button>
                    <button onClick={() => {
                        const filteredProducts = filteredProductList.filter((prod) => prod.rating.rate >= 4);
                        setActiveFilter('Top Rated');
                        setListOfProducts(filteredProducts);
                    }} className={`btn-small ${activeFilter === 'Top Rated' ? 'active' : ''}`}>Top Rated</button>
                    <button onClick={() => {
                        const mensClothing = filteredProductList.filter((prod) => prod.category.toLowerCase() === "men's clothing".toLowerCase());
                        setActiveFilter('Mens Clothing');
                        setListOfProducts(mensClothing);
                    }}
                        className={`btn-small ${activeFilter === 'Mens Clothing' ? 'active' : ''}`}>Men's Clothings</button>
                    <button onClick={() => {
                        const womenClothing = filteredProductList.filter((prod) => prod.category.toLowerCase() === "women's clothing".toLowerCase());
                        setActiveFilter('Womens Clothing');
                        setListOfProducts(womenClothing);
                    }} className={`btn-small ${activeFilter === "Womens Clothing" ? 'active' : ''}`}>Women's Clothings</button>
                    <button onClick={() => {
                        const jwellery = filteredProductList.filter((prod) => prod.category.toLowerCase() === "jewelery".toLowerCase());
                        setActiveFilter('Jwellery');
                        setListOfProducts(jwellery);
                    }} className={`btn-small ${activeFilter === 'Jwellery' ? 'active' : ''}`}>Jwellery</button>
                    <button onClick={() => {
                        const electronics = filteredProductList.filter((prod) => prod.category.toLowerCase() === "electronics".toLowerCase());
                        setActiveFilter('Electronics');
                        setListOfProducts(electronics);
                    }} className={`btn-small ${activeFilter === 'Electronics' ? 'active' : ''}`}>Electronics</button>
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