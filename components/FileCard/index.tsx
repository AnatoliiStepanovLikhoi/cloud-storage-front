import { getExtentionFromFileName } from "@/utils/getExtentionFromFilename";
import { isImage } from "@/utils/isFileImage";
import React from "react";
import styles from "./FileCard.module.scss";
import { getColorByExtension } from "@/utils/getColorExtention";
import { FileTextOutlined } from "@ant-design/icons";

interface FileCardProps {
  filename: string;
  originalName: string;
}

export const FileCard: React.FC<FileCardProps> = ({
  originalName,
  filename,
}) => {
  const ext = getExtentionFromFileName(filename);
  const imageUrl =
    ext && isImage(ext) ? "http://localhost:4000/uploads/" + filename : "";

  const color = getColorByExtension(ext);
  const classColor = styles[color];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColor}>{ext}</i>
        {isImage(ext) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.image} src={imageUrl} alt="file Image" />
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{originalName}</span>
    </div>
  );
};
