import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const useS3ObjectUploadBySignUrl = ({
  file,
  uploadUrl,
  setUploadingState,
  refetch,
  setUploadUrl,
}: {
  file: File | null;
  uploadUrl: string;
  setUploadingState: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadUrl: React.Dispatch<React.SetStateAction<string>>;
  refetch: () => void;
}) => {
  const handleUpload = async () => {
    if (!file || !uploadUrl) {
      toast.error("file or not upload url");
      return;
    }

    setUploadingState(true);

    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type, // Ensure the correct content type is sent
        },
      });
      if (response.status === 200) {
        toast.success("Successfully uploaded");
        setUploadUrl("");
        refetch();
      } else {
        toast.error("Error: File upload failed!");
      }
    } catch (err) {
      toast.error("Error: File upload failed!");
      console.error("Error uploading file:", err);
    }
    setUploadingState(false);
  };

  return { handleUpload };
};

export default useS3ObjectUploadBySignUrl;
