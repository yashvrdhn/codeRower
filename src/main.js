const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const ConfigurationSchema = new mongoose.Schema({
  configId: String,
  data: Array,
  remark: String,
});

const ConfigurationModel = mongoose.model("Configuration", ConfigurationSchema);

async function bootstrap() {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());

  await mongoose.connect(
    "mongodb+srv://development:X3TcC8tKnI5JINuR@betalive.9sakb.gcp.mongodb.net/codeRowerAssignment"
  );

  app.get("/api/configurations/:id", async function (request, response) {
    const data = await ConfigurationModel.findOne({
      configId: request.params.id,
    });

    if (!data) return response.json({ message: "No configuration found" });
    return response.json(data.data);
  });

  app.put("/api/configurations/:id", async function (request, response) {
    const { remark } = request.body;
    const result = await ConfigurationModel.findOneAndUpdate(
      { configId: request.params.id },
      { remark }
    );

    if ((result && result.errors) || !result) {
      console.log(result?.errors);
      return response.json({ message: "failure" });
    }

    return response.json({ message: "success" });
  });

  app.listen(8080, () => {
    console.log("listening on: 8080");
  });
}

bootstrap();
