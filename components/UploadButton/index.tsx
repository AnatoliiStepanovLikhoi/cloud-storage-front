import React, { useState } from "react";
import styles from "@/styles/Home.module.scss";
import { Button, Upload, UploadFile, notification } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import * as Api from "@/api";

export const UploadButton: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onUploadSuccess = async (options: any) => {
    try {
      const file = await Api.files.uploadFile(options);

      setFileList([]);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "File downloading has failed..",
        duration: 2,
      });
    }
  };
  return (
    <Upload
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      className={styles.upload}
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Download file
      </Button>
    </Upload>
  );
};
