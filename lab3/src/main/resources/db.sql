drop table if exists lab3_x_test_table;

create table lab3_x_test_table (
    id serial primary key,
    session_id char(40) not null default '',
    x double precision not null default 0,
    y double precision not null default 0,
    r double precision not null default 0,
    success boolean not null default false,
    date_time timestamptz not null default now(),
    execution_time bigint not null default 0
);