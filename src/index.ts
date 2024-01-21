import * as core from "@actions/core";
import easyYandexS3 from "easy-yandex-s3";
import { getInputs, removeFileList } from "./helpers";

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
      debug: true,
    });

    if (clear && !destPath) {
      const cleanupResult = await s3.CleanUp();
      console.log("files to cleanup:", cleanupResult);
      core.setOutput("files to cleanup:", cleanupResult);
    }

    if (clear && destPath) {
      const filesToDelete = await s3.GetList(destPath);
      console.log("files to delete:", filesToDelete);
      core.setOutput("files to delete:", filesToDelete);

      if (filesToDelete && filesToDelete?.Contents) {
        await removeFileList(s3, filesToDelete.Contents);
      }
    }

    const upload = await s3.Upload(
      {
        path: sourcePath,
        save_name: true,
      },
      destPath
    );

    core.setOutput("upload", upload);
    console.log(upload);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      core.setFailed(err);
    }
  }
};

main();
