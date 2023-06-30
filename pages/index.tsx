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
          <Link href="/pembelian">Isi Data Pembelian</Link><br></br>
          <Link href="/pengubahan">Pengubahan Pembelian</Link><br></br>
          <Link href="/list_data">List Data Pembelian</Link><br></br>
        </div>
      </header>
      <br></br><br></br><br></br>
      <center id='bio'>
      Selamat datang di halaman utama tempat impian bagi para pecinta musik dan penggemar gitar! Di sini, Anda akan menemukan dunia tak terbatas dari gitar  berkualitas tinggi yang siap menggairahkan semangat bermusik Anda. Dari gitar elektrik yang mempesona hingga gitar akustik yang menenangkan jiwa.
      </center>
    </div>
  );
}