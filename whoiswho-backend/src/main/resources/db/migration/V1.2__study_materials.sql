create table study_material_type (
    code varchar(32) not null primary key,
    description varchar(32) not null
);

create table study_material_complexity (
    code varchar(32) not null primary key,
    description varchar(32) not null,
    score int not null
);

create table study_material (
    id identity not null primary key,
    name varchar(256) not null,
    type varchar(32) not null,
    complexity varchar(32) not null,
    approved boolean not null default false,
    duration bigint not null,
    foreign key (type) references study_material_type(code),
    foreign key (complexity) references study_material_complexity(code)
);

create table study_material_skill (
    study_material_id long not null,
    skill_id long not null,
    primary key (study_material_id, skill_id),
    foreign key (study_material_id) references study_material(id),
    foreign key (skill_id) references skill(id)
);

create table study_material_review (
    person_id long not null,
    study_material_id long not null,
    rating int not null,
    completion_date date not null,
    review varchar(256),
    primary key (person_id, study_material_id),
    foreign key (person_id) references person(id),
    foreign key (study_material_id) references study_material(id)
);

insert into skill (id, name)
values (3, 'AWS'),
       (4, 'Cloud'),
       (5, 'Serverless'),
       (6, 'Angular'),
       (7, 'Frontend'),
       (8, 'TypeScript'),
       (9, 'Vue'),
       (10, 'Vuex'),
       (11, 'GraphQL'),
       (12, 'React'),
       (13, 'RxJS'),
       (14, 'DevOps'),
       (15, 'Jenkins'),
       (16, 'Vagrant'),
       (17, 'Ansible'),
       (18, 'Chef'),
       (19, 'Docker');

insert into study_material_complexity (code, description, score)
values ('BEGINNER', 'Beginner', 1),
       ('EASY', 'Easy', 2),
       ('INTERMEDIATE', 'Intermediate', 3),
       ('ADVANCED', 'Advanced', 4),
       ('EXPERT', 'Expert', 5);

insert into study_material_type (code, description)
values ('BOOK', 'Book'),
       ('BOOTCAMP', 'Bootcamp'),
       ('COURSE', 'Course'),
       ('EVENT', 'Event'),
       ('HACKATON', 'Hackaton'),
       ('MEETUP', 'Meetup'),
       ('ONLINE_COURSE', 'Online course'),
       ('TECH_TALK', 'Tech talk'),
       ('WORKSHOP', 'Workshop');

insert into study_material (id, name, type, complexity, approved, duration)
values (1, 'AWS Technical Professional', 'ONLINE_COURSE', 'BEGINNER', true, 14400),
       (2, 'AWS Certified Developer - Associate', 'ONLINE_COURSE', 'ADVANCED', true, 50400),
       (3, 'Angular bootcamp', 'BOOTCAMP', 'EASY', true, 230400),
       (4, 'Vue.js master class', 'ONLINE_COURSE', 'INTERMEDIATE', true, 25200),
       (5, 'HackJam workshop - GraphQL with React vs. Angular vs. Vue', 'HACKATON', 'BEGINNER', true, 7200),
       (6, 'Reactive JS: Are you ready for the next big paradigm shift?', 'ONLINE_COURSE', 'EASY', true, 19800),
       (7, 'Angular 2 with TypeScript for Beginners: The Pragmatic Guide', 'ONLINE_COURSE', 'EASY', true, 21600),
       (8, 'Learn Devops: Continuously Deliver Better Software', 'ONLINE_COURSE', 'EASY', true, 16200);

insert into study_material_skill(study_material_id, skill_id)
values
    (1, 3), (1, 4),
    (2, 3), (2, 4), (2, 5),
    (3, 6), (3, 2), (3, 7), (3, 8),
    (4, 9), (4, 10),
    (5, 11), (5, 12), (5, 6), (5, 9),
    (6, 13),
    (7, 6), (7, 8),
    (8, 14), (8, 15), (8, 16), (8, 17), (8, 18), (8, 19);

insert into study_material_review (person_id, study_material_id, rating, completion_date, review)
values
(1, 1, 3, '2019-06-01', 'Very sales-oriented course. Technical capabilities aren''t demonstrated.'),
(1, 4, 4, '2018-06-01', 'Interesting, though the last part is mainly focused on Firebase integration.'),
(1, 5, 3, '2018-03-01', 'Well explained, though a bit hectic.'),
(1, 6, 3, '2016-11-10', 'Explanation is good, but the examples are too theoretical an not well demonstrated.'),
(1, 7, 4, '2016-06-01', 'Nicely explained, good examples.'),
(1, 8, 3, '2016-07-01', 'Good course to get a general overview of all the components. However, if you want to go into more detail, you''ll have to follow additional courses.');

