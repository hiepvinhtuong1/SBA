# Table of contents

-   [Table of contents](#table-of-contents)
    -   [Problem 1: Add product to table](#problem-1-add-product-to-table)
        -   [Requirements](#requirements)
        -   [Layout](#layout)
    -   [Problem 3: Mini Shopping Cart Engine](#problem-3-mini-shopping-cart-engine)
        -   [Requirements](#requirements-1)
        -   [Layout](#layout-1)

### Problem 1: Add product to table

-   Folder: `/webapp`
-   File:`/webapp/views/product-detail.html`

##### Requirements

When click "save" button on product detail page, product will be added to the product table.

##### Layout

![image1](image1.png)

### Problem 3: Mini Shopping Cart Engine

-   Folder: `problem3`
-   File: `/problem3/src/App.jsx`

##### Requirements

**1.Implement cart operations (pure functions):**

-   addToCart(cart, productId, qty = 1)
    -   If productId exists, increase its qty.
    -   Otherwise add a new item { productId, qty }.
-   removeFromCart(cart, productId) removes the item.
-   updateQty(cart, productId, qty) updates quantity; if qty <= 0, remove it.

**2. Implement summary calculation:**

-   calcCartSummary(products, cart, ...couponCodes) returns:

```
{
  items: [ { productId, name , qty, price, lineTotal }, ... ],
  subTotal,
  discount,
  total,
  outOfStockItems: [{ productId, name, requestedQty, stock }, ... ]
}
```

**3. Coupon rules:**

-   "SAVE10": 10% off subTotal
-   "SHIPFREE": subtract 5 more (shipping discount)
-   discount cannot exceed subTotal and total must not be negative

##### Layout

![image1](image1.png)
![image2](image2.png)
![image3](image3.png)
![image4](image4.png)
