import React from "react";

import { gql, useMutation } from "@apollo/client";
import { Loader, Trash2 } from "lucide-react";

const DELETE_OBJECT = gql`
  mutation DeleteFile($fileKey: String!) {
    deleteFile(fileKey: $fileKey)
  }
`;
const S3ListItemWithDeleteButton = ({
  refetch,
  s3key,
  setSelectDataKey,
  slNo,
}: {
  refetch: () => void;
  s3key: string;
  setSelectDataKey: React.Dispatch<
    React.SetStateAction<{
      slNo: number;
      fileKey: string;
    } | null>
  >;
  slNo: number;
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
    <div className="flex justify-between items-center border p-1 rounded hover:bg-gray-100">
      <span
        title="click to open it "
        className="text-sm font-mono border rounded-md p-1 cursor-pointer hover:bg-blue-500"
        onClick={() => setSelectDataKey({ fileKey: s3key, slNo })}
      >
        No:{slNo + 1}, {s3key}
      </span>
      <button
        onClick={() => handleDelete(s3key)}
        className=" rounded border p-0.5"
      >
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <Trash2 className="text-red-700" />
        )}
      </button>
    </div>
  );
};

export default S3ListItemWithDeleteButton;
