import React, { ChangeEvent, useState } from "react";

import { gql, useMutation } from "@apollo/client";
import axios from "axios";

const fileFormats = [
  { format: "txt", contentType: "text/plain" },
  { format: "pdf", contentType: "application/pdf" },
  {
    format: "docx",
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    format: "xlsx",
    contentType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    format: "pptx",
    contentType:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  { format: "jpg", contentType: "image/jpeg" },
  { format: "jpeg", contentType: "image/jpeg" },
  { format: "png", contentType: "image/png" },
  { format: "gif", contentType: "image/gif" },
  { format: "svg", contentType: "image/svg+xml" },
  { format: "mp3", contentType: "audio/mpeg" },
  { format: "wav", contentType: "audio/wav" },
  { format: "mp4", contentType: "video/mp4" },
  { format: "mkv", contentType: "video/x-matroska" },
  { format: "zip", contentType: "application/zip" },
  { format: "tar", contentType: "application/x-tar" },
  { format: "json", contentType: "application/json" },
  { format: "xml", contentType: "application/xml" },
  { format: "html", contentType: "text/html" },
  { format: "css", contentType: "text/css" },
  { format: "js", contentType: "application/javascript" },
];

const UPLOAD_MUTATION = gql`
  mutation GetUploadUrl($format: String!, $contentType: String!) {
    getUploadUrl(format: $format, contentType: $contentType)
  }
`;
const S3Upload = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadFile, { loading, error }] = useMutation(UPLOAD_MUTATION);

  const handleFormatChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectedFormat(event.target.value);
  };

  const handleGenerateUrl = async () => {
    if (!selectedFormat) return;

    const contentType = fileFormats?.find(
      (format) => format.format === selectedFormat
    )?.contentType;

    try {
      const result = await uploadFile({
        variables: {
          format: selectedFormat,
          contentType,
        },
      });

      console.log({
        selectedFormat,
        contentType,
        resulturl: result.data.getUploadUrl,
      });

      setUploadUrl(result.data.getUploadUrl);
    } catch (err) {
      console.error("Error generating upload URL:", err);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !uploadUrl) return;

    console.log({ uploadUrl, file });

    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type, // Ensure the correct content type is sent
        },
      });
      console.log({ response });
      if (response.status === 200) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed!");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("File upload failed!");
    }
  };
  return (
    <div>
      <div className="border h-40 border-yellow-600 p-4">
        <h3>Upload File</h3>
        <select
          value={selectedFormat}
          onChange={handleFormatChange}
          className="mr-2"
        >
          <option value="">Select file format</option>
          {fileFormats.map((format) => (
            <option key={format.format} value={format.format}>
              {format.format}
            </option>
          ))}
        </select>
        <button
          onClick={handleGenerateUrl}
          //   disabled={!selectedFormat || loading}
          className="bg-blue-500 text-white p-2"
        >
          Generate Upload URL
        </button>
      </div>

      {uploadUrl && (
        <div className="mt-4">
          <input type="file" onChange={handleFileChange} />
          <button
            onClick={handleUpload}
            disabled={!file}
            className="bg-green-500 text-white p-2 mt-2"
          >
            {loading ? "uploading.." : "Upload"}
          </button>
        </div>
      )}

      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </div>
  );
};

export default S3Upload;
