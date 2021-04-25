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

select * from game limit 0,50;
