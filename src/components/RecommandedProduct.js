const RecommandedProducts = (product) => {
    const {image, title, price, description, rating} = product.product;
    return (
        <div className="prod-card">
            <img src={image}  width={200} height={200}/>
            <div className="prod-details">
                <h3>{title?.split(' ')?.slice(0, 3)?.join(' ')}</h3>
                <p className="price-tag">₹{Math.round(price * 8000)/100}</p>
                <p>{description?.split(' ')?.slice(0, 6)?.join(' ')}</p>
                <p className="rating">
                    Ratings {rating?.rate} ({rating?.count})
                </p>
            </div>
        </div>
    )
}

export default RecommandedProducts;