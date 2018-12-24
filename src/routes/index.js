const Painting = require('../models/Painting');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => `<h1>My Modern API</h1>`
  },
  {
    method: 'GET',
    path: '/api/v1/paintings',
    config: {
      description: 'Get all the paintings',
      tags: ['api', 'v1', 'painting']
    },
    handler: (request, reply) => {
      return Painting.find();
    }
  },
  {
    method: 'POST',
    path: '/api/v1/paintings',
    config: {
      description: 'Create a painting',
      tags: ['api', 'v1', 'painting']
    },
    handler: (request, reply) => {
      const { name, url, techniques } = request.payload;
      const painting = new Painting({
        name,
        url,
        techniques
      });
      return painting.save();
    }
  }
];

module.exports = routes;
