import { createRequire } from 'module';
import pkg from '../../package.json' assert {type: "json"};

const apiVersion = {
  name: 'health-check',
  version: '1.1.1',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/health-check',
      options: {
        description: 'API version',
        tags: ['api'],
      },
      handler: () => pkg.version,
    })
  }
};

export default apiVersion;