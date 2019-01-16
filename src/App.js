import React, { Component, Fragment } from 'react'
import { Link, Redirect, Route, Router, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

import LoginPage from './LoginPage'
import HomePage from './HomePage'
import ProductPage from './ProductPage'

import './App.css'

const history = createBrowserHistory()

class App extends Component {
	state = {
		user: null,
		orders: null,
	}

	constructor(props) {
		super(props)

		this.onLogin = this.onLogin.bind(this)
		this.onFetchOrders = this.onFetchOrders.bind(this)
		this.onFetchProduct = this.onFetchProduct.bind(this)
	}

	async onLogin(username, password) {
		const res = await fetch('http://localhost:7001/login', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify({ username, password }),
		})
		const data = await res.json()
		this.setState(() => ({
			user: data,
		}))
		history.push('/')
	}

	async onFetchOrders() {
		const res = await fetch('http://localhost:7001/orders', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
		const data = await res.json()
		this.setState(() => ({
			orders: data,
		}))
	}

	async onFetchProduct(id) {
		const res = await fetch(`http://localhost:7001/product/${id}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
		const data = await res.json()
		this.setState(() => ({
			product: data,
		}))
	}

	render() {
		const { user, orders, product } = this.state
		return (
			<div className="App">
				<Router history={history}>
					<Fragment>
						<Link to="/">
							<img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" className="logo" />
						</Link>
						<hr />
						<Switch>
							<Route path="/login" render={() => <LoginPage onSubmit={this.onLogin} />} />
							<Route
								exact={true}
								path="/"
								render={() => {
									if (!user) {
										return <Redirect to={{ pathname: '/login' }} />
									}
									return <HomePage user={user} orders={orders} onFetchOrders={this.onFetchOrders} />
								}}
							/>
							<Route
								path="/product/:id"
								render={() => {
									if (!user) {
										return <Redirect to={{ pathname: '/login' }} />
									}
									return <ProductPage product={product} onFetchProduct={this.onFetchProduct} />
								}}
							/>
							<Redirect to="/" />
						</Switch>
					</Fragment>
				</Router>
			</div>
		)
	}
}

export default App
