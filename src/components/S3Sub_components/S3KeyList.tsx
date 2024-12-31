import React from "react";
import { gql, useQuery } from "@apollo/client";
import S3ListItemWithDeleteButton from "./S3ListItemWithDeleteButton";
const query = gql`
  query listFiles {
    listFiles
  }
`;

const S3KeyList = ({
  setSelectDataKey,
}: {
  setSelectDataKey: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const { data, loading, refetch, error } = useQuery(query);

  //   console.log({ data: data?.listFiles, loading, refetch, error });

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading files!</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">S3 Key List</h2>
      <div className="border rounded shadow-md p-4 space-y-2 bg-white">
        {data?.listFiles?.length > 0 ? (
          data?.listFiles?.map((s3key: string, i: number) => (
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
