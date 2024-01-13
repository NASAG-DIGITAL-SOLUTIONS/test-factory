import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    entry: ['./src/index.js', './src/styles.css'],
    mode: 'production',
    externals: 'window',
    output: {
        path: resolve(__dirname, 'umd'),
        filename: 'core.min.js',
        library: '@testfactory/core',
        libraryTarget: 'umd'
    },

    // setupTestFrameworkScriptFile: '/bin/jest.js',

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'core.styles.css' })]
}
