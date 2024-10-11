import MasonryGallery from "../components/MasonryGallery";
import { Link } from "react-router-dom";
import { pb } from "../pb.config";

const Home = () => {
  const authenticated = pb.authStore.isValid;
 
  return (
    <div className="min-h-screen bg-gray-100 relative">
<div className="bg-blue-500 p-1 rounded-md text-white absolute top-2 right-2 z-50">
{
authenticated
?
<Link to="/app-admin" >Add</Link>
:
<Link to="/app-admin-login" >Login</Link>
}
</div>
      <h1 className="text-center text-3xl font-bold py-8">Media Gallery</h1>
      <MasonryGallery />
    </div>
  );
};

export default Home;
