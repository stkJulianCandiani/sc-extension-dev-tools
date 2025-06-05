module.exports = {
    roots: ['<rootDir>'],
    testMatch: ['**/oauth1/UnitTests/**/*.js'],
    testPathIgnorePatterns: ['/Mocks/', '/coverage/'],
    collectCoverage: false,
    coverageDirectory: 'UnitTests/coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
        "**/*": {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: -10,
        },
    },
    collectCoverageFrom: ['index.js'],
    coveragePathIgnorePatterns: ['/node_modules/', '/UnitTests/'],
    moduleFileExtensions: ['ts', 'tsx', 'jsx', 'js', 'json', 'node', 'd.ts']
};
