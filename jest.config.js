module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: [
    "/node_modules/(?!@vuepic/)",
  ],
  verbose: false,
  coveragePathIgnorePatterns: [
    "node_modules",
    "http-common.js",
    "registerServiceWorker.js",
    "main.js",
  ],

  /* Test and coverage */
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}"
  ],
  coverageReporters: [
    'html', 
    'text', 
    'text-summary' /* For GitLab coverage */
  ]
}