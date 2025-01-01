import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";
import { Download, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const S3ObjectDownloadButton = ({ fileKey }: { fileKey: string }) => {
  const [downloadStatus, setDownloadingStatus] = useState(false);
  const s3 = new S3({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
      accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
    },
  });

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
        Bucket: import.meta.env.VITE_PRIVET_BUCKET_NAME,
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

  return (
    <>
      {downloadStatus && (
        <div className="fixed bg-red-500 text-white top-32 p-2 px-3  rounded-md opacity-80 flex gap-2">
          {" "}
          <Loader className="animate-spin" />
          <span>
            Hold on. It's converting to blob then starting the download
          </span>{" "}
        </div>
      )}
      <Button
        onClick={handleDownload}
        className=" flex gap-1 text-white mt-2 rounded shadow "
      >
        <Download />
        <span>Download File</span>{" "}
      </Button>
    </>
  );
};

export default S3ObjectDownloadButton;
