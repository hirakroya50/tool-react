import { useState } from "react";
import S3Display from "../components/S3Sub_components/S3Display";
import S3KeyList from "../components/S3Sub_components/S3KeyList";
import S3Upload from "../components/S3Sub_components/S3Upload";
import useListFilesQuery from "@/hooks/useListFilesQuery";
interface SelectedFileKey {
  slNo: number;
  fileKey: string;
}

const S3Service = () => {
  const [selectDataKey, setSelectDataKey] = useState<SelectedFileKey | null>(
    null
  );
  const { data, loading, refetch, error } = useListFilesQuery();

  return (
    <div className="w-full border flex min-h-full grow">
      <section className="w-[30rem] border-r border-red-200  ">
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
