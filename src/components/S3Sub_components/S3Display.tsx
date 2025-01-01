import { gql, useQuery } from "@apollo/client";
import { Loader } from "lucide-react";
import S3ObjectDownloadButton from "./S3ObjectDownloadButton";
const query = gql`
  query getFileUrl($fileKey: String!) {
    getFileUrl(fileKey: $fileKey)
  }
`;
const DisplayData = ({
  selectDataKey,
}: {
  selectDataKey: {
    slNo: number;
    fileKey: string;
  } | null;
}) => {
  const { data, loading, error } = useQuery(query, {
    variables: { fileKey: selectDataKey?.fileKey },
    skip: !selectDataKey?.fileKey,
  });

  const getFileType = (url: string | undefined) => {
    const extension = url?.split(".").pop()?.toLowerCase();
    if (!extension) return null;

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

    if (imageExtensions.includes(extension)) return "image";
    if (videoExtensions.includes(extension)) return "video";
    return null;
  };

  const fileType = data?.getFileUrl
    ? getFileType(selectDataKey?.fileKey)
    : null;

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
