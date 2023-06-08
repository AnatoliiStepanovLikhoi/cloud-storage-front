import { FileItem } from "@/api/dto/files.dto";
import { FileActions } from "@/components/FileActions";
import { FileList, FileSelectType } from "@/components/FileList";
import * as Api from "@/api";
import { Empty } from "antd";
import React, { useState } from "react";

interface FilesProps {
  items: FileItem[];
  withActions?: boolean;
}

export const Files: React.FC<FilesProps> = ({ items, withActions }) => {
  const [files, setFiles] = useState(items || []);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  console.log(selectedIds);

  const onFileSelect = (id: number, type: FileSelectType) => {
    if (type === "select") {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((_id) => _id !== id));
    }
  };

  const onClickRemove = () => {
    setSelectedIds([]);
    setFiles((prev) => prev.filter((file) => !selectedIds.includes(file.id)));
    Api.files.remove(selectedIds);
  };

  const onClickShare = () => {
    alert("share");
  };
  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              isActive={selectedIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="Empty file list.." />
      )}
    </div>
  );
};
