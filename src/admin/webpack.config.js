'use strict';

const webpack = require('webpack');
const WebpackBar = require('webpackbar');

module.exports = (webpackConfig, webpack) => {
  // Fix the ProgressPlugin/WebpackBarPlugin schema validation error
  // that occurs with webpack 5.112.2 and Node 24
  //
  // The webpackbar package defaults include 'name', 'color', 'reporters', 'reporter'
  // which are not valid in webpack 5.112.2's ProgressPlugin schema.
  // We need to configure WebpackBar with only valid ProgressPlugin options.
  
  // Override the WebpackBar plugin configuration
  if (webpackConfig.plugins) {
    webpackConfig.plugins = webpackConfig.plugins.map(plugin => {
      if (plugin.constructor && plugin.constructor.name === 'WebpackBar') {
        // Create a new WebpackBar instance with valid options only
        // Valid ProgressPlugin schema options: activeModules, dependencies,
        // dependenciesCount, entries, estimatedTime, handler, modules, modulesCount,
        // percentBy, phaseTimings, profile, progressBar
        const fixedPlugin = new WebpackBar({
          // Only pass valid options, strip invalid ones
          name: undefined,          // Remove invalid 'name'
          color: undefined,         // Remove invalid 'color'
          reporters: undefined,     // Remove invalid 'reporters'
          reporter: undefined,      // Remove invalid 'reporter'
          // Keep valid options
          activeModules: true,
        });
        return fixedPlugin;
      }
      return plugin;
      }
    );
  }

  return webpackConfig;
};
