// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ["oaidalleapiprodscus.blob.core.windows.net", "localhost"]
//   },
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const { parsed: myEnv } = require('dotenv').config({
  path:'./.env'
})


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
 
}

module.exports = {...nextConfig,
images: {
  domains: ['gateway.pinata.cloud',"oaidalleapiprodscus.blob.core.windows.net", "localhost"],
},
webpack(config) {
  config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
  return config
}
}
