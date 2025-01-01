import { Download, Loader } from "lucide-react";
import { Button } from "../ui/button";
import useDownloadFile from "@/hooks/useDownloadFile";

const S3ObjectDownloadButton = ({ fileKey }: { fileKey: string }) => {
  const { downloadStatus, handleDownload } = useDownloadFile(fileKey);

  return (
    <>
      {downloadStatus && (
        <div className="fixed bg-green-500 text-white top-32 p-2 px-3  rounded-md opacity-80 flex gap-2">
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
