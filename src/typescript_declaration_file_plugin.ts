// Load npm modules.
import * as cpr from 'cpr'
import * as recursiveReaddirSync from 'recursive-readdir-sync'
import * as rimraf from 'rimraf'
import * as webpack from 'webpack'

// Load node modules.
import * as fs from 'fs'
import * as path from 'path'

// Declare a plugin for processing the outputed type declaration files.
export class TypescriptDeclarationFilePlugin {
	constructor(
		protected mainDirPath: string,
	) {}

	apply(this: TypescriptDeclarationFilePlugin, compiler: webpack.Compiler) {
		// Schedule to execute after the compilation is done.
		compiler.plugin('done', () => {
			// Store the path to the type declaration files.
			const originalTypeDeclarationsPath = path.join(this.mainDirPath, 'types', 'src')
			const newTypeDeclarationsPath = path.join(this.mainDirPath, 'types')

			// Copy all type declaration files to the new location.
			cpr(originalTypeDeclarationsPath, newTypeDeclarationsPath, {
				overwrite: true,
			}, (err) => {
				if (err) {
					// Rethrow the error.
					throw err
				}

				// Remove the original directory of the type declarations.
				rimraf.sync(originalTypeDeclarationsPath)

				// Find all the type declaration files.
				{
					(recursiveReaddirSync as (directoryPath: string) => string[])(newTypeDeclarationsPath)
						.forEach((filePath) => {
							// Determine the current module's depth relative to the src directory.
							const depth = filePath.split(newTypeDeclarationsPath + path.sep)[1].split(path.sep).length - 1

							// Replace the aliased paths with relative paths within the current module.
							const depthSubPath = '../'.repeat(depth)
							const alteredContents = fs.readFileSync(filePath, 'utf-8').replace(/...\/src\//g, `./${depthSubPath}`)
							fs.writeFileSync(filePath, alteredContents, { encoding: 'utf-8' })
						})
				}
			})
		})
	}
}
