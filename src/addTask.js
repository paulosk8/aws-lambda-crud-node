const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.addTask = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { title, description } = JSON.parse(event.body);
  const createAT = new Date();
  const id = v4();

  const newTask = {
    id,
    title,
    description,
    createAT,
    done: false,
  };
  await dynamodb
    .put({
      TableName: "TaskTable",
      Item: newTask,
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(newTask),
  };
};
