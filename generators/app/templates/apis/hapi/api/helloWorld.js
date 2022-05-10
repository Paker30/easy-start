const helloWorld = {
  name: 'helloWorld',
  version: '1.0.0',
  register: (server) => {
    server.route({
      method: 'GET',
      path: '/hello-world',
      options:{
        description: 'Greats to the world',
        tags: ['api'],
      },
      handler: (request) => {
          return 'Hello World!';
      },
    });
  }
};

export default helloWorld;