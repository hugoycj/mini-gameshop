-- one player's library

delimiter //
drop procedure if exists playerLibrary //
create procedure playerLibrary(
in uid int(11),
in orderMethod varchar(10)
)
begin
	if orderMethod = "" then
		select game.game_id, game.title as `name`, play_hours as hours, cover_image, achievement_num as gained_acievement, total_achievements
		from game join ownership on game.game_id = ownership.game_id
		where ownership.user_id = uid;
    elseif orderMethod = "hours" then
		select game.game_id, game.title as `name`,play_hours as hours, cover_image, achievement_num as gained_acievement, total_achievements
		from game join ownership on game.game_id = ownership.game_id
		where ownership.user_id = uid
        order by play_hours desc;
	elseif orderMethod = "title" then 
		select game.game_id, game.title as `name`,play_hours as hours, cover_image, achievement_num as gained_acievement, total_achievements
		from game join ownership on game.game_id = ownership.game_id
		where ownership.user_id = uid
        order by title;
    end if;
end //
delimiter ;
call playerLibrary(431,"hours");

-- player game playing hour
delimiter //
drop procedure if exists gamingTime //
create procedure gamingTime(
in uid int(11)
)
begin
	select title as `game name`, play_hours from ownership join game on ownership.game_id = game.game_id where user_id = uid
	union all
	select "total" as `game name`, sum(play_hours) from ownership join game on ownership.game_id = game.game_id where user_id = uid;
end//
delimiter ;
call gamingTime(431);


-- select top game tags
delimiter //
drop procedure if exists topTags //
create procedure topTags(
in gameID int(11),
in num int(3)
)
begin
	select tag from tag
	where game_id = gameID
	order by vote desc
limit 0,num;
end//
delimiter ;
call topTags(20,3);



delimiter //
drop procedure if exists topSold //
create procedure topSold(
in year int(11),
	region int(11)
)
begin
	select ownership.game_id, title,price.price
	from ownership join price on ownership.game_id = price.game_id join game on  ownership.game_id = game.game_id
	where year(buy_date) = year and price.region_id = region
	group by ownership.game_id
    order by count(user_id) desc;
end//
delimiter ;
call topSold(2018,28);

delimiter //
drop procedure if exists commentSummary //
create procedure commentSummary(
in gid int(11)
)
begin
	select sum(recommendation_rate) as goodRate, count(recommendation_rate) - sum(recommendation_rate) as badRate
    from comment
    where game_id = gid;
end//
delimiter ;
call commentSummary(10);



-- user info
delimiter //
drop procedure if exists userInfo //
create procedure userInfo(
in uid int(11)
)
begin
	select nickname,count(game_id) as total_game_number, 
		   sum(achievement_num) as total_achievement, sum(play_hours) as total_play_hour
	from ownership natural join user
	where user_id = uid;
end//
delimiter ;

call userInfo(431);

delimiter //
drop procedure if exists friendInfo //
create procedure friendInfo(
in uid int(11)
)
begin
	select `nickname`, `avatar`, `status`
	from user
	where user_id in(
	select followed_id
	from follow
	where following_id = uid
);
end//
delimiter ;


call friendInfo(51817);

delimiter //
drop procedure if exists purchase //
create procedure purchase(
in uid int(11),
	gid int(11)
)
begin
	insert into ownership (game_id, user_id, buy_date, play_hours, achievement_num)
    values (gid,uid,now(),0,0);

end//
delimiter ;

call purchase(183,50);




