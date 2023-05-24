module.exports = {
  apps: [{
    name: "UWGlitches Map",
    script: 'serve',
    env: {
      PM2_SERVE_PATH: '.',
      PM2_SERVE_PORT: 8216,
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPAGE: './index.html'
    },
  }]
};
