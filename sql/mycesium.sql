/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost:3306
 Source Schema         : mycesium

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 19/07/2019 20:46:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mymsg
-- ----------------------------
DROP TABLE IF EXISTS `mymsg`;
CREATE TABLE `mymsg`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `fps` double(255, 0) NULL DEFAULT NULL COMMENT '频率',
  `x` double(255, 0) NULL DEFAULT NULL COMMENT '经度',
  `y` double(255, 0) NULL DEFAULT NULL COMMENT '纬度',
  `z` double(255, 0) NULL DEFAULT NULL COMMENT '当前视野高度',
  `v` double(255, 0) NULL DEFAULT NULL COMMENT '速度',
  `prop` double(255, 5) NULL DEFAULT NULL COMMENT '发动机转速',
  `o1` double(255, 5) NULL DEFAULT NULL COMMENT '左正右负，航向 + 90',
  `o2` double(255, 5) NULL DEFAULT NULL COMMENT '俯仰角，上正下负',
  `o3` double(255, 5) NULL DEFAULT NULL COMMENT '翻滚角，左正右负',
  `flaps` double(255, 5) NULL DEFAULT NULL,
  `aux` double(255, 5) NULL DEFAULT NULL,
  `aux2` double(255, 5) NULL DEFAULT NULL,
  `aux3` double(255, 5) NULL DEFAULT NULL,
  `aux4` double(255, 5) NULL DEFAULT NULL,
  `aux5` double(255, 5) NULL DEFAULT NULL,
  `aux6` double(255, 5) NULL DEFAULT NULL,
  `inTime` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
