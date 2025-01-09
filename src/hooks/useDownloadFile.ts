import { useState } from "react";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import toast from "react-hot-toast";
import s3 from "@/aws/awsClient";

const useDownloadFile = (fileKey: string) => {
  const [downloadStatus, setDownloadingStatus] = useState(false);

  const streamToBlob = async (stream: ReadableStream) => {
    const reader = stream.getReader();
    const chunks = [];
    let done, value;

    while (true) {
      ({ done, value } = await reader.read());
      if (done) break;
      chunks.push(value);
    }

    return new Blob(chunks);
  };

  const handleDownload = async () => {
    if (!fileKey) return;

    setDownloadingStatus(true);

    try {
      const getObjectCommand = new GetObjectCommand({
        Bucket: import.meta.env.VITE_PRIVET_BUCKET_NAME_AWS_S3,
        Key: fileKey,
      });

      const data = await s3.send(getObjectCommand);

      if (data.Body instanceof ReadableStream) {
        const blob = await streamToBlob(data.Body);
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = fileKey;
        downloadLink.click();
        toast.success("file downloaded");
      } else {
        throw new Error("data.Body is not a ReadableStream");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("file not downloaded");
    } finally {
      setDownloadingStatus(false);
    }
  };

  return { downloadStatus, handleDownload };
};

export default useDownloadFile;
