-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 21 Octobre 2015 à 17:38
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `call_tracker`
--

-- --------------------------------------------------------

--
-- Structure de la table `callgroup`
--

CREATE TABLE IF NOT EXISTS `callgroup` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `callgroup`
--

INSERT INTO `callgroup` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Newspaper', NULL, NULL),
(2, 'TV', NULL, NULL),
(3, 'Internet', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `callitem`
--

CREATE TABLE IF NOT EXISTS `callitem` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `callgroupid` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `callitem`
--

INSERT INTO `callitem` (`id`, `name`, `callgroupid`, `createdAt`, `updatedAt`) VALUES
(1, 'Google', 2, NULL, NULL),
(2, 'Phoenix ch5 - CBS', 1, NULL, NULL),
(3, 'Arizona Republic', 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `log`
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
  `source` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `log`
--

INSERT INTO `log` (`fullName`, `time`, `content`, `notes`, `phone`, `group`, `location`, `response`, `source`, `email`, `userId`, `id`, `createdAt`, `updatedAt`) VALUES
('Vuong Quy Ngoc', 21, 'To help improve accessibility for people using screen readers, you should include the aria-label="close" attribute, when creating a close button.', 'To help improve accessibility for people using screen readers, you should include the aria-label="close" attribute, when creating a close button.', '098878788', 1, '', 1, 1, 'test+2170@bridgeathletic.com', 20, 3, '2015-10-04 11:55:32', '2015-10-04 11:55:32'),
('Trịnh Phuoc Thai', 32, 'Nếu đội bóng muốn sa thải tôi thì họ hãy làm điều đó. Nhưng đó sẽ là thời điểm quan trọng của lịch sử. Bởi nếu sa thải tôi đồng nghĩa Chelsea chấm dứt hợp đồng với huấn luyện viên tốt nhất lịch sử Stamford Bridge”, Mourinho chia sẻ.', 'Nếu đội bóng muốn sa thải tôi thì họ hãy làm điều đó. Nhưng đó sẽ là thời điểm quan trọng của lịch sử. Bởi nếu sa thải tôi đồng nghĩa Chelsea chấm dứt hợp đồng với huấn luyện viên tốt nhất lịch sử Stamford Bridge”, Mourinho chia sẻ.', '0988777676', 1, 'Hà Nội', 1, 1, 'quocmykhtn@gmail.coma', 21, 4, '2015-10-04 11:58:43', '2015-10-04 11:58:43'),
('Huynh The Nang', 23, 'Theo chiến lược gia người Bồ Đào Nha, đây là lúc mọi người nhận trách nhiệm về mình để gắn bó với nhau hơn. Cựu huấn luyện viên của Real cũng cho rằng Chelsea đang bị đối xử khắc nghiệt bởi những quyết định của trọng tài. Nếu ông vua áo đen không bỏ qua q', 'Theo chiến lược gia người Bồ Đào Nha, đây là lúc mọi người nhận trách nhiệm về mình để gắn bó với nhau hơn. Cựu huấn luyện viên của Real cũng cho rằng Chelsea đang bị đối xử khắc nghiệt bởi những quyết định của trọng tài. Nếu ông vua áo đen không bỏ qua q', '01272054198', 2, 'Da Nang', 1, 1, 'quocteo3@gmail.com', 20, 5, '2015-10-04 12:23:55', '2015-10-04 12:23:55');

-- --------------------------------------------------------

--
-- Structure de la table `user`
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
  `title` varchar(255) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`email`, `firstName`, `lastName`, `username`, `password`, `gender`, `birthDate`, `phone`, `title`, `id`, `createdAt`, `updatedAt`) VALUES
('quocmykhtn@gmail.com', 'My', 'Huynh', 'myhuynh', '$2a$10$TGvmXk0z7kdlEWULekfKjOODmx/NzwEi/7T2hKjzcsU..0NVC7rg2', 'male', NULL, NULL, 'Web developer', 20, '2015-10-04 11:52:29', '2015-10-04 11:52:29'),
('lovelycat_net@gmail.com', 'Ngọc', 'Vương', 'quyngoc', '$2a$10$n4ukwNhFNeZ1WpM.1O6diOcYk4w4MijJe7pDny.byZCetviDqIHz.', 'male', NULL, NULL, 'SQL developer', 21, '2015-10-04 11:56:58', '2015-10-04 11:56:58');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
