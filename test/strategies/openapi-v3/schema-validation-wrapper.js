/**
 * To validate OpenApi schemas we need more than just the schemas produced
 * by sequelize-to-any-json-schema. This skeleton provides the surrounding
 * schema required to pass validation (where `components/schemas` will be
 * filled with the content provided by the OpenApi6Strategy produced schema.
 *
 * Please note that we also need to set the root key (e.g. `users`)
 */

module.exports = Object.freeze({
  openapi: '3.0.2',
  info: {
    title: 'Fake API',
    version: '0.0.1',
  },
  paths: {
    '/users': {
      get: {
        parameters: [],
        responses: {
          '404': {
            description: 'not found',
          },
        },
        description: 'Retrieves a list of all users from the API.',
        summary: '',
        tags: ['users'],
        security: [],
      },
    },
  },
  components: {
    schemas: {},
  },
});
