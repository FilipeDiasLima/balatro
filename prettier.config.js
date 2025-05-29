/** @type {import('prettier').Config} */
const config = {
  semi: true,
  doubleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  pluginSearchDirs: false,
  plugins: ['prettier-plugin-tailwindcss'],
  importOrder: ['^@', '^[a-zA-Z0-9-]+', '^[./]'],
}

export default config
