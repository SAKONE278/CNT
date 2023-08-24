import info from './version.json';

export default {
  appTitle: process.env.REACT_APP_TITLE || 'CHAT',
  version: info.version,
  build: info.build,
  publicUrl: process.env.PUBLIC_URL,
  url: process.env.REACT_APP_BACKEND_URL,
  registerEnabled: process.env.REACT_APP_REGISTER_ENABLED === 'true',
  demo: process.env.REACT_APP_DEMO === 'true',
};
