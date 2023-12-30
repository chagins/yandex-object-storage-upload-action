import path from "path";
import webpack from "webpack";

const webpackConfig: webpack.Configuration = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "index.ts"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  target: ['node', 'es6'],
};

export default webpackConfig;
