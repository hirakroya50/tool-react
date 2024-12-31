import React from "react";
import S3ListItemWithDeleteButton from "./S3ListItemWithDeleteButton";
import { ApolloError } from "@apollo/client";

const S3KeyList = ({
  setSelectDataKey,
  data,
  error,
  loading,
  refetch,
}: {
  setSelectDataKey: React.Dispatch<React.SetStateAction<string | null>>;
  data: string[];
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
}) => {
  //   console.log({ data: data?.listFiles, loading, refetch, error });

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading files!</p>;

  return (
    <div className="p-2 ">
      <h2 className="text-lg font-bold text-center underline">
        S3 object Key List
      </h2>
      <p className="text-blue-400 text-center">click object key to open</p>
      <div className="border rounded shadow-md p-2 h-[calc(100vh-18rem)] overflow-auto space-y-2 bg-white">
        {data?.length > 0 ? (
          data?.map((s3key: string, i: number) => (
            <S3ListItemWithDeleteButton
              key={i}
              s3key={s3key}
              refetch={refetch}
              setSelectDataKey={setSelectDataKey}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No files found</p>
        )}
      </div>
    </div>
  );
};

export default S3KeyList;
