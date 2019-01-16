import React from 'react'

import './DiscountSticker.css'

const DiscountSticker = ({value}) => (
	<div className="DiscountSticker">
		-{value}%
	</div>
)

export default DiscountSticker
