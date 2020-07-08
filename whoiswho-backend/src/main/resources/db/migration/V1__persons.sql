create table person (
    id identity not null primary key,
    first_name varchar(64) not null,
    last_name varchar(64) not null,
    employment_date date not null,
    telephone_number varchar(32),
    title varchar(64)
);

create table user (
  person_id long not null primary key,
  email varchar(128) not null,
  password varchar(128) not null,
  foreign key (person_id) references person(id)
);

create table user_role (
    person_id long not null,
    name varchar(64) not null,
    foreign key (person_id) references user(person_id),
    primary key (person_id, name)
);

insert into person (id, first_name, last_name, employment_date, telephone_number, title)
values
    (1, 'Craig', 'Gonzalez', '2018-02-22', '5785 68 58 55', 'Speech Pathologist'),
    (2, 'Michale', 'Muddicliffe', '2008-09-03', '3408 05 81 63', 'Social Worker'),
    (3, 'Bill', 'Accum', '2008-10-28', '6149 85 51 36', 'Geological Engineer'),
    (4, 'Mar', 'Thripp', '2016-07-29', '6687 69 48 69', 'Information Systems Manager'),
    (5, 'Filberte', 'Olliar', '2007-02-10', '0980 37 73 73', 'Sales Representative'),
    (6, 'Neddie', 'Ebbing', '2014-07-18', '5505 49 01 78', 'Human Resources Assistant III'),
    (7, 'Jeremias', 'Jeanel', '2009-08-03', '5342 87 66 66', 'Assistant Media Planner'),
    (8, 'Jobina', 'Hullock', '2011-05-07', '0517 01 12 91', 'VP Accounting'),
    (9, 'Kip', 'Ruprich', '2005-08-15', '4739 74 80 53', 'Environmental Specialist'),
    (10, 'Hewitt', 'Falla', '2017-11-07', '1473 03 00 83', 'Administrative Assistant III'),
    (11, 'Bendite', 'Tinner', '2017-12-22', '1805 47 16 47', 'Software Test Engineer IV'),
    (12, 'Reinwald', 'Hegdonne', '2006-06-21', '7695 47 74 21', 'Human Resources Manager'),
    (13, 'Trefor', 'Ricciardi', '2007-05-28', '7073 86 86 37', 'Senior Cost Accountant'),
    (14, 'Odessa', 'Harefoot', '2014-08-21', '4645 23 40 69', 'Associate Professor'),
    (15, 'Baudoin', 'O'' Kelleher', '2018-10-10', '7953 27 92 20', 'VP Quality Control'),
    (16, 'Ignace', 'Benardet', '2014-11-17', '9151 52 09 77', 'Programmer I'),
    (17, 'Lila', 'Signoret', '2010-12-25', '0125 04 38 42', 'Cost Accountant'),
    (18, 'Shae', 'Casaro', '2010-01-04', '7273 35 69 18', 'Operator'),
    (19, 'Thain', 'Dimmock', '2006-07-29', '1278 68 98 41', 'Mechanical Systems Engineer'),
    (20, 'Netti', 'Breem', '2006-03-03', '7084 61 34 03', 'Budget/Accounting Analyst II');


insert into user (person_id, email, password)
values (1, 'craig.gonzalez@example.org', '$2a$10$FCyrzMfeXmqf0gzPh9mtaO8a5Tl6bUHviotQIVuHY1xBYANGEbAY6');

insert into user_role (person_id, name)
values (1, 'USER'), (1, 'ADMIN');
