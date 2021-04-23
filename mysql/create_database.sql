START TRANSACTION;
CREATE TABLE `game` (
`game_id` int(255) NOT NULL,
`title` varchar(255) NULL,
`description` varchar(4096) NULL,
`release_date` datetime NULL,
`publisher` varchar(255) NULL,
`developer` varchar(255) NULL,
`total_achievements` int(255) NULL,
`cover_image` varchar(255) NULL,
PRIMARY KEY (`game_id`) 
);

CREATE TABLE `price` (
`game_id` int NOT NULL,
`region_id` int NOT NULL,
`price` float(10,2) NULL,
PRIMARY KEY (`game_id`, `region_id`) 
);

CREATE TABLE `platform` (
`game_id` int NOT NULL,
`plantform` enum("windows","mac","linux") NOT NULL,
`requirement` varchar(8191) NULL,
PRIMARY KEY (`game_id`,`plantform`) 
);

CREATE TABLE `region` (
`region_id` int NOT NULL,
`region_name` varchar(255) NULL,
`currency` varchar(255) NULL,
`payment_method` varchar(255) NULL,
PRIMARY KEY (`region_id`) 
);

CREATE TABLE `user` (
`user_id` int NOT NULL,
`region_id` int NULL,
`nickname` varchar(255) NULL,
`avatar` varchar(255) NULL,
`status` varchar(255) NULL,
PRIMARY KEY (`user_id`) 
);

CREATE TABLE `comment` (
`user_id` int NOT NULL,
`game_id` int NOT NULL,
`recommendation_rate` int(255) NULL,
`play_hours` int(255) NULL,
`content` varchar(255) NULL,
PRIMARY KEY (`user_id`, `game_id`) 
);

CREATE TABLE `follow` (
`following_id` int(255) NOT NULL,
`followed_id` int NOT NULL
);

CREATE TABLE `ownership` (
`game_id` int NOT NULL,
`user_id` int NOT NULL,
`buy_date` datetime NULL,
`play_hours` int NULL,
PRIMARY KEY (`game_id`, `user_id`) 
);

CREATE TABLE `category` (
`game_id` int NOT NULL,
`category` varchar(255) NULL,
PRIMARY KEY (`game_id`) 
);

CREATE TABLE `tag` (
`game_id` int NOT NULL,
`tag` varchar(255) NULL,
PRIMARY KEY (`game_id`) 
);


ALTER TABLE `price` ADD CONSTRAINT `fk_price_game_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);
ALTER TABLE `platform` ADD CONSTRAINT `fk_platform_game_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);
ALTER TABLE `price` ADD CONSTRAINT `fk_price_region_1` FOREIGN KEY (`region_id`) REFERENCES `region` (`region_id`);
-- ALTER TABLE `user` ADD CONSTRAINT `fk_user_region_1` FOREIGN KEY (`region_id`) REFERENCES `region` (`region_id`);
ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_user_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
ALTER TABLE `comment` ADD CONSTRAINT `fk_comment_game_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);
ALTER TABLE `follow` ADD CONSTRAINT `fk_follow_user_1` FOREIGN KEY (`following_id`) REFERENCES `user` (`user_id`);
ALTER TABLE `follow` ADD CONSTRAINT `fk_follow_user_2` FOREIGN KEY (`followed_id`) REFERENCES `user` (`user_id`);
ALTER TABLE `ownership` ADD CONSTRAINT `fk_ownership_game_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);
ALTER TABLE `ownership` ADD CONSTRAINT `fk_ownership_user_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
ALTER TABLE `category` ADD CONSTRAINT `fk_category_game_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);
ALTER TABLE `tag` ADD CONSTRAINT `fk_tag_game_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`game_id`);
COMMIT;
