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
const [statetanggal_beli, setTanggal_beli] = useState("yyy-mm-dd");
const [statejenis, setJenis] = useState("");
const [stateharga, setHarga] = useState("");
const [stateno_seri, setNo_seri] = useState("");
const [statefoto, setFoto] = useState("");


const handleDelete = (event) => {
  event.preventDefault();
  var no_seri= event.target.value;
  
  const confirmation = window.confirm("Apakah Anda yakin ingin menghapus data?");
  if (confirmation) {
    koneksiGitar
      .delete(`/${no_seri}`)
      .then((response) => {
        console.log('Data berhasil dihapus:', response.data);
        window.location.reload();
        setGitar(
          gitar.filter((gitar) => {
            return gitar.no_seri !== no_seri;
          })
        );
      })
      .catch((error) => {
        console.error('Gagal menghapus data:', error);
      });
  } else {
    console.log();
  }
};
    

  const handleSubmitEdit =  (event) => {
    event.preventDefault();
    const address = event.target.no_seri.value;
        const formData = {
          no_seri: event.target.no_seri.value,
          merk: event.target.merk.value,
          jenis: event.target.jenis.value,
          tanggal_beli: event.target.tanggal_beli.value,
          harga: event.target.harga.value
      }
      const confirmation = window.confirm("Apakah anda yakin sudah melakukan perubahan data?");
      if (confirmation) {
        koneksiGitar
          .put( address,formData)
          .then((res) => {
            console.log(res);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      
        }else{
          window.location.reload();
        }
      }

        const handleEdit = (event) => {
            event.preventDefault();
            var no_seri = event.target.value;
           
               const gtrEdit =  gitar.filter((gitar) => {
                     return gitar.no_seri == no_seri;
                  });
                  if(gtrEdit!=null){
        
                    setMerk(gtrEdit[0].merk);
                    setNo_seri(gtrEdit[0].no_seri);
                    setJenis(gtrEdit[0].jenis);
                    setTanggal_beli(formatDate(gtrEdit[0].tanggal_lahir));
                    setFoto(gtrEdit[0].foto);
                    setHarga(gtrEdit[0].harga);
                  }
          }

          function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;
        
            return [year, month, day].join('-');
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

      if(gitar==null){
        return(
          <div>
            Loading...
          </div>
        )
        }else{
      
          return (
      
    <center className="bgedit">
      <header id='hedit'>
        <div className="logo-container">
        </div>
        <center>
          <h1>Kouraii's Guitar</h1>
        </center>
        <div className='beranda-home'>
          <Link href="/pembelian">Pembelian</Link><br></br>
          <Link href="/">Beranda</Link><br></br>
          <Link href="/list_data">List Data Pembelian</Link><br></br>
        </div>
      </header>
        <br></br>

        <div>
          <form id="formedit" onSubmit={handleSubmitEdit}>
          <br></br><h3>Pengubahan Data Pembelian Gitar </h3><br></br>
          <table border={0}>
            <tbody>
          <tr>
            <td> <label> No.Serial:</label></td>
            <td><input type="text" id="no_seri"  value={stateno_seri} name="no_seri"/></td>
          </tr>

        <br></br>

        <tr>
            <td>  <label> Merk Gitar:</label></td>
            <td><input type="text" id="merk"  value={statemerk} name="merk"
               onChange={(e) => setMerk(e.target.value)}/></td>
        </tr>

        <br></br>

        <tr>
            <td>  <label> Jenis Gitar:</label></td>
            <td><input type="text" id="jenis"  value={statejenis} name="jenis"
               onChange={(e) => setJenis(e.target.value)}
               /></td>
        </tr>

        <br></br>

        <tr>
            <td>  <label> Foto:</label></td>
            <td>  <img src={statefoto} width="80"/> </td>
        </tr>

        <br></br>

        <tr>
            <td>  <label> Tanggal Beli:</label></td>
            <td>  <input type="date" value={statetanggal_beli} name="tanggal_beli"  onChange={(e) => setTanggal_beli(e.target.value)} min="1970-01-01" max="2025-12-31"/></td>
        </tr>

        <br></br>

        <tr>
            <td>  <label> Harga:</label></td>
            <td><textarea  id="harga" style={{resize: "none"}} value={stateharga} name="harga"  onChange={(e) => setHarga(e.target.value)}></textarea></td>
        </tr>
            </tbody>
          </table>
          <input type="submit" />

          </form>

    <br></br>
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
                <td colSpan={2}><b>Opsi</b></td>
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
                   <td><button onClick={handleEdit} value={gtr.no_seri}>Edit</button></td>
                   <td><button onClick={handleDelete} value={gtr.no_seri}>Delete</button></td>
                </tr>
           )}    
        </tbody>
        
      </table>
            </div>
            </center>
          )
        }
      }