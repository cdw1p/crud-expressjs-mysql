-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 25 Agu 2019 pada 01.49
-- Versi server: 10.3.15-MariaDB
-- Versi PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_cms`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `t_databuku`
--

CREATE TABLE `t_databuku` (
  `buku_id` int(10) NOT NULL,
  `nama_buku` varchar(60) NOT NULL,
  `nama_penulis` varchar(60) NOT NULL,
  `tgl_pembuatan` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `t_databuku`
--

INSERT INTO `t_databuku` (`buku_id`, `nama_buku`, `nama_penulis`, `tgl_pembuatan`) VALUES
(1, 'The Dreamers', 'Karen Thompson Walker', 'Selasa, 15 Januari 2019'),
(3, 'You\'d Be Mine', 'Erin Hahn', 'Selasa, 5 Februari 2019'),
(4, 'The Au Pair', 'Emma Rous', 'Senin, 8 Januari 2018'),
(5, 'Lima Cerita', 'Desi Anwar', 'Sabtu, 2 Maret 2019'),
(6, 'Dear Jane', 'Pratiwi Juliani', 'Senin, 4 Maret 2019');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `t_databuku`
--
ALTER TABLE `t_databuku`
  ADD PRIMARY KEY (`buku_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `t_databuku`
--
ALTER TABLE `t_databuku`
  MODIFY `buku_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
