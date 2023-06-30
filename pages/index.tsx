import Link from 'next/link';
import bg from '@/gambar/gambargitar.jpeg';
import lg from '@/logo/koraihoshiumi.png';

export default function Home() {
  return (
    <div className="container-home">
      <header id='header'>
        <div className="logo-container">
          
        </div>
        <center>
          <h1>Kouraii's Guitar</h1>
        </center>
        <div className='beranda-home'>
          <Link href="/pembelian">Daftar Pembelian</Link><br></br>
          <Link href="/pengubahan">Pengubahan Pembelian</Link><br></br>
          <Link href="/list_data">List Data Pembelian</Link><br></br>
        </div>
      </header>
    </div>
  );
}