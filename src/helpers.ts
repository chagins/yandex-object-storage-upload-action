import * as core from "@actions/core";
import { Inputs } from "types";
import easyYandexS3 from "easy-yandex-s3";

export const getInputs = (): Inputs => {
  const inputs: Inputs = {
    accessKeyId: core.getInput("access_key_id", { required: true }),
    secretAccessKey: core.getInput("secret_access_key", { required: true }),
    bucket: core.getInput("bucket", { required: true }),
    sourcePath: core.getInput("source_path", { required: false }),
    destPath: core.getInput("dest_path", { required: false }),
    clear: core.getInput("clear", { required: false }) === "true",
  };

  return inputs;
};

export const removeFileList = async <T extends { Key?: string }>(
  s3Instance: easyYandexS3,
  list: T[]
) => {
  try {
    const removePromises = await Promise.all(
      list.map(async (file) => {
        if (file?.Key) {
          const removeResult = await s3Instance.Remove(file.Key);
          console.log(`${file.Key} remove result: `, removeResult);
        }
      })
    );

    if (removePromises.length === 0) {
      console.log("No files to delete");
    } else {
      console.log("All files were deleted");
    }
  } catch (err) {
    console.error("remove file list error", err);
  }
};
