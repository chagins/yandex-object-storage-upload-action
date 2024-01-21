import * as core from "@actions/core";
import { Inputs } from "types";

export const getInputs = (): Inputs => {
  const inputs: Inputs = {
    accessKeyId: core.getInput("access_key_id", { required: true }),
    secretAccessKey: core.getInput("secret_access_key", { required: true }),
    bucket: core.getInput("bucket", { required: true }),
    sourcePath: core.getInput("source_path", { required: false }),
    destPath: core.getInput("dest_path", { required: false }),
    clear: core.getInput("clear", { required: false }) === "true",
  };

  core.setOutput("inputs", inputs);

  return inputs;
};
