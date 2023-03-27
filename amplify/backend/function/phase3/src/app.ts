import AWS from "aws-sdk";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import indexRouter from "./router";

AWS.config.update({ region: process.env.TABLE_REGION });

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(cors());
app.use("/", indexRouter);

app.listen(3001, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app;
