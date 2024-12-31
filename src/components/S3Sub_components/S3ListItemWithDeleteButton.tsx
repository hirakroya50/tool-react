import React from "react";

import { gql, useMutation } from "@apollo/client";

const DELETE_OBJECT = gql`
  mutation DeleteFile($fileKey: String!) {
    deleteFile(fileKey: $fileKey)
  }
`;
const S3ListItemWithDeleteButton = ({
  refetch,
  s3key,
  setSelectDataKey,
}: {
  refetch: () => void;
  s3key: string;
  setSelectDataKey: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [deleteFile, { data, loading }] = useMutation(DELETE_OBJECT);
  const handleDelete = async (s3key: string) => {
    try {
      const res = await deleteFile({ variables: { fileKey: s3key } });
      console.log({ res, data });
      refetch();
      // Add your delete logic here, e.g., call a mutation or API endpoint
    } catch (error) {
      console.log("eerorr dekte", error);
    }
  };
  return (
    <div className="flex justify-between items-center gap-2 border p-2 rounded hover:bg-gray-100">
      <span
        title="click to open it "
        className="text-sm font-mono border rounded-md p-1 cursor-pointer hover:bg-blue-500"
        onClick={() => setSelectDataKey(s3key)}
      >
        {s3key}
      </span>
      <button
        onClick={() => handleDelete(s3key)}
        className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        {loading ? "loading...." : "Delete"}
      </button>
    </div>
  );
};

export default S3ListItemWithDeleteButton;
