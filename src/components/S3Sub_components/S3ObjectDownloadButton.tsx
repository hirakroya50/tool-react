import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";
import { Download } from "lucide-react";
import { Button } from "../ui/button";

const S3ObjectDownloadButton = ({ fileKey }: { fileKey: string }) => {
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
  const handleDownload = () => {
    if (!fileKey) return;

    const getObjectCommand = new GetObjectCommand({
      Bucket: import.meta.env.VITE_PRIVET_BUCKET_NAME,
      Key: fileKey,
    });

    const downloadLink = document.createElement("a");

    s3.send(getObjectCommand)
      .then(async (data) => {
        try {
          // Convert ReadableStream to Blob
          if (data.Body instanceof ReadableStream) {
            const blob = await streamToBlob(data.Body);
            // Generate a URL and download the file
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = fileKey;
            downloadLink.click();
          } else {
            throw new Error("data.Body is not a ReadableStream");
          }
        } catch (error) {
          console.error("Error downloading file:", error);
        }
      })
      .catch((error) => {
        console.error("Error with S3 request:", error);
      });
  };
  return (
    <Button
      onClick={handleDownload}
      className=" flex gap-1 text-white mt-2 rounded shadow "
    >
      <Download />
      <span>Download File</span>{" "}
    </Button>
  );
};

export default S3ObjectDownloadButton;
