const Hapi = require('hapi');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

mongoose.connect('mongodb://127.0.0.1:27017/painting', { useNewUrlParser: true })
  .then(() => console.log('DB is connected and ready to use....'))
  .catch(err => console.log(`Error happens! ` + err));


const server = Hapi.Server({
  port: 4000,
  host: 'localhost'
});

const init = async () => {
  server.route(routes);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'API Documentation',
          version: require('../package').version
        }
      }
    }
  ])
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      },
      route: {
        cors: true
      }
    }
  });

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema
      },
      route: {
        cors: true
      }
    }
  });
  await server.start()
  console.log(`Server is up and running on port ${server.info.uri}`)
}
init();
