-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nest_dev_db
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `base_sys_users`
--

DROP TABLE IF EXISTS `base_sys_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `base_sys_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `departmentId` int DEFAULT NULL COMMENT '部门ID',
  `username` varchar(16) NOT NULL COMMENT '用户登录名',
  `nickname` varchar(16) NOT NULL COMMENT '用户昵称',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机',
  `roles` text NOT NULL COMMENT '角色code',
  `status` enum('0','1') NOT NULL DEFAULT '1' COMMENT '状态',
  `gender` enum('0','1','2') NOT NULL DEFAULT '2' COMMENT '性别',
  `tags` text COMMENT '标签',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9aa56b3231d1d68a10256ae72a` (`username`),
  KEY `IDX_2e56117a96a2059494ddf8b6ad` (`departmentId`),
  KEY `IDX_808833af282bf09d2c2cbbe192` (`email`),
  KEY `IDX_6ec0eee63da828238bb71ec913` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='系统用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `base_sys_users`
--

/*!40000 ALTER TABLE `base_sys_users` DISABLE KEYS */;
INSERT INTO `base_sys_users` VALUES (1,'2024-05-08 16:58:25','2024-05-08 17:29:14',NULL,'admin','admin','$2b$10$N1vdOMf.toayp5yiCHIM7OJhUxwpoU4ZHXQ1zbQAgIFsH2B460fcC','cool@163.com','18323615573','admin','1','2','','http://dummyimage.com/160x600','系统 root 用户，拥有所有权限');
/*!40000 ALTER TABLE `base_sys_users` ENABLE KEYS */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '部门名称',
  `pId` int DEFAULT NULL COMMENT '上级部门ID',
  `orderNum` int NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8681da666ad9699d568b3e9106` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='部门表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;

--
-- Table structure for table `dict_types`
--

DROP TABLE IF EXISTS `dict_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dict_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `key` varchar(255) NOT NULL,
  `isDel` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_3eb259691edbd716aed94773a9` (`name`),
  UNIQUE KEY `IDX_7ce60aa9d7c6d9eb17e6457d4d` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='字典类型表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dict_types`
--

/*!40000 ALTER TABLE `dict_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `dict_types` ENABLE KEYS */;

--
-- Table structure for table `dicts`
--

DROP TABLE IF EXISTS `dicts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dicts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '字典名',
  `orderNum` int NOT NULL DEFAULT '0' COMMENT '序号',
  `pId` int DEFAULT NULL COMMENT '父ID',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `typeId` int NOT NULL COMMENT '类型ID',
  `value` varchar(255) NOT NULL COMMENT '值',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_cfa42c049dd860132e65104b4e` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='字典表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dicts`
--

/*!40000 ALTER TABLE `dicts` DISABLE KEYS */;
/*!40000 ALTER TABLE `dicts` ENABLE KEYS */;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '',
  `perms` text COMMENT '权限标识仅在type为权限时指定',
  `pid` int DEFAULT NULL,
  `type` enum('1','2','3') NOT NULL DEFAULT '1',
  `path` varchar(255) DEFAULT NULL,
  `component` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `sort` int NOT NULL DEFAULT '0',
  `cache` enum('0','1') NOT NULL DEFAULT '1',
  `hidden` enum('0','1') NOT NULL DEFAULT '1',
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a8bb3519a45e021a147bc87e49` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='菜单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `menuIdList` text,
  `perms` text,
  `remark` varchar(255) DEFAULT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_648e3f5447f725579d7d4ffdfb` (`name`),
  UNIQUE KEY `IDX_f6d54f95c31b73fb1bdd8e91d0` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

--
-- Table structure for table `storage_categories`
--

DROP TABLE IF EXISTS `storage_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storage_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '分类名',
  `pId` tinyint DEFAULT NULL COMMENT '父分类ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storage_categories`
--

/*!40000 ALTER TABLE `storage_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `storage_categories` ENABLE KEYS */;

--
-- Table structure for table `storages`
--

DROP TABLE IF EXISTS `storages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL COMMENT '文件名',
  `url` varchar(255) NOT NULL COMMENT '地址',
  `path` varchar(100) DEFAULT NULL COMMENT '文件路径',
  `cateId` int DEFAULT NULL COMMENT '分类ID',
  `type` varchar(255) DEFAULT NULL COMMENT '类型',
  `ext` varchar(255) DEFAULT NULL COMMENT '扩展名',
  `size` varchar(255) DEFAULT NULL COMMENT '文件大小',
  `userId` int DEFAULT NULL COMMENT '上传用户ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storages`
--

/*!40000 ALTER TABLE `storages` DISABLE KEYS */;
/*!40000 ALTER TABLE `storages` ENABLE KEYS */;

--
-- Dumping routines for database 'nest_dev_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-10 16:23:04
