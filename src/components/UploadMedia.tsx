import React, { useEffect, useState } from "react";
import { pb } from "../pb.config";
import { useNavigate } from "react-router-dom";

interface UploadResponse {
  fileId: string;
  fileUrl: string;
}

const UploadMedia = () => {
  const authenticated = pb.authStore.isValid;
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [fileType, setFileType] = useState("");
  console.log(fileType);
  // +++++ 13/10/24
  const [publishDateTime, setPublishDateTime] = useState("");
  const [caption, setCaption] = useState("");
  console.log(publishDateTime, caption);
  // +++++

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", fileType);
    // +++++ 13/10/24
    formData.append("caption", caption),
      formData.append("publish", publishDateTime);
    // +++++

    try {
      const record = await pb.collection("media").create(formData);
      setUploadResponse({
        fileId: record.id,
        fileUrl: pb.files.getUrl(record, record.file),
      });
    } catch (error) {
      console.log("Error uploading file", error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!authenticated) {
      navigate("/_app-admin-login");
    }
  }, [navigate, authenticated]);

  if (!authenticated)
    return (
      <div className="w-full h-screen grid items-center justify-center">
        <h1>Your not Authenticated to access Admin</h1>
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-8 lg:mt-4">
      <h2 className="text-xl font-bold mb-4">Upload Media</h2>
      <select
        name="type"
        id="type"
        className="w-full py-2 my-3 outline-none border bg-blue-500 text-white rounded-md px-3"
        onChange={(e) => setFileType(e.target.value)}
      >
        <option value="image">--select a uploaded file type(required)</option>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <input
        type="file"
        accept="image/*, video/*"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />
      {/* ++++++ 13/10/24 */}
      <label htmlFor="publish" className="mt-3 font-medium">
        Publish Date-Time:
      </label>
      <input
        type="datetime-local"
        name="publish"
        id="publish"
        className="w-full py-2 mb-4 outline-none border bg-blue-500 text-white rounded-md px-3"
        onChange={(e) => setPublishDateTime(e.target.value)}
      />

      <label htmlFor="caption" className="font-semibold">
        Caption:
      </label>
      <textarea
        name="caption"
        id="caption"
        cols={5}
        rows={5}
        className="w-full py-2 mb-4 outline-none border rounded-md px-3"
        placeholder="Write you caption"
        onChange={(e) => setCaption(e.target.value)}
      ></textarea>

      {/* ++++++ */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        disabled={uploading}
        onClick={uploadFile}
        className="px-4 py-2 mx-auto relative block bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600  transition-colors duration-200 disabled:bg-gray-400"
      >
        {uploading ? "Uploading ..." : "Upload"}
      </button>
      {uploadResponse && (
        <div className="mt-4 text-center">
          <p className="text-green-500">File Upload successfully!</p>
          <a
            href={uploadResponse.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            View uploaded media
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadMedia;

