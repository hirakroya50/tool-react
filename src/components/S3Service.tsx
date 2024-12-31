import S3KeyList from "./S3Sub_components/S3KeyList";
import S3Upload from "./S3Sub_components/S3Upload";

const S3Service = () => {
  return (
    <div className="w-full border flex h-full">
      <section className="w-[30vw] border border-red-500 h-full flex flex-col">
        <S3Upload />

        <S3KeyList />
      </section>
      <section>display</section>
    </div>
  );
};

export default S3Service;
