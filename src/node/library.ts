// Load app modules.
import nodeWebpackConfig from '.../src/node'
import { TypescriptDeclarationFilePlugin } from '.../src/typescript_declaration_file_plugin'

// Load node modules.
import * as path from 'path'

// Expose the configuration object.
export default (mainDirPath: string) => {
	return {
		...nodeWebpackConfig(mainDirPath, true),
		entry: [
			// Include the project starting point into the bundle.
			path.join(mainDirPath, 'src', 'index.ts'),
		],
		output: {
			// Make sure that the bundle is built as a library that exports objects.
			library: 'library',
			libraryTarget: 'commonjs2',
			// Define the directory for the compilation output.
			path: mainDirPath,
			// Define the name for the compilation output.
			filename: 'index.js',
		},
		plugins: [
			new TypescriptDeclarationFilePlugin(mainDirPath),
		],
	}
}
