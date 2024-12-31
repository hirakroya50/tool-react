import { useState } from "react";
import S3Display from "./S3Sub_components/S3Display";
import S3KeyList from "./S3Sub_components/S3KeyList";
import S3Upload from "./S3Sub_components/S3Upload";

const S3Service = () => {
  const [selectDataKey, setSelectDataKey] = useState<string | null>(null);
  return (
    <div className="w-full border flex h-full">
      <section className="w-[30vw] border border-red-500 h-full flex flex-col">
        <S3Upload />

        <S3KeyList setSelectDataKey={setSelectDataKey} />
      </section>
      <S3Display selectDataKey={selectDataKey} />
    </div>
  );
};

export default S3Service;
