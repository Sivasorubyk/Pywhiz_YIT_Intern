-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: pywhiz_yit_intern
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add contact message',7,'add_contactmessage'),(26,'Can change contact message',7,'change_contactmessage'),(27,'Can delete contact message',7,'delete_contactmessage'),(28,'Can view contact message',7,'view_contactmessage'),(29,'Can add code submission',8,'add_codesubmission'),(30,'Can change code submission',8,'change_codesubmission'),(31,'Can delete code submission',8,'delete_codesubmission'),(32,'Can view code submission',8,'view_codesubmission'),(33,'Can add exercise',9,'add_exercise'),(34,'Can change exercise',9,'change_exercise'),(35,'Can delete exercise',9,'delete_exercise'),(36,'Can view exercise',9,'view_exercise'),(37,'Can add exercise submission',10,'add_exercisesubmission'),(38,'Can change exercise submission',10,'change_exercisesubmission'),(39,'Can delete exercise submission',10,'delete_exercisesubmission'),(40,'Can view exercise submission',10,'view_exercisesubmission'),(41,'Can add blacklisted token',11,'add_blacklistedtoken'),(42,'Can change blacklisted token',11,'change_blacklistedtoken'),(43,'Can delete blacklisted token',11,'delete_blacklistedtoken'),(44,'Can view blacklisted token',11,'view_blacklistedtoken'),(45,'Can add outstanding token',12,'add_outstandingtoken'),(46,'Can change outstanding token',12,'change_outstandingtoken'),(47,'Can delete outstanding token',12,'delete_outstandingtoken'),(48,'Can view outstanding token',12,'view_outstandingtoken'),(49,'Can add learn content',13,'add_learncontent'),(50,'Can change learn content',13,'change_learncontent'),(51,'Can delete learn content',13,'delete_learncontent'),(52,'Can view learn content',13,'view_learncontent'),(53,'Can add milestone',14,'add_milestone'),(54,'Can change milestone',14,'change_milestone'),(55,'Can delete milestone',14,'delete_milestone'),(56,'Can view milestone',14,'view_milestone'),(57,'Can add code question',15,'add_codequestion'),(58,'Can change code question',15,'change_codequestion'),(59,'Can delete code question',15,'delete_codequestion'),(60,'Can view code question',15,'view_codequestion'),(61,'Can add personalized exercise',16,'add_personalizedexercise'),(62,'Can change personalized exercise',16,'change_personalizedexercise'),(63,'Can delete personalized exercise',16,'delete_personalizedexercise'),(64,'Can view personalized exercise',16,'view_personalizedexercise'),(65,'Can add user code answer',17,'add_usercodeanswer'),(66,'Can change user code answer',17,'change_usercodeanswer'),(67,'Can delete user code answer',17,'delete_usercodeanswer'),(68,'Can view user code answer',17,'view_usercodeanswer'),(69,'Can add exercise',18,'add_exercise'),(70,'Can change exercise',18,'change_exercise'),(71,'Can delete exercise',18,'delete_exercise'),(72,'Can view exercise',18,'view_exercise'),(73,'Can add user progress',19,'add_userprogress'),(74,'Can change user progress',19,'change_userprogress'),(75,'Can delete user progress',19,'delete_userprogress'),(76,'Can view user progress',19,'view_userprogress'),(77,'Can add user exercise',20,'add_userexercise'),(78,'Can change user exercise',20,'change_userexercise'),(79,'Can delete user exercise',20,'delete_userexercise'),(80,'Can view user exercise',20,'view_userexercise'),(81,'Can add exercise question',21,'add_exercisequestion'),(82,'Can change exercise question',21,'change_exercisequestion'),(83,'Can delete exercise question',21,'delete_exercisequestion'),(84,'Can view exercise question',21,'view_exercisequestion'),(85,'Can add learn content',22,'add_learncontent'),(86,'Can change learn content',22,'change_learncontent'),(87,'Can delete learn content',22,'delete_learncontent'),(88,'Can view learn content',22,'view_learncontent'),(89,'Can add mcq question',23,'add_mcqquestion'),(90,'Can change mcq question',23,'change_mcqquestion'),(91,'Can delete mcq question',23,'delete_mcqquestion'),(92,'Can view mcq question',23,'view_mcqquestion'),(93,'Can add user progress',24,'add_userprogress'),(94,'Can change user progress',24,'change_userprogress'),(95,'Can delete user progress',24,'delete_userprogress'),(96,'Can view user progress',24,'view_userprogress'),(97,'Can add user code answer',25,'add_usercodeanswer'),(98,'Can change user code answer',25,'change_usercodeanswer'),(99,'Can delete user code answer',25,'delete_usercodeanswer'),(100,'Can view user code answer',25,'view_usercodeanswer'),(101,'Can add milestone',26,'add_milestone'),(102,'Can change milestone',26,'change_milestone'),(103,'Can delete milestone',26,'delete_milestone'),(104,'Can view milestone',26,'view_milestone'),(105,'Can add code question',27,'add_codequestion'),(106,'Can change code question',27,'change_codequestion'),(107,'Can delete code question',27,'delete_codequestion'),(108,'Can view code question',27,'view_codequestion'),(109,'Can add personalized exercise',28,'add_personalizedexercise'),(110,'Can change personalized exercise',28,'change_personalizedexercise'),(111,'Can delete personalized exercise',28,'delete_personalizedexercise'),(112,'Can view personalized exercise',28,'view_personalizedexercise'),(113,'Can add user mcq answer',29,'add_usermcqanswer'),(114,'Can change user mcq answer',29,'change_usermcqanswer'),(115,'Can delete user mcq answer',29,'delete_usermcqanswer'),(116,'Can view user mcq answer',29,'view_usermcqanswer');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_contactmessage`
--

DROP TABLE IF EXISTS `contact_contactmessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_contactmessage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `message` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_contactmessage`
--

LOCK TABLES `contact_contactmessage` WRITE;
/*!40000 ALTER TABLE `contact_contactmessage` DISABLE KEYS */;
INSERT INTO `contact_contactmessage` VALUES (1,'John Doe','john@example.com','Test contact message','2025-04-04 05:34:11.162942'),(2,'John Doe','john@example.com','Test contact message','2025-04-21 10:06:00.031075'),(3,'sivasoruby','sivasorubyk@gmail.com','test','2025-04-21 10:21:07.321703'),(4,'Sivasoruby Kanapathipillai','sivasorubyk@gmail.com','ijhngdft','2025-05-15 11:09:57.712522');
/*!40000 ALTER TABLE `contact_contactmessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2025-04-22 18:03:03.237148','12b09d9d-cc53-44fe-a595-4e9195f1a975','Code Question for Introduction to Python',3,'',27,11),(2,'2025-04-22 18:03:53.627582','faddcc18-7a7a-4526-add5-4d93431eb26e','Code Question for Python arrays',3,'',27,11),(3,'2025-04-22 18:03:53.628656','e60cca66-d7e2-48fa-ad39-ef793158e811','Code Question for Python variables',3,'',27,11),(4,'2025-04-22 18:03:53.628656','de0a3742-4c8b-42c6-98ee-29d5bbe9e5a2','Code Question for Python for loops',3,'',27,11),(5,'2025-04-22 18:03:53.628656','d4debb50-78db-496b-9429-1ffc1fbd1aad','Code Question for Python operators',3,'',27,11),(6,'2025-04-22 18:03:53.628656','d43bf423-050f-4a69-9f77-3ba21ceb2b17','Code Question for Python file handling',3,'',27,11),(7,'2025-04-22 18:03:53.628656','cd614778-e285-4bd2-b918-47f8e8479b79','Code Question for Introduction to Python',3,'',27,11),(8,'2025-04-22 18:03:53.628656','ca23e163-0270-44fd-9233-8c7382459061','Code Question for Python while loops',3,'',27,11),(9,'2025-04-22 18:03:53.628656','b2aa131b-4f50-4a10-9e10-c553c5543839','Code Question for Python file handling',3,'',27,11),(10,'2025-04-22 18:03:53.628656','a393975e-2de2-4299-92ed-c252b7edecc7','Code Question for Python functions',3,'',27,11),(11,'2025-04-22 18:03:53.628656','94a769c5-721e-49a9-8d51-aa3d8e1d160e','Code Question for Python math',3,'',27,11),(12,'2025-04-22 18:03:53.628656','841c6e0d-4001-4b6a-9537-c2ed89002c8a','Code Question for Python arrays',3,'',27,11),(13,'2025-04-22 18:03:53.628656','6395577e-4384-4e89-80ac-b3c70ae7b6d7','Code Question for Python sets',3,'',27,11),(14,'2025-04-22 18:03:53.628656','5f94301a-507c-49c3-a0bb-70c4061ff889','Code Question for Python tuples',3,'',27,11),(15,'2025-04-22 18:03:53.628656','5bbca596-e832-4287-b02a-226ffd00e45f','Code Question for Python dictionaries',3,'',27,11),(16,'2025-04-22 18:03:53.628656','4fad1703-37d8-49d3-a68a-536781521c7a','Code Question for Python dictionaries',3,'',27,11),(17,'2025-04-22 18:03:53.628656','4ef474eb-89af-4f12-8c53-eff981534e43','Code Question for Python math',3,'',27,11),(18,'2025-04-22 18:03:53.628656','4d39804b-4669-4b2c-937b-07cedf4ccbea','Code Question for Python if-else statements',3,'',27,11),(19,'2025-04-22 18:03:53.628656','418517c7-e2f5-4d18-80fa-404699c43ef4','Code Question for Python if-else statements',3,'',27,11),(20,'2025-04-22 18:03:53.628656','38d31258-0358-4e08-a6b9-63cf6a22ac7c','Code Question for Python operators',3,'',27,11),(21,'2025-04-22 18:03:53.628656','29e13c52-e2c3-4503-a183-dd69978c6deb','Code Question for Python lists',3,'',27,11),(22,'2025-04-22 18:03:53.628656','24e3ac41-a5ea-419c-90dd-e70e0701250f','Code Question for Python lists',3,'',27,11),(23,'2025-04-22 18:03:53.628656','22b631dd-ecd1-4939-b2bb-8c9989dd40da','Code Question for Python datatypes',3,'',27,11),(24,'2025-04-22 18:03:53.628656','21df74d4-706d-4c6d-a134-c1362cedfac7','Code Question for Python variables',3,'',27,11),(25,'2025-04-22 18:03:53.628656','19c9ca38-f8c9-4d73-a2b6-691dbd2b0762','Code Question for Python datatypes',3,'',27,11),(26,'2025-04-22 18:03:53.628656','13e92907-b4eb-4fba-9041-893a782124d2','Code Question for Python tuples',3,'',27,11),(27,'2025-04-22 18:03:53.628656','0fa60294-908e-49f3-8d27-7301733e160b','Code Question for Python sets',3,'',27,11),(28,'2025-04-22 18:03:53.628656','0369fdd0-f9f6-4557-bd92-ee06e53597a9','Code Question for Python functions',3,'',27,11),(29,'2025-04-22 18:08:38.380182','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Introduction to Python',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(30,'2025-04-22 18:29:54.236989','14e14699-6442-43c8-98bd-c679041f768e','Code Question for Python if-else statements',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\"]}}]',27,11),(31,'2025-05-09 05:37:20.827014','1','Learn Content for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Transcript\"]}}]',22,11),(32,'2025-05-09 06:15:21.490812','55ac3980-3665-40a5-9e0f-2cd950f06b67','Code Question for Python அறிமுகம்',1,'[{\"added\": {}}]',27,11),(33,'2025-05-09 06:57:04.561145','2fb0babd-066c-4c2b-a753-584f1db578d4','MCQ Question 1 for Python அறிமுகம்',2,'[]',23,11),(34,'2025-05-09 07:13:20.637631','55ac3980-3665-40a5-9e0f-2cd950f06b67','Code Question for Python அறிமுகம்',3,'',27,11),(35,'2025-05-14 06:19:06.342109','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Hint\"]}}]',27,11),(36,'2025-05-14 06:19:26.003567','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Example code\"]}}]',27,11),(37,'2025-05-14 07:17:27.182318','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',2,'[]',27,11),(38,'2025-05-14 07:26:19.355751','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',1,'[{\"added\": {}}]',27,11),(39,'2025-05-14 10:35:09.779121','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(40,'2025-05-14 11:26:57.102998','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(41,'2025-05-14 14:11:14.800811','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(42,'2025-05-14 14:12:14.138229','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Example code\"]}}]',27,11),(43,'2025-05-15 05:51:04.944272','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(44,'2025-05-15 05:51:18.057091','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[]',27,11),(45,'2025-05-15 06:02:44.094486','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(46,'2025-05-15 06:11:01.066692','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(47,'2025-05-15 06:15:01.433224','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\"]}}]',27,11),(48,'2025-05-15 06:15:39.472282','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Example code\", \"Hint\"]}}]',27,11),(49,'2025-05-15 06:16:30.589096','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(50,'2025-05-15 06:17:38.200496','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(51,'2025-05-16 05:46:11.966338','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(52,'2025-05-16 05:46:37.426452','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Hint\"]}}]',27,11),(53,'2025-05-16 05:47:34.642912','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Example code\"]}}]',27,11),(54,'2025-05-16 05:48:07.142946','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[]',27,11),(55,'2025-05-16 05:48:21.626385','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Example code\"]}}]',27,11),(56,'2025-05-16 06:11:37.584857','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Example code\"]}}]',27,11),(57,'2025-05-16 06:12:52.178258','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(58,'2025-05-20 08:48:57.040457','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Example code\", \"Hint\"]}}]',27,11),(59,'2025-05-20 08:51:47.578239','04d6157b-d702-4a58-835e-cd0e54da33de','Code Question for Python அறிமுகம்',3,'',27,11),(60,'2025-05-21 04:05:05.620216','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Question\", \"Hint\", \"Video url\"]}}]',27,11),(61,'2025-05-21 04:09:01.434938','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Example code\", \"Hint\"]}}]',27,11),(62,'2025-05-21 04:14:11.887663','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Hint\"]}}]',27,11),(63,'2025-05-21 04:14:38.113115','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Hint\"]}}]',27,11),(64,'2025-05-21 04:19:17.638161','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[]',27,11),(65,'2025-05-21 04:38:16.487642','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Hint\"]}}]',27,11),(66,'2025-05-21 04:40:11.906580','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[]',27,11),(67,'2025-05-21 08:00:21.387643','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Hint\"]}}]',27,11),(68,'2025-05-21 08:43:55.365514','52aad1e4-ab0e-4c75-bfdc-b4ef694defde','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Hint\"]}}]',27,11),(69,'2025-05-21 08:48:55.032935','5afc2518-7982-4dc4-8749-7930b6930c0c','Code Question for Python அறிமுகம்',1,'[{\"added\": {}}]',27,11),(70,'2025-05-21 08:49:59.318955','5afc2518-7982-4dc4-8749-7930b6930c0c','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Hint\"]}}]',27,11),(71,'2025-05-21 08:52:17.479897','5afc2518-7982-4dc4-8749-7930b6930c0c','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Hint\"]}}]',27,11),(72,'2025-05-21 08:52:57.648411','5afc2518-7982-4dc4-8749-7930b6930c0c','Code Question for Python அறிமுகம்',2,'[{\"changed\": {\"fields\": [\"Video url\"]}}]',27,11);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(8,'code_practice','codesubmission'),(9,'code_practice','exercise'),(10,'code_practice','exercisesubmission'),(7,'contact','contactmessage'),(4,'contenttypes','contenttype'),(27,'learn','codequestion'),(22,'learn','learncontent'),(23,'learn','mcqquestion'),(26,'learn','milestone'),(28,'learn','personalizedexercise'),(25,'learn','usercodeanswer'),(29,'learn','usermcqanswer'),(24,'learn','userprogress'),(15,'lesson','codequestion'),(18,'lesson','exercise'),(21,'lesson','exercisequestion'),(13,'lesson','learncontent'),(14,'lesson','milestone'),(16,'lesson','personalizedexercise'),(17,'lesson','usercodeanswer'),(20,'lesson','userexercise'),(19,'lesson','userprogress'),(5,'sessions','session'),(11,'token_blacklist','blacklistedtoken'),(12,'token_blacklist','outstandingtoken'),(6,'user','user');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-04-04 04:36:56.670499'),(2,'contenttypes','0002_remove_content_type_name','2025-04-04 04:36:56.950981'),(3,'auth','0001_initial','2025-04-04 04:36:57.773578'),(4,'auth','0002_alter_permission_name_max_length','2025-04-04 04:36:57.963692'),(5,'auth','0003_alter_user_email_max_length','2025-04-04 04:36:57.986038'),(6,'auth','0004_alter_user_username_opts','2025-04-04 04:36:58.009048'),(7,'auth','0005_alter_user_last_login_null','2025-04-04 04:36:58.038938'),(8,'auth','0006_require_contenttypes_0002','2025-04-04 04:36:58.046877'),(9,'auth','0007_alter_validators_add_error_messages','2025-04-04 04:36:58.073910'),(10,'auth','0008_alter_user_username_max_length','2025-04-04 04:36:58.203459'),(11,'auth','0009_alter_user_last_name_max_length','2025-04-04 04:36:58.229430'),(12,'auth','0010_alter_group_name_max_length','2025-04-04 04:36:58.292226'),(13,'auth','0011_update_proxy_permissions','2025-04-04 04:36:58.321147'),(14,'auth','0012_alter_user_first_name_max_length','2025-04-04 04:36:58.343963'),(15,'user','0001_initial','2025-04-04 04:36:59.377565'),(16,'admin','0001_initial','2025-04-04 04:36:59.798264'),(17,'admin','0002_logentry_remove_auto_add','2025-04-04 04:36:59.832160'),(18,'admin','0003_logentry_add_action_flag_choices','2025-04-04 04:36:59.867109'),(19,'code_practice','0001_initial','2025-04-04 04:37:00.015786'),(20,'code_practice','0002_initial','2025-04-04 04:37:00.655234'),(21,'contact','0001_initial','2025-04-04 04:37:00.712722'),(22,'sessions','0001_initial','2025-04-04 04:37:00.795647'),(23,'token_blacklist','0001_initial','2025-04-15 16:49:33.311357'),(24,'token_blacklist','0002_outstandingtoken_jti_hex','2025-04-15 16:49:33.480589'),(25,'token_blacklist','0003_auto_20171017_2007','2025-04-15 16:49:33.513054'),(26,'token_blacklist','0004_auto_20171017_2013','2025-04-15 16:49:33.707817'),(27,'token_blacklist','0005_remove_outstandingtoken_jti','2025-04-15 16:49:33.804940'),(28,'token_blacklist','0006_auto_20171017_2113','2025-04-15 16:49:33.868934'),(29,'token_blacklist','0007_auto_20171017_2214','2025-04-15 16:49:34.358831'),(30,'token_blacklist','0008_migrate_to_bigautofield','2025-04-15 16:49:34.722330'),(31,'token_blacklist','0010_fix_migrate_to_bigautofield','2025-04-15 16:49:34.737256'),(32,'token_blacklist','0011_linearizes_history','2025-04-15 16:49:34.740772'),(33,'token_blacklist','0012_alter_outstandingtoken_user','2025-04-15 16:49:34.752744'),(35,'lesson','0001_initial','2025-04-17 06:02:37.582359'),(40,'learn','0001_initial','2025-04-22 16:56:40.224498'),(41,'learn','0002_codequestion_audio_url_codequestion_video_url_and_more','2025-05-20 05:53:19.858822');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('h5fy6q036byazgub6kqgf60cs0n84771','.eJxVjMEOwiAQRP-FsyEslQU8evcbyMKCVA1NSnsy_rtt0oOeJpn3Zt4i0LrUsPY8h5HFRQCI028ZKT1z2wk_qN0nmaa2zGOUuyIP2uVt4vy6Hu7fQaVet7VXzAXAOlPimTSmLfUAKaJBb8kO0WJJSMpS0ojKZOUdG4DiLHt24vMFBwQ34w:1uHaVd:CZ0Zi60cIAMEdpIhSaf0_krIyWh1ncyT5KUiOnLJcjI','2025-06-04 03:52:49.310420'),('p08932d9r9mhi1pkn6hzk4q0k3r7ce79','.eJxVjMEOwiAQRP-FsyEslQU8evcbyMKCVA1NSnsy_rtt0oOeJpn3Zt4i0LrUsPY8h5HFRQCI028ZKT1z2wk_qN0nmaa2zGOUuyIP2uVt4vy6Hu7fQaVet7VXzAXAOlPimTSmLfUAKaJBb8kO0WJJSMpS0ojKZOUdG4DiLHt24vMFBwQ34w:1u5LPT:1GTapBc4j8EW1POWJuE7NTmIKg0SZQ47zNiXmIYvDk4','2025-05-01 09:19:51.758888'),('ubcgmonx9z07cl0260xvc1wkoh5akudm','.eJxVjMEOwiAQRP-FsyEslQU8evcbyMKCVA1NSnsy_rtt0oOeJpn3Zt4i0LrUsPY8h5HFRQCI028ZKT1z2wk_qN0nmaa2zGOUuyIP2uVt4vy6Hu7fQaVet7VXzAXAOlPimTSmLfUAKaJBb8kO0WJJSMpS0ojKZOUdG4DiLHt24vMFBwQ34w:1uHIct:gvP_dYN3dG9VGLEuwgWh9ZzgmLbBgojsAzmeOrIN_h4','2025-06-03 08:47:07.197122'),('upiua7slt2x0s4a7g5e8hshfkjktuyja','.eJxVjMEOwiAQRP-FsyEslQU8evcbyMKCVA1NSnsy_rtt0oOeJpn3Zt4i0LrUsPY8h5HFRQCI028ZKT1z2wk_qN0nmaa2zGOUuyIP2uVt4vy6Hu7fQaVet7VXzAXAOlPimTSmLfUAKaJBb8kO0WJJSMpS0ojKZOUdG4DiLHt24vMFBwQ34w:1u5g6p:DPEvAloTl1HXlbEMrgYgiGASYOd5QgZ8BnaT_4zJp-A','2025-05-02 07:25:59.716434'),('x43gipkgkldwhbjnjqbq3qy2tjhu0vvj','.eJxVjMEOwiAQRP-FsyEslQU8evcbyMKCVA1NSnsy_rtt0oOeJpn3Zt4i0LrUsPY8h5HFRQCI028ZKT1z2wk_qN0nmaa2zGOUuyIP2uVt4vy6Hu7fQaVet7VXzAXAOlPimTSmLfUAKaJBb8kO0WJJSMpS0ojKZOUdG4DiLHt24vMFBwQ34w:1uHaVe:UiEA51nVb18x8VlGR9h6fCP8tdUoEPuTKI_63MeiWFc','2025-06-04 03:52:50.011147'),('zner3d8n7bw0b80rad0yg8bbf1b76vox','.eJxVjMEOwiAQRP-FsyEslQU8evcbyMKCVA1NSnsy_rtt0oOeJpn3Zt4i0LrUsPY8h5HFRQCI028ZKT1z2wk_qN0nmaa2zGOUuyIP2uVt4vy6Hu7fQaVet7VXzAXAOlPimTSmLfUAKaJBb8kO0WJJSMpS0ojKZOUdG4DiLHt24vMFBwQ34w:1uDGPI:2h-ir9Ck5f0-qEuFtnLhpjiEf0RmDRguWgATld02oEc','2025-05-23 05:36:24.715515');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_codequestion`
--

DROP TABLE IF EXISTS `learn_codequestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_codequestion` (
  `id` char(32) NOT NULL,
  `question` longtext NOT NULL,
  `example_code` longtext NOT NULL,
  `hint` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `milestone_id` char(32) NOT NULL,
  `audio_url` varchar(200) DEFAULT NULL,
  `video_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `learn_codequestion_milestone_id_93cca760_fk_learn_milestone_id` (`milestone_id`),
  CONSTRAINT `learn_codequestion_milestone_id_93cca760_fk_learn_milestone_id` FOREIGN KEY (`milestone_id`) REFERENCES `learn_milestone` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_codequestion`
--

LOCK TABLES `learn_codequestion` WRITE;
/*!40000 ALTER TABLE `learn_codequestion` DISABLE KEYS */;
INSERT INTO `learn_codequestion` VALUES ('09194cba00af497bb4ed50db34204c10','Declare a string, a number, and a boolean in Python.','name = \'Alice\'\nage = 25\nis_student = True','Use quotes for strings, digits for numbers, and True/False for booleans.','2025-04-22 18:04:31.090429','2025-04-22 18:04:31.090429','ee2c489277bf42e39297ed70e08301e7',NULL,NULL),('14e14699644243c898bdc679041f768e','Check whether 10 is even or odd.','num = 10\r\nif num % 2 == 0:\r\n    print(\'Even\')\r\nelse:\r\n    print(\'Odd\')','Use modulo operator (%) and if-else block.','2025-04-22 18:04:31.115363','2025-04-22 18:29:54.127607','b23dd51a271a4db0a240081f5ab61a1c',NULL,NULL),('22c86dcc932f4f999c59b83c4735afc1','Add an item to a list and print the updated list.','fruits = [\'apple\', \'banana\']\nfruits.append(\'cherry\')\nprint(fruits)','Use append() method to add items to a list.','2025-04-22 18:04:31.261000','2025-04-22 18:04:31.261000','0d33a65f531441b3a7e1906403a59beb',NULL,NULL),('52aad1e4ab0e4c75bfdcb4ef694defde','“Welcome to Pywhiz Platform” என்ற வாக்கிய தொடரை Print செய்ய வேண்டும்.','','<p>Step1: Python Programmingல் ஒரு வாக்கியத்தை print செய்ய வேண்டும் என்றால் Print() என்ற சொல்லை பயன்படுத்த வேண்டும்.</p>\r\n<p>Step2: அதில் நாம் Print செய்ய வேண்டிய சொற்றொடரை \" \" இல் குறிப்பிட்டு Type செய்ய வேண்டும்.</p>\r\n<p>Step3: இதை அப்படியே <code>print(\"Welcome to Pywhiz Platform\")</code> Type செய்ய வேண்டும்.</p>','2025-05-14 07:26:19.309055','2025-05-21 08:43:55.262273','e00743878abf485c8347a42c369185af',NULL,'https://d3t4ndznqmxbjg.cloudfront.net/M01.mp4'),('5afc251879824dc487497930b6930c0c','உங்கள் பெயரையும் பாடசாலையின்  பெயரையும் \r\n“My Name is Ravi and I studied at Jaffna school” என்று print செய்ய  வேண்டும்.','','<p>Step1: Python Programmingல் ஒரு வாக்கியத்தை print செய்ய வேண்டும் என்றால் Print() என்ற சொல்லை பயன்படுத்த வேண்டும்.</p>\r\n<p>Step2: அதில் நாம் Print செய்ய வேண்டிய சொற்றொடரை \" \" இல் குறிப்பிட்டு Type செய்ய வேண்டும்.</p>\r\n<p>Step3: இதை அப்படியே Type செய்ய வேண்டும், பெயர் மற்றும் பாடசாலை வரும் இடங்களில் உங்கள் பெயர் , பாடசாலைகளின் பெயரை மாற்றவும்.  <code>print(\"My Name is Ravi and I studied at Jaffna school\")</code> Type செய்ய வேண்டும்.</p>','2025-05-21 08:48:54.930812','2025-05-21 08:52:57.643835','e00743878abf485c8347a42c369185af',NULL,'https://d3t4ndznqmxbjg.cloudfront.net/M04.mp4'),('5f4a80848b8345b2af14a97fe741b66b','Create an array of 5 numbers and print them.','arr = [1, 2, 3, 4, 5]\nprint(arr)','Use list syntax [ ] to create an array.','2025-04-22 18:04:31.197234','2025-04-22 18:04:31.197234','57eedc1f3c8e458a88ca3e0c6cf69f5c',NULL,NULL),('6b19982808a54129afb1a06c1766d7b1','Write to a file named \'data.txt\' and then read it.','with open(\'data.txt\', \'w\') as f:\n    f.write(\'Hello!\')\n\nwith open(\'data.txt\', \'r\') as f:\n    print(f.read())','Use \'with open\' for file handling and specify mode \'w\' or \'r\'.','2025-04-22 18:04:31.372206','2025-04-22 18:04:31.372206','d23bf3beb7da42fa9329751773fb98e6',NULL,NULL),('789d57d73bbf40f789ea8619b909b648','Use the math module to find the square root of 16.','import math\nprint(math.sqrt(16))','Import math and use sqrt() function.','2025-04-22 18:04:31.240058','2025-04-22 18:04:31.240058','d28bd4a96f084ab892bf7301b239aa79',NULL,NULL),('894bd1468def4d23b1073e9282c2db3e','Print numbers from 1 to 5 using a while loop.','i = 1\nwhile i <= 5:\n    print(i)\n    i += 1','Use while loop with a condition and increment the variable.','2025-04-22 18:04:31.155260','2025-04-22 18:04:31.155260','edba4af15be34b699f63ef03e7fa8f35',NULL,NULL),('954498d676d4462ea8f49f232c3dc802','Create a tuple with 3 elements and print the second element.','my_tuple = (10, 20, 30)\nprint(my_tuple[1])','Use parentheses ( ) to create a tuple and indexing to access elements.','2025-04-22 18:04:31.281448','2025-04-22 18:04:31.281448','09c8be65488a4201a1d6f6e1a3a799ec',NULL,NULL),('9b2d79aa1d804dbfa95728816bc7eaac','Write a function to return the square of a number.','def square(n):\n    return n * n','Use def keyword to define a function.','2025-04-22 18:04:31.175237','2025-04-22 18:04:31.175237','b85e483035584b31b9e0bee17deb2fbc',NULL,NULL),('a55715068d884abc8cdce6122ae232e4','Write a program to multiply two numbers and print the result.','x = 4\ny = 5\nprint(x * y)','Use \'*\' operator for multiplication.','2025-04-22 18:04:31.104394','2025-04-22 18:04:31.104394','9b11753ef2e049f19ee3c15151a78306',NULL,NULL),('b57d650c0e214300b0f973f572808a0b','Create a set with 3 numbers and add one more.','nums = {1, 2, 3}\nnums.add(4)\nprint(nums)','Use add() method to insert into a set.','2025-04-22 18:04:31.306379','2025-04-22 18:04:31.306379','7b63e87b547e42d49a8d5ac3776bf00a',NULL,NULL),('e479ee7292f749ab9502498886ac3d6a','Print numbers from 1 to 5 using a for loop.','for i in range(1, 6):\n    print(i)','Use range(start, end) and a for loop.','2025-04-22 18:04:31.141333','2025-04-22 18:04:31.141333','0f19b352a97a45a8bc305aa0d8bb9a10',NULL,NULL),('e50500ce1a72482eb77f828b99e8bcc1','Create two variables and print their sum.','a = 5\nb = 10\nprint(a + b)','Use \'+\' operator to add numeric variables.','2025-04-22 18:04:31.065547','2025-04-22 18:04:31.065547','693cb583dd804334804acebc99f47a04',NULL,NULL),('e62ee8869c1646589d54a3df35888d4a','Create a dictionary of a student with name and age, then print it.','student = {\'name\': \'Bob\', \'age\': 14}\nprint(student)','Use curly braces { } to define a dictionary.','2025-04-22 18:04:31.330312','2025-04-22 18:04:31.330312','624d19ec91704de988f79d6927434609',NULL,NULL);
/*!40000 ALTER TABLE `learn_codequestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_learncontent`
--

DROP TABLE IF EXISTS `learn_learncontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_learncontent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `video_url` varchar(200) NOT NULL,
  `audio_url` varchar(200) DEFAULT NULL,
  `transcript` longtext NOT NULL,
  `additional_resources` json NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `milestone_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `learn_learncontent_milestone_id_d91bc497_fk_learn_milestone_id` (`milestone_id`),
  CONSTRAINT `learn_learncontent_milestone_id_d91bc497_fk_learn_milestone_id` FOREIGN KEY (`milestone_id`) REFERENCES `learn_milestone` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_learncontent`
--

LOCK TABLES `learn_learncontent` WRITE;
/*!40000 ALTER TABLE `learn_learncontent` DISABLE KEYS */;
INSERT INTO `learn_learncontent` VALUES (1,'https://d3t4ndznqmxbjg.cloudfront.net/M01.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey young programmers. இப்போது நீங்கள் சாகசமான பயணத்திற்குத் தயாராகிவிட்டீர்கள்! அதுதான் உங்கள் python programming Journey.  இப்போது நாம் நமது பயணத்தின் மைல்கல் 1 இல் இருக்கிறோம். எனவே இந்த python பயணத்தில் நாம் மெதுவாகவும்  தெளிவாகவும்  அனைத்து python அடிப்படைக் கருத்துகளையும் கற்றுக்கொள்ளப் போகிறோம். நீங்கள் அறிமுக வீடியோவில் பார்த்தது போல், எங்கள் பணியைச் செய்ய கணினியுடன் தொடர்பு கொள்ள நமக்கு ஏதேனும் programming language தேவை. \r\n\r\nநான் ஜெர்மன் மொழியில் பேசினால் உங்களுக்கு ஜெர்மன் தெரியாததால் புரியாது. ஆனால் இப்போது உங்களுக்கு தமிழ் தெரியும் என்பதால் புரிகிறது.\r\nஅதேபோல், நாம் கணினியுடன் தொடர்பு கொள்ள விரும்பினால், கணினி புரிந்துகொள்ளக்கூடிய ஏதாவது  programming language மூலம்  தொடர்பு கொள்ள வேண்டும், அப்படி ஒரு  programming language தான்  python. நீங்கள் Programming இன் தொடக்க நிலையில் இருப்பதால், Programmingஐ கற்கத் தொடங்க python சிறந்த மொழிகளில் ஒன்றாகும். python கற்றுக்கொள்வது மிகவும் எளிது. python programming language உண்மையான python பாம்பைப் போலவே சக்தி வாய்ந்தது.  Python னைப் பயன்படுத்தி நாம் என்ன செய்ய முடியும்? நீங்கள்  பாடசாலை அல்லது உங்கள் தந்தையின் வணிகத்திற்கான Websiteஐ உருவாக்கலாம் நீங்கள் software உருவாக்கலாம், நீங்கள் விளையாட்டுகளை உருவாக்கலாம், நீங்கள் டிஜிட்டல் art உருவாக்கலாம் மற்றும் நீங்கள் AI உலகில் நுழைந்து AI உலகின் ராஜாவாகலாம்.  எதிர்காலம் அனைத்தும் AI மற்றும் சிக்கல்களைத் தீர்ப்பது பற்றியது. \r\n\r\nஅதற்கு முன் நீங்கள் ஒன்றைப் பற்றி கொஞ்சம் அறிந்திருக்க வேண்டும், ஆனால் பின்னர் நீங்கள் அனைத்து மைல்கற்களையும் முடித்தவுடன் இதை நன்கு புரிந்துகொண்டு நன்கு அறிந்திருக்க முடியும்? அது என்ன? அது தான் Syntax. Syntax என்றால் என்ன, அதிகம் கவலைப்பட ஒன்றுமில்லை, இது ஒரு இலக்கணம். ஒவ்வொரு programming language லும் நீங்கள் பின்பற்ற வேண்டிய சில வடிவங்களைப் போன்றது. பொதுவாக நீங்கள் உங்கள் சொந்த தாய்மொழியிலோ அல்லது வேறு சில மொழிகளிலோ இலக்கணம் மற்றும் வடிவங்களைப் பின்பற்றுகிறீர்கள். தமிழில் நாம் ஒரு வாக்கியத்தை உருவாக்கும் போது, ​​அதில் பெயர்ச்சொல் , வினைச்சொல் இருக்க வேண்டும். மொழிகளில் இலக்கணத்தை நாம்  மிகத் தெளிவாகப் பின்பற்றினால் தான்  செய்தியை சரியாகத் தெரிவிக்க முடியும் , இல்லையெனில் செய்தியை சரியாக பரிமாற முடியாது. இதேபோல் programming மொழிகளிலும் ஒவ்வொரு  syntax உள்ளது.\r\n நமது மனித மொழிகளைப் போலவே, python programming ன் இலக்கணத்தையும்  நாம் புரிந்து கொள்ள வேண்டும். \r\nஒவ்வொரு மைல்கல்லிலும் நாம் பல syntax ஐ கற்றுக்கொள்வோம், இறுதியாக நீங்கள் உங்கள் தாய்மொழி இலக்கணத்தைப் போலவே python syntax லும்   தேர்ச்சி பெறுவீர்கள்.மற்ற வீடியோக்களில் பிற கருத்துகளுடன் நம் பயணத்தைத் தொடர்வோம். அதுவரை கேட்டதற்கு நன்றி, சிந்தித்துப் புரிந்து கொள்ளுங்கள்.','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.203294','2025-05-09 05:37:20.822027','e00743878abf485c8347a42c369185af'),(2,'https://d3t4ndznqmxbjg.cloudfront.net/M02.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.312999','2025-04-22 17:36:39.563066','693cb583dd804334804acebc99f47a04'),(3,'https://d3t4ndznqmxbjg.cloudfront.net/M03.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.335939','2025-04-22 17:36:39.571252','ee2c489277bf42e39297ed70e08301e7'),(4,'https://d3t4ndznqmxbjg.cloudfront.net/M04.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.348608','2025-04-22 17:36:39.582224','9b11753ef2e049f19ee3c15151a78306'),(5,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.360610','2025-04-22 17:36:39.590909','b23dd51a271a4db0a240081f5ab61a1c'),(6,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.371547','2025-04-22 17:36:39.600227','0f19b352a97a45a8bc305aa0d8bb9a10'),(7,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.383414','2025-04-22 17:36:39.609166','edba4af15be34b699f63ef03e7fa8f35'),(8,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.543795','2025-04-22 17:36:39.618143','b85e483035584b31b9e0bee17deb2fbc'),(9,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.554770','2025-04-22 17:36:39.670644','57eedc1f3c8e458a88ca3e0c6cf69f5c'),(10,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.566733','2025-04-22 17:36:39.700990','d28bd4a96f084ab892bf7301b239aa79'),(11,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.580698','2025-04-22 17:36:39.708568','0d33a65f531441b3a7e1906403a59beb'),(12,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.591666','2025-04-22 17:36:39.718541','09c8be65488a4201a1d6f6e1a3a799ec'),(13,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.602637','2025-04-22 17:36:39.747730','7b63e87b547e42d49a8d5ac3776bf00a'),(14,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.613609','2025-04-22 17:36:39.755707','624d19ec91704de988f79d6927434609'),(15,'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4','https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3','Hey everyone! Welcome back to W3Schools!\nToday, we\'re diving into the wonderful world of Python!\nImagine if you could tell your computer\nexactly what to do\nin a language almost as simple as English.\nThat\'s Python!\nCreated by Guido van Rossum\nand released in 1991,\nPython has become one of the most popular\nprogramming languages in the world.\nWhat can Python do?\nWhether it\'s powering web applications,\ncreating software,\nsolving math problems,\nor even automating the boring stuff on your computer.\nPython is the go-to language for all that and more!\nWith Python, you can build web apps,\nautomate tasks, manage big data,\nand even connect to databases.\nIt\'s truly a Swiss Army knife of programming!\nWhy Python?\nSo, why Python?\nWell, it works on almost any device,\nfrom your Windows PC to a Raspberry Pi.\nIts simple syntax means you write less code and do more\nfast!\nPlus, it\'s super easy to learn and use.\nWhether you prefer procedural,\nobject-oriented, or even functional programming.\nPython\'s got you covered.\nIt adapts to your style,\nmaking it perfect for both quick projects\nand complex software systems.\nAnd whether you prefer coding in a simple text editor\nor a powerful IDE like PyCharm or Eclipse,\nPython supports all.\nPython is Readable\nPython\'s design focuses on readability.\nIt uses lines and spaces to organize code,\nunlike the curly brackets and semicolons\nyou see in many other languages.\nSimple Python Examples\nLet\'s try a quick example.\nIf we type print(\'Hello, World!\'),\nPython will greet us without any fuss.\nLet\'s see it in action.\nNow we add some simple calculations like 5 plus 5,\nand 10 times 2.\nNo problem for Python!\nThat\'s a wrap on our Python introduction!\nThanks for watching!\nLike and subscribe to get notified about our latest videos!\nFor more coding tips and tricks,\nkeep it locked right here on W3Schools.com!\nDon\'t forget to try out what you\'ve learned in our interactive editor.\nHappy coding!\n','{\"note\": \"Let\'s move to code practice of this milestone\"}','2025-04-22 17:01:28.625576','2025-04-22 17:36:39.765681','d23bf3beb7da42fa9329751773fb98e6');
/*!40000 ALTER TABLE `learn_learncontent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_mcqquestion`
--

DROP TABLE IF EXISTS `learn_mcqquestion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_mcqquestion` (
  `id` char(32) NOT NULL,
  `question_text` longtext NOT NULL,
  `options` json NOT NULL,
  `correct_answer` varchar(1) NOT NULL,
  `explanation` longtext NOT NULL,
  `order` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `milestone_id` char(32) NOT NULL,
  `audio_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learn_mcqquestion_milestone_id_order_c37a870e_uniq` (`milestone_id`,`order`),
  CONSTRAINT `learn_mcqquestion_milestone_id_25069897_fk_learn_milestone_id` FOREIGN KEY (`milestone_id`) REFERENCES `learn_milestone` (`id`),
  CONSTRAINT `learn_mcqquestion_chk_1` CHECK ((`order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_mcqquestion`
--

LOCK TABLES `learn_mcqquestion` WRITE;
/*!40000 ALTER TABLE `learn_mcqquestion` DISABLE KEYS */;
INSERT INTO `learn_mcqquestion` VALUES ('0de49510c5394f08b012c29c659ed58b','What is a tuple in Python?','{\"A\": \"A list of items\", \"B\": \"A dictionary\", \"C\": \"An unchangeable sequence\", \"D\": \"A function\"}','C','Tuples are like lists, but they cannot be changed (immutable).',12,'2025-04-22 17:00:44.148057','2025-04-22 17:00:44.148057','09c8be65488a4201a1d6f6e1a3a799ec',NULL),('2fb0babd066c4c2ba753584f1db578d4','What does the `print()` function do in Python?','{\"A\": \"Takes input from user\", \"B\": \"Prints text/output\", \"C\": \"Adds numbers\", \"D\": \"None of these\"}','B','The `print()` function displays the given message on the screen.',1,'2025-04-22 17:00:43.995547','2025-05-09 06:57:04.558154','e00743878abf485c8347a42c369185af',NULL),('5b601e7807d344d580f005fc1e745e5b','Which one is a correct way to create a Python array (list)?','{\"A\": \"[1, 2, 3]\", \"B\": \"(1, 2, 3)\", \"C\": \"{1, 2, 3}\", \"D\": \"<1, 2, 3>\"}','A','In Python, lists (arrays) are created using square brackets.',9,'2025-04-22 17:00:44.113149','2025-04-22 17:00:44.113149','57eedc1f3c8e458a88ca3e0c6cf69f5c',NULL),('83874fffbc7d4a7aad144ea3dd78680f','Which mode is used to write to a file in Python?','{\"A\": \"r\", \"B\": \"w\", \"C\": \"x\", \"D\": \"a\"}','B','The `\'w\'` mode opens a file for writing (overwrites if file exists).',15,'2025-04-22 17:00:44.182964','2025-04-22 17:00:44.182964','d23bf3beb7da42fa9329751773fb98e6',NULL),('8770af03cb114144b5eca4a503d1a902','Which statement is used to make a decision in Python?','{\"A\": \"match\", \"B\": \"else\", \"C\": \"if\", \"D\": \"while\"}','C','The `if` statement is used to check conditions.',5,'2025-04-22 17:00:44.062330','2025-04-22 17:00:44.062330','b23dd51a271a4db0a240081f5ab61a1c',NULL),('949fcdfcbb8f46f987c5b40591a11b94','Which keyword is used to define a function in Python?','{\"A\": \"define\", \"B\": \"func\", \"C\": \"def\", \"D\": \"function\"}','C','Python uses the `def` keyword to define functions.',8,'2025-04-22 17:00:44.101181','2025-04-22 17:00:44.101181','b85e483035584b31b9e0bee17deb2fbc',NULL),('a651bf126d55469492838cbac2d2bcbc','Which of these is a valid Python variable name?','{\"A\": \"2name\", \"B\": \"my-name\", \"C\": \"my_name\", \"D\": \"my name\"}','C','Variables must start with a letter or underscore and cannot have spaces or special characters except underscore.',2,'2025-04-22 17:00:44.017448','2025-04-22 17:00:44.017448','693cb583dd804334804acebc99f47a04',NULL),('a6c16999db04468da29a5aab32666ca8','What is the correct syntax for a dictionary?','{\"A\": \"[\\\"name\\\": \\\"Ali\\\"]\", \"B\": \"{\\\"name\\\": \\\"Ali\\\"}\", \"C\": \"(name: Ali)\", \"D\": \"<name = Ali>\"}','B','Dictionaries are created using curly braces `{}` with key-value pairs.',14,'2025-04-22 17:00:44.170000','2025-04-22 17:00:44.170000','624d19ec91704de988f79d6927434609',NULL),('c1d3d361484e484e8adcec9aaa23a100','What does `math.sqrt(25)` return?','{\"A\": \"125\", \"B\": \"5\", \"C\": \"25\", \"D\": \"Error\"}','B','The `sqrt` function returns the square root, so `math.sqrt(25)` is 5.',10,'2025-04-22 17:00:44.125118','2025-04-22 17:00:44.125118','d28bd4a96f084ab892bf7301b239aa79',NULL),('d1d2cfa0bdbe4bfda8f440d4a58b418a','Which method adds an item to a set?','{\"A\": \"append()\", \"B\": \"add()\", \"C\": \"insert()\", \"D\": \"extend()\"}','B','`add()` is used to insert a new item into a set.',13,'2025-04-22 17:00:44.158029','2025-04-22 17:00:44.158029','7b63e87b547e42d49a8d5ac3776bf00a',NULL),('d86ee29e00584fa497a82e20f498b5d0','What operator is used to divide numbers in Python?','{\"A\": \"*\", \"B\": \"-\", \"C\": \"/\", \"D\": \"+\"}','C','The \'/\' operator divides one number by another.',4,'2025-04-22 17:00:44.050361','2025-04-22 17:00:44.050361','9b11753ef2e049f19ee3c15151a78306',NULL),('e0a3f88ffb434bc79c62a63653dac39e','Which is a Boolean value in Python?','{\"A\": \"yes\", \"B\": \"True\", \"C\": \"maybe\", \"D\": \"none\"}','B','`True` and `False` are Boolean values in Python.',3,'2025-04-22 17:00:44.038391','2025-04-22 17:00:44.038391','ee2c489277bf42e39297ed70e08301e7',NULL),('e8b1794312dc4c60856a99654932d2cf','What is the output of this code? `i = 1\nwhile i < 4:\n  print(i)\n  i += 1`','{\"A\": \"1 2 3\", \"B\": \"1 2 3 4\", \"C\": \"0 1 2\", \"D\": \"Error\"}','A','The loop runs while `i` is less than 4, so it prints 1, 2, 3.',7,'2025-04-22 17:00:44.087219','2025-04-22 17:00:44.087219','edba4af15be34b699f63ef03e7fa8f35',NULL),('f8429d2a19e240b49de38a9c292844e4','How do you add an item to a list?','{\"A\": \"list.add()\", \"B\": \"list.insert()\", \"C\": \"list.append()\", \"D\": \"list.push()\"}','C','Use `append()` to add an item to the end of a list.',11,'2025-04-22 17:00:44.136088','2025-04-22 17:00:44.136088','0d33a65f531441b3a7e1906403a59beb',NULL),('fd629ac98db044cfaa447977502da4f8','Which keyword is used to start a for loop in Python?','{\"A\": \"loop\", \"B\": \"for\", \"C\": \"while\", \"D\": \"repeat\"}','B','Python uses `for` to start a for loop.',6,'2025-04-22 17:00:44.074971','2025-04-22 17:00:44.074971','0f19b352a97a45a8bc305aa0d8bb9a10',NULL);
/*!40000 ALTER TABLE `learn_mcqquestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_milestone`
--

DROP TABLE IF EXISTS `learn_milestone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_milestone` (
  `id` char(32) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` longtext NOT NULL,
  `order` int unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order` (`order`),
  CONSTRAINT `learn_milestone_chk_1` CHECK ((`order` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_milestone`
--

LOCK TABLES `learn_milestone` WRITE;
/*!40000 ALTER TABLE `learn_milestone` DISABLE KEYS */;
INSERT INTO `learn_milestone` VALUES ('09c8be65488a4201a1d6f6e1a3a799ec','Python tuples','Python tuples',12,1,'2025-04-22 16:58:27.850764','2025-04-22 16:58:27.850764'),('0d33a65f531441b3a7e1906403a59beb','Python lists','Python lists',11,1,'2025-04-22 16:58:27.843085','2025-04-22 16:58:27.843085'),('0f19b352a97a45a8bc305aa0d8bb9a10','Python if else statements','Python if else statements',6,1,'2025-04-22 16:58:27.790275','2025-04-22 16:58:27.790275'),('57eedc1f3c8e458a88ca3e0c6cf69f5c','Python arrays','Python arrays',9,1,'2025-04-22 16:58:27.816910','2025-04-22 16:58:27.816910'),('624d19ec91704de988f79d6927434609','Python dictionaries','Python dictionaries',14,1,'2025-04-22 16:58:27.868915','2025-04-22 16:58:27.868915'),('693cb583dd804334804acebc99f47a04','Python variables','Python variables',2,1,'2025-04-22 16:58:27.721568','2025-04-22 16:58:27.721568'),('7b63e87b547e42d49a8d5ac3776bf00a','Python sets','Python sets',13,1,'2025-04-22 16:58:27.859938','2025-04-22 16:58:27.859938'),('9b11753ef2e049f19ee3c15151a78306','Python Comparision Operators','Python Comparision Operators',4,1,'2025-04-22 16:58:27.773190','2025-04-22 16:58:27.773190'),('b23dd51a271a4db0a240081f5ab61a1c','Python Logical Operators','Python Logical Operators',5,1,'2025-04-22 16:58:27.781798','2025-04-22 16:58:27.781798'),('b85e483035584b31b9e0bee17deb2fbc','Python functions','Python functions',8,1,'2025-04-22 16:58:27.808227','2025-04-22 16:58:27.808227'),('d23bf3beb7da42fa9329751773fb98e6','Python file handling','Python file handling',15,1,'2025-04-22 16:58:27.878888','2025-04-22 16:58:27.878888'),('d28bd4a96f084ab892bf7301b239aa79','Python math','Python math',10,1,'2025-04-22 16:58:27.833916','2025-04-22 16:58:27.833916'),('e00743878abf485c8347a42c369185af','Python அறிமுகம்','Python அறிமுகம்',1,1,'2025-04-22 16:58:27.673047','2025-04-22 16:58:27.673047'),('edba4af15be34b699f63ef03e7fa8f35','Python while loops','Python while loops',7,1,'2025-04-22 16:58:27.798258','2025-04-22 16:58:27.798258'),('ee2c489277bf42e39297ed70e08301e7','Python Arithmetic Operators','Python Arithmetic Operators',3,1,'2025-04-22 16:58:27.763849','2025-04-22 16:58:27.763849');
/*!40000 ALTER TABLE `learn_milestone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_personalizedexercise`
--

DROP TABLE IF EXISTS `learn_personalizedexercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_personalizedexercise` (
  `id` char(32) NOT NULL,
  `question` longtext NOT NULL,
  `generated_code` longtext NOT NULL,
  `difficulty` varchar(20) NOT NULL,
  `output` longtext NOT NULL,
  `hints` longtext NOT NULL,
  `suggestions` longtext NOT NULL,
  `is_completed` tinyint(1) NOT NULL,
  `attempts` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `learn_personalizedexercise_user_id_e5454d68_fk_user_user_id` (`user_id`),
  CONSTRAINT `learn_personalizedexercise_user_id_e5454d68_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `learn_personalizedexercise_chk_1` CHECK ((`attempts` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_personalizedexercise`
--

LOCK TABLES `learn_personalizedexercise` WRITE;
/*!40000 ALTER TABLE `learn_personalizedexercise` DISABLE KEYS */;
INSERT INTO `learn_personalizedexercise` VALUES ('51097ed70c7540fe8126baa9f664909f','Write a Python program that simulates a traditional Sri Lankan game called \'Kotta Pora\'. In \'Kotta Pora\', two players take turns to remove either 1 or 2 stones from a pile of stones. The player who removes the last stone wins. Implement the game logic using Python and allow the user to play against the computer.','','medium','','- Think about how you can represent the pile of stones in your program.\n- Use loops to simulate the turns of the players.\n- Consider using functions to organize your code.','',0,0,'2025-05-15 11:08:33.624814','2025-05-15 11:08:33.624814',10),('51c3505c8f9d4ff3aef57bc70b203a55','Create a program to simulate a traditional Sri Lankan game of \'Kotta Pora\' (කොට්ට පෝරා) between two players. The game involves taking turns to throw a set of coins and counting the number of heads facing up. The player with the most heads wins.','{\'player1_coins\': [1, 0, 1, 1, 0], \'player2_coins\': [1, 1, 0, 0, 1], \'player1_heads\': 3, \'player2_heads\': 2, \'winner\': \'Player 1\'}','medium','','- Think about how you can represent a coin flip in your program.\n- Consider using loops to simulate multiple rounds of the game.\n- Keep track of the total number of heads for each player and determine the winner at the end.','',0,0,'2025-05-15 11:09:13.060441','2025-05-15 11:09:13.060441',10),('77f8205d6ec74092bad1c4777b252ed4','Write a program that calculates how many hoppers (Sri Lankan pancakes) you can make with 500g of flour if each hopper needs 50g of flour.','# Total amount of flour in grams\ntotal_flour = 500\n\n# Flour required per hopper in grams\nflour_per_hopper = 50\n\n# Calculate the number of hoppers\nnum_hoppers = total_flour // flour_per_hopper\n\n# Display the result\nprint(f\"You can make {num_hoppers} hoppers with {total_flour}g of flour.\")\n','easy','The program correctly calculates that you can make 10 hoppers with 500g of flour. It displays this information in a clear and understandable way.','','',1,1,'2025-04-23 03:43:46.169539','2025-04-23 03:45:50.142334',10),('c2ac9786216743268bb7aa524069e209','Write a Python program that simulates a traditional Sri Lankan game called \'Kana Mutti\' (කනා මුති). In this game, two players take turns to remove 1, 2, or 3 stones from a pile. The player who removes the last stone wins. Your program should allow two players to play the game by taking input for the number of stones removed each turn and should declare the winner.','Let\'s say there are 7 stones in the pile. Player 1 removes 3 stones, leaving 4. Player 2 removes 2 stones, leaving 2. Player 1 removes the last 2 stones and wins the game.','medium','','- Think about using a loop to alternate between player turns.\n- Consider keeping track of the number of stones remaining.','',0,0,'2025-05-15 11:07:29.331996','2025-05-15 11:07:29.331996',10),('d2e10f520f364d23983940021ee46abf','Write a Python program that calculates the total score of a cricket team. The program should take the runs scored by each player as input and sum them up to get the total score.','# Function to calculate total score\ndef calculate_total_score(runs):\n    total = sum(runs)\n    return total\n\n# Example input\nruns_scored = [50, 30, 40]\n\n# Calculate and display total score\ntotal_score = calculate_total_score(runs_scored)\nprint(\"Total Score:\", total_score)\n','easy','The code correctly calculates the total score of the cricket team based on the runs scored by each player.','','',1,1,'2025-04-23 03:23:18.756973','2025-04-23 03:24:58.926228',10),('e1a22d0e52b24316834cd682d5ac6d66','Create a simple program that helps a Sri Lankan student convert temperature from Celsius to Fahrenheit.','celsius_temp = float(input(\'Enter temperature in Celsius: \'))\nfahrenheit_temp = (celsius_temp * 9/5) + 32\nprint(\'Temperature in Fahrenheit:\', fahrenheit_temp)','easy','','- The formula to convert Celsius to Fahrenheit is: F = (C * 9/5) + 32\n- You can take the temperature in Celsius as input from the user','',0,0,'2025-04-25 09:34:36.308955','2025-04-25 09:34:36.308955',10),('f6337d1b4a794f70ba5e9d3c40a0525d','Write a Python program that simulates a popular Sri Lankan game called \'Kana Mutti\'. In this game, there are 10 coconut shells placed upside down. One of the coconut shells hides a small object, and the player has to guess which shell it is under. If the player guesses correctly, they win a prize!','','hard','','- Think about how you can represent the coconut shells and the hidden object in your code\n- Consider using randomization to hide the object under one of the shells','',0,0,'2025-05-15 11:05:19.773376','2025-05-15 11:05:19.773376',10);
/*!40000 ALTER TABLE `learn_personalizedexercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_usercodeanswer`
--

DROP TABLE IF EXISTS `learn_usercodeanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_usercodeanswer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_code` longtext NOT NULL,
  `output` longtext NOT NULL,
  `hints` longtext NOT NULL,
  `suggestions` longtext NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `attempts` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `question_id` char(32) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learn_usercodeanswer_user_id_question_id_c96f334a_uniq` (`user_id`,`question_id`),
  KEY `learn_usercodeanswer_question_id_1b22c42b_fk_learn_cod` (`question_id`),
  CONSTRAINT `learn_usercodeanswer_question_id_1b22c42b_fk_learn_cod` FOREIGN KEY (`question_id`) REFERENCES `learn_codequestion` (`id`),
  CONSTRAINT `learn_usercodeanswer_user_id_49091acc_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`),
  CONSTRAINT `learn_usercodeanswer_chk_1` CHECK ((`attempts` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_usercodeanswer`
--

LOCK TABLES `learn_usercodeanswer` WRITE;
/*!40000 ALTER TABLE `learn_usercodeanswer` DISABLE KEYS */;
INSERT INTO `learn_usercodeanswer` VALUES (4,'a = 5\nb = 10\nprint(a + b)','15','[]','[]',1,1,'2025-04-22 18:10:32.194988','2025-04-22 18:10:32.194988','e50500ce1a72482eb77f828b99e8bcc1',10),(5,'name = \'Alice\'\nage = 25\nis_student = True','Code executed successfully. The code correctly declares a string named \'name\' with the value \'Alice\', a number named \'age\' with the value 25, and a boolean named \'is_student\' with the value True.','[]','[]',1,1,'2025-04-22 18:12:43.445355','2025-04-22 18:23:49.699129','09194cba00af497bb4ed50db34204c10',10),(6,'x = 4\ny = 5\nprint(x * y)','The code correctly multiplies two numbers (4 and 5) and prints the result (20). There is no error in the code.','[]','[]',1,1,'2025-04-22 18:24:27.055793','2025-04-22 18:24:27.055793','a55715068d884abc8cdce6122ae232e4',10),(7,'num = 10\r\nif num % 2 == 0:\r\n    print(\'Even\')\r\nelse:\r\n    print(\'Odd\')','The code correctly determines whether the number 10 is even or odd. It calculates the remainder when dividing 10 by 2. Since the remainder is 0, it prints \'Even\'.','[]','[]',1,1,'2025-04-22 18:25:02.797438','2025-04-22 18:30:09.912312','14e14699644243c898bdc679041f768e',10),(8,'for i in range(1, 6):\n    print(i)','The code correctly prints numbers from 1 to 5 using a for loop.','[]','[]',1,1,'2025-04-22 18:31:40.882954','2025-04-22 18:31:40.882954','e479ee7292f749ab9502498886ac3d6a',10),(9,'i = 1\nwhile i <= 5:\n    print(i)\n    i += 1','The code correctly prints numbers from 1 to 5 using a while loop. The loop starts with i=1 and runs until i is less than or equal to 5, incrementing i in each iteration. The output shows the numbers 1 to 5 printed on separate lines.','[]','[]',1,1,'2025-04-22 18:32:19.346257','2025-04-22 18:32:19.346257','894bd1468def4d23b1073e9282c2db3e',10),(10,'def square(n):\n    return n * n','Code executed successfully. The function \'square\' takes a number \'n\' as input and returns the square of \'n\' by multiplying \'n\' with itself. The code seems correct and fulfills the requirement of returning the square of a number.','[]','[]',1,1,'2025-04-22 18:33:09.216906','2025-04-22 18:33:09.216906','9b2d79aa1d804dbfa95728816bc7eaac',10),(11,'arr = [1, 2, 3, 4, 5]\nprint(arr)','The code creates an array of 5 numbers [1, 2, 3, 4, 5] and then prints the array. The output will be [1, 2, 3, 4, 5]. The code correctly creates and prints the array of 5 numbers.','[]','[]',1,1,'2025-04-22 18:33:45.217135','2025-04-22 18:33:45.217135','5f4a80848b8345b2af14a97fe741b66b',10),(12,'import math\nprint(math.sqrt(16))','The code correctly uses the math module to find the square root of 16, which is 4.0.','[]','[]',1,1,'2025-04-22 18:34:20.630005','2025-04-22 18:34:20.630005','789d57d73bbf40f789ea8619b909b648',10),(13,'fruits = [\'apple\', \'banana\']\nfruits.append(\'cherry\')\nprint(fruits)','The code correctly adds the \'cherry\' item to the \'fruits\' list and then prints the updated list.','[]','[]',1,1,'2025-04-22 18:34:56.471483','2025-04-22 18:34:56.471483','22c86dcc932f4f999c59b83c4735afc1',10),(14,'my_tuple = (10, 20, 30)\nprint(my_tuple[1])','The code creates a tuple named \'my_tuple\' with elements (10, 20, 30) and prints the element at index 1, which is the second element. The output is correct and matches the expected value of 20.','[]','[]',1,1,'2025-04-22 18:35:35.543693','2025-04-22 18:35:35.543693','954498d676d4462ea8f49f232c3dc802',10),(15,'nums = {1, 2, 3}\nnums.add(4)\nprint(nums)','The code creates a set \'nums\' with elements 1, 2, and 3. It then adds the element 4 to the set and prints the updated set which now contains {1, 2, 3, 4}. The code correctly answers the question by adding one more number to the set.','[]','[]',1,1,'2025-04-22 18:36:35.087143','2025-04-22 18:36:35.087143','b57d650c0e214300b0f973f572808a0b',10),(16,'student = {\'name\': \'Bob\', \'age\': 14}\nprint(student)','The code correctly creates a dictionary with a student\'s name and age and then prints it.','[]','[]',1,1,'2025-04-22 18:37:19.767588','2025-04-22 18:37:19.767588','e62ee8869c1646589d54a3df35888d4a',10),(17,'with open(\'data.txt\', \'w\') as f:\n    f.write(\'Hello!\')\n\nwith open(\'data.txt\', \'r\') as f:\n    print(f.read())','குறியீடு வெற்றிகரமாக செயல்படுத்தப்பட்டது!\nOutput:\nHello!\n\nThe code writes the string \'Hello!\' to a file named \'data.txt\' and then reads the contents of the file. It successfully writes \'Hello!\' to the file and reads it back, printing \'Hello!\' as the output.','[]','[]',1,1,'2025-04-22 18:37:56.124816','2025-05-21 03:47:55.323586','6b19982808a54129afb1a06c1766d7b1',10),(24,'color = input(\'What is your favorite color? \')','குறியீடு வெற்றிகரமாக செயல்படுத்தப்பட்டது!\nOutput:\nWhat is your favorite color?\n\nThe code correctly asks the user for their favorite color using the input() function. The entered color is stored in the variable \'color\'. Since this code snippet does not include a print statement, it does not display the entered color or any message.','[]','[]',1,1,'2025-05-15 03:46:37.499433','2025-05-17 12:12:42.095410','52aad1e4ab0e4c75bfdcb4ef694defde',10),(37,'print(\"welcome to Pywhiz platform\")','குறியீடு வெற்றிகரமாக செயல்படுத்தப்பட்டது!\nOutput:\nwelcome to Pywhiz platform\n\nThe code correctly prints the sentence \'welcome to Pywhiz platform\', which matches the required sentence \'Welcome to Pywhiz Platform\'.','[]','[]',1,1,'2025-05-21 10:26:56.313106','2025-05-21 10:50:36.922929','52aad1e4ab0e4c75bfdcb4ef694defde',21),(38,'print(\"my name is garunya and I studied at vembadi girls high school\") ','குறியீடு வெற்றிகரமாக செயல்படுத்தப்பட்டது!\nOutput:\nmy name is garunya and I studied at vembadi girls high school\n\nThe code prints \'my name is garunya and I studied at vembadi girls high school\' instead of \'My Name is Ravi and I studied at Jaffna school\'. The question asked for a specific sentence to be printed which is not done in the provided code.','[]','தேவையான வாக்கியத்தை அச்சிட குறியீட்டை மாற்றவும் \'எனது பெயர் ரவி மற்றும் நான் யாஃப்னா பள்ளியில் படித்தேன்\'.',0,1,'2025-05-21 10:35:06.880540','2025-05-21 10:43:28.803450','5afc251879824dc487497930b6930c0c',21),(39,'a = 7\nb = 15\nprint(a + b)','குறியீடு வெற்றிகரமாக செயல்படுத்தப்பட்டது!\nOutput:\n22\n\nThe code correctly creates two variables \'a\' and \'b\' with values 7 and 15, respectively. It then prints their sum which is 22.','[]','[]',1,1,'2025-05-21 11:08:21.633594','2025-05-21 11:20:02.070829','e50500ce1a72482eb77f828b99e8bcc1',21),(40,'name = \'Alice\'\nage = 25\nis_student = True','குறியீடு வெற்றிகரமாக செயல்படுத்தப்பட்டது!\nThe code correctly declares a string named \'name\' with value \'Alice\', a number named \'age\' with value 25, and a boolean named \'is_student\' with value True.','[]','[]',1,1,'2025-05-21 11:35:46.275998','2025-05-21 11:35:46.275998','09194cba00af497bb4ed50db34204c10',21);
/*!40000 ALTER TABLE `learn_usercodeanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_usermcqanswer`
--

DROP TABLE IF EXISTS `learn_usermcqanswer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_usermcqanswer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `selected_option` varchar(1) NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `question_id` char(32) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learn_usermcqanswer_user_id_question_id_3df14c03_uniq` (`user_id`,`question_id`),
  KEY `learn_usermcqanswer_question_id_0d9ded86_fk_learn_mcqquestion_id` (`question_id`),
  CONSTRAINT `learn_usermcqanswer_question_id_0d9ded86_fk_learn_mcqquestion_id` FOREIGN KEY (`question_id`) REFERENCES `learn_mcqquestion` (`id`),
  CONSTRAINT `learn_usermcqanswer_user_id_2f4f739f_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_usermcqanswer`
--

LOCK TABLES `learn_usermcqanswer` WRITE;
/*!40000 ALTER TABLE `learn_usermcqanswer` DISABLE KEYS */;
INSERT INTO `learn_usermcqanswer` VALUES (2,'B',1,'2025-04-22 18:09:34.715859','2025-05-15 10:58:41.730671','2fb0babd066c4c2ba753584f1db578d4',10),(3,'C',1,'2025-04-22 18:10:44.359111','2025-04-22 18:10:44.359111','a651bf126d55469492838cbac2d2bcbc',10),(4,'B',1,'2025-04-22 18:23:59.461794','2025-04-22 18:23:59.461794','e0a3f88ffb434bc79c62a63653dac39e',10),(5,'C',1,'2025-04-22 18:24:35.119429','2025-04-22 18:24:35.119429','d86ee29e00584fa497a82e20f498b5d0',10),(6,'C',1,'2025-04-22 18:31:11.573640','2025-04-22 18:31:11.573640','8770af03cb114144b5eca4a503d1a902',10),(7,'B',1,'2025-04-22 18:31:53.357804','2025-04-22 18:31:53.357804','fd629ac98db044cfaa447977502da4f8',10),(8,'A',1,'2025-04-22 18:32:41.173319','2025-04-22 18:32:41.173319','e8b1794312dc4c60856a99654932d2cf',10),(9,'C',1,'2025-04-22 18:33:19.630961','2025-04-22 18:33:19.630961','949fcdfcbb8f46f987c5b40591a11b94',10),(10,'A',1,'2025-04-22 18:33:55.384176','2025-04-22 18:33:55.384176','5b601e7807d344d580f005fc1e745e5b',10),(11,'B',1,'2025-04-22 18:34:31.342517','2025-04-22 18:34:31.342517','c1d3d361484e484e8adcec9aaa23a100',10),(12,'C',1,'2025-04-22 18:35:06.084761','2025-04-22 18:35:06.085788','f8429d2a19e240b49de38a9c292844e4',10),(13,'C',1,'2025-04-22 18:35:49.438384','2025-04-22 18:36:07.870115','0de49510c5394f08b012c29c659ed58b',10),(14,'B',1,'2025-04-22 18:36:47.573563','2025-04-22 18:36:53.994846','d1d2cfa0bdbe4bfda8f440d4a58b418a',10),(15,'B',1,'2025-04-22 18:37:30.051596','2025-04-22 18:37:30.051596','a6c16999db04468da29a5aab32666ca8',10),(16,'B',1,'2025-04-22 18:38:04.351768','2025-04-22 18:38:04.351768','83874fffbc7d4a7aad144ea3dd78680f',10),(21,'B',1,'2025-05-21 10:55:28.379069','2025-05-21 10:56:21.472306','2fb0babd066c4c2ba753584f1db578d4',21),(22,'C',1,'2025-05-21 11:22:21.628770','2025-05-21 11:22:21.628770','a651bf126d55469492838cbac2d2bcbc',21),(23,'B',1,'2025-05-21 11:37:06.403081','2025-05-21 11:37:06.403081','e0a3f88ffb434bc79c62a63653dac39e',21);
/*!40000 ALTER TABLE `learn_usermcqanswer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_userprogress`
--

DROP TABLE IF EXISTS `learn_userprogress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_userprogress` (
  `user_id` bigint NOT NULL,
  `score` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `current_milestone_id` char(32) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `learn_userprogress_current_milestone_id_b4546bf3_fk_learn_mil` (`current_milestone_id`),
  CONSTRAINT `learn_userprogress_current_milestone_id_b4546bf3_fk_learn_mil` FOREIGN KEY (`current_milestone_id`) REFERENCES `learn_milestone` (`id`),
  CONSTRAINT `learn_userprogress_user_id_29c73bb9_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_userprogress`
--

LOCK TABLES `learn_userprogress` WRITE;
/*!40000 ALTER TABLE `learn_userprogress` DISABLE KEYS */;
INSERT INTO `learn_userprogress` VALUES (10,815,'2025-04-22 17:38:02.035930','2025-05-21 03:47:55.451763','d23bf3beb7da42fa9329751773fb98e6'),(11,10,'2025-05-16 08:41:11.027383','2025-05-16 15:46:39.924329','e00743878abf485c8347a42c369185af'),(21,175,'2025-05-21 09:41:31.128144','2025-05-21 11:37:06.476482','9b11753ef2e049f19ee3c15151a78306'),(22,0,'2025-05-22 10:33:18.928505','2025-05-22 10:33:19.138622','e00743878abf485c8347a42c369185af');
/*!40000 ALTER TABLE `learn_userprogress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_userprogress_completed_code`
--

DROP TABLE IF EXISTS `learn_userprogress_completed_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_userprogress_completed_code` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userprogress_id` bigint NOT NULL,
  `milestone_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learn_userprogress_compl_userprogress_id_mileston_9edeca22_uniq` (`userprogress_id`,`milestone_id`),
  KEY `learn_userprogress_c_milestone_id_4020df12_fk_learn_mil` (`milestone_id`),
  CONSTRAINT `learn_userprogress_c_milestone_id_4020df12_fk_learn_mil` FOREIGN KEY (`milestone_id`) REFERENCES `learn_milestone` (`id`),
  CONSTRAINT `learn_userprogress_c_userprogress_id_29a9193a_fk_learn_use` FOREIGN KEY (`userprogress_id`) REFERENCES `learn_userprogress` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_userprogress_completed_code`
--

LOCK TABLES `learn_userprogress_completed_code` WRITE;
/*!40000 ALTER TABLE `learn_userprogress_completed_code` DISABLE KEYS */;
INSERT INTO `learn_userprogress_completed_code` VALUES (12,10,'09c8be65488a4201a1d6f6e1a3a799ec'),(11,10,'0d33a65f531441b3a7e1906403a59beb'),(6,10,'0f19b352a97a45a8bc305aa0d8bb9a10'),(9,10,'57eedc1f3c8e458a88ca3e0c6cf69f5c'),(14,10,'624d19ec91704de988f79d6927434609'),(2,10,'693cb583dd804334804acebc99f47a04'),(13,10,'7b63e87b547e42d49a8d5ac3776bf00a'),(4,10,'9b11753ef2e049f19ee3c15151a78306'),(5,10,'b23dd51a271a4db0a240081f5ab61a1c'),(8,10,'b85e483035584b31b9e0bee17deb2fbc'),(15,10,'d23bf3beb7da42fa9329751773fb98e6'),(10,10,'d28bd4a96f084ab892bf7301b239aa79'),(1,10,'e00743878abf485c8347a42c369185af'),(7,10,'edba4af15be34b699f63ef03e7fa8f35'),(3,10,'ee2c489277bf42e39297ed70e08301e7'),(74,11,'e00743878abf485c8347a42c369185af'),(112,21,'693cb583dd804334804acebc99f47a04'),(106,21,'e00743878abf485c8347a42c369185af'),(118,21,'ee2c489277bf42e39297ed70e08301e7');
/*!40000 ALTER TABLE `learn_userprogress_completed_code` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_userprogress_completed_exercises`
--

DROP TABLE IF EXISTS `learn_userprogress_completed_exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_userprogress_completed_exercises` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userprogress_id` bigint NOT NULL,
  `milestone_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learn_userprogress_compl_userprogress_id_mileston_44ac97e9_uniq` (`userprogress_id`,`milestone_id`),
  KEY `learn_userprogress_c_milestone_id_da0506dd_fk_learn_mil` (`milestone_id`),
  CONSTRAINT `learn_userprogress_c_milestone_id_da0506dd_fk_learn_mil` FOREIGN KEY (`milestone_id`) REFERENCES `learn_milestone` (`id`),
  CONSTRAINT `learn_userprogress_c_userprogress_id_39907480_fk_learn_use` FOREIGN KEY (`userprogress_id`) REFERENCES `learn_userprogress` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_userprogress_completed_exercises`
--

LOCK TABLES `learn_userprogress_completed_exercises` WRITE;
/*!40000 ALTER TABLE `learn_userprogress_completed_exercises` DISABLE KEYS */;
INSERT INTO `learn_userprogress_completed_exercises` VALUES (12,10,'09c8be65488a4201a1d6f6e1a3a799ec'),(11,10,'0d33a65f531441b3a7e1906403a59beb'),(6,10,'0f19b352a97a45a8bc305aa0d8bb9a10'),(9,10,'57eedc1f3c8e458a88ca3e0c6cf69f5c'),(14,10,'624d19ec91704de988f79d6927434609'),(2,10,'693cb583dd804334804acebc99f47a04'),(13,10,'7b63e87b547e42d49a8d5ac3776bf00a'),(4,10,'9b11753ef2e049f19ee3c15151a78306'),(5,10,'b23dd51a271a4db0a240081f5ab61a1c'),(8,10,'b85e483035584b31b9e0bee17deb2fbc'),(15,10,'d23bf3beb7da42fa9329751773fb98e6'),(10,10,'d28bd4a96f084ab892bf7301b239aa79'),(1,10,'e00743878abf485c8347a42c369185af'),(7,10,'edba4af15be34b699f63ef03e7fa8f35'),(3,10,'ee2c489277bf42e39297ed70e08301e7'),(21,21,'693cb583dd804334804acebc99f47a04'),(20,21,'e00743878abf485c8347a42c369185af'),(22,21,'ee2c489277bf42e39297ed70e08301e7');
/*!40000 ALTER TABLE `learn_userprogress_completed_exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_userprogress_completed_milestones`
--

DROP TABLE IF EXISTS `learn_userprogress_completed_milestones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_userprogress_completed_milestones` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userprogress_id` bigint NOT NULL,
  `milestone_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learn_userprogress_compl_userprogress_id_mileston_382a69ad_uniq` (`userprogress_id`,`milestone_id`),
  KEY `learn_userprogress_c_milestone_id_b2dc6020_fk_learn_mil` (`milestone_id`),
  CONSTRAINT `learn_userprogress_c_milestone_id_b2dc6020_fk_learn_mil` FOREIGN KEY (`milestone_id`) REFERENCES `learn_milestone` (`id`),
  CONSTRAINT `learn_userprogress_c_userprogress_id_4e16fd64_fk_learn_use` FOREIGN KEY (`userprogress_id`) REFERENCES `learn_userprogress` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_userprogress_completed_milestones`
--

LOCK TABLES `learn_userprogress_completed_milestones` WRITE;
/*!40000 ALTER TABLE `learn_userprogress_completed_milestones` DISABLE KEYS */;
INSERT INTO `learn_userprogress_completed_milestones` VALUES (13,10,'09c8be65488a4201a1d6f6e1a3a799ec'),(12,10,'0d33a65f531441b3a7e1906403a59beb'),(7,10,'0f19b352a97a45a8bc305aa0d8bb9a10'),(10,10,'57eedc1f3c8e458a88ca3e0c6cf69f5c'),(15,10,'624d19ec91704de988f79d6927434609'),(3,10,'693cb583dd804334804acebc99f47a04'),(14,10,'7b63e87b547e42d49a8d5ac3776bf00a'),(5,10,'9b11753ef2e049f19ee3c15151a78306'),(6,10,'b23dd51a271a4db0a240081f5ab61a1c'),(9,10,'b85e483035584b31b9e0bee17deb2fbc'),(16,10,'d23bf3beb7da42fa9329751773fb98e6'),(11,10,'d28bd4a96f084ab892bf7301b239aa79'),(2,10,'e00743878abf485c8347a42c369185af'),(8,10,'edba4af15be34b699f63ef03e7fa8f35'),(4,10,'ee2c489277bf42e39297ed70e08301e7'),(22,21,'693cb583dd804334804acebc99f47a04'),(21,21,'e00743878abf485c8347a42c369185af'),(23,21,'ee2c489277bf42e39297ed70e08301e7');
/*!40000 ALTER TABLE `learn_userprogress_completed_milestones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learn_userprogress_watched_videos`
--

DROP TABLE IF EXISTS `learn_userprogress_watched_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learn_userprogress_watched_videos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userprogress_id` bigint NOT NULL,
  `milestone_id` char(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learn_userprogress_watch_userprogress_id_mileston_21919544_uniq` (`userprogress_id`,`milestone_id`),
  KEY `learn_userprogress_w_milestone_id_62e72437_fk_learn_mil` (`milestone_id`),
  CONSTRAINT `learn_userprogress_w_milestone_id_62e72437_fk_learn_mil` FOREIGN KEY (`milestone_id`) REFERENCES `learn_milestone` (`id`),
  CONSTRAINT `learn_userprogress_w_userprogress_id_b936fff1_fk_learn_use` FOREIGN KEY (`userprogress_id`) REFERENCES `learn_userprogress` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learn_userprogress_watched_videos`
--

LOCK TABLES `learn_userprogress_watched_videos` WRITE;
/*!40000 ALTER TABLE `learn_userprogress_watched_videos` DISABLE KEYS */;
INSERT INTO `learn_userprogress_watched_videos` VALUES (12,10,'09c8be65488a4201a1d6f6e1a3a799ec'),(11,10,'0d33a65f531441b3a7e1906403a59beb'),(6,10,'0f19b352a97a45a8bc305aa0d8bb9a10'),(9,10,'57eedc1f3c8e458a88ca3e0c6cf69f5c'),(14,10,'624d19ec91704de988f79d6927434609'),(2,10,'693cb583dd804334804acebc99f47a04'),(13,10,'7b63e87b547e42d49a8d5ac3776bf00a'),(4,10,'9b11753ef2e049f19ee3c15151a78306'),(5,10,'b23dd51a271a4db0a240081f5ab61a1c'),(8,10,'b85e483035584b31b9e0bee17deb2fbc'),(15,10,'d23bf3beb7da42fa9329751773fb98e6'),(10,10,'d28bd4a96f084ab892bf7301b239aa79'),(1,10,'e00743878abf485c8347a42c369185af'),(7,10,'edba4af15be34b699f63ef03e7fa8f35'),(3,10,'ee2c489277bf42e39297ed70e08301e7'),(27,21,'693cb583dd804334804acebc99f47a04'),(26,21,'e00743878abf485c8347a42c369185af'),(28,21,'ee2c489277bf42e39297ed70e08301e7');
/*!40000 ALTER TABLE `learn_userprogress_watched_videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_blacklistedtoken`
--

DROP TABLE IF EXISTS `token_blacklist_blacklistedtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_blacklistedtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `blacklisted_at` datetime(6) NOT NULL,
  `token_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_id` (`token_id`),
  CONSTRAINT `token_blacklist_blacklistedtoken_token_id_3cc7fe56_fk` FOREIGN KEY (`token_id`) REFERENCES `token_blacklist_outstandingtoken` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_blacklistedtoken`
--

LOCK TABLES `token_blacklist_blacklistedtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_blacklistedtoken` VALUES (3,'2025-05-15 03:40:46.151498',70);
/*!40000 ALTER TABLE `token_blacklist_blacklistedtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_blacklist_outstandingtoken`
--

DROP TABLE IF EXISTS `token_blacklist_outstandingtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_blacklist_outstandingtoken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `jti` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_blacklist_outstandingtoken_jti_hex_d9bdf6f7_uniq` (`jti`),
  KEY `token_blacklist_outs_user_id_83bc629a_fk_user_user` (`user_id`),
  CONSTRAINT `token_blacklist_outs_user_id_83bc629a_fk_user_user` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_blacklist_outstandingtoken`
--

LOCK TABLES `token_blacklist_outstandingtoken` WRITE;
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` DISABLE KEYS */;
INSERT INTO `token_blacklist_outstandingtoken` VALUES (3,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTM3MTY5MCwiaWF0IjoxNzQ0NzY2ODkwLCJqdGkiOiJkNDkwMTdiZjcwYmY0YjlkOGM1MmNiODVlOTM1NGFjYyIsInVzZXJfaWQiOjEwfQ.YvnmQSv0g5sOQux31y8xNAG_NStrR_VJb3z201T6klE','2025-04-16 01:28:10.561782','2025-04-23 01:28:10.000000',10,'d49017bf70bf4b9d8c52cb85e9354acc'),(4,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTM3OTEzOSwiaWF0IjoxNzQ0Nzc0MzM5LCJqdGkiOiIzMDdjNzYyODFkMDM0MWVjYWNjNTA4YTQyYTYzMmE3NyIsInVzZXJfaWQiOjEwfQ.YchNpqcye4alHcyJ0HfGUU056ZOX6SGwWx6THuFU_-k','2025-04-16 03:32:19.190928','2025-04-23 03:32:19.000000',10,'307c76281d0341ecacc508a42a632a77'),(5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTM3OTE3NSwiaWF0IjoxNzQ0Nzc0Mzc1LCJqdGkiOiJjMDNlMGVlYjI1YmU0YWUxOGQzYWQxMGJhYjBiNjAwOCIsInVzZXJfaWQiOjEwfQ.LIuA50FbrKye1Pa54ZYrML60sGWaSXV4C7FXyFlk9MM','2025-04-16 03:32:55.605973','2025-04-23 03:32:55.000000',10,'c03e0eeb25be4ae18d3ad10bab0b6008'),(6,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTM3OTUwMSwiaWF0IjoxNzQ0Nzc0NzAxLCJqdGkiOiIxNmRmNDQ5NzEwZDI0YzkwYjRmMjkwMjk2N2IwYzU5ZiIsInVzZXJfaWQiOjEwfQ.5BUGgyCA_ZbhQIQzS7OAbJEKb2q01Lm1Tn2vo49RTFU','2025-04-16 03:38:21.639324','2025-04-23 03:38:21.000000',10,'16df449710d24c90b4f2902967b0c59f'),(7,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTM5MTIxNywiaWF0IjoxNzQ0Nzg2NDE3LCJqdGkiOiI2NTE0ODI2Y2NlMzc0MDA4Yjk0NTY4MmYzYjUyMTcyNyIsInVzZXJfaWQiOjEwfQ.EqzuY3xO5-WUoghdm-vS8B0cTMlzFLhCaNPsq2jT_K8','2025-04-16 06:53:37.136773','2025-04-23 06:53:37.000000',10,'6514826cce374008b945682f3b521727'),(8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTM5NjYyNCwiaWF0IjoxNzQ0NzkxODI0LCJqdGkiOiJiNTY0NDhmMDNjNmI0Nzk0OTUxNWVjMTg1OGQ2NWY1YiIsInVzZXJfaWQiOjEwfQ.YNx3EpCtUAv8_1QyC-WYV_QqVRFDJDi7SiTOh6Hx3VI','2025-04-16 08:23:44.446782','2025-04-23 08:23:44.000000',10,'b56448f03c6b47949515ec1858d65f5b'),(9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTQwNjkyNSwiaWF0IjoxNzQ0ODAyMTI1LCJqdGkiOiIyM2UxNDE2ZTZiOTA0ODFmYTQwM2ViZTY0NzIzMWU1ZCIsInVzZXJfaWQiOjEwfQ.Q2CjvYZLOmSzMUa3yRsRCSOzHsFRSrjVeNGcmw_Sjx8','2025-04-16 11:15:25.523225','2025-04-23 11:15:25.000000',10,'23e1416e6b90481fa403ebe647231e5d'),(11,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTU3MjIwMSwiaWF0IjoxNzQ0OTY3NDAxLCJqdGkiOiJhM2JjZWExOWZmNmI0MDU3YmFiZmNkOGU0ZWJhMzIyOCIsInVzZXJfaWQiOjEwfQ.G6uRtvfUVhTLvi2z7HwY1LVYqcnrdjnpPj9y-sr3Awo','2025-04-18 09:10:01.858095','2025-04-25 09:10:01.000000',10,'a3bcea19ff6b4057babfcd8e4eba3228'),(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTU3NDg1OCwiaWF0IjoxNzQ0OTcwMDU4LCJqdGkiOiI3YjAzYzAzNjFkZDg0ODJjYTk0YjJiYWI3MGU4N2M5NCIsInVzZXJfaWQiOjEwfQ.-lBAliEDzl3ZQO0flCA1z0UdtVe6RmVEb2Yw46idnQ4','2025-04-18 09:54:18.106538','2025-04-25 09:54:18.000000',10,'7b03c0361dd8482ca94b2bab70e87c94'),(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTU5OTUyNywiaWF0IjoxNzQ0OTk0NzI3LCJqdGkiOiI2NGMzZjAyZDZhZmM0N2ExYWI0NWQ2NjVjZmYxYWYwMSIsInVzZXJfaWQiOjEwfQ.TjhiceAzPlECLSgvKnNiuIvciQCAPaQILD879l1K-Vw','2025-04-18 16:45:27.445155','2025-04-25 16:45:27.000000',10,'64c3f02d6afc47a1ab45d665cff1af01'),(16,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTYyOTg2OSwiaWF0IjoxNzQ1MDI1MDY5LCJqdGkiOiJiY2Y2NjJkMmYyNjc0MGIwOWIwM2UxYmQ4OTVkMzBlZCIsInVzZXJfaWQiOjEwfQ.bYsJxXHDnU7a_MhQPltVRkyABL-Ch3S3-47pycZAqVE','2025-04-19 01:11:09.769262','2025-04-26 01:11:09.000000',10,'bcf662d2f26740b09b03e1bd895d30ed'),(17,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTY2NjIzNiwiaWF0IjoxNzQ1MDYxNDM2LCJqdGkiOiI5MTYzOWQ3YjBkN2E0YzNmODQxNjVkZWJmN2ZiYTAxYyIsInVzZXJfaWQiOjEwfQ._XI7YWtxkapYqJOOumNjbKK_74ulfPpgq4ZvSripeGg','2025-04-19 11:17:16.956153','2025-04-26 11:17:16.000000',10,'91639d7b0d7a4c3f84165debf7fba01c'),(18,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTY2NjM1OSwiaWF0IjoxNzQ1MDYxNTU5LCJqdGkiOiIxZmI4N2YxN2Q5MjQ0MGNjOTFlNTY3MGIxZWQwOTlhOSIsInVzZXJfaWQiOjEwfQ.jzULQN0M7jbfGWMHwXOIcRu2V64kebJuZTU7jpMtawA','2025-04-19 11:19:19.956673','2025-04-26 11:19:19.000000',10,'1fb87f17d92440cc91e5670b1ed099a9'),(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTY2NzkxOCwiaWF0IjoxNzQ1MDYzMTE4LCJqdGkiOiI4NjZhOWU1ZDM0ODI0NDg4YWRkYzIyZTYzNDY5YjZhNyIsInVzZXJfaWQiOjEwfQ.tJJ6RKivtgP3yh4nc75tV9A0D2Jo9avYaoCgk_pUol8','2025-04-19 11:45:18.870752','2025-04-26 11:45:18.000000',10,'866a9e5d34824488addc22e63469b6a7'),(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTY3MTQwMCwiaWF0IjoxNzQ1MDY2NjAwLCJqdGkiOiI0N2VmODVjMmRiNGI0YzlmYTEzMmI2MmMxNWI1YWZiOCIsInVzZXJfaWQiOjEwfQ.2ntm2VAhtux1uZVuU7Wv2_KaVBPCI-SbSW2epD028cY','2025-04-19 12:43:20.819582','2025-04-26 12:43:20.000000',10,'47ef85c2db4b4c9fa132b62c15b5afb8'),(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTgzNDI2OSwiaWF0IjoxNzQ1MjI5NDY5LCJqdGkiOiI3MmRlOTcxMTVjODA0MzJmYjNlY2EzYjc3ZTZkY2ZhYSIsInVzZXJfaWQiOjEwfQ.6Tg0rN3xDxbq9Kgcxmi2VSkxOX4BuW-jAHXx970j3GM','2025-04-21 09:57:49.402304','2025-04-28 09:57:49.000000',10,'72de97115c80432fb3eca3b77e6dcfaa'),(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTkxNTAzOSwiaWF0IjoxNzQ1MzEwMjM5LCJqdGkiOiJiM2QwN2E0MGI1NTY0YzEyYTI4YjllM2E1YWIwOThlYiIsInVzZXJfaWQiOjEwfQ.xMZOYvlsB24E09YeqWNeBIh8JeVRsqisJTBl7WEbbs8','2025-04-22 08:23:59.102074','2025-04-29 08:23:59.000000',10,'b3d07a40b5564c12a28b9e3a5ab098eb'),(31,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTkxNTE1MiwiaWF0IjoxNzQ1MzEwMzUyLCJqdGkiOiI3MGNmNTcyMmZmNzg0Zjg0YjEyNmUyZTg1MDQxNjNmNSIsInVzZXJfaWQiOjEwfQ.vO8P5krwMEwxnvQb2_BqeGeggv3ynTT60_RtSszX47Y','2025-04-22 08:25:52.448772','2025-04-29 08:25:52.000000',10,'70cf5722ff784f84b126e2e8504163f5'),(32,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTkxNTIzNiwiaWF0IjoxNzQ1MzEwNDM2LCJqdGkiOiJjY2ExNmNmYTAxYTk0NzUxOGI5NjA5YTVlNGU3NTQxYiIsInVzZXJfaWQiOjEwfQ.LLQQb96Uts_p0pTadWhGJG271MMydlzCaWZg4CxuX-E','2025-04-22 08:27:16.531081','2025-04-29 08:27:16.000000',10,'cca16cfa01a947518b9609a5e4e7541b'),(36,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTk4MTk5MCwiaWF0IjoxNzQ1Mzc3MTkwLCJqdGkiOiJmMTAzYzMzNmUyMjE0ZDIxOWM5M2Q1NjgzNGJhNjJjNiIsInVzZXJfaWQiOjEwfQ.zDfskjGMoQjRL70PJx0feCbtgWGyRpwR1CGSoTQRWgQ','2025-04-23 02:59:50.907755','2025-04-30 02:59:50.000000',10,'f103c336e2214d219c93d56834ba62c6'),(37,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NTk5OTUzNCwiaWF0IjoxNzQ1Mzk0NzM0LCJqdGkiOiI5NDFjMmU1ODdjNTg0ZTZmYTU0Zjc4MjY5MzM5ZDdiYyIsInVzZXJfaWQiOjEwfQ.-cl4LBFltoL-dpehblR4OOERHnEG9QJmE9BO1KyD-HE','2025-04-23 07:52:14.252919','2025-04-30 07:52:14.000000',10,'941c2e587c584e6fa54f78269339d7bc'),(39,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjE3NzYzNiwiaWF0IjoxNzQ1NTcyODM2LCJqdGkiOiIwNjdjZmZjNDA1Y2M0NjM4YjA1Y2YyNzM3ZjUzOGZhZSIsInVzZXJfaWQiOjEwfQ.GrfaP54StmpJYnAOUh5KLLSN8HZ0dONfLiWeGh-sf4c','2025-04-25 09:20:36.120497','2025-05-02 09:20:36.000000',10,'067cffc405cc4638b05cf2737f538fae'),(40,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjE3ODM0MCwiaWF0IjoxNzQ1NTczNTQwLCJqdGkiOiJjMTVkM2M0NjcxYWE0ZjRlYmJlODEwM2I4ZWRjMGU1ZiIsInVzZXJfaWQiOjEwfQ.jLZ8q3BGaCNwMjTfyp6_23EDYcmGP5zd6De-34s-V6E','2025-04-25 09:32:20.006333','2025-05-02 09:32:20.000000',10,'c15d3c4671aa4f4ebbe8103b8edc0e5f'),(41,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NjYwODE0NCwiaWF0IjoxNzQ2MDAzMzQ0LCJqdGkiOiI4MGI0ZDMyMzY2Yjk0MDlhYWUyOWQ0MzNmNGFjYzAxMSIsInVzZXJfaWQiOjEwfQ.akH2TaA2aMO027jRrPm6Dm8-1t02WkftO02-2BtofdI','2025-04-30 08:55:44.786978','2025-05-07 08:55:44.000000',10,'80b4d32366b9409aae29d433f4acc011'),(42,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Njc4MDk5OCwiaWF0IjoxNzQ2MTc2MTk4LCJqdGkiOiI2YjA3NDFjYjJlMzk0MTlkOTcyMDlhYjhiMmY4NjM4YiIsInVzZXJfaWQiOjEwfQ.fe3YQy8mz4gf--6JRxXzpRD2mhOvD_ogXR9Nf7bSeOo','2025-05-02 08:56:38.786442','2025-05-09 08:56:38.000000',10,'6b0741cb2e39419d97209ab8b2f8638b'),(43,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Njc4OTAxNSwiaWF0IjoxNzQ2MTg0MjE1LCJqdGkiOiJjZDI3YTBhYjI2NmU0ZDc2Yjc2YzBjNGQyMmFiZGFlZiIsInVzZXJfaWQiOjEwfQ.EDn2WuPrJvceenYA953ku9c-YfHnXLQP177Fn4LrTpk','2025-05-02 11:10:15.461080','2025-05-09 11:10:15.000000',10,'cd27a0ab266e4d76b76c0c4d22abdaef'),(44,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzAzMjMzNywiaWF0IjoxNzQ2NDI3NTM3LCJqdGkiOiI4YzBkODdiOTAzMzU0NWRlOGFlMDlkYmUwMzI2NzBkMSIsInVzZXJfaWQiOjEwfQ.GGk8Ad_Caas9PVkiXpa3rMj_0QrYEwMSnt27d4sR9HI','2025-05-05 06:45:37.440150','2025-05-12 06:45:37.000000',10,'8c0d87b9033545de8ae09dbe032670d1'),(45,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzAzOTEyMSwiaWF0IjoxNzQ2NDM0MzIxLCJqdGkiOiJjODk3ZDBkZDQ5YWU0MDQxODVhNWI2YWYyMjk4NTNlOSIsInVzZXJfaWQiOjEwfQ.RfItJMFRtPNteYEJu-i-WnM4X5AcPnGAfOHvdQankVE','2025-05-05 08:38:41.851092','2025-05-12 08:38:41.000000',10,'c897d0dd49ae404185a5b6af229853e9'),(46,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzE5MzUyNCwiaWF0IjoxNzQ2NTg4NzI0LCJqdGkiOiI5NDNlZDJkYzU3YWI0OTVkOGE3ZjI4ZThhMmIxNDA3ZiIsInVzZXJfaWQiOjEwfQ.YrsIGZVgKYKeCOTNsIFhqitthkXMhmCfBnSiDAqhlmU','2025-05-07 03:32:04.389871','2025-05-14 03:32:04.000000',10,'943ed2dc57ab495d8a7f28e8a2b1407f'),(47,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzM3MDgwMSwiaWF0IjoxNzQ2NzY2MDAxLCJqdGkiOiJmN2M2ODc0NmVjOGM0MzM0YmNlODNlZjJhMmU1NWYyOCIsInVzZXJfaWQiOjEwfQ.O7kUml2XIdXf8feTjCuJb0SWHqG4NDNMJf8aGx_m7pE','2025-05-09 04:46:41.536081','2025-05-16 04:46:41.000000',10,'f7c68746ec8c4334bce83ef2a2e55f28'),(51,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzM3ODQ5OSwiaWF0IjoxNzQ2NzczNjk5LCJqdGkiOiIwYTMzMmNmYmE3NmI0NmMzYTM1ZWRlNDk5M2UwNzA4MCIsInVzZXJfaWQiOjEwfQ.f5l9A3UixnnHdktas7P21HUjng33fPtX4unkfVBT2d4','2025-05-09 06:54:59.510427','2025-05-16 06:54:59.000000',10,'0a332cfba76b46c3a35ede4993e07080'),(53,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzM4MjUxMiwiaWF0IjoxNzQ2Nzc3NzEyLCJqdGkiOiJkMGFjMzEyMTNmOTk0Njk1OWYwODMwZDliNGEyOTk4MSIsInVzZXJfaWQiOjEwfQ.2yHLIlAK9Hp7uc3f7qML_z0cEztFsM_5z1pWiiUB2n0','2025-05-09 08:01:52.178378','2025-05-16 08:01:52.000000',10,'d0ac31213f9946959f0830d9b4a29981'),(57,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzM5MjAxNCwiaWF0IjoxNzQ2Nzg3MjE0LCJqdGkiOiI4N2MzZjFjNDE2Yjg0MjE2OWY5OWUyMDQzZDMzMGU1NyIsInVzZXJfaWQiOjEwfQ.mANLXWEogtR8KduDwJaB2p3o2Dmsgo6EZpK4jBaLKuk','2025-05-09 10:40:14.793628','2025-05-16 10:40:14.000000',10,'87c3f1c416b842169f99e2043d330e57'),(60,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzM5NDIzMiwiaWF0IjoxNzQ2Nzg5NDMyLCJqdGkiOiIxYjY5MWU2NDZjYWY0ZDY1OTU5MTgyNTA0MjNkMzAyNCIsInVzZXJfaWQiOjEwfQ.lXw36LQEku2SJ9ncy2In_6QeJnFfjt0YCL-ldv6jx44','2025-05-09 11:17:12.051183','2025-05-16 11:17:12.000000',10,'1b691e646caf4d6595918250423d3024'),(61,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzM5NDQxMCwiaWF0IjoxNzQ2Nzg5NjEwLCJqdGkiOiIwZmY0ZjhiMTk5ZDk0NTU1ODJlZmY2ZGJjZDFkMzVjYiIsInVzZXJfaWQiOjEwfQ.pPnz-7-nOef72bZjKgi47UpzQg7tC3syDAMc7wNbYV8','2025-05-09 11:20:10.988945','2025-05-16 11:20:10.000000',10,'0ff4f8b199d9455582eff6dbcd1d35cb'),(62,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzQ4NDkyNCwiaWF0IjoxNzQ2ODgwMTI0LCJqdGkiOiIwODM1YWNiNDIyZjk0NzI2OTI3Nzg2ODVhOGNjNDA0MCIsInVzZXJfaWQiOjEwfQ.PJfpRGn5aHmZ-_DtegHmKewL2PIx_DUn4MfubCewAJs','2025-05-10 12:28:44.482977','2025-05-17 12:28:44.000000',10,'0835acb422f9472692778685a8cc4040'),(63,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzgwMDcyMiwiaWF0IjoxNzQ3MTk1OTIyLCJqdGkiOiI0YzAzYzhmNjRjYjY0YTc2YWYyZDIwNTY2OTJiYjA3ZiIsInVzZXJfaWQiOjEwfQ.PzLogduPDg1OgJNa-8pBEyc3zNHsMUJCT1RAUJl5GKU','2025-05-14 04:12:02.771389','2025-05-21 04:12:02.000000',10,'4c03c8f64cb64a76af2d2056692bb07f'),(64,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzgxMTQzNiwiaWF0IjoxNzQ3MjA2NjM2LCJqdGkiOiI2MDU5NjYwYjgxNjI0MDQ4YmJmZGRiNzhhMzJiZWZiOSIsInVzZXJfaWQiOjEwfQ.nXEbT1zXFWaPHpTPwFSpwbtl5K4gt49LfgOlvdYBD_0','2025-05-14 07:10:36.954064','2025-05-21 07:10:36.000000',10,'6059660b81624048bbfddb78a32befb9'),(68,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzgyNDAwMCwiaWF0IjoxNzQ3MjE5MjAwLCJqdGkiOiI4NDNkZTg1NjI0N2Q0MzhlYTVjMzFmNzM1ODkyMjBjMSIsInVzZXJfaWQiOjEwfQ.uml1DnbVcEo1yU85JG0_ghBkLZGeZ4iACCeptHJwRnM','2025-05-14 10:40:00.805537','2025-05-21 10:40:00.000000',10,'843de856247d438ea5c31f73589220c1'),(70,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzg4NDg5NSwiaWF0IjoxNzQ3MjgwMDk1LCJqdGkiOiI1Njc4NGI5NWYyN2I0MGJjODM2MmMzYmNhZmQ1NTgyZSIsInVzZXJfaWQiOjEwfQ.HNSwLOd0_5up-w6PSrpc8Sfuml-hIzw2SnwvnSgVjkc','2025-05-15 03:34:55.422250','2025-05-22 03:34:55.000000',10,'56784b95f27b40bc8362c3bcafd5582e'),(71,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzg4NTI0NSwiaWF0IjoxNzQ3MjgwNDQ1LCJqdGkiOiJjNWZlYWZjYmYyOWM0NWEyYmQ2MTk1YjczZDRlMDYxYiIsInVzZXJfaWQiOjEwLCJlbWFpbCI6InNpdmFzb3J1YnlrYW5hcGF0aGlwaWxsYWlAZ21haWwuY29tIiwidXNlcm5hbWUiOiJTaXZhc29ydWJ5In0.t3-j0Ah2uIl0q8LMjO0MguuXjE1oEvmoCUZGTRhJEL0','2025-05-15 03:40:45.962008','2025-05-22 03:40:45.000000',10,'c5feafcbf29c45a2bd6195b73d4e061b'),(72,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzg4NTI0NiwiaWF0IjoxNzQ3MjgwNDQ2LCJqdGkiOiJlNTkzMzIwYjRkMDI0YTQ2ODhhMWNhMDFkZjAyNjMxMyIsInVzZXJfaWQiOjEwLCJlbWFpbCI6InNpdmFzb3J1YnlrYW5hcGF0aGlwaWxsYWlAZ21haWwuY29tIiwidXNlcm5hbWUiOiJTaXZhc29ydWJ5In0.XIcpsavmg2xtMfgr6HgMT1Qi7SdFwcYNPDwFC9Pub2I','2025-05-15 03:40:46.074924','2025-05-22 03:40:46.000000',10,'e593320b4d024a4688a1ca01df026313'),(73,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzg4NTUxMywiaWF0IjoxNzQ3MjgwNzEzLCJqdGkiOiJlMmVlYzdhYjVjODU0MmU0YWM5ODZlZjVmMjA5N2FiNSIsInVzZXJfaWQiOjEwfQ.YKVBn_Kq_ncjbeVzC6vVvJoSl9IAEdZe0OPo0aap-24','2025-05-15 03:45:13.153092','2025-05-22 03:45:13.000000',10,'e2eec7ab5c8542e4ac986ef5f2097ab5'),(74,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzg5MjAzNSwiaWF0IjoxNzQ3Mjg3MjM1LCJqdGkiOiJlMzAzNjBmMTM1NWE0MWEyOGU3MGFjNDU1NjVjM2E2ZSIsInVzZXJfaWQiOjEwfQ.G_E_0RMSCki-gLvhZ7PWCfTi_SxOWx9-BM5IpLp4GU0','2025-05-15 05:33:55.998663','2025-05-22 05:33:55.000000',10,'e30360f1355a41a28e70ac45565c3a6e'),(75,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzg5NDI4NSwiaWF0IjoxNzQ3Mjg5NDg1LCJqdGkiOiIyOWMzYjZkYWI3ZGU0MmEzOWYyNDFhNTNkYjcwOGJjNSIsInVzZXJfaWQiOjEwfQ.hbkMM3UWWFzjdNTKTBnECXhMM7j5K0AAJe7749tD2Lw','2025-05-15 06:11:25.269722','2025-05-22 06:11:25.000000',10,'29c3b6dab7de42a39f241a53db708bc5'),(76,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzkwNTA5MiwiaWF0IjoxNzQ3MzAwMjkyLCJqdGkiOiI1YWM4OTE4MDJiOTk0OGQxOTQ3ZjdkYjU0OTQ3Y2Q0ZCIsInVzZXJfaWQiOjEwfQ.QiVQjq1PF3D-QlKKvTJ7_n8aEVSMwMr-4gNwGym9c0Q','2025-05-15 09:11:32.536519','2025-05-22 09:11:32.000000',10,'5ac891802b9948d1947f7db54947cd4d'),(77,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzkwNjk4NywiaWF0IjoxNzQ3MzAyMTg3LCJqdGkiOiI5NDE3ZTEwNTU3MTQ0NmY4OTEwNDI5YjA5ZWM1ZTg3NSIsInVzZXJfaWQiOjEwfQ.80cV-hWJcgaFHZmo9K524pL9SKxFwlv3zSMjs-id79g','2025-05-15 09:43:07.209816','2025-05-22 09:43:07.000000',10,'9417e105571446f8910429b09ec5e875'),(78,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzkwODk5NywiaWF0IjoxNzQ3MzA0MTk3LCJqdGkiOiI5MjlhNzYyMjhkZWQ0OWRkOWE5YTljMmY3YTkxNzVhYyIsInVzZXJfaWQiOjEwfQ.nXGj7rmGrMkKL8rq-sojkeg9fn9bC84RqevqmOKjp_Q','2025-05-15 10:16:37.758358','2025-05-22 10:16:37.000000',10,'929a76228ded49dd9a9a9c2f7a9175ac'),(79,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzkxMDY2NiwiaWF0IjoxNzQ3MzA1ODY2LCJqdGkiOiJkOTM3Y2NkYTJmMzI0NmE0ODM3ZTBmY2Q0NGFlZDE0ZiIsInVzZXJfaWQiOjEwfQ.MKKXhAEOfcEaa3Wbd0CZC2L_X4hYnL5vQm_SV_O5ffQ','2025-05-15 10:44:26.293979','2025-05-22 10:44:26.000000',10,'d937ccda2f3246a4837e0fcd44aed14f'),(80,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzkxMDcyOCwiaWF0IjoxNzQ3MzA1OTI4LCJqdGkiOiI4OTBkZWExYjQ5ZTU0MDVjYjkxNjFlOTg0N2VmZmQwZiIsInVzZXJfaWQiOjEwfQ.to5xaibwQplb61vgjBhwAQeB3Yb6Txc_5mH0-bYJc2Y','2025-05-15 10:45:28.237491','2025-05-22 10:45:28.000000',10,'890dea1b49e5405cb9161e9847effd0f'),(82,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzkxMTg4NSwiaWF0IjoxNzQ3MzA3MDg1LCJqdGkiOiJiYTAxMzQzODNlNjE0NjcxYWI4MTVjYjQ0ZWIwYWM1ZCIsInVzZXJfaWQiOjEwfQ.IJNafvOk5bODQairlHjxcU6w9B8lZ-3ZNlJucD8XqKQ','2025-05-15 11:04:45.268963','2025-05-22 11:04:45.000000',10,'ba0134383e614671ab815cb44eb0ac5d'),(83,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzk3NjE5MiwiaWF0IjoxNzQ3MzcxMzkyLCJqdGkiOiIxZjAyMjFjZDEzOTc0ZjMyYmU5MzNhNjkyMjAyMGVlMyIsInVzZXJfaWQiOjEwfQ.Gxi_WdVQPl5DF3AeaVmLKGucYQaLZr-LeGjE99ogzrc','2025-05-16 04:56:32.968322','2025-05-23 04:56:32.000000',10,'1f0221cd13974f32be933a6922020ee3'),(84,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzk3OTc4NSwiaWF0IjoxNzQ3Mzc0OTg1LCJqdGkiOiIxZDE1MGNlMDM2NjY0YmFjOTRlZThkOGE2MmQxMzczMCIsInVzZXJfaWQiOjEwfQ.oUbA3I0VXJArz6DxfZOo46H_ftljDUsljqu-Zjb8zmk','2025-05-16 05:56:25.919416','2025-05-23 05:56:25.000000',10,'1d150ce036664bac94ee8d8a62d13730'),(86,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzk4NjA2NywiaWF0IjoxNzQ3MzgxMjY3LCJqdGkiOiIwODRiYmIwODgwZjc0YTExODBiODBmZmYyNGM4NWM0NiIsInVzZXJfaWQiOjEwfQ.MijSwd8rRR-eOPW0Lvxh0NQOCk0oLIXv7pgknLUJpgk','2025-05-16 07:41:07.277992','2025-05-23 07:41:07.000000',10,'084bbb0880f74a1180b80fff24c85c46'),(88,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0Nzk4OTY3MCwiaWF0IjoxNzQ3Mzg0ODcwLCJqdGkiOiIxYTBlN2I5ODA0NmQ0ZDg3OTAzOWI5NjVjMmVlMTg1YSIsInVzZXJfaWQiOjExfQ.bRkGppTR_p9MHL9FiXlmpkRq77SeIdliTN6yV0-fCQg','2025-05-16 08:41:10.743544','2025-05-23 08:41:10.000000',11,'1a0e7b98046d4d879039b965c2ee185a'),(89,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODA4ODYxMywiaWF0IjoxNzQ3NDgzODEzLCJqdGkiOiIyMjg4M2RkOTVkMTc0MDVhYTZjZDFkZjMzZjczYWYyZSIsInVzZXJfaWQiOjEwfQ.rck33Ukaj257VfO64wpsiEoEgN3wqja4qTb3EeCo6KM','2025-05-17 12:10:13.607969','2025-05-24 12:10:13.000000',10,'22883dd95d17405aa6cd1df33f73af2e'),(90,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODA4ODY4MSwiaWF0IjoxNzQ3NDgzODgxLCJqdGkiOiJlYWZhY2M4ZGJjYTM0N2Y0ODc4MjNmNmVkOTRkYTU1ZiIsInVzZXJfaWQiOjEwfQ.U5_9ri2RkLqQy9RJEtGBULw23NYDmNeKsKDQXZwXP0I','2025-05-17 12:11:21.844297','2025-05-24 12:11:21.000000',10,'eafacc8dbca347f487823f6ed94da55f'),(91,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODIzODgwMCwiaWF0IjoxNzQ3NjM0MDAwLCJqdGkiOiJlNTYxZmU1ZWIwODY0MjMzODE1NTQyMTFhNzZhY2UxZCIsInVzZXJfaWQiOjEwfQ.KcF0kHd6GQnxkQTf1TyQ7V3AwSHxrX7NVHtvgjA3qu4','2025-05-19 05:53:20.844247','2025-05-26 05:53:20.000000',10,'e561fe5eb086423381554211a76ace1d'),(92,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODI0MjQyNiwiaWF0IjoxNzQ3NjM3NjI2LCJqdGkiOiIxYjAzYTMyMDY5NTg0YjYyODQ0MTE4M2FjMmFiOWQ5YiIsInVzZXJfaWQiOjEwfQ.xiFF3u6Ugk2fxHFzZKfxFG_6mh8sTHiNnn3FNgk2taw','2025-05-19 06:53:46.150469','2025-05-26 06:53:46.000000',10,'1b03a32069584b628441183ac2ab9d9b'),(94,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODMyMTYyMiwiaWF0IjoxNzQ3NzE2ODIyLCJqdGkiOiI2Y2NmYTUxNTQxNWY0ZGZhODdkYzE1NzZiNGI3YTQ1OCIsInVzZXJfaWQiOjIxfQ.v2KIUeshT_8MjjVoPZV09IyugvMiQmPHxoFlbjUQNlE','2025-05-20 04:53:42.501963','2025-05-27 04:53:42.000000',21,'6ccfa515415f4dfa87dc1576b4b7a458'),(95,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODMyNTc5OSwiaWF0IjoxNzQ3NzIwOTk5LCJqdGkiOiI3MTc5YmVlNjA0OWY0OTg1YWZmZWI4ZjFmYTQ0YjI0MCIsInVzZXJfaWQiOjEwfQ.1Z6oVn9u9bnf9iZU4lD_wZT91xWM70Af3cnKIAqnti4','2025-05-20 06:03:19.356570','2025-05-27 06:03:19.000000',10,'7179bee6049f4985affeb8f1fa44b240'),(96,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODMzNTc2OCwiaWF0IjoxNzQ3NzMwOTY4LCJqdGkiOiJmNDFmYTMxMDhhMmU0ZWI0OWEzNjM4ZDc0YTM4YWE5ZSIsInVzZXJfaWQiOjIxfQ.VNxijMdVGgXqj3fSg4tZZjMVFlA4JYbieli5nLccU4U','2025-05-20 08:49:28.911406','2025-05-27 08:49:28.000000',21,'f41fa3108a2e4eb49a3638d74a38aa9e'),(97,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODM0NDQ2OSwiaWF0IjoxNzQ3NzM5NjY5LCJqdGkiOiI2YjliYzkwNTRmZjY0NjY4OGQ0YTM3MTA2M2ExZGI0MSIsInVzZXJfaWQiOjIxfQ.YdUZsPicT5Nfh5BcUYaXFEcMnr1IqZ8DISb3EgnFV2Y','2025-05-20 11:14:29.311546','2025-05-27 11:14:29.000000',21,'6b9bc9054ff646688d4a371063a1db41'),(98,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODM0NTUxMSwiaWF0IjoxNzQ3NzQwNzExLCJqdGkiOiI1ZTdkNzkwYTcwNmE0NWZkYTJjNzlhYzIzMDEyMGU3YiIsInVzZXJfaWQiOjIxfQ.DvCVsdynRGEv-BkdRUM9YUMgHwT-CCSptdwTcYAZjXc','2025-05-20 11:31:51.886045','2025-05-27 11:31:51.000000',21,'5e7d790a706a45fda2c79ac230120e7b'),(99,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODQwMTc5NSwiaWF0IjoxNzQ3Nzk2OTk1LCJqdGkiOiIyMzY3Nzk3Nzc0MDg0MGJiYjlkNTMxMjk1YmNlYWY3OSIsInVzZXJfaWQiOjIxfQ.ruIyxz5THvpJgP5f3h2E9y2oYoHn7g9BHlXoLuDkpxc','2025-05-21 03:09:55.960239','2025-05-28 03:09:55.000000',21,'23677977740840bbb9d531295bceaf79'),(100,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODQwNDA1MywiaWF0IjoxNzQ3Nzk5MjUzLCJqdGkiOiIzMDczODhmMWUxNDc0ODA3Yjk4YWQ5NWU2OWViZGE4MSIsInVzZXJfaWQiOjEwfQ.gRM1aqDMkNHHhqRchiuwbQ-Sc3F5TwKNGLf9QIGr5ko','2025-05-21 03:47:33.032190','2025-05-28 03:47:33.000000',10,'307388f1e1474807b98ad95e69ebda81'),(101,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODQwNDEwNiwiaWF0IjoxNzQ3Nzk5MzA2LCJqdGkiOiJlODJjMWNkYmM5MGE0OTE1OTM2NmU2ZjdmZGRmYTE3MCIsInVzZXJfaWQiOjIxfQ.-E35K090D8vxNT8WiZ9dEGCNSTB9Fn6Eo2l-RqNihbo','2025-05-21 03:48:26.574112','2025-05-28 03:48:26.000000',21,'e82c1cdbc90a49159366e6f7fddfa170'),(102,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODQxMjk1MiwiaWF0IjoxNzQ3ODA4MTUyLCJqdGkiOiI3ZDY5YmM5YzU3NGE0ZDcwYjE3OTc4NDhiMDZiMDRjNyIsInVzZXJfaWQiOjIxfQ.m7jdITxJX3eaM7DCWmNxFyIjhtHcLcNtQ17hDpAXoH8','2025-05-21 06:15:52.973423','2025-05-28 06:15:52.000000',21,'7d69bc9c574a4d70b1797848b06b04c7'),(103,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODQyNjIwMiwiaWF0IjoxNzQ3ODIxNDAyLCJqdGkiOiI4NzZmYzEzZjA3OTQ0YmVjYWVlOWM1ZWE2ODUxNDM2NCIsInVzZXJfaWQiOjIxfQ.AHUvp6Hu5d7ZAlwIm21RRJ6c5OeTcvwySgbDX6qFqNY','2025-05-21 09:56:42.493278','2025-05-28 09:56:42.000000',21,'876fc13f07944becaee9c5ea68514364'),(104,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODQ5MTUxNiwiaWF0IjoxNzQ3ODg2NzE2LCJqdGkiOiIyZmRhMzIwZjZjM2Q0ODk0OGNlYmU3OTVlMGU2ODAzYSIsInVzZXJfaWQiOjIxfQ.GyUf-uxsK6PVGP1EEvfxsFK2LLhRMGWuEe8gaEjB8Sw','2025-05-22 04:05:16.926970','2025-05-29 04:05:16.000000',21,'2fda320f6c3d48948cebe795e0e6803a'),(105,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxMzM3OSwiaWF0IjoxNzQ3OTA4NTc5LCJqdGkiOiI5Yzk1OTQxNmNkZDQ0MTE5YjU4NzZlNzRhMDk0OTc2ZCIsInVzZXJfaWQiOjIxfQ.Fch1mA0qi0qzHY6c8KAWhy43E-YY-fZSyguJJfm1My4','2025-05-22 10:09:39.223077','2025-05-29 10:09:39.000000',21,'9c959416cdd44119b5876e74a094976d'),(106,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxMzU5NSwiaWF0IjoxNzQ3OTA4Nzk1LCJqdGkiOiJmNmE4OTQwOTg1Mjc0M2E2OTdjNDQzN2Y0NjZmMmI4NSIsInVzZXJfaWQiOjIxfQ.ZkE9KhO0JD1uSITIramQ32Y-OC5Jq0JQSHnjxPBlosY','2025-05-22 10:13:15.900764','2025-05-29 10:13:15.000000',21,'f6a89409852743a697c4437f466f2b85'),(107,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxNDc5OCwiaWF0IjoxNzQ3OTA5OTk4LCJqdGkiOiJlMTUyMjI5MzU2OGI0NDkwODc3ZDA1YmI1NGY4ZDNhNCIsInVzZXJfaWQiOjIyfQ.2xIyGVa7zzTi7JGCuj1vFDCuZpsQubkImzBe6yVzzGs','2025-05-22 10:33:18.082498','2025-05-29 10:33:18.000000',22,'e1522293568b4490877d05bb54f8d3a4'),(108,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxNDg3NywiaWF0IjoxNzQ3OTEwMDc3LCJqdGkiOiI3NmUyZWFlMDc4NGU0ZjYwYmQ4MWY0M2Y4NDRhZWNhMyIsInVzZXJfaWQiOjIyfQ.EtwaOBTjc0WJblxGoyp1Ttu5kaNyv49lTzDjaxumwo0','2025-05-22 10:34:37.738242','2025-05-29 10:34:37.000000',22,'76e2eae0784e4f60bd81f43f844aeca3'),(109,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxNDkzNywiaWF0IjoxNzQ3OTEwMTM3LCJqdGkiOiJkNGUzZjQ1ZTNhODg0YjczOTViYTkxODc2ZjRiMGFhZiIsInVzZXJfaWQiOjIyfQ.s6ChttrnpPFk4g4E4l63ulSHkCh36Bf1vH--tfSk1DU','2025-05-22 10:35:37.262191','2025-05-29 10:35:37.000000',22,'d4e3f45e3a884b7395ba91876f4b0aaf'),(110,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxNTU4NiwiaWF0IjoxNzQ3OTEwNzg2LCJqdGkiOiI1ODBjMjBlY2I2NDU0YzUwYTdiMTgwMWE2MmJiMzQxYyIsInVzZXJfaWQiOjIyfQ.QCdlI134e2x8XPGjcS-muJ4E9UHnoY0wALyQcVsR1Gg','2025-05-22 10:46:26.708726','2025-05-29 10:46:26.000000',22,'580c20ecb6454c50a7b1801a62bb341c'),(111,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxNjA4MSwiaWF0IjoxNzQ3OTExMjgxLCJqdGkiOiIzOWFhOTlhOTBhNjI0NDI2YjhiNGE2MWEyOTJiOTI3NCIsInVzZXJfaWQiOjIyfQ.xgIgDpkwUtV7YxMoDPihlzVn13GAfxeI8LgcLRhKkDs','2025-05-22 10:54:41.075047','2025-05-29 10:54:41.000000',22,'39aa99a90a624426b8b4a61a292b9274'),(112,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxNjA4MywiaWF0IjoxNzQ3OTExMjgzLCJqdGkiOiJiMGEzZjdhYWY1OTM0MjM0ODc2ODg0MDc2MzQ2YTUwZiIsInVzZXJfaWQiOjIyfQ.YTd6b5adfqmQMB9rAJn4vWmGNk0Rm9dG6UdXjrxjgw0','2025-05-22 10:54:43.604622','2025-05-29 10:54:43.000000',22,'b0a3f7aaf5934234876884076346a50f'),(113,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0ODUxNjE0OCwiaWF0IjoxNzQ3OTExMzQ4LCJqdGkiOiI0NzQxMjBjOGIwZjU0Zjc2YWE3YmFiODRlMTFhOTBjMSIsInVzZXJfaWQiOjIyfQ.mnfDP9DFkcHwyGGACNjANQ8z1mOdRzM6qjPDJ9a-PnQ','2025-05-22 10:55:48.749640','2025-05-29 10:55:48.000000',22,'474120c8b0f54f76aa7bab84e11a90c1');
/*!40000 ALTER TABLE `token_blacklist_outstandingtoken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user`
--

DROP TABLE IF EXISTS `user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(254) NOT NULL,
  `email_verified` tinyint(1) NOT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otp_created_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user`
--

LOCK TABLES `user_user` WRITE;
/*!40000 ALTER TABLE `user_user` DISABLE KEYS */;
INSERT INTO `user_user` VALUES (10,'pbkdf2_sha256$1000000$g0qRRZodt6Kr6Ts9VfNDLu$X7OuG0TaXFBnKIB+5NONiTWwY7+CgOq46XZjLbXoABs=','2025-05-21 03:47:33.613855',0,'Sivasoruby','','',0,1,'2025-04-10 05:10:08.561786','sivasorubykanapathipillai@gmail.com',1,NULL,NULL),(11,'pbkdf2_sha256$1000000$7uaZ8GRT59ADBSf4L9xL2W$/yINxGqxw80Rl1qyuadXoVTV/igkd+7KsL0aohVbwp0=','2025-05-21 03:52:49.974243',1,'soruby','','',1,1,'2025-04-17 09:17:40.893539','soruby1298@gmail.com',0,NULL,NULL),(21,'pbkdf2_sha256$1000000$ScMCfRa314y1UXATR7wBy6$O58lOCS7tdNlZyoGS7PwefaADym6G2JgEEiAaWO8+6E=','2025-05-22 10:13:16.017588',0,'SivaLatest2','','',0,1,'2025-05-20 04:52:36.334051','ict2019034@as.rjt.ac.lk',1,NULL,NULL),(22,'pbkdf2_sha256$1000000$a4P7F8okZymKzFDFZwMzSt$qNRNGD3VQdKJD6SVX07eQgV+x2g10IloYRwB1TEYpsU=','2025-05-22 10:55:48.771185',0,'SivasorubyNeww','','',0,1,'2025-05-22 10:32:20.320943','sivasorubyk@gmail.com',1,NULL,NULL);
/*!40000 ALTER TABLE `user_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_groups`
--

DROP TABLE IF EXISTS `user_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_groups_user_id_group_id_bb60391f_uniq` (`user_id`,`group_id`),
  KEY `user_user_groups_group_id_c57f13c0_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_user_groups_group_id_c57f13c0_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `user_user_groups_user_id_13f9a20d_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_groups`
--

LOCK TABLES `user_user_groups` WRITE;
/*!40000 ALTER TABLE `user_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_user_user_permissions`
--

DROP TABLE IF EXISTS `user_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_user_user_permissions_user_id_permission_id_64f4d5b8_uniq` (`user_id`,`permission_id`),
  KEY `user_user_user_permi_permission_id_ce49d4de_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_user_user_permi_permission_id_ce49d4de_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `user_user_user_permissions_user_id_31782f58_fk_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_user_user_permissions`
--

LOCK TABLES `user_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `user_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22 16:36:23
