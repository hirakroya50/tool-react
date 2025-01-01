import { gql, useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const DELETE_OBJECT = gql`
  mutation DeleteFile($fileKey: String!) {
    deleteFile(fileKey: $fileKey)
  }
`;
export const useDeleteFileOnS3 = ({ refetch }: { refetch: () => void }) => {
  const [deleteFile, { error, loading }] = useMutation(DELETE_OBJECT);
  const handleDelete = async (s3key: string) => {
    try {
      await deleteFile({ variables: { fileKey: s3key } });
      toast.success("successfully deleted");
      refetch();
      // Add your delete logic here, e.g., call a mutation or API endpoint
    } catch (error) {
      toast.error("Error ! not deleted");
      console.log("eerorr dekte", error);
    }
  };
  return { handleDelete, error, loading };
};
