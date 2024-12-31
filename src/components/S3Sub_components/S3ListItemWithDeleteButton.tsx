import React from "react";

import { gql, useMutation } from "@apollo/client";

const DELETE_USER_MUTATION = gql`
  mutation DeleteFile($fileKey: String!) {
    deleteFile(fileKey: $fileKey)
  }
`;
const S3ListItemWithDeleteButton = ({
  refetch,
  s3key,
}: {
  refetch: () => void;
  s3key: string;
}) => {
  const [deleteFile, { data, loading, error }] =
    useMutation(DELETE_USER_MUTATION);
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
  console.log({ error });
  return (
    <div className="flex justify-between items-center border p-2 rounded hover:bg-gray-100">
      <span className="text-sm font-mono">{s3key}</span>
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
