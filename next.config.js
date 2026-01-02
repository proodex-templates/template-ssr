const { resolve } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. REMOVED swcMinify: true (it is now the default and the key is deprecated)

  webpack(config) {
    config.module.rules.push({
      test: /\.(tsx|jsx)$/,
      // Only apply babel to your app code to keep builds fast
      include: [resolve(__dirname, "src/app")],
      use: {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: [
            ["@babel/preset-react", { runtime: "automatic" }],
            ["@babel/preset-typescript", { isTSX: true, allExtensions: true }]
          ],
          plugins: [
            resolve(__dirname, "babel-plugin-markers.cjs")
          ]
        }
      }
    });
    return config;
  }
};

module.exports = nextConfig;