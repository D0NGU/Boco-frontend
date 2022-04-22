module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'auto', // need babel Parsing es module
            targets: {
              node: 'current' // Specifies that the environment is current node edition
            }
          }
        ]
      ]
    }
  }

}
