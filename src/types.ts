export type PathPattern = string;

export interface Inputs {
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  sourcePath: string;
  destPath: string;
  clear: boolean;
}
