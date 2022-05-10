import Glue from '@hapi/glue';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import pkg from '../package.json' assert {type: "json"};
import helloWorld from './api/helloWorld.js';
import apiVersion from './api/version.js';

const PORT = 8000;

const swaggerOptions = {
  info: {
    version: pkg.version,
  },
};

const manifest = {
  server: {
    address: '0.0.0.0',
    port: PORT,
  },
  register: {
    plugins: [
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      helloWorld,
      apiVersion
    ],
  },
};

const {pathname: root} = new URL('.', import.meta.url);

const options = {
  relativeTo: root,
};

const startServer = async () => {
  try {
    const server = await Glue.compose(manifest, options);
    await server.start();
    console.log('hapi days!');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();