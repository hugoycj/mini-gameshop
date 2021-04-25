-- one player's library

delimiter //
drop procedure if exists playerLibrary //
create procedure playerLibrary(
in uid int(11)
)
begin
	select game.game_id, game.title as `name`
    from game join ownership on game.game_id = ownership.game_id
    where ownership.user_id = uid;
end //
call playerLibrary(431);

-- player's region
delimiter //
drop procedure if exists playerRegion //
create procedure playerRegion(
in uid int(11)
)
begin
	select `user`.user_id, `region`.currency as `region`
    from `user` join `region` on `user`.region_id = `region`.region_id
    where `user`.user_id = uid;
end //
call playerRegion(431);

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

call gamingTime(431);
//
-- player achievements (total)
select `user`.user_id, sum(achievement_num) as total_achievement, count(game_id) as total_game_num
from `user` join ownership on `user`.user_id = `ownership`.user_id
group by `user`.user_id; 
//
-- hot game
select game.game_id, game.title, count(user_id) as total_sold
from game join ownership on game.game_id = ownership.game_id
group by game.game_id
order by total_sold desc;



