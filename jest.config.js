
export default {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    transformIgnorePatterns: ['/node_modules/(?!(@vue|vue-router)/)'],
};
