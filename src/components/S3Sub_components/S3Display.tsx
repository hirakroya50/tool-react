import { gql, useQuery } from "@apollo/client";
import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";
import { useEffect } from "react";
const query = gql`
  query getFileUrl($fileKey: String!) {
    getFileUrl(fileKey: $fileKey)
  }
`;
const S3Display = ({ selectDataKey }: { selectDataKey: string | null }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { fileKey: selectDataKey }, // Pass selectDataKey as the fileKey variable
    skip: !selectDataKey, // Skip the query if selectDataKey is null or undefined
  });

  const getFileType = (url: string | null) => {
    const extension = url?.split(".").pop()?.toLowerCase();
    if (!extension) return null;

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

    if (imageExtensions.includes(extension)) return "image";
    if (videoExtensions.includes(extension)) return "video";
    return null;
  };

  const fileType = data?.getFileUrl ? getFileType(selectDataKey) : null;

  const handleDownload2 = async () => {
    if (data?.getFileUrl) {
      const response = await fetch(data.getFileUrl);
      // const response = await fetch('https://fastly.picsum.photos/id/903/200/300.jpg?hmac=bT2dTWTFYT3TyM7cBatAwmhTtJuzlHBXtqn_kH-z3lU');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = selectDataKey || "file";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url); // Clean up the object URL
    }
  };

  useEffect(() => {
    if (!selectDataKey) return;
    const s3 = new S3({
      region: "us-east-1",
      credentials: {
        accessKeyId: "AKIASK5MCBLIMDQE33NO",
        secretAccessKey: "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",
      },
    });

    const getObjectCommand = new GetObjectCommand({
      Bucket: "privet-bucket-s3-nodejs",
      Key: selectDataKey,
    });

    const downloadLink = document.createElement("a");
    s3.send(getObjectCommand)
      .then(async (data) => {
        try {
          // Convert ReadableStream to Blob
          const blob = await streamToBlob(data.Body);

          // Log the URL for debugging
          const url = URL.createObjectURL(blob);
          console.log("Generated URL:", url);

          downloadLink.href = url;
          downloadLink.download = selectDataKey; // Optionally, you can specify a filename
          downloadLink.click();
        } catch (error) {
          console.error("Error downloading file:", error);
        }
      })
      .catch((error) => {
        console.error("Error with S3 request:", error);
      });
  }, [selectDataKey]);

  const streamToBlob = async (stream) => {
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

  if (!selectDataKey) {
    return (
      <section className="text-center justify-center w-full flex items-center">
        No content
      </section>
    );
  }
  return (
    <section>
      <button
        onClick={handleDownload2}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
      >
        Download File
      </button>

      {data?.getFileUrl && (
        <div className="w-64 border h-64">
          {fileType === "image" && <img src={data.getFileUrl} alt="File" />}
          {fileType === "video" && (
            <video controls>
              <source src={data.getFileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {!fileType && <div>Unknown file type</div>}
        </div>
      )}

      <a
        href="https://fastly.picsum.photos/id/903/200/300.jpg?hmac=bT2dTWTFYT3TyM7cBatAwmhTtJuzlHBXtqn_kH-z3lU"
        download="image.jpg"
        target="_blank"
      >
        amrrr
      </a>
    </section>
  );
};

export default S3Display;
