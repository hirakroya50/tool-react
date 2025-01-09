// awsClient.js
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID_FOR_AWS,
    secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY_FOR_S3,
  },
});

export default s3;
