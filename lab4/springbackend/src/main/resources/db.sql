drop table if exists lab4_results;
drop table if exists lab4_clients;

create table lab4_clients (
    login text primary key,
    password text not null,
    roles text not null default ''
);

create table lab4_results (
    id bigserial primary key,
    client_id text not null references lab4_clients(login) on delete cascade on update cascade,
    x double precision not null default 0,
    y double precision not null default 0,
    r double precision not null default 0,
    success boolean not null default false,
    date_time timestamptz not null default now()
);