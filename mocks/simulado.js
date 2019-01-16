const simulado = require('simulado')
const mocks = require('./')

try {
	simulado
		.setDefaults(mocks)
		.then(() => console.log('Simulado has been primed'))
		.catch(err => console.error(err))
} catch (err) {
	console.error(err)
}
