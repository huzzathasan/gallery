import MasonryGallery from "../components/MasonryGallery";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 relative">
<div className="bg-blue-500 p-2 rounded-md text-white absolute top-2 right-2 z-50"><Link to="/app-admin-login" >Login</Link></div>
      <h1 className="text-center text-3xl font-bold py-8">Media Gallery</h1>
      <MasonryGallery />
    </div>
  );
};

export default Home;
