import {APIGatewayProxyEvent, Context} from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';
// @ts-ignore
import app from './app';

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event: APIGatewayProxyEvent, context: Context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
