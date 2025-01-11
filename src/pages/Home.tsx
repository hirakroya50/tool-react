const staticData = [
  {
    title: "CRUD Operations in S3",
    feat: [
      "Securely upload files to AWS S3.",
      "Easily view detailed file information from the S3 bucket.",
      "Download files directly with enhanced convenience.",
      "Successfully deployed the NestJS microservice on EC2 using NGINX and PM2.",
    ],
    path: "/s3",
    buttontext: "S3",
  },
  {
    title: "CRUD Operations in Database with Serverless Backend",
    feat: [
      " CRUD operations on a PostgreSQL via a serverless backend.",
      "Implemented connection pooling  for serverless.",
    ],
    path: "/serverless",
    buttontext: "Serverless",
  },
];

const title =
  "Serverless Cloudflare Worker and AWS S3 CRUD with React Frontend and NestJS Microservice";
const technologies =
  "Technologies Used: NestJS, AWS S3, Cloudflare Worker, AWS EC2, NGINX, PM2, React, PostgreSQL, prisma and CloudFront";

const Home = () => {
  return (
    <>
      <div className="mt-10 bg-gray-50 flex flex-col items-center justify-center p-6">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="font-medium pt-2">{technologies}</p>
        </header>

        <section className="w-full max-w-6xl gap-5  bg-white p-6 rounded-md shadow-md flex items-start justify-center">
          {staticData.map((item, i) => {
            return (
              <div key={i}>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <ul className="list-disc list-inside mt-4 text-gray-700 text-left">
                  {item.feat.map((msg, i) => {
                    return <li key={i}>{msg}</li>;
                  })}
                </ul>
                <p className=" text-indigo-600 py-4">
                  Explore the project to see it in action!
                </p>
                <a
                  href={item.path}
                  className="text-white cursor-pointer bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Explore {item.buttontext} Operations
                </a>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default Home;
