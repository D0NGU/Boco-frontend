module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ["/node_modules/(?!@vuepic/)",],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,vue}"],
  coverageReporters: ['html', 'text', 'text-summary']
}