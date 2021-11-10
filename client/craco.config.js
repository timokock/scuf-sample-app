require('dotenv').config()
const webpack = require('webpack');
module.exports = function ({
    env,
    paths
}) {
    return {
        webpack: {
            alias: {
                "@Routes": `${__dirname}/src/routes`,
                "@Utils": `${__dirname}/src/utils`,
                "@Assets": `${__dirname}/src/assets`,
                "@Stores": `${__dirname}/src/stores`,
                "@Services": `${__dirname}/src/services`,
                "@Partials": `${__dirname}/src/partials`,
            },
            plugins: [
                new webpack.DefinePlugin({
                    API_BASE: JSON.stringify("/api")
                })
            ]
        },
        jest: {
            configure: {
                collectCoverageFrom: [
                    "src/**/*.{ts,tsx}",
                    "!src/index.tsx",
                    "!src/router.ts"
                ],
                coverageReporters: ["lcov", "text", "text-summary"],
                moduleNameMapper: {
                    "@Assets/(.*)": "<rootDir>/src/assets/$1",
                    "@Routes/(.*)": "<rootDir>/src/routes",
                    "@Utils/(.*)": "<rootDir>/src/utils/$1",
                    "@Stores/(.*)": "<rootDir>/src/stores/$1",
                    "@Services/(.*)": "<rootDir>/src/services/$1",
                    "@Partials/(.*)": "<rootDir>/src/partials/$1",
                },
                globals: {
                    API_BASE: "http://test"
                }
            },
            
        }
    }
};