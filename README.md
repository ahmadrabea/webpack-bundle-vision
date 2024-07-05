# webpack-bundle-vision

`webpack-bundle-vision` is a Webpack plugin designed to analyze your build stats and provide detailed information about critical paths, circular dependencies, and other build and performance metrics. This helps you optimize your build process and improve the performance of your applications.

## Features

- **Circular Dependencies Detection**: Detect and report circular dependencies.
- **Critical Path Analysis**: Identify and analyze critical paths in your build..
- **Performance Metrics**: Gain insights into various performance metrics of your build.
## Installation
You can install `webpack-bundle-vision` via npm or yarn:
```bash
npm install webpack-bundle-vision --save-dev
```
or
```bash
yarn add webpack-bundle-vision --dev
```
## Usage
To use `webpack-bundle-vision`, add it to your Webpack configuration file (`webpack.config.js`):
```javascript
const WebpackBundleVision = require('webpack-bundle-vision');
module.exports = {
// ... other configurations
  plugins: [
    WebpackBundleVision({
      fileName: 'my-build-report.json',
      path: './build-reports',
      criticalPathsLimit: 5,
      criticalPathDepth: 3
    })
  ]
};
```
In this example, `webpack-bundle-vision` will generate a report file named `my-build-report.json` in the `dist/build-reports` directory, showing the top 5 critical paths with a depth of 3 and other performance metrics .
### Options
The plugin accepts the following options:
- `fileName` (optional): The name of the output file. Default is `bundle-vision.json`.
- `path` (optional): The directory where the output file will be saved. Default is the webpack output.
- `criticalPathsLimit` (optional): The number of critical paths to show. Default is `10`.
- `criticalPathDepth` (optional): The depth of the critical paths to show. Default is `10`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your improvements.
## License
This project is licensed under the MIT License.
## Contact
For any questions or suggestions, feel free to contact me.
---
