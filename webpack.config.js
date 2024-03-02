const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

var fileExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

const isDevelopment = true;

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    popup: path.join(__dirname, "src", "pages", "popup", "index.tsx"),
    authorize: path.join(__dirname, "src", "pages", "authorize", "index.tsx"),
    background: path.join(__dirname, "src", "background", "background.ts"),
    contentScript: path.join(
      __dirname,
      "src",
      "contentScript",
      "content-script.ts"
    ),
    App: path.join(__dirname, "src", "extension-app", "index.tsx"),
    card_content_script: path.join(
      __dirname,
      "src",
      "extension-app",
      "card-script.tsx"
    ),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve("public/manifest.json"),
          to: path.join(__dirname, "dist"),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve("public/@libs/trello.min.js"),
          to: path.join(__dirname, "dist", "@libs"),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "popup", "index.html"),
      filename: "popup.html",
      chunks: ["popup"],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "pages", "authorize", "index.html"),
      filename: "authorize.html",
      chunks: ["authorize"],
      cache: false,
    }),
  ],
};
