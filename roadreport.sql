-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2018 at 01:03 AM
-- Server version: 10.1.29-MariaDB
-- PHP Version: 7.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `roadreport`
--

-- --------------------------------------------------------

--
-- Table structure for table `laporan`
--

CREATE TABLE `laporan` (
  `idpengguna` bigint(10) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `gambarlaporan` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `laporan`
--

INSERT INTO `laporan` (`idpengguna`, `latitude`, `longitude`, `gambarlaporan`) VALUES
(1, -7.960365830243171, 112.60734480632777, ''),
(2, -7.96003179661947, 112.61580931142896, ''),
(3, -7.96003179661947, 112.61580931142896, ''),
(4, -7.960365830243171, 112.60734480632777, ''),
(5, -7.960365830243171, 112.60734480632777, ''),
(6, -7.960365830243171, 112.60734480632777, ''),
(7, -7.961553223019918, 112.60736894620891, ''),
(8, -7.963874475151983, 112.60184761707342, ''),
(9, -7.977273357549859, 112.63519762740736, ''),
(10, -7.9592883008155235, 112.63724985440456, '');

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id` bigint(10) NOT NULL,
  `nama` varchar(200) NOT NULL,
  `password` varchar(25) NOT NULL,
  `notelpon` varchar(13) NOT NULL,
  `email` varchar(200) NOT NULL,
  `tempattinggal` varchar(500) NOT NULL,
  `nodientitas` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`id`, `nama`, `password`, `notelpon`, `email`, `tempattinggal`, `nodientitas`) VALUES
(1, 'Ardi Wicaksono', 'shunsui12345', '081333777444', 'ardi@.ub.ac.id', 'jalan raya blimbing', 1234567891011),
(2, 'susan indah', 'susansusan', '081222333555', 'susah@ub.ac.id', 'jalan raya suhat', 12345678991112),
(3, 'agus supriadi', 'agusagus', '081999222333', 'agus@ub.ac.id', 'jalan raya panjen', 1234567891013),
(4, 'hana aulia', 'hanahana', '089777888999', 'hana@ub.ac.id', 'jalan sumbersari', 12345678991114),
(5, 'jimmy turner', 'jimmyjimmy', '0871111444555', 'jimmy@ub.ac.id', 'jalan bunga coklat', 1234567891015),
(6, 'putri puspa', 'putriputri', '085666777888', 'putri@ub.ac.id', 'jalan bunga mawar', 1234567891016),
(7, 'farah sofia', 'farahfarah', '089888999777', 'farah@ub.ac.id', 'jalan bunga kaktus', 1234567891017),
(8, 'sarah ningtyas', 'sarahsarah', '089789789222', 'sarah@ub.ac.id', 'jalan bunga kaktus', 1234567891018),
(9, 'wanda aminah', 'wandawanda', '087666333222', 'wanda@ub.ac.id', 'jalan supriadi', 1234567891019),
(10, 'bayu bambang', 'bayubayu', '088777999000', 'bayu@ub.ac.id', 'jalan veteran', 1234567891019),
(11, 'kevin danang', 'kevinkevin', '081777222333', 'kevin@ub.ac.id', 'jalan sukun', 1234567891020),
(12, 'dika firmana', 'dikadika', '0893124534555', 'dika@ub.ac.id', 'jalan raya tidar', 1234567891021);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `laporan`
--
ALTER TABLE `laporan`
  ADD PRIMARY KEY (`idpengguna`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` bigint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
