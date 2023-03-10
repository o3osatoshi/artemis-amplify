import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { P3Player as P3PlayerDomain, P3Player } from "../../domain/type";
import { P3Player as P3PlayerEntity } from "../../infrastructure/entity/P3Player";
import { AttributeValue } from "@aws-sdk/client-dynamodb/dist-types/models";

export default class UseCase {
  private readonly env: string;
  private readonly endpoint: string;
  private readonly client: DynamoDBClient;
  private readonly tableName: string;

  constructor() {
    this.env = process.env.ENV || "";
    this.endpoint = process.env.DDB_ENDPOINT || "";
    if (!this.endpoint) throw new Error("Missing DDB_ENDPOINT configuration");

    this.client = new DynamoDBClient({ endpoint: this.endpoint });
    this.tableName = "p3Player-" + this.env;
  }

  async checkArtifacts(p3Player: P3Player): Promise<void> {
    const p3PlayerEntity = new P3PlayerEntity(p3Player);
    const params = {
      TableName: this.tableName,
      Item: p3PlayerEntity as Record<keyof P3PlayerDomain, AttributeValue>,
    };
    try {
      const data = await this.client.send(new PutItemCommand(params));
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }
}

// import AWS from "aws-sdk";
// import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
// import bodyParser from "body-parser";
// import express from "express";
//
// AWS.config.update({ region: process.env.TABLE_REGION });
//
// let tableName = "p3Player";
// let dynamodb: AWS.DynamoDB.DocumentClient;
// if (process.env.ENV && process.env.ENV !== "NONE") {
//   tableName = tableName + "-" + process.env.ENV;
//   dynamodb = new AWS.DynamoDB.DocumentClient({
//     endpoint: process.env.DDB_ENDPOINT,
//   });
// } else {
//   dynamodb = new AWS.DynamoDB.DocumentClient();
// }
//
// const userIdPresent = false; // TODO: update in case is required to use that definition
// const partitionKeyName = "walletAddress";
// const partitionKeyType = "S";
// const sortKeyName = "";
// const hasSortKey = sortKeyName !== "";
// const path = "/api/p3/players";
// const UNAUTH = "UNAUTH";
// const hashKeyPath = "/:" + partitionKeyName;
// const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";
//
// // declare a new express app
// const app = express();
// app.use(bodyParser.json());
// app.use(awsServerlessExpressMiddleware.eventContext());
//
// // Enable CORS for all methods
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });
//
// // convert url string param to expected Type
// const convertUrlType = (param: string, type: string) => {
//   switch (type) {
//     case "N":
//       return Number.parseInt(param);
//     default:
//       return param;
//   }
// };
//
// /********************************
//  * HTTP Get method for list objects *
//  ********************************/
//
// interface Condition {
//   walletAddress: any;
// }
//
// app.get(path + hashKeyPath, function (req, res) {
//   const condition: Condition = { walletAddress: {} };
//   condition[partitionKeyName] = {
//     ComparisonOperator: "EQ",
//   };
//
//   if (userIdPresent && req.apiGateway) {
//     condition[partitionKeyName]["AttributeValueList"] = [
//       req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH,
//     ];
//   } else {
//     try {
//       condition[partitionKeyName]["AttributeValueList"] = [
//         convertUrlType(req.params[partitionKeyName], partitionKeyType),
//       ];
//     } catch (err) {
//       res.statusCode = 500;
//       res.json({ error: "Wrong column type " + err });
//     }
//   }
//
//   let queryParams = {
//     TableName: tableName,
//     KeyConditions: condition,
//   };
//
//   // @ts-ignore
//   dynamodb.query(queryParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({ error: "Could not load items: " + err });
//     } else {
//       res.json(data.Items);
//     }
//   });
// });
//
// /*****************************************
//  * HTTP Get method for get single object *
//  *****************************************/
//
// interface Params {
//   walletAddress: any;
// }
//
// app.get(path + "/object" + hashKeyPath + sortKeyPath, function (req, res) {
//   const params: Params = { walletAddress: {} };
//   if (userIdPresent && req.apiGateway) {
//     params[partitionKeyName] =
//       req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   } else {
//     params[partitionKeyName] = req.params[partitionKeyName];
//     try {
//       params[partitionKeyName] = convertUrlType(
//         req.params[partitionKeyName],
//         partitionKeyType
//       );
//     } catch (err) {
//       res.statusCode = 500;
//       res.json({ error: "Wrong column type " + err });
//     }
//   }
//
//   let getItemParams = {
//     TableName: tableName,
//     Key: params,
//   };
//
//   dynamodb.get(getItemParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({ error: "Could not load items: " + err.message });
//     } else {
//       if (data.Item) {
//         res.json(data.Item);
//       } else {
//         res.json(data);
//       }
//     }
//   });
// });
//
// /************************************
//  * HTTP put method for insert object *
//  *************************************/
//
// app.put(path, function (req, res) {
//   if (userIdPresent && req.apiGateway) {
//     req.body["userId"] =
//       req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   }
//
//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body,
//   };
//   dynamodb.put(putItemParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({ error: err, url: req.url, body: req.body });
//     } else {
//       res.json({ success: "put call succeed!", url: req.url, data: data });
//     }
//   });
// });
//
// /************************************
//  * HTTP post method for insert object *
//  *************************************/
//
// app.post(path, function (req, res) {
//   if (userIdPresent && req.apiGateway) {
//     req.body["userId"] =
//       req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   }
//
//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body,
//   };
//   dynamodb.put(putItemParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({ error: err, url: req.url, body: req.body });
//     } else {
//       res.json({ success: "post call succeed!", url: req.url, data: data });
//     }
//   });
// });
//
// /**************************************
//  * HTTP remove method to delete object *
//  ***************************************/
//
// app.delete(path + "/object" + hashKeyPath + sortKeyPath, function (req, res) {
//   const params: Params = { walletAddress: {} };
//   if (userIdPresent && req.apiGateway) {
//     params[partitionKeyName] =
//       req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   } else {
//     params[partitionKeyName] = req.params[partitionKeyName];
//     try {
//       params[partitionKeyName] = convertUrlType(
//         req.params[partitionKeyName],
//         partitionKeyType
//       );
//     } catch (err) {
//       res.statusCode = 500;
//       res.json({ error: "Wrong column type " + err });
//     }
//   }
//
//   let removeItemParams = {
//     TableName: tableName,
//     Key: params,
//   };
//   dynamodb.delete(removeItemParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({ error: err, url: req.url });
//     } else {
//       res.json({ url: req.url, data: data });
//     }
//   });
// });
//
// app.listen(3001, function () {
//   console.log("App started");
// });
//
// // Export the app object. When executing the application local this does nothing. However,
// // to port it to AWS Lambda we will create a wrapper around that will load the app from
// // this file
// export default app;
