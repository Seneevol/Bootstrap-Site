-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: nakaddb
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `nakaddb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `nakaddb` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `nakaddb`;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author_id` int NOT NULL,
  `link` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `author_id_idx` (`author_id`),
  KEY `user_id_idx` (`author_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (15,'Kiana','1643637329918_kiana.png','Kiana Kaslana blabla blablabla','2022-01-31 14:55:29',4,''),(16,'Mei','1643638025909_mei.png','Raiden Mei blabla blabla blabla blabla','2022-01-31 15:07:05',4,''),(17,'Mobius','1643638154503_mobius.png','Mobius sjdhfdkjshfkjhdskjbgfkbdgshkfbhdjsbfhjbdsfkdjs','2022-01-31 15:09:14',4,''),(18,'Seele','1643638168507_seele.png','Bgfjdbgjbdfkjbgdfjbgkjbdfjbgjbdgkldg','2022-01-31 15:09:28',4,''),(20,'Elysia','1643640840074_elysia.png','Elisnfdkjsbgfdvksfj','2022-01-31 15:54:00',4,''),(23,'Nakad','1643718658194_Fu.Hua.full.2827148.jpg','On test toujours','2022-02-01 13:30:58',4,'Liendetest'),(24,'Senti','1643723772794_maxresdefault (1).jpg','HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS ou HoS','2022-02-01 14:56:12',6,'https://google.fr');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `author_id` int NOT NULL,
  `article_id` int NOT NULL,
  `date` datetime NOT NULL,
  `parent_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`author_id`),
  KEY `article_id_idx` (`article_id`),
  KEY `parent_id_idx` (`parent_id`),
  CONSTRAINT `article_id` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  CONSTRAINT `author_id` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `parent_id` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1aAYsOqxEtEDZpSr8PxGHKvO6pqEBGjg',1643876131,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":6,\"name\":\"Nakad\",\"email\":\"nakad@nakad.com\",\"avatar\":\"1643619727299_20220124_172425.jpg\",\"password\":\"$2b$10$UdJd83M8Py7M/xvRISGudeOP8C5v.Upji6j2plhxNe5CPv2PfEyJm\",\"isAdmin\":0,\"isBan\":0}}'),('b-v_eVvf1Mvwp7HY7ifQJh5xJIis8E6P',1643814260,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":12,\"name\":\"< dev />\",\"email\":\"musk@tesla.drug\",\"avatar\":\"1643725282904_pnl.png\",\"password\":\"$2b$10$0T6IoOeSb7h.6zzr8DHSEub1HABG6fcQG8M1WQThC4bRAJQSTI7c2\",\"isAdmin\":0,\"isBan\":0}}'),('db8WcGXNIj0OkfPrqNKO8MpxEID4MhIb',1643811385,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('jz_Ur3K1S7WrD3AxAUcoLpsFWdU9WMR3',1643812761,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":13,\"name\":\"SupraGANG\",\"email\":\"SupraGang@rupteur.pneu\",\"avatar\":\"1643724976662_supra.jpg\",\"password\":\"$2b$10$dY85lJbGz/k31MChV1xJQesyaNyir97LpMxJ/d8sUlxg9KAtoIb.W\",\"isAdmin\":0,\"isBan\":0}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'default.png',
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `isBan` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Admin','shogun@admin.com','1643729718236_latest.jpg','123',1,0),(5,'Nique','nique@nique.com','default.png','nique',0,0),(6,'Nakad','nakad@nakad.com','1643619727299_20220124_172425.jpg','$2b$10$UdJd83M8Py7M/xvRISGudeOP8C5v.Upji6j2plhxNe5CPv2PfEyJm',0,0),(7,'Shogun','fgf@fdg.kk','default.png','$2b$10$72txe9IJ.uD4MeXlycBqCe.7LtCte0gA4Bu2CAhsmNFDiOUIPWYrK',0,0),(12,'< dev />','musk@tesla.drug','1643725282904_pnl.png','$2b$10$0T6IoOeSb7h.6zzr8DHSEub1HABG6fcQG8M1WQThC4bRAJQSTI7c2',0,0),(13,'SupraGANG','SupraGang@rupteur.pneu','1643724976662_supra.jpg','$2b$10$dY85lJbGz/k31MChV1xJQesyaNyir97LpMxJ/d8sUlxg9KAtoIb.W',0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-02 11:02:51
