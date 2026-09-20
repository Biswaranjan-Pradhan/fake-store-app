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

    if(networkStatus) return (<h2>You are currently offline, please check your internet connection and try again</h2> );

    if(productList.length === 0) return <ShimmerProductCard/>;

    return (
        <div className="">
            <div className="flex align-center justify-between my-6">
                <div>
                    <span className="font-bold">Filter Products:</span>
                    <button
                    onClick={() => 
                        applyFilter('All', () => filteredProductList)
                    } className={`text-fuchsia-800 rounded-md ml-4 cursor-pointer p-1 ${activeFilter === 'All' ? 'bg-fuchsia-800 text-white' : ''}`}>All</button>
                    <button onClick={() => {
                        const filteredProducts = filteredProductList.filter((prod) => prod.rating.rate >= 4);
                        setActiveFilter('Top Rated');
                        setListOfProducts(filteredProducts);
                    }} className={`text-fuchsia-800 rounded-md ml-4 cursor-pointer p-1 ${activeFilter === 'Top Rated' ? 'bg-fuchsia-800 text-white' : ''}`}>Top Rated</button>
                    <button onClick={() => {
                        const mensClothing = filteredProductList.filter((prod) => prod.category.toLowerCase() === "men's clothing".toLowerCase());
                        setActiveFilter('Mens Clothing');
                        setListOfProducts(mensClothing);
                    }}
                        className={`text-fuchsia-800 rounded-md ml-4 cursor-pointer p-1 ${activeFilter === 'Mens Clothing' ? 'bg-fuchsia-800 text-white' : ''}`}>Men's Clothings</button>
                    <button onClick={() => {
                        const womenClothing = filteredProductList.filter((prod) => prod.category.toLowerCase() === "women's clothing".toLowerCase());
                        setActiveFilter('Womens Clothing');
                        setListOfProducts(womenClothing);
                    }} className={`text-fuchsia-800 rounded-md ml-4 cursor-pointer p-1 ${activeFilter === "Womens Clothing" ? 'bg-fuchsia-800 text-white' : ''}`}>Women's Clothings</button>
                    <button onClick={() => {
                        const jwellery = filteredProductList.filter((prod) => prod.category.toLowerCase() === "jewelery".toLowerCase());
                        setActiveFilter('Jwellery');
                        setListOfProducts(jwellery);
                    }} className={`text-fuchsia-800 rounded-md ml-4 cursor-pointer p-1 ${activeFilter === 'Jwellery' ? 'bg-fuchsia-800 text-white' : ''}`}>Jwellery</button>
                    <button onClick={() => {
                        const electronics = filteredProductList.filter((prod) => prod.category.toLowerCase() === "electronics".toLowerCase());
                        setActiveFilter('Electronics');
                        setListOfProducts(electronics);
                    }} className={`text-fuchsia-800 rounded-md ml-4 cursor-pointer p-1 ${activeFilter === 'Electronics' ? 'bg-fuchsia-800 text-white' : ''}`}>Electronics</button>
                </div>
                <div>
                    <input 
                        type="text" 
                        className="border border-fuchsia-800 rounded-md p-1" 
                        value={searchProduct} 
                        onChange={
                            (e) => { 
                                setSearchProduct(e?.target?.value); 
                                if(e?.target?.value.trim() === '') {
                                    setListOfProducts(filteredProductList);
                                }
                            }
                        } 
                        placeholder="search product" />
                    <button 
                        className="text-fuchsia-800 rounded-md ml-1 cursor-pointer p-1 hover:bg-fuchsia-800 hover:text-white" 
                        onClick={() => {
                        const searchedProducts = filteredProductList.filter((prod) => {
                            return prod.title.toLowerCase().includes(searchProduct.toLowerCase());
                        });
                        setListOfProducts(searchedProducts);
                    }}>Search</button>
                </div>
            </div>
            <div className="mb-12">
                {
                    listOfProducts.length == 0 && searchProduct.trim() !== '' ?
                    <>
                        Sorry, no products found for your search: <b className="highlight-text">{searchProduct}</b>
                    </> :
                    <>
                        Total <span className="text-fuchsia-800 bg-amber-50 p-1 rounded-md">{listOfProducts.length}</span> Products Available
                    </>
                }
                
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] w-full">
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