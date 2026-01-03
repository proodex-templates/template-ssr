/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your other config options here
  
  webpack: (config, { isServer }) => {
    // Add the Babel loader rule
    config.module.rules.push({
      // Match JS, JSX, TS, and TSX files
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      // Only apply this to your src folder to keep builds fast
      include: [path.join(__dirname, "src")],
      use: [
        {
          loader: "babel-loader",
          options: {
            // Using the 'next/babel' preset ensures compatibility with Next.js features
            presets: ["next/babel"],
            plugins: [
              // Point this to the path where you saved your babel file
              [require.resolve("./babel-plugin-markers.cjs")]
            ],
            // Disable looking for local .babelrc files to keep SWC active
            babelrc: false,
            configFile: false,
          },
        },
      ],
    });

    return config;
  },
};

// You'll need to import path at the top of next.config.js
const path = require("path");
module.exports = nextConfig;