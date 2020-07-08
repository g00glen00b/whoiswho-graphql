create table team (
    id identity not null primary key,
    name varchar(64) not null,
    leader_person_id long not null,
    foreign key (leader_person_id) references person(id)
);

create table team_member (
    team_id long not null,
    person_id long not null,
    approved boolean not null default false,
    primary key (team_id, person_id),
    foreign key (team_id) references team(id),
    foreign key (person_id) references person(id)
);

create table team_skill_score (
    team_id long not null,
    skill_id long not null,
    experience long not null,
    primary key (team_id, skill_id),
    foreign key (team_id) references team(id),
    foreign key (skill_id) references skill(id)
);

insert into team (id, name, leader_person_id)
values
(1, 'Ivolution', 2),
(2, 'Lightbend crowd', 3),
(3, 'Architecture crowd', 3),
(4, 'Marketing crowd', 7),
(5, 'Team Keshia', 6);

insert into team_member (team_id, person_id, approved)
values
(1, 2, true),
(1, 1, true),
(1, 4, true),
(1, 5, true),
(1, 8, true),
(1, 9, true),
(2, 3, true),
(2, 8, true),
(3, 3, true),
(3, 9, true),
(4, 7, true),
(4, 5, true),
(4, 1, true),
(4, 4, true),
(5, 10, true),
(5, 11, true);
