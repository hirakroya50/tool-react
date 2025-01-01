import React from "react";
import S3ListItemWithDeleteButton from "./S3ListItemWithDeleteButton";
import { ApolloError } from "@apollo/client";
import { Loader } from "lucide-react";

const Content = ({
  setSelectDataKey,
  data,
  error,
  loading,
  refetch,
}: {
  setSelectDataKey: React.Dispatch<
    React.SetStateAction<{
      slNo: number;
      fileKey: string;
    } | null>
  >;
  data: string[];
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
}) => {
  if (loading)
    return (
      <p className="text-center text-blue-500 pt-20 flex justify-center gap-2">
        <Loader className="animate-spin" />
        <span>Loading List...</span>
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 pt-20">Error loading files!</p>
    );

  return (
    <>
      <p className="text-blue-400 text-center text-xs">
        Note: click object key to open
      </p>
      <div className="border rounded shadow-md p-2 h-[calc(100vh-18rem)] overflow-auto space-y-2 bg-white">
        {data?.length > 0 ? (
          data?.map((s3key: string, i: number) => (
            <S3ListItemWithDeleteButton
              key={i}
              s3key={s3key}
              refetch={refetch}
              setSelectDataKey={setSelectDataKey}
              slNo={i}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">No files found</p>
        )}
      </div>
    </>
  );
};

const S3KeyList = ({
  setSelectDataKey,
  data,
  error,
  loading,
  refetch,
}: {
  setSelectDataKey: React.Dispatch<
    React.SetStateAction<{
      slNo: number;
      fileKey: string;
    } | null>
  >;
  data: string[];
  loading: boolean;
  error: ApolloError | undefined;
  refetch: () => void;
}) => {
  return (
    <div className="p-2 ">
      <h2 className="text-lg font-bold text-center underline">
        S3 object Key List
      </h2>

      <Content
        data={data}
        loading={loading}
        refetch={refetch}
        error={error}
        setSelectDataKey={setSelectDataKey}
      />
    </div>
  );
};

export default S3KeyList;
