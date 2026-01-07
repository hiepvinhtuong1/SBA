const products = [
    { id: "p01", name: "Keyboard", price: 25 },
    { id: "p02", name: "Mouse", price: 15 },
    { id: "p03", name: "Monitor", price: 120 },
]

const cart = [
    { productId: "p01", qty: 2 },
    { productId: "p02", qty: 1 }
]


const cartSummary = (products, cart) => {
    const newCart = cart.map((item, index) => {
        const product = products.find((product) => product.id === item.productId);
        return {
            id: product.id,
            name: product.name,
            quantity: item.qty,
            price: product.price,
            totalLine: product.price * item.qty
        }
    }).filter((item) => item !== null);

    const totalQty = newCart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0)

    const totalPrice = newCart.reduce((sum, item) => {
        return sum + item.quantity * item.price
    }, 0)
    return {
        items: newCart,
        totalQty,
        totalPrice
    }
}

console.log(cartSummary(products, cart))
