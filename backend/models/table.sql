
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE permissions (
    permission_id SERIAL PRIMARY KEY,
    permission VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE role_permission (
    id SERIAL PRIMARY KEY,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
);

CREATE TABLE users(
  id SERIAL NOT NULL,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  age INT,
  country VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role_id INT,
  is_deleted SMALLINT DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (id)
);

CREATE TABLE carts (
    id SERIAL NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
    PRIMARY KEY (id),
);

CREATE TABLE wishlists (
    id SERIAL NOT NULL,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
    PRIMARY KEY (id),
);

CREATE TABLE categories (
    id SERIAL NOT NULL,
    category VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE products (
    id SERIAL NOT NULL,
    title VARCHAR(255),
    descriptions VARCHAR(255),
    category_id INT,
    img VARCHAR(250) NOT NULL,
    price INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    PRIMARY KEY (id),
    is_deleted SMALLINT DEFAULT 0
);

CREATE TABLE matches (
    id SERIAL NOT NULL,
    title VARCHAR(255),
    descriptions VARCHAR(255),
    place VARCHAR(255),
    dates VARCHAR(255),
    time duration VARCHAR(255),
    ticketPrice INT INT NOT NULL,
    team1postion1 SMALLINT DEFAULT 0
    team1postion2 SMALLINT DEFAULT 0
    team1postion3 SMALLINT DEFAULT 0
    team1postion4 SMALLINT DEFAULT 0
    team1postion5 SMALLINT DEFAULT 0
    team2postion1 SMALLINT DEFAULT 0
    team2postion2 SMALLINT DEFAULT 0
    team2postion3 SMALLINT DEFAULT 0
    team2postion4 SMALLINT DEFAULT 0
    team2postion5 SMALLINT DEFAULT 0
    PRIMARY KEY (id),
)


INSERT INTO
  roles (role)
VALUES
  ('ADMIN');
INSERT INTO
  roles (role)
VALUES
  ('USER');

INSERT INTO
  permissions (permission)
VALUES
  ('CREATE_PRODUCT');

INSERT INTO
  role_permission (role_id, permission_id)
VALUES
  (1, 1);

INSERT INTO
  role_permission (role_id, permission_id)
VALUES
  (1, 2);