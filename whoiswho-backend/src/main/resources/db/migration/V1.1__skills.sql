create table skill (
    id identity not null primary key,
    name varchar(64) not null
);

create table person_skill_score (
  person_id long not null,
  skill_id long not null,
  experience long not null,
  primary key (person_id, skill_id),
  foreign key (person_id) references person(id),
  foreign key (skill_id) references skill(id)
);

insert into skill (id, name)
values (1, 'Java'), (2, 'JavaScript');

insert into person_skill_score (person_id, skill_id, experience)
values (1, 1, 10000), (1, 2, 5000);
