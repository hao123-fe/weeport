module.exports = {
  // parserOptions: {
  //   ecmaVersion: 6,
  //   sourceType: 'module',
  //   ecmaFeatures: {
  //     jsx: true
  //   }
  // },
  // rules: {
  //   semi: 0
  // }
  parser: 'babel-eslint',
  plugins: ['react', 'import', 'node', 'promise', 'standard'],
  extends: ['standard', 'standard-react']
}