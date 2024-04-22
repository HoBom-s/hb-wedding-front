/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (webpackConfig) => {
    const prod = process.env.NODE_ENV === "production";
    const config = {
      ...webpackConfig,
      mode: prod ? "production" : "development",
    };

    if (prod) {
      config.devtool = "hidden-source-map";
    }

    return config;
  },
};

export default nextConfig;
