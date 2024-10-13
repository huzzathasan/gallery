import { useEffect, useState } from "react";
import { BaseUrl, pb } from "../pb.config";
import { useParams } from "react-router-dom";

export interface MediaItem {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  caption: string;
  file: string;
  type?: "image" | "video";
  publish: string;
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

  const pu_date = data?.publish
  ? new Date(data.publish).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  : "Date not available";


  console.log(pu_date);
  return (
    <div className="w-full">
      <div className="max-w-md mx-auto relative block">
        <div className="grid items-start mt-2 justify-center px-3 lg:px-1 w-full h-full overflow-y-auto">
          <p className="p-2 bg-blue-500 text-white my-1 rounded-md font-medium text-lg">
            Publish on: {pu_date}
          </p>
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
          <p className="font-medium text-gray-700">{data?.caption}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
