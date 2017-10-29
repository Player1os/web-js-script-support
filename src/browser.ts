// Load app modules.
import commonConfig from '.../src/common'

// Load npm modules.
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin'

// Expose the configuration object.
export default (mainDirPath: string, isTypesIncluded = false) => {
	return {
		// Add the common configuration.
		...commonConfig(mainDirPath, isTypesIncluded),
		// Add the uglification of the result.
		plugins: [
			new UglifyJSPlugin(),
		],
	}
}
