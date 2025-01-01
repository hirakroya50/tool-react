import { useQuery, gql } from "@apollo/client";
const query = gql`
  query listFiles {
    listFiles
  }
`;

const useListFilesQuery = () => {
  return useQuery(query);
};

export default useListFilesQuery;
