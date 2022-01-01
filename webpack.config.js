const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV ?? 'development',
    devtool: 'inline-source-map',
    entry: './assets/js/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './public/assets'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: { name: 'bundle.css' },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
};
