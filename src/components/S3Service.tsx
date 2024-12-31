import { useState } from "react";
import S3Display from "./S3Sub_components/S3Display";
import S3KeyList from "./S3Sub_components/S3KeyList";
import S3Upload from "./S3Sub_components/S3Upload";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query listFiles {
    listFiles
  }
`;
const S3Service = () => {
  const [selectDataKey, setSelectDataKey] = useState<string | null>(null);
  const { data, loading, refetch, error } = useQuery(query);

  return (
    <div className="w-full border flex min-h-full grow">
      <section className="w-[30vw] border-r border-red-200  ">
        <S3Upload refetch={refetch} />
        <S3KeyList
          data={data?.listFiles}
          loading={loading}
          refetch={refetch}
          error={error}
          setSelectDataKey={setSelectDataKey}
        />
      </section>
      <S3Display selectDataKey={selectDataKey} />
    </div>
  );
};

export default S3Service;
