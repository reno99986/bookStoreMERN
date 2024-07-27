import { useState,useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [load, setLoad] = useState(false);
  const {id} = useParams()
  const navigate = useNavigate();
  useEffect(()=>{
setLoad(true);
axios.get(`http://localhost:5555/books/${id}`).then((res)=>{
  setAuthor(res.data.author)
  setPublishYear(res.data.publishYear)
  setTitle(res.data.title)
  setLoad(false)
}).catch((err) => {
  console.log(err);
  setLoad(false);
});
  },[])
  const handleSaveEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoad(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoad(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4">Edit Book</h1>
      {load ? <Spinner /> : " "}
      <div className="flex flex-col border-2 border-sky-400 rounded-x1 e-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-x1 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-x1 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-x1 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
