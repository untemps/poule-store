const user = require('./fixtures/user')
const orders = require('./fixtures/orders')
const product1 = require('./fixtures/product-1')
const product2 = require('./fixtures/product-2')
const product3 = require('./fixtures/product-3')

module.exports = [
	{
		method: 'POST',
		path: '/login',
		body: user,
	},
	{
		path: '/orders',
		body: orders,
	},
	{
		path: '/product/1',
		body: product1,
	},
	{
		path: '/product/2',
		body: product2,
	},
	{
		path: '/product/3',
		body: product3,
	},
]
