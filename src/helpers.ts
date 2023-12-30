import core from "@actions/core";
import { Inputs } from "types";

export const getInputs = (): Inputs => {
  const inputs: Inputs = {
    accessKeyId: core.getInput("access_key_id", { required: true }),
    secretAccessKey: core.getInput("secret_access_key", { required: true }),
    bucket: core.getInput("bucket", { required: true }),
    sourcePath: core.getInput("source_path", { required: true }),
    destPath: core.getInput("dest_path", { required: true }),
    clear: core.getInput("clear", { required: true }) === "true",
  };

  core.setOutput("inputs", inputs);

  return inputs;
};
