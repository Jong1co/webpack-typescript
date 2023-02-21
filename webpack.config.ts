import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import fs from "fs";
import webpack from "webpack";

const isDevelopment = process.env.NODE_ENV === "development";

const config = {
  name: "jongco",
  mode: isDevelopment ? "development" : "production",
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".json", ".jsx", ".css", ".ts", ".tsx"]
  },
  entry: {
    main: path.resolve(__dirname, "src/index.tsx")
  },
  output: {
    path: "/dist",
    filename: `[name].js`
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"]
        },
        exclude: path.join(__dirname, "node_modules")
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"]
      },
      {
        loader: "file-loader",
        exclude: [/\.(ts|tsx|js|jsx|mjs)$/, /\.html$/, /\.json$/, /\.scss$/, /\.css$/],
        options: {
          name: `[name].[hash:8].[ext]`,
          publicPath: `./dist/`
        }
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: `[name].[hash:8].[ext]`,
          publicPath: `./dist/`
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })]
};

export default config;
