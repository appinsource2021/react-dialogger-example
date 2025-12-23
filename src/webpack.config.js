module.exports = {
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx", ".css"]
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true // Ensure source maps are enabled here
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true // Ensure source maps are enabled here as well
                        }
                    }
                ]
            }
        ]
    }

};