import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './HomePage.css'

class HomePage extends Component {
	componentDidMount() {
		const { onFetchOrders } = this.props
		onFetchOrders()
	}

	render() {
		const { user, orders } = this.props
		return (
			user && (
				<div className="HomePage">
					<h1>Welcome back {user.username}</h1>
					{orders && (
						<Fragment>
							<h2>Previous orders:</h2>
							{orders.map(({ products }, i) => (
								<table key={`order_${i}`} className="order">
									<thead>
										<tr>
											<th></th>
											<th>Name</th>
											<th>Quantity</th>
											<th>Price</th>
										</tr>
									</thead>
									<tbody>
										{products.map((product, j) => (
											<tr key={`product_${i}_${j}`}>
												<td>
													<img src={product.image} alt={product.name} height={100} />
												</td>
												<td><Link to={`/product/${product.id}`}>{product.name}</Link></td>
												<td>{product.quantity}</td>
												<td>{`${product.price} €`}</td>
											</tr>
										))}
									</tbody>
								</table>
							))}
						</Fragment>
					)}
				</div>
			)
		)
	}
}

export default withRouter(HomePage)
