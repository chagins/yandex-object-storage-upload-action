import * as core from "@actions/core";
import github from "@actions/github";
import easyYandexS3 from "easy-yandex-s3";
import { getInputs } from "./helpers";

const main = async () => {
  try {
    const {
      accessKeyId,
      secretAccessKey,
      bucket,
      sourcePath,
      destPath,
      clear,
    } = getInputs();

    const s3 = new easyYandexS3({
      auth: {
        accessKeyId,
        secretAccessKey,
      },
      Bucket: bucket,
    });

    if (clear && !destPath) {
      await s3.CleanUp();
    }

    if (clear && destPath) {
      const filesToDelete = await s3.GetList(destPath);
      core.setOutput("files to delete:", filesToDelete);
    }

    const upload = await s3.Upload(
      {
        path: sourcePath,
        save_name: true,
      },
      destPath
    );

    core.setOutput("upload", upload);

  } catch (err) {
    if (err instanceof Error) {
      core.setFailed(err);
    }

    console.error(err);
  }
};

main();
