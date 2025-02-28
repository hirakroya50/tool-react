import { useState } from "react";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Loader } from "lucide-react";
import { fileFormats } from "@/data/fileFormats";
import useGeneratePreSignUploadUrl from "@/hooks/useGeneratePreSignUploadUrl";
import useS3ObjectUploadBySignUrl from "@/hooks/useS3ObjectUploadBySignUrl";

const S3Upload = ({ refetch }: { refetch: () => void }) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadingSate, setUploadingState] = useState<boolean>(false);

  //generate a pre sign url
  const { error, handleGenerateUrl, loading } = useGeneratePreSignUploadUrl({
    selectedFormat,
    setUploadUrl,
  });

  //upload the selected file by the url
  const { handleUpload } = useS3ObjectUploadBySignUrl({
    file,
    refetch,
    setUploadingState,
    setUploadUrl,
    uploadUrl,
  });

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
          {loading && <Loader className="animate-spin" />}
          {loading ? "Generating..." : "Generate Upload URL"}
        </Button>
      </div>
      {error && <div className="text-red-500 mt-2">{error.message}</div>}

      {uploadUrl && (
        <div className="mt-1">
          <div className="grid  w-full max-w-sm shadow-md items-center gap-2 p-2 pt-4 bg-red-100  rounded-md ">
            <Input
              id="s3file"
              type="file"
              className="flex p-1 items-center file:cursor-pointer border border-yellow-700 file:p-0.5 file:px-2 file:mt-0.5 w-full text-sm text-gray-500   file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-200 file:text-black-900 hover:file:bg-blue-100"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
            <Button
              onClick={handleUpload}
              disabled={!file}
              className="bg-green-500 text-white p-2 mt-2"
            >
              {uploadingSate && <Loader className="animate-spin" />}
              {uploadingSate ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default S3Upload;
