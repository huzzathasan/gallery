import { useEffect, useState } from "react";
import { BaseUrl, pb } from "../pb.config";
import { useParams } from "react-router-dom";

export interface MediaItem {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  title: string;
  file: string;
  type?: "image" | "video";
}

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState<MediaItem>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await pb.collection("media").getOne(id as string);
      if (!res) {
        console.log("Error");
      }
      setData(res as MediaItem);
    };
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-md mx-auto relative block">
        <div className="grid items-center justify-center w-full h-screen">
          {data?.type === "image" ? (
            <img
              src={`${BaseUrl}/api/files/${data.collectionId}/${data.id}/${data.file}`}
              alt={data.id}
              className="w-full h-auto object-cover rounded-md"
            />
          ) : (
            <video
              src={`${BaseUrl}/api/files/${data?.collectionId}/${data?.id}/${data?.file}`}
              controls
              className="object-cover aspect-video rounded-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
