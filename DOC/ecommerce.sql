-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 21, 2021 at 03:15 PM
-- Server version: 8.0.25-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `color`) VALUES
(1, 'rpg', 'rgb(196, 164, 132)'),
(2, 'aventure', 'dodgerblue'),
(3, 'action', 'red'),
(4, 'tir', 'orange'),
(5, 'survie', 'grey');

-- --------------------------------------------------------

--
-- Table structure for table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20210713133216', '2021-07-13 15:33:31', 98),
('DoctrineMigrations\\Version20210716102047', '2021-07-16 12:21:19', 479),
('DoctrineMigrations\\Version20210719134521', '2021-07-19 15:45:34', 29),
('DoctrineMigrations\\Version20210719135000', '2021-07-19 15:51:39', 116),
('DoctrineMigrations\\Version20210719140318', '2021-07-19 16:04:21', 260),
('DoctrineMigrations\\Version20210723073549', '2021-07-23 09:36:05', 739),
('DoctrineMigrations\\Version20210723082817', '2021-07-23 10:28:30', 223),
('DoctrineMigrations\\Version20210726105537', '2021-07-26 12:56:11', 984),
('DoctrineMigrations\\Version20210726120632', '2021-07-26 14:06:37', 295),
('DoctrineMigrations\\Version20210728131957', '2021-07-28 15:20:53', 812);

-- --------------------------------------------------------

--
-- Table structure for table `platform`
--

CREATE TABLE `platform` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `platform`
--

INSERT INTO `platform` (`id`, `name`, `logo`) VALUES
(1, 'PS5', 'https://cdn-uploads.gameblog.fr/images/actu/1200/1by1/96684_gb_news.jpg?ver=1624897856'),
(2, 'Xbox', 'https://sc04.alicdn.com/kf/Uc50a76cb3fc74d75b71659e35e219a35W.png'),
(3, 'Switch', 'https://upload.wikimedia.org/wikipedia/commons/0/04/Nintendo_Switch_logo%2C_square.png'),
(4, 'PC', 'https://image.flaticon.com/icons/png/512/3/3782.png');

-- --------------------------------------------------------

--
-- Table structure for table `platform_products`
--

CREATE TABLE `platform_products` (
  `platform_id` int NOT NULL,
  `products_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `platform_products`
--

INSERT INTO `platform_products` (`platform_id`, `products_id`) VALUES
(1, 5),
(1, 10),
(1, 19),
(1, 20),
(1, 21),
(2, 19),
(2, 20),
(3, 12),
(3, 19),
(4, 3),
(4, 5),
(4, 10),
(4, 12),
(4, 21),
(4, 22);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `published_at` date NOT NULL,
  `picture` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reduction` int DEFAULT NULL,
  `category_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `published_at`, `picture`, `reduction`, `category_id`) VALUES
(3, 'Starbound', 'Un super bon jeu d\'exploration !', 14, '2016-07-22', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdCHOTTpQ4AKvsZznVluGlJBxD9phk9-H1_A&usqp=CAU', 25, 2),
(5, 'Resident Evil 2', 'Un incroyable remake de ce grand classique', 20, '2021-07-21', 'https://image.api.playstation.com/cdn/UP0102/CUSA09193_00/YDXpf9y12EN7AWyRgO9z24F8x72kwH4m.png', 10, 5),
(10, 'Skyrim', 'Un rpg en monde ouvert', 25, '2011-11-11', 'https://live.staticflickr.com/5654/30456799755_325161472b_b.jpg', NULL, 1),
(12, 'Hollow Knight', 'Un très bon roguelite', 15, '2017-02-21', 'https://img-eshop.cdn.nintendo.net/i/91540557d07599fd6b8d63e544320fc682e71ec8d30f2b7c3d13568af18323be.jpg', 20, 3),
(19, 'Minecraft', 'Un jeu bac à sable', 30, '2011-11-18', 'https://ar.toneden.io/37190530/tracks/6027580?cache=1591607283851', NULL, 2),
(20, 'Infinite Warfare', 'Un opus de la fameuse franchise !', 60, '2016-11-04', 'https://image.api.playstation.com/cdn/UP0002/CUSA04762_00/LHc8qTz6JmLL46EdNWYEvqZEsIEYCbhy.png', 50, 4),
(21, 'Titan Quest', 'Un hack\'n Slash sur le thème de la mythologie grecque', 15, '2006-06-26', 'https://img-eshop.cdn.nintendo.net/i/d126e7bd68b01bb99d646e7127b22cb73f3547714c9d38b7e3e01c50549a2612.jpg', NULL, 3),
(22, 'Fallout New Vegas', 'Un jeu de rôle  se déroulant dans un univers post-apocalyptique', 15, '2010-10-19', 'https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/0c6406ed78ad0a0a3aa6106ff8e0d458.jpg', 75, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `roles`, `password`, `first_name`, `last_name`, `status`) VALUES
(2, 'ChristopherDebray@outlook.fr', '[]', '$argon2id$v=19$m=65536,t=4,p=1$07HXDrjFtZM36V48IaFwdg$lZREc17Gg0EryIhNGlwvyNNSTTxafP3nZCpZDtMf/s8', 'Christopher', 'Debray', 'none'),
(3, 'JuJu@outlook.fr', '[]', '$argon2id$v=19$m=65536,t=4,p=1$R7cYfbt98zXE95r/I2L4gw$p6yWG4zKnf+DImZv4MUnWakzhEc1PBRVb24nayVwt3A', 'Julien', 'Wanson', 'none'),
(4, 'test@test.fr', '[]', '$argon2id$v=19$m=65536,t=4,p=1$ZawSr0R0MABE7wRQjf+N0g$Y1hjrN7Rm4L+h0B5te25oR8UyTUDbTJmllyGuF5BilU', 'Christopher', 'Debray', 'none'),
(5, 'poneydou@outlook.fr', '[]', '$argon2id$v=19$m=65536,t=4,p=1$qfmCprE69sTaw9s+iPa7uA$UEOKIZ9TAnj1kCnKDVxhnCYA3MChjRB7YU4xfR8SlP0', 'Miaouss', 'Poney', 'none'),
(8, 'admin@outlook.fr', '[\"ROLE_ADMIN\"]', '$argon2id$v=19$m=65536,t=4,p=1$aueTU82q26fR2nEkqi1kmA$MnzbGUPCsvx8yRTZy50KyC0lKaWoDUvwB7eG4SzZUZA', 'Admin', 'Adminos', 'none'),
(15, 'adress@test.fr', '[]', '$argon2id$v=19$m=65536,t=4,p=1$sH3chvyHigOCsp2i5OM1Pg$TY5esK3QV/uHgoQc4rWgvkLsemguCLB4hEn6j1/o/TM', 'ress', 'add', 'none');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `address`, `city`, `postal_code`, `country`, `phone`) VALUES
(2, 2, '3 rue desbassyns', 'Parici', '92150', 'France', '0620145678'),
(9, 15, '4 qsdfmkqdsf', 'Testingland', '92150', 'Denmark', '0665957854'),
(10, 4, '5 rue du testing', 'Testingland', '12050', 'Belarus', '0432659870');

-- --------------------------------------------------------

--
-- Table structure for table `user_payement`
--

CREATE TABLE `user_payement` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `payement_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiry` date NOT NULL,
  `restrictions` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_payement`
--

INSERT INTO `user_payement` (`id`, `user_id`, `payement_type`, `card_number`, `expiry`, `restrictions`) VALUES
(7, 4, 'American Express', '123213513513', '2023-07-13', '[]'),
(8, 15, 'Mastercard/Visa', '032564646126', '2019-08-11', '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `platform`
--
ALTER TABLE `platform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `platform_products`
--
ALTER TABLE `platform_products`
  ADD PRIMARY KEY (`platform_id`,`products_id`),
  ADD KEY `IDX_36CA5A48FFE6496F` (`platform_id`),
  ADD KEY `IDX_36CA5A486C8A81A9` (`products_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_B3BA5A5A12469DE2` (`category_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_5543718BA76ED395` (`user_id`);

--
-- Indexes for table `user_payement`
--
ALTER TABLE `user_payement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_52879C85A76ED395` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `platform`
--
ALTER TABLE `platform`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_payement`
--
ALTER TABLE `user_payement`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `platform_products`
--
ALTER TABLE `platform_products`
  ADD CONSTRAINT `FK_36CA5A486C8A81A9` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_36CA5A48FFE6496F` FOREIGN KEY (`platform_id`) REFERENCES `platform` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_B3BA5A5A12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `FK_5543718BA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user_payement`
--
ALTER TABLE `user_payement`
  ADD CONSTRAINT `FK_52879C85A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
