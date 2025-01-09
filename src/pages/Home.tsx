import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  return (
    <>
      <TestServerless />
      <div className="mt-10 bg-gray-50 flex flex-col items-center justify-center p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AWS S3 Integration with React and NestJS
          </h1>
          <p className="mt-4 text-gray-700">
            This project is a full-stack application that combines a modern
            React frontend with a powerful NestJS GraphQL backend to handle CRUD
            operations on files stored in an AWS S3 bucket.
          </p>
        </header>

        <section className="w-full max-w-4xl space-y-6 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">
            Project Highlights:
          </h2>
          <ul className="list-disc list-inside mt-4 text-gray-700 text-left">
            <li>Upload files securely to AWS S3.</li>
            <li>View file details from the S3 bucket.</li>
            <li>Download files directly with ease.</li>
          </ul>
          <p className=" text-indigo-600 pb-4">
            Explore the project to see it in action!
          </p>
          <a
            href="/s3"
            className="text-white cursor-pointer bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Explore S3 Operations
          </a>
        </section>
      </div>
    </>
  );
};

export default Home;

const TestServerless = () => {
  const [data, setData] = useState([]);
  const Foo = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_PUBLIC_SERVERLESS_BACKEND
      );

      console.log(import.meta.env.VITE_PUBLIC_SERVERLESS_BACKEND);
      console.log({ response, data: response.data?.data });
      setData(response.data?.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    Foo();
  }, []);
  return (
    <>
      "vite --port 3000"
      <div className="border">
        env filr one data : {import.meta.env.VITE_PUBLIC_SERVERLESS_BACKEND}
      </div>
      {data.map((item, i) => {
        return (
          <div key={i}>
            name : {(item as { name: string })?.name}
            id: {(item as { id: string })?.id}
          </div>
        );
      })}
    </>
  );
};
