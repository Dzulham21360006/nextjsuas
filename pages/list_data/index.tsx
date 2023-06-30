import { useState, useEffect } from "react";
import axios from "axios";
import {stat} from 'fs';
import gambar from '@/gambar/gambargitar.jpeg';
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

      if(gitar==null){
        return(
          <div>
            waiting...
          </div>
        )
        }else{
      
          return (
      
    <center className="listbg"> 
    <header id='headerinput'>
        <div className="logo-container">
        </div>
        <center>
          <h1>Kouraii's Guitar</h1>
        </center>
        <div className='beranda-home'>
        <Link href="/pembelian">Daftar Pembelian</Link><br></br>
          <Link href="/pengubahan">Pengubahan Pembelian</Link><br></br>
          <Link href="/">Beranda</Link><br></br>
        </div>
      </header>
      <br></br>         

        <table className="noser">

        <thead>
        <tr style={{textAlign:'center'}}>
                    <td><b>No Seri</b></td>
                    <td><b>Brand Gitar</b></td>
                    <td><b>Jenis Gitar</b></td>
                    <td><b>Foto</b></td>
                    <td><b>Tanggal Pembelian</b></td>
                    <td><b>Harga Gitar</b></td>
                    </tr>
                </thead>

            <tbody>
            {gitar.map((gtr) =>
                    <tr style={{textAlign:'center'}}>
                        <td>{gtr.no_seri}</td>
                        <td>{gtr.merk}</td>
                        <td>{gtr.jenis}</td>
                        <td><img src={gtr.foto} width="150"/></td>
                        <td>{gtr.tanggal_beli}</td>
                        <td>{gtr.harga}</td> 
                    </tr>
            )}    

        </tbody>
      </table>
            </center>
          )
        }
      }