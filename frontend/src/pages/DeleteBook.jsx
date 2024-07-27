import { useState } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate,useParams } from "react-router-dom"

const DeleteBook = () => {
  const [load,setLoad]=useState(false)
  const navigate = useNavigate()
  const {id} = useParams();
  const handleDeleteBook = ()=>{
    setLoad(true)
    axios.delete(`http://localhost:5555/books/${id}`).then(()=>{
      setLoad(false)
      navigate("/")
    }).catch((err)=>{
      setLoad(false)
      alert("An Errpr pccured")
      console.log(err);
    })
  }
  return (

    <div className="p-4">
      <BackButton/>
    <h1 className="my-4 text-3x1" >
      Delete Book
    </h1>
    {load?<Spinner/> : "" }
    <div className="flex flex-col items-center border-2 border-sky-400 rounded-x1 w-[600px] p-8 mx-auto">
      <h3 className="text-2x1">Are you Sure you want to delete this Entry?</h3>
    
    <button className="p-4 bg-red-500 text-white m-8 w-full" onClick={handleDeleteBook}>
    Yes, Delete it
    </button>
    </div>
</div>
  )


}


export default DeleteBook
