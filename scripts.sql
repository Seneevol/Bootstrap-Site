CREATE DATABASE IF NOT EXISTS `testsite` CHARACTER SET utf8 COLLATE utf8_general_ci;

USE testsite;

CREATE TABLE IF NOT EXISTS  `users` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 100 ) NOT NULL ,
`email` VARCHAR( 100 ) NOT NULL ,
`avatar` VARCHAR( 255 ) DEFAULT NULL,
`password` VARCHAR( 100 ) NOT NULL) ENGINE = INNODB;

INSERT INTO `users` (`id`, `name`, `email`, `avatar`, `password`, `isAdmin`, `isBan`) VALUES
(1, 'Fu Hua', 'fu@hua.com', 'comment1.jpg', '123', 0, 0),
(2, 'Rita', 'rita@rossweisse.com', 'comment2.jpg', '123', 0, 0),
(3, 'Hua', 'hua@sentience.com', 'comment3.jpg', '123', 0, 0),
(4, 'Shogun', 'shogun@admin.com', 'shogun.jpg', '123', 1, 0);

CREATE TABLE IF NOT EXISTS  `articles` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 100 ) NOT NULL ,
`image` VARCHAR( 255 ) NOT NULL ,
`description` VARCHAR( 255 ) NOT NULL,
`date` DATETIME NOT NULL,
FOREIGN KEY (`id_user`) REFERENCES users(`id`) ) ENGINE = INNODB;