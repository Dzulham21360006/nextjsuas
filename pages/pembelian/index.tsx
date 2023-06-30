import { useState, useEffect } from "react";
import axios from "axios";
import {stat} from 'fs';
import gambar from '@/gambar/gambargitar.jpeg';
import logo from '@/logo/koraihoshiumi.png';
import Link from 'next/link';
const koneksiGitar = axios.create({
    // baseURL: "http://192.168.1.33:5000/api/mahasiswa"
  // baseURL: "https://jsonplaceholder.typicode.com/posts"
  baseURL: "http://127.0.0.1:5000/api/gitar"
  
  });
  
export default function FormGitar() {
    const [gitar, setGitar] = useState(null);
    const [statemerk, setMerk] = useState("");
    const [statetanggal_beli, setTanggal_beli] = useState("2018-07-22");
    const [statejenis, setJenis] = useState("");
    const [stateharga, setHarga] = useState("");
    const [stateno_seri, setNo_seri] = useState("");
    const [statefoto, setFoto] = useState("");
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show")

    const [stateedit, setEdit]=useState("hide")
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(`Nama: ${statenama} \n Nim: ${statenim}`)
  // }    



const handleSubmitAdd =  (event) => {
    
  event.preventDefault();
  const formData = new FormData(event.target);
  koneksiGitar
    .post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
   
}

useEffect(() => {
  async function getGitar() {
    const response = await koneksiGitar.get("/").then(function (axiosResponse) {
        setGitar(axiosResponse.data.data);
     })
     .catch(function (error) {
     
      alert('error from Gitar in api Gitar: '+error);
     });;
      }
  getGitar();
}, []);


  // const [post, setPost] = useState(null);
  // useEffect(() => {
  //   async function getPost() {
  //     const response = await client.get("/1");
  //     setPost(response.data);
  //   }
  //   getPost();
  // }, []);

 
// if (!post) return "No post!"


if(gitar==null){
  return(
    <div>
      waiting...
    </div>
  )
  }else{

    return (

<center className="bgin"> 

      <header id='headerinput'>
        <div className="logo-container">
        </div>
        <center>
          <h1>Kouraii's Guitar</h1>
        </center>
        <div className='beranda-home'>
          <Link href="/">Beranda</Link><br></br>
          <Link href="/pengubahan">Pengubahan Pembelian</Link><br></br>
          <Link href="/list_data">List Data Pembelian</Link><br></br>
        </div>
      </header>
      <br></br>
    <div>
       <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd} >
       <br></br><h3> Input Data Pembelian Gitar </h3><br></br>
        <table border={0}>
          <tbody>
          <tr>
            <td> <label> No.Serial:</label></td>
            <td><input type="text" id="no_seri" name="no_seri"/></td>
        </tr>

        <br></br>

        <tr>
            <td><label> Brand Gitar:</label></td>
            <td><input type="text" id="merk"   name="merk"/></td>
        </tr>

        <br></br>

        <tr>
            <td><label> Jenis Gitar:</label></td>
            <td><input type="text" id="jenis"   name="jenis"/></td>
        </tr>

        <br></br>

        <tr>
            <td><label> Foto:</label></td>
            <td><input type="file" name="image"/>  </td>
        </tr>

        <br></br>
        
        <tr>
            <td>  <label> Tanggal Pembelian: </label></td>
            <td>  <input type="date" name="tanggal_beli"min="1970-01-01" max="2025-12-31"/></td>
        </tr>

        <br></br>

        <tr>
            <td>  <label> Harga Gitar:</label></td>
            <td><textarea  id="harga" style={{resize: "none"}}  name="harga" ></textarea></td>
        </tr>
        <br ></br>
            </tbody>
          </table>
          <input type="submit" />
          
          </form>
  
        <br/>
        <br/>

      </div>
      </center>
    )
  }
}