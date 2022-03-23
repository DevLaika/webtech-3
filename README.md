get api/auth -> Get auth key.
get api/food -> 10 dishes.
get api/food?authkey -> all dishes.
get api/user?authkey -> Get user info.
get api/user/orderhistory?authkey -> Get order history. Search order database for userId, return all orders where equal.
delete api/user/orderhistory?authkey -> Delete all order history. Remove all instances of order where match userid.
post api/user -> Register user.
patch api/user?authkey&{name, email, password} -> Edit user info.
delete api/user?authkey -> Delete user.
get api/order/cart?authkey -> Get cart if exists.
post api/order/cart?authkey&productId -> Add product to cart, create new cart if necessary.
patch api/order/cart?authkey&productId&quantity -> Change quanitty of product in cart, if 0 delete item from cart.
delete api/order/cart?authkey&productId -> Remove product from cart.
delete api/order/cart?authkey -> Clear cart.