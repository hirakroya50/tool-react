import React from "react";

import { gql, useQuery } from "@apollo/client";

const query = gql`
  query getFileUrl($fileKey: String!) {
    getFileUrl(fileKey: $fileKey)
  }
`;
const S3Display = ({ selectDataKey }: { selectDataKey: string | null }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { fileKey: selectDataKey }, // Pass selectDataKey as the fileKey variable
    skip: !selectDataKey, // Skip the query if selectDataKey is null or undefined
  });

  console.log({
    data: data,
    loading,
    error,
  });
  if (!selectDataKey) {
    return <section>No content</section>;
  }
  return (
    <section>
      {data?.getFileUrl}
      {data?.getFileUrl && (
        <div className="w-20 h-10">
          <img src={data?.getFileUrl} alt="" />
        </div>
      )}
    </section>
  );
};

export default S3Display;
