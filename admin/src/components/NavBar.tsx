import uploadImage from "../assets/upload_image.png";

const NavBar = () => {
  return (
    <header className="h-15 w-full bg-white z-10 border-gray-200 border-b">
      <div className="h-full flex justify-between items-center px-10">
        <h1 className="text-gray-800 font-semibold">lines.admin</h1>

        <div className="">
          <img className="h-12 w-12 rounded-full" src={uploadImage} alt="" />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
