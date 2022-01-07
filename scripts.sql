CREATE DATABASE IF NOT EXISTS `testsite` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE testsite;

CREATE TABLE IF NOT EXISTS  `users` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 100 ) NOT NULL ,
`email` VARCHAR( 100 ) NOT NULL ,
`avatar` VARCHAR( 255 ) DEFAULT NULL,
`password` VARCHAR( 100 ) NOT NULL) ENGINE = INNODB;

INSERT INTO `users` (`id`, `name`, `email`, `avatar`, `password`) VALUES
(1, 'Fu Hua', 'fu@hua.com', NULL, '123'),
(2, 'Rita', 'rita@rossweisse.com', NULL, '123'),
(3, 'Hua', 'hua@sentience.com', NULL, '123');