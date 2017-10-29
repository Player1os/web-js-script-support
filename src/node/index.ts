// Load node modules.
import * as fs from 'fs'
import * as path from 'path'

// Expose the configuration object.
export default (mainDirPath: string, isTypesIncluded = false) => {
	// Load the package file.
	const packageJson = JSON.parse(fs.readFileSync(path.join(mainDirPath, 'package.json'), 'utf-8'))

	return {
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
		module: {
			loaders: [
				// Specify a loader for all typescript source files that first compiles typescript into es2017 standards javascript
				// using the typescript compiler and then compiles that to javascript supported by the current node runtime
				// using the babel compiler.
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					loader: 'awesome-typescript-loader',
					options: {
						...(isTypesIncluded
							? {
								declaration: true,
								declarationDir: 'types',
							}
							: {}),
						compilerOptions: {
							target: 'es2017',
						},
						useBabel: true,
						babelOptions: {
							presets: [
								['env', {
									targets: {
										node: 'current',
									},
								}],
							],
						},
					},
				},
			],
		},
		resolve: {
			// Specify that the '#' character in imports should be resolved to the project's root path.
			alias: {
				'...': mainDirPath,
			},
			// Specify that the typescript and javascript extensions can be ommitted from module names.
			extensions: [
				'.ts',
				'.js',
			],
		},
		// Specify that a sourcemap should be created for the outputted bundle.
		devtool: 'source-map',
	}
}
