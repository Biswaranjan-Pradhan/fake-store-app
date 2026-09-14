import { useEffect, useState } from "react";

const useProducts = () => {

    const [listOfProducts, setListOfProducts] = useState([]);

    useEffect(() => {
        fetchProductList();
    }, [])

    const fetchProductList = async () => {
        const data = await fetch('https://fakestoreapi.com/products');
        const productLists = await data.json();
        setListOfProducts(productLists);
    }

    return listOfProducts;
}

export default useProducts;