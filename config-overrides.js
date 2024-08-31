const { ProvidePlugin } = require("webpack");
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
const postcssNormalize = require('postcss-normalize');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = function override(config, webpackEnv) {
  console.log('overriding webpack config...');

  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  // Find the styles rules
  const rules = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  const styleRules = rules.filter(rule => rule.sideEffects === true && rule.test.toString().includes('css'));

  // Modify each style rule to include Tailwind CSS processing
  styleRules.forEach(rule => {
    const postCssLoader = rule.use.find(loader => loader.loader && loader.loader.includes('postcss-loader'));
    if (postCssLoader) {
      postCssLoader.options.postcssOptions = {
        ident: 'postcss',
        plugins: [
          'tailwindcss',
          'autoprefixer',
          postcssNormalize(),
        ],
      };
    }
  });

  // Add new rules
  config.module.rules.push(
    {
      test: /\.m?js$/,
      enforce: "pre",
      use: ["source-map-loader"],
      resolve: {
        fullySpecified: false,
        fallback: {
          "react/jsx-runtime": "react/jsx-runtime.js",
          "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
        },
      },
    },
    {
      test: /\.wasm$/,
      type: "webassembly/async",
    }
  );

  // Add babel-loader for node_modules
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf;
  loaders.splice(loaders.length - 1, 0, {
    test: /\.(js|mjs|cjs)$/,
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    loader: require.resolve('babel-loader'),
    options: {
      babelrc: false,
      configFile: false,
      compact: false,
      presets: [
        [
          require.resolve('babel-preset-react-app/dependencies'),
          { helpers: true },
        ],
      ],
      cacheDirectory: true,
      cacheCompression: false,
      cacheIdentifier: getCacheIdentifier(
        isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        [
          'babel-plugin-named-asset-import',
          'babel-preset-react-app',
          'react-dev-utils',
          'react-scripts',
        ]
      ),
      sourceMaps: shouldUseSourceMap,
      inputSourceMap: shouldUseSourceMap,
    },
  });

  // Add ProvidePlugin
  config.plugins.push(
    new ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    })
  );

  // Add resolve fallbacks
  config.resolve.fallback = {
    ...config.resolve.fallback,
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    console: require.resolve("console-browserify"),
    constants: require.resolve("constants-browserify"),
    crypto: require.resolve("crypto-browserify"),
    domain: require.resolve("domain-browser"),
    events: require.resolve("events"),
    fs: false,
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    path: require.resolve("path-browserify"),
    punycode: require.resolve("punycode"),
    process: require.resolve("process/browser"),
    querystring: require.resolve("querystring-es3"),
    stream: require.resolve("stream-browserify"),
    string_decoder: require.resolve("string_decoder"),
    sys: require.resolve("util"),
    timers: require.resolve("timers-browserify"),
    tty: require.resolve("tty-browserify"),
    url: require.resolve("url"),
    util: require.resolve("util"),
    vm: require.resolve("vm-browserify"),
    zlib: require.resolve("browserify-zlib"),
  };

  // Add experiments
  config.experiments = {
    ...config.experiments,
    asyncWebAssembly: true,
  };

  // Ignore warnings
  config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};