-- Adminer 4.7.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `data_produk_intelijen`;
CREATE TABLE `data_produk_intelijen` (
  `id_data_produk_intelijen` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_subdit` int(11) NOT NULL,
  `tahun_data_produk_intelijen` int(11) NOT NULL,
  `bulan_data_produk_intelijen` int(11) NOT NULL,
  `jenis_produk_intelijen` int(11) NOT NULL,
  `jumlah_data_produk_intelijen` int(11) NOT NULL,
  PRIMARY KEY (`id_data_produk_intelijen`),
  KEY `jenis_data_produk_intelije` (`jenis_produk_intelijen`),
  KEY `id_subdit` (`id_subdit`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `data_produk_intelijen_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `data_produk_intelijen_ibfk_2` FOREIGN KEY (`jenis_produk_intelijen`) REFERENCES `produk_intelijen` (`id_produk_intelijen`),
  CONSTRAINT `data_produk_intelijen_ibfk_3` FOREIGN KEY (`id_subdit`) REFERENCES `subdit` (`id_subdit`),
  CONSTRAINT `data_produk_intelijen_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `data_produk_intelijen` (`id_data_produk_intelijen`, `id_user`, `id_subdit`, `tahun_data_produk_intelijen`, `bulan_data_produk_intelijen`, `jenis_produk_intelijen`, `jumlah_data_produk_intelijen`) VALUES
(7,	1,	1,	2020,	2,	1,	50);

DROP TABLE IF EXISTS `index_kepuasan`;
CREATE TABLE `index_kepuasan` (
  `id_index_kepuasan` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `value_index_kepuasan` int(11) NOT NULL,
  `attachment_index_kepuasan` longblob DEFAULT NULL,
  PRIMARY KEY (`id_index_kepuasan`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `index_kepuasan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

 

DROP TABLE IF EXISTS `jenis_kegiatan_intelijen`;
CREATE TABLE `jenis_kegiatan_intelijen` (
  `id_jenis` int(11) NOT NULL AUTO_INCREMENT,
  `nama_jenis` varchar(50) NOT NULL,
  PRIMARY KEY (`id_jenis`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `jenis_kegiatan_intelijen` (`id_jenis`, `nama_jenis`) VALUES
(1,	'Kontra'),
(2,	'Pengamanan'),
(3,	'Penyelidikan'),
(4,	'Penggalangan');

DROP TABLE IF EXISTS `jenis_produk_keluar`;
CREATE TABLE `jenis_produk_keluar` (
  `id_jenis_produk_keluar` int(11) NOT NULL AUTO_INCREMENT,
  `nama_jenis_produk_keluar` text NOT NULL,
  PRIMARY KEY (`id_jenis_produk_keluar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `jenis_produk_keluar` (`id_jenis_produk_keluar`, `nama_jenis_produk_keluar`) VALUES
(1,	'Saran Pendapat'),
(2,	'Bahan Pimpinan'),
(3,	'Bahan Rapat Pimpinan'),
(4,	'Surat'),
(6,	'Surat / Nodin'),
(7,	'Bahan Pimpinan'),
(8,	'Bahan Rapat Pimpinan');

DROP TABLE IF EXISTS `kegiatan_intelijen`;
CREATE TABLE `kegiatan_intelijen` (
  `id_kegiatan_intelijen` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `tahun_kegiatan_intelijen` int(11) NOT NULL,
  `bulan_kegiatan_intelijen` int(11) NOT NULL,
  `jenis_kegiatan_intelijen` int(11) NOT NULL,
  `jumlah_kegiatan_intelijen` int(11) NOT NULL,
  `reduksi_kegiatan_intelijen` int(11) NOT NULL,
  `uraian_kegiatan_intelijen` text NOT NULL,
  PRIMARY KEY (`id_kegiatan_intelijen`),
  KEY `jenis_kegiatan_intelijen` (`jenis_kegiatan_intelijen`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `kegiatan_intelijen_ibfk_1` FOREIGN KEY (`jenis_kegiatan_intelijen`) REFERENCES `jenis_kegiatan_intelijen` (`id_jenis`),
  CONSTRAINT `kegiatan_intelijen_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `kegiatan_intelijen` (`id_kegiatan_intelijen`, `id_user`, `tahun_kegiatan_intelijen`, `bulan_kegiatan_intelijen`, `jenis_kegiatan_intelijen`, `jumlah_kegiatan_intelijen`, `reduksi_kegiatan_intelijen`, `uraian_kegiatan_intelijen`) VALUES
(4,	1,	2020,	1,	1,	100,	20,	'uraian');

DROP TABLE IF EXISTS `kejadian_menonjol`;
CREATE TABLE `kejadian_menonjol` (
  `id_kejadian_menonjol` int(11) NOT NULL AUTO_INCREMENT,
  `id_subdit` int(11) NOT NULL,
  `bulan_kejadian_menonjol` int(11) NOT NULL,
  `tahun_kejadian_menonjol` int(11) NOT NULL,
  `uraian_kejadian_menonjol` text NOT NULL,
  `jumlah_kejadian_menonjol` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_kejadian_menonjol`),
  KEY `id_subdit` (`id_subdit`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `kejadian_menonjol_ibfk_1` FOREIGN KEY (`id_subdit`) REFERENCES `subdit` (`id_subdit`),
  CONSTRAINT `kejadian_menonjol_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `kejadian_menonjol` (`id_kejadian_menonjol`, `id_subdit`, `bulan_kejadian_menonjol`, `tahun_kejadian_menonjol`, `uraian_kejadian_menonjol`, `jumlah_kejadian_menonjol`, `id_user`) VALUES
(1,	1,	1,	2020,	'test',	200,	1),
(3,	3,	1,	2020,	'test',	200,	1),
(4,	2,	1,	2020,	'test',	300,	1),
(8,	1,	1,	2020,	'1',	1,	1);

DROP TABLE IF EXISTS `penggunaan_alsus`;
CREATE TABLE `penggunaan_alsus` (
  `id_penggunaan_alsus` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `tahun_penggunaan_alsus` int(11) NOT NULL,
  `jumlah_penggunaan_alsus` int(11) NOT NULL,
  `attachment_penggunaan_alsus` longblob DEFAULT NULL,
  PRIMARY KEY (`id_penggunaan_alsus`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `penggunaan_alsus_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 
DROP TABLE IF EXISTS `pengiriman_produk_intelijen`;
CREATE TABLE `pengiriman_produk_intelijen` (
  `id_pengiriman_produk_intelijen` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `tanggal_pengiriman_produk_intelijen` date NOT NULL,
  `perihal_pengiriman_produk_intelijen` text NOT NULL,
  `jenis_pengiriman_produk_intelijen` int(11) NOT NULL,
  `nomor_produk_keluar` text NOT NULL,
  PRIMARY KEY (`id_pengiriman_produk_intelijen`),
  KEY `jenis_pengiriman_produk_intelijen` (`jenis_pengiriman_produk_intelijen`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `pengiriman_produk_intelijen_ibfk_1` FOREIGN KEY (`jenis_pengiriman_produk_intelijen`) REFERENCES `produk_intelijen` (`id_produk_intelijen`),
  CONSTRAINT `pengiriman_produk_intelijen_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `pengiriman_produk_intelijen` (`id_pengiriman_produk_intelijen`, `id_user`, `tanggal_pengiriman_produk_intelijen`, `perihal_pengiriman_produk_intelijen`, `jenis_pengiriman_produk_intelijen`, `nomor_produk_keluar`) VALUES
(3,	2,	'2020-01-15',	'laporan',	3,	'1');

DROP TABLE IF EXISTS `potensi_gangguan`;
CREATE TABLE `potensi_gangguan` (
  `id_potensi_gangguan` int(11) NOT NULL AUTO_INCREMENT,
  `tahun_potensi_gangguan` int(11) NOT NULL,
  `attachment_potensi_gangguan` longblob DEFAULT NULL,
  `id_user` int(11) NOT NULL,
  `jumlah_potensi_gangguan` int(11) NOT NULL,
  PRIMARY KEY (`id_potensi_gangguan`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `potensi_gangguan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `potensi_gangguan` (`id_potensi_gangguan`, `tahun_potensi_gangguan`, `attachment_potensi_gangguan`, `id_user`, `jumlah_potensi_gangguan`) VALUES
 

DROP TABLE IF EXISTS `produk_intelijen`;
CREATE TABLE `produk_intelijen` (
  `id_produk_intelijen` int(11) NOT NULL AUTO_INCREMENT,
  `nama_produk_intelijen` varchar(50) NOT NULL,
  PRIMARY KEY (`id_produk_intelijen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `produk_intelijen` (`id_produk_intelijen`, `nama_produk_intelijen`) VALUES
(1,	'Laporan Informasi'),
(2,	'Informasi Khusus'),
(3,	'Telaah Intelijen'),
(4,	'Telaah Intelijen Mingguan'),
(5,	'Telaah Intelijen Bulanan'),
(6,	'Perkiraan Keadaan'),
(7,	'Perkiraan Cepat'),
(8,	'Perkiraan Khusus'),
(9,	'Perkiraan Mingguan'),
(10,	'Perkiraan Bulanan');

DROP TABLE IF EXISTS `produk_keluar`;
CREATE TABLE `produk_keluar` (
  `id_produk_keluar` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_jenis_produk_keluar` int(11) NOT NULL,
  `nomor_produk_keluar` text NOT NULL,
  `tanggal_produk_keluar` date NOT NULL,
  `kepada_produk_keluar` text DEFAULT NULL,
  `satker_produk_keluar` text DEFAULT NULL,
  `perihal_produk_keluar` text NOT NULL,
  PRIMARY KEY (`id_produk_keluar`),
  KEY `id_user` (`id_user`),
  KEY `id_jenis_produk_keluar` (`id_jenis_produk_keluar`),
  CONSTRAINT `produk_keluar_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`),
  CONSTRAINT `produk_keluar_ibfk_2` FOREIGN KEY (`id_jenis_produk_keluar`) REFERENCES `jenis_produk_keluar` (`id_jenis_produk_keluar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `produk_keluar` (`id_produk_keluar`, `id_user`, `id_jenis_produk_keluar`, `nomor_produk_keluar`, `tanggal_produk_keluar`, `kepada_produk_keluar`, `satker_produk_keluar`, `perihal_produk_keluar`) VALUES
(9,	1,	4,	'1',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(11,	1,	1,	'123',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(12,	1,	7,	'123',	'2020-01-15',	'bareskrim',	NULL,	'laporan'),
(13,	2,	6,	'1',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(14,	2,	4,	'123',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(15,	1,	6,	'',	'2020-01-15',	'',	NULL,	''),
(16,	1,	6,	'123',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(17,	1,	6,	'123',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(18,	1,	6,	'123',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(19,	1,	4,	'1',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(20,	1,	1,	'1',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(21,	1,	1,	'1',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan'),
(22,	1,	1,	'1',	'2020-01-15',	'Kementrian keuangan',	NULL,	'laporan');

DROP TABLE IF EXISTS `realisasi_alsus`;
CREATE TABLE `realisasi_alsus` (
  `id_realisasi_alsus` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `tahun_realisasi_alsus` int(11) NOT NULL,
  `bulan_realisasi_alsus` int(11) NOT NULL,
  `jumlah_realisasi_alsus` int(11) NOT NULL,
  `uraian_realisasi_alsus` text NOT NULL,
  PRIMARY KEY (`id_realisasi_alsus`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `realisasi_alsus_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `realisasi_alsus` (`id_realisasi_alsus`, `id_user`, `tahun_realisasi_alsus`, `bulan_realisasi_alsus`, `jumlah_realisasi_alsus`, `uraian_realisasi_alsus`) VALUES
(4,	1,	2020,	1,	10,	'uraian');

DROP TABLE IF EXISTS `ref_produk_keluar`;
CREATE TABLE `ref_produk_keluar` (
  `id_ref_produk_keluar` int(11) NOT NULL AUTO_INCREMENT,
  `id_produk_keluar` int(11) NOT NULL,
  `nomor_ref_produk_keluar` int(11) NOT NULL,
  `jenis_ref_produk_keluar` int(11) NOT NULL,
  `attachment_ref_produk_keluar` longblob NOT NULL,
  PRIMARY KEY (`id_ref_produk_keluar`),
  KEY `jenis_ref_produk_keluar` (`jenis_ref_produk_keluar`),
  KEY `id_produk_keluar` (`id_produk_keluar`),
  CONSTRAINT `ref_produk_keluar_ibfk_2` FOREIGN KEY (`jenis_ref_produk_keluar`) REFERENCES `produk_intelijen` (`id_produk_intelijen`),
  CONSTRAINT `ref_produk_keluar_ibfk_3` FOREIGN KEY (`id_produk_keluar`) REFERENCES `produk_keluar` (`id_produk_keluar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 

DROP TABLE IF EXISTS `satker`;
CREATE TABLE `satker` (
  `id_satker` int(11) NOT NULL AUTO_INCREMENT,
  `nama_satker` varchar(50) NOT NULL,
  PRIMARY KEY (`id_satker`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `satker` (`id_satker`, `nama_satker`) VALUES
(1,	'BAINTELKAM');

DROP TABLE IF EXISTS `satwil`;
CREATE TABLE `satwil` (
  `id_satwil` int(11) NOT NULL AUTO_INCREMENT,
  `nama_satwil` varchar(100) NOT NULL,
  PRIMARY KEY (`id_satwil`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `satwil` (`id_satwil`, `nama_satwil`) VALUES
(1,	'Polda Metro jaya'),
(2,	'Polda Jabar'),
(3,	'Polda Jateng'),
(4,	'Polda DIY'),
(5,	'Polda Banten'),
(7,	'Polda Jatim'),
(8,	'Polda Bali'),
(9,	'BAINTELKAM');

DROP TABLE IF EXISTS `subdit`;
CREATE TABLE `subdit` (
  `id_subdit` int(11) NOT NULL AUTO_INCREMENT,
  `nama_subdit` varchar(50) NOT NULL,
  PRIMARY KEY (`id_subdit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `subdit` (`id_subdit`, `nama_subdit`) VALUES
(1,	'Politik'),
(2,	'Ekonomi'),
(3,	'Sosial Budaya'),
(4,	'Keamanan Negara'),
(5,	'Keamanan Khusus');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `id_satwil` int(11) DEFAULT NULL,
  `id_satker` int(11) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(32) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 2,
  PRIMARY KEY (`id_user`),
  KEY `id_satwil` (`id_satwil`),
  KEY `id_subdit` (`id_satker`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_satwil`) REFERENCES `satwil` (`id_satwil`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`id_satker`) REFERENCES `subdit` (`id_subdit`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id_user`, `id_satwil`, `id_satker`, `username`, `password`, `role`) VALUES
(1,	9,	NULL,	'admin',	'admin',	1),
(2,	1,	NULL,	'pmj',	'pmj',	2);

DROP TABLE IF EXISTS `user_activity`;
CREATE TABLE `user_activity` (
  `id_activity` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `deskripsi` text NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_activity`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `user_activity_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `user_activity` (`id_activity`, `id_user`, `deskripsi`, `datetime`) VALUES
(47,	1,	'Mengisi Data Produk Intelijen',	'2020-03-17 10:14:55'),
(48,	1,	'Menghapus Data Produk Intelijen',	'2020-03-17 10:15:01'),
(49,	1,	'Mengisi Data Kejadian Menonjol',	'2020-03-17 10:48:40'),
(50,	1,	'Menghapus Data Produk Intelijen',	'2020-03-17 10:48:45'),
(51,	1,	'Mengisi Data Kejadian Menonjol',	'2020-03-17 10:48:54'),
(52,	1,	'Menghapus Data Produk Intelijen',	'2020-03-17 10:49:00'),
(53,	1,	'Mengisi Data alsus',	'2020-03-17 15:17:36'),
(54,	1,	'Mengisi Data alsus',	'2020-03-17 15:19:08'),
(55,	1,	'Mengisi Data alsus',	'2020-03-17 15:24:23'),
(56,	1,	'Download File Alsus',	'2020-03-17 15:42:48'),
(57,	1,	'Download File Alsus',	'2020-03-17 15:43:23'),
(58,	1,	'Menghapus Index Kepuasan',	'2020-03-17 16:06:23'),
(59,	1,	'Mengisi Index Kepuasan',	'2020-03-17 16:06:32'),
(60,	1,	'Download File Index Kepuasan',	'2020-03-17 16:07:00'),
(61,	1,	'Mengisi Potensi Gangguan',	'2020-03-17 22:22:54'),
(62,	1,	'Mendownload file Potensi Gangguan',	'2020-03-17 22:57:28'),
(63,	1,	'Mengisi Data Produk Keluar',	'2020-03-18 11:02:56'),
(64,	1,	'Mengisi Data Produk Keluar',	'2020-03-18 11:05:34'),
(65,	1,	'Mengisi Data Produk Keluar',	'2020-03-18 11:07:54'),
(66,	1,	'Mengisi Data Produk Keluar',	'2020-03-18 11:12:12'),
(67,	1,	'Mengisi Data Produk Keluar',	'2020-03-18 11:13:39'),
(68,	1,	'Mengisi Data Produk Keluar',	'2020-03-18 11:25:46'),
(69,	1,	'Menghapus Data Produk Keluar Intelijen',	'2020-03-18 11:44:28'),
(70,	2,	'Menghapus Index Kepuasan',	'2020-03-18 17:03:22'),
(71,	2,	'Menghapus Data Alsus',	'2020-03-18 17:03:37'),
(72,	2,	'Menghapus Data Produk Keluar',	'2020-03-18 17:03:40'),
(73,	2,	'Menghapus Data Produk Intelijen',	'2020-03-18 17:03:44'),
(74,	1,	'Mengisi Data alsus',	'2020-03-19 07:39:22'),
(75,	1,	'Mengisi Data realisasi alsus',	'2020-03-19 07:46:51'),
(76,	1,	'Menghapus Data Realisasi Alsus',	'2020-03-19 07:46:58'),
(77,	1,	'Menghapus Data Realisasi Alsus',	'2020-03-19 07:46:59'),
(78,	1,	'Mengisi Data realisasi alsus',	'2020-03-19 07:47:09'),
(79,	1,	'Mengisi Data Produk Intelijen',	'2020-03-19 07:54:59'),
(80,	1,	'Mengisi Index Kepuasan',	'2020-03-19 08:23:44'),
(81,	1,	'Mengisi Data Produk Keluar',	'2020-03-19 08:41:26'),
(82,	1,	'Mengisi Data Kejadian Menonjol',	'2020-03-19 09:36:11'),
(83,	2,	'Mengisi Data Produk Keluar',	'2020-03-19 10:08:19'),
(84,	2,	'Mengisi Data Produk Keluar',	'2020-03-19 10:09:36'),
(85,	1,	'Mengisi Data Produk Intelijen Keluar',	'2020-03-19 10:39:04'),
(86,	2,	'Mengisi Data Produk Intelijen Keluar',	'2020-03-19 10:44:12'),
(87,	1,	'Menghapus Data Pengiriman Produk Keluar',	'2020-03-20 06:19:41'),
(88,	1,	'Menghapus Data Pengiriman Produk Keluar',	'2020-03-20 06:20:19'),
(89,	1,	'Menghapus Data Pengiriman Produk Keluar',	'2020-03-20 06:20:21'),
(90,	1,	'Menghapus Data Pengiriman Produk Keluar',	'2020-03-20 06:20:22'),
(91,	1,	'Menghapus Data Pengiriman Produk Keluar',	'2020-03-20 06:20:22'),
(92,	1,	'Menghapus Data Pengiriman Produk Keluar',	'2020-03-20 06:20:23'),
(93,	1,	'Menghapus Data Pengiriman Produk Keluar',	'2020-03-20 06:23:45'),
(94,	1,	'Menghapus Data Pengiriman Produk Keluar',	'2020-03-20 06:23:47'),
(95,	1,	'Mengisi Data alsus',	'2020-03-20 06:47:12'),
(96,	1,	'Mengisi Data Produk Keluar',	'2020-03-20 06:47:32'),
(97,	1,	'Mengisi Data Produk Keluar',	'2020-03-20 06:50:14');

-- 2020-03-27 14:51:52
