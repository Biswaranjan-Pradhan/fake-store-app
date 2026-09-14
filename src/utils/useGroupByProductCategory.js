import { useEffect, useState } from "react";

const useGroupByProductCategory = (products) => {
    const [productCategory, setProductCategory] = useState({});

    useEffect(() => {
        setProductCategory(groupByCategory());
    }, [products]);

    const groupByCategory = () => {
        return products.reduce((acc, product) => {
            const category = product.category;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(product);
            return acc;
        }, {});
    }

    return productCategory;
}

export default useGroupByProductCategory;