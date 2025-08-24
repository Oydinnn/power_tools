-- Active: 1755596838065@@127.0.0.1@3306@power_tools
CREATE DATABASE power_tools;

USE power_tools

SHOW TABLES

CREATE TABLE admin(
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    is_creator BOOLEAN NOT NULL
);
DESC admin;

SELECT * FROM admin

CREATE TABLE tool(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tool_price DECIMAL(8, 2) NOT NULL
);

DESC tool;

SELECT * FROM tool


CREATE TABLE shop(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ownerId INT NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    district_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,

    FOREIGN KEY(ownerId)
    REFERENCES user(id),

    FOREIGN KEY(district_id) 
    REFERENCES district(id)
);



CREATE TABLE shop_tool(
    id BIGINT NOT NULL,
    shop_id BIGINT NOT NULL,
    tool_id BIGINT NOT NULL,
    rent_price DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    shop_tool ADD PRIMARY KEY(id);
CREATE TABLE order(
    id BIGINT NOT NULL,
    client_id BIGINT NOT NULL,
    shop_tool_id BIGINT NOT NULL,
    order_date DATE NOT NULL,
    period BIGINT NOT NULL,
    total_price DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    order ADD PRIMARY KEY(id);




CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    role VARCHAR(255) CHECK
        (role IN('client', 'owner')) NOT NULL,
    address VARCHAR(255) NOT NULL
);
ALTER TABLE
    user ADD PRIMARY KEY(id);





CREATE TABLE district(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

DESC district

SELECT * FROM district;






ALTER TABLE
    shop_tool ADD CONSTRAINT shop_tool_tool_id_foreign FOREIGN KEY(tool_id) REFERENCES tool(id);
ALTER TABLE
    shop_tool ADD CONSTRAINT shop_tool_shop_id_foreign FOREIGN KEY(shop_id) REFERENCES shop(id);
ALTER TABLE
    shop ADD CONSTRAINT shop_ownerid_foreign FOREIGN KEY(ownerId) REFERENCES user(id);
ALTER TABLE
    order ADD CONSTRAINT order_client_id_foreign FOREIGN KEY(client_id) REFERENCES user(id);
ALTER TABLE
    shop ADD CONSTRAINT shop_district_id_foreign FOREIGN KEY(district_id) REFERENCES district(id);
ALTER TABLE
    order ADD CONSTRAINT order_shop_tool_id_foreign FOREIGN KEY(shop_tool_id) REFERENCES shop_tool(id);