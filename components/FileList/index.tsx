import React from "react";
import { FileItem } from "@/api/dto/files.dto";
import { FileCard } from "../FileCard";
import styles from "./FileList.module.scss";

interface FileListProps {
  items: FileItem[];
}

export const FileList: React.FC<FileListProps> = ({ items }) => {
  return (
    <div className={styles.root}>
      {items.map((item) => (
        <div key={item.id} className="file">
          <FileCard filename={item.filename} originalName={item.originalName} />
        </div>
      ))}
    </div>
  );
};
