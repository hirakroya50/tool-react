import { Loader } from "lucide-react";
import S3ObjectDownloadButton from "./S3ObjectDownloadButton";
import { useS3ObjectDataForUrl } from "@/hooks/useS3ObjectDataForUrl";

const DisplayData = ({
  selectDataKey,
}: {
  selectDataKey: {
    slNo: number;
    fileKey: string;
  } | null;
}) => {
  const { data, loading, error, fileType } = useS3ObjectDataForUrl({
    selectDataKey,
  });

  if (!selectDataKey?.fileKey) {
    return <>No content</>;
  }

  if (loading) {
    return (
      <>
        <Loader className="animate-spin" />
        <span>Loading....</span>
      </>
    );
  }
  return (
    <>
      <S3ObjectDownloadButton fileKey={selectDataKey?.fileKey} />
      <div className="flex justify-center items-center gap-2">
        <p className="font-semibold text-white shadow-sm bg-green-700 px-2 rounded-md">
          No: {selectDataKey.slNo + 1}
        </p>
        {data?.getFileUrl && (
          <div className="w-[60%] border h-64">
            {fileType === "image" && (
              <img src={data.getFileUrl} alt="File" className=" w-full" />
            )}
            {fileType === "video" && (
              <video controls className=" w-full">
                <source src={data.getFileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {!fileType && <div>Unknown file type</div>}
          </div>
        )}
      </div>
      {error && <p>{error?.message}</p>}
    </>
  );
};

const S3Display = ({
  selectDataKey,
}: {
  selectDataKey: {
    slNo: number;
    fileKey: string;
  } | null;
}) => {
  return (
    <>
      <section className="text-center grow  w-full flex flex-col gap-3 items-center">
        <DisplayData selectDataKey={selectDataKey} />
      </section>
    </>
  );
};
export default S3Display;
