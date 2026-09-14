import { useEffect, useState } from "react";
import {PRODUCT_DETAILS} from "./constants";

const useProductDetails = (prodId) => {
    const [prodDetail, setProdDetail] = useState(null);
    useEffect(() => {
        setProdDetail(null);
        fetchProductDetails();
    }, [prodId]);

    const fetchProductDetails = async () => {
        const data = await fetch(`${PRODUCT_DETAILS}/`+`${prodId}`);
        const json = await data.json();
        setProdDetail(json);
    }

    return prodDetail;
}

export default useProductDetails;