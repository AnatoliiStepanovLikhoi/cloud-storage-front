import { Extension } from "./getColorExtention";

export const getExtentionFromFileName = (filename: string) => {
  return filename.split(".").pop() as Extension;
};
