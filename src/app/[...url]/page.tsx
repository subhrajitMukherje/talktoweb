import { Component } from "react";
import { ragChat } from "../lib/rag-chat";

interface PageProps {
  params: {
    url: string | string[] | undefined;
  };
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) =>
    decodeURIComponent(component)
  );

  return decodedComponents.join("/");
}

const Page = async ({ params }: PageProps) => {
  const reconstructedUrl = reconstructUrl({ url: params.url as string[] });

  console.log(params);

  await ragChat.context.add({
    type: "html",
    source: reconstructedUrl,
    config: { chunkOverlap: 50, chunkSize: 200 },
  });

  return <h1> Thala for a reason</h1>;
};

export default Page;
