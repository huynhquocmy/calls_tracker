-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2015 at 11:08 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `call_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE IF NOT EXISTS `log` (
  `fullName` varchar(255) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `group` int(11) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `response` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthDate` date DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`email`, `firstName`, `lastName`, `username`, `password`, `gender`, `birthDate`, `phone`, `id`, `createdAt`, `updatedAt`) VALUES
('quocmykhtn@gmail.com', 'My', 'Huynh', 'leohuynh', '12345678', 'male', '2015-05-01', '0905452190', 1, NULL, NULL),
('quocteo@gmail.com', 'My', 'Huynh', 'myhuynh', 'afafafaf', 'male', '2015-05-01', NULL, 2, '2015-06-06 16:11:33', '2015-06-06 16:11:33'),
('quocteo1@gmail.com', 'My', 'Huynh', 'myhuynh', 'afafafaf', 'male', '2015-05-01', NULL, 3, '2015-06-08 12:40:07', '2015-06-08 12:40:07'),
('quocteo4@gmail.com', 'My', 'Huynh', 'myhuynh', 'afafafaf', 'male', '2015-05-01', NULL, 4, '2015-06-08 12:46:01', '2015-06-08 12:46:01'),
('quocteo5@gmail.com', 'My', 'Huynh', 'myhuynh', 'afafafaf', 'male', '2015-05-01', NULL, 5, '2015-06-08 12:51:13', '2015-06-08 12:51:13');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
