import React from "react";

import { Loader, Trash2 } from "lucide-react";
import { useDeleteFileOnS3 } from "@/hooks/useDeleteFileOnS3";
interface S3ListItemWithDeleteButtonProps {
  refetch: () => void;
  s3key: string;
  setSelectDataKey: React.Dispatch<
    React.SetStateAction<{ slNo: number; fileKey: string } | null>
  >;
  slNo: number;
}
const S3ListItemWithDeleteButton: React.FC<S3ListItemWithDeleteButtonProps> = ({
  refetch,
  s3key,
  setSelectDataKey,
  slNo,
}) => {
  const { error, handleDelete, loading } = useDeleteFileOnS3({ refetch });
  return (
    <>
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
      <span>{error && <>{error.message}</>}</span>
    </>
  );
};

export default S3ListItemWithDeleteButton;
