import { useEffect, useState } from "react";
import { BaseUrl, pb } from "../pb.config";
import { useNavigate } from "react-router-dom";

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

const MasonryGallery = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchMedia = async (page: number) => {
    setLoading(true);
    try {
      const result = await pb.collection("media").getList(page, 20);
      const fetchedItems = result.items.map((item) => ({
        id: item.id,
        collectionId: item.collectionId,
        collectionName: item.collectionName,
        created: item.created,
        updated: item.updated,
        title: item.title,
        file: item.file,
        type: item.type,
      }));
      setMediaItems((prevItems) => [...prevItems, ...fetchedItems]);

      if (result.items.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("Error fetching media", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(page);
  }, [page]);
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4">
      {mediaItems.map((item) => (
        <div className="relative group mb-4" key={item.id}>
          {item.type === "image" ? (
            <img
              src={`${BaseUrl}/api/files/${item.collectionId}/${item.id}/${item.file}`}
              alt={item.title}
              className="w-full h-auto object-cover rounded-md"
            />
          ) : (
            <video
              src={`${BaseUrl}/api/files/${item.collectionId}/${item.id}/${item.file}`}
              controls
              className="w-full h-auto object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="px-4 py-2  bg-white text-black rounded-lg mr-2"
              onClick={() => navigate(`/details/${item.id}`)}
            >
              View
            </button>
            <button className="px-4 py-2  bg-white text-black rounded-lg mr-2">
              Share
            </button>
          </div>
        </div>
      ))}
      {hasMore && !loading && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg"
        >
          Load More
        </button>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default MasonryGallery;
