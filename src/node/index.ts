// Load app modules.
import commonConfig from '.../src/common'

// Load npm modules.
import * as fse from 'fs-extra'

// Load node modules.
import * as path from 'path'

// Expose the configuration object factory.
export default (mainDirPath: string, isTypesIncluded = false) => {
	// Load the package file.
	const packageJson = fse.readJsonSync(path.join(mainDirPath, 'package.json'))

	return {
		// Add the common configuration.
		...commonConfig(mainDirPath, isTypesIncluded),
		// Specify the target to be the node runtime.
		target: 'node',
		// Specify that all standard dependencies should be considered exterals to be dynamically included.
		externals: Object.keys('dependencies' in packageJson ? packageJson.dependencies : {})
			.reduce((externals, dependencyName) => {
				externals[dependencyName] = `commonjs ${dependencyName}`
				return externals
			}, {}),
		// Specify the global declarations of the node runtime.
		node: {
			__filename: true,
			__dirname: true,
		},
	}
}
