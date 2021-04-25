CREATE TABLE `plantform` (
`game_id` int NOT NULL,
`plantform` enum("windows","mac","linux") NOT NULL,
`requirement` varchar(8191) NULL,
PRIMARY KEY (`game_id`,`plantform`) 
);

alter table `platform` change `plantform` `platform` enum("windows","mac","linux");

select * from platform limit 0,10;