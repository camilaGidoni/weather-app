module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'vue'],
    testEnvironment: 'jsdom',
};
