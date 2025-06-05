module.exports = {
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testMatch: ['**/ns-progress-bar/UnitTests/**/*.[jt]s?(x)'],
    testPathIgnorePatterns: ['/Mocks/'],
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
