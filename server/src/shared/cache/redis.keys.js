export const REDIS_KEYS = {
    productsList: (hash) => `products:list:${hash}`,
    productDetail: (slug) => `products:detail:${slug}`,
    userProfile: (id) => `users:profile:${id}`,
    productsListPrefix: 'products:list:',
    productDetailPrefix: 'product:detail:',
    carts: (userId) => `carts:${userId}`
}
