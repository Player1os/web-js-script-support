// Expose the configuration object factory.
export default (mainDirPath: string, isTypesIncluded = false) => {
	return {
		module: {
			loaders: [
				// Specify a loader for all typescript source files that compiles them based on the given project's config.
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					loader: 'awesome-typescript-loader',
					...(isTypesIncluded
						? {
							options: {
								declaration: true,
								declarationDir: 'types',
							},
						}
						: {}),
				},
			],
		},
		resolve: {
			// Specify that the alias in imports, that should be resolved to the project's root path.
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
