import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config();

const serverURL = 'http://localhost:3000';

if (!serverURL) {
  throw new Error("ServerURL missing");
}

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personalized News',
      version: '1.0.0',
      description: 'API documentation for Personalized News',
    },
    servers: [
      {
        url: serverURL,
        description: 'Local server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.ts'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec,
  swaggerUiHandler: swaggerUi,
};
