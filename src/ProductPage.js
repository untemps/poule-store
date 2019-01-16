import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import './ProductPage.css'
import DiscountSticker from './DiscountSticker'

class ProductPage extends Component {
	componentDidMount() {
		const { onFetchProduct, match } = this.props
		onFetchProduct(match.params.id)
	}

	render() {
		const { product } = this.props
		return (
			<div className="ProductPage">
				{product ? (
					<Fragment>
						<Link to="/">Back</Link>
						<h1>{product.name}</h1>
						<img src={product.image} alt={product.name} height={200} />
						<p dangerouslySetInnerHTML={{ __html: product.description }} />
						<a href={product.link} target="_blank" rel="noopener noreferrer">
							More infos
						</a>
						{product.discount && <DiscountSticker value={product.discount} />}
					</Fragment>
				) : null}
			</div>
		)
	}
}

export default withRouter(ProductPage)
