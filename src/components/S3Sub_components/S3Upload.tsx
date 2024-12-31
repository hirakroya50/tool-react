import { useState } from "react";

import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";

// import { Button } from "@/components/ui/button"
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
const S3Upload = ({ refetch }: { refetch: () => void }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadFile, { loading, error }] = useMutation(UPLOAD_MUTATION);
  const [uploadingSate, setUploadingState] = useState<boolean>(false);
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

  const handleUpload = async () => {
    if (!file || !uploadUrl) return;

    console.log({ uploadUrl, file });
    setUploadingState(true);

    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type, // Ensure the correct content type is sent
        },
      });
      console.log({ response });
      if (response.status === 200) {
        refetch();
      } else {
        alert("File upload failed!");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("File upload failed!");
    }
    setUploadingState(false);
  };
  return (
    <div className="border-b p-2 border-blue-500">
      <div className="border   p-2 rounded-lg bg-yellow-50 shadow-md">
        <h3 className="underline text-center font-bold text-lg text-yellow-800 mb-2">
          Upload File to s3
        </h3>

        <div className="mb-2">
          <Select onValueChange={(val) => setSelectedFormat(val)}>
            <SelectTrigger className=" border-yellow-600">
              <SelectValue placeholder="Select file format" />
            </SelectTrigger>
            <SelectContent>
              {fileFormats.map((format) => (
                <SelectItem key={format.format} value={format.format}>
                  {format.format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleGenerateUrl}
          disabled={!selectedFormat || loading}
          className={`w-full p-3 font-semibold text-white rounded-md ${
            loading || !selectedFormat
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Generating..." : "Generate Upload URL"}
        </Button>
      </div>

      {uploadUrl && (
        <div className="mt-1">
          <div className="grid  w-full max-w-sm shadow-md items-center gap-2 p-2 pt-4 bg-red-100  rounded-md ">
            <Input
              id="s3file"
              type="file"
              className="flex p-1 items-center file:cursor-pointer border border-yellow-700 file:p-0.5 file:px-2 file:mt-0.5 w-full text-sm text-gray-500   file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-black-900 hover:file:bg-blue-100"
              onChange={(e) => {
                if (e.target.files) {
                  console.log(e.target.files[0]);
                  setFile(e.target.files[0]);
                }
              }}
            />
            <Button
              onClick={handleUpload}
              disabled={!file}
              className="bg-green-500 text-white p-2 mt-2"
            >
              {uploadingSate ? "uploading.." : "Upload"}
            </Button>
          </div>
        </div>
      )}

      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </div>
  );
};

export default S3Upload;
