import { gql, useQuery } from "@apollo/client";

const query = gql`
  query getFileUrl($fileKey: String!) {
    getFileUrl(fileKey: $fileKey)
  }
`;

export const useS3ObjectDataForUrl = ({
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

  return { data, loading, error, fileType };
};
