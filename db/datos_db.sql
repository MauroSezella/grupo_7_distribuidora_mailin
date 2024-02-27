USE golosinas_mailin;

INSERT INTO usuarios VALUES
(1,'Juan','Perez','admin@dh.com','$2a$10$WnvCOTO8vV3/aKhBxYCBauN701nCkSnGUSAzwIe/NAwaNAIYXZ1IW','avatar_default.png',1,'ADMIN'),
(2,'Mauro','Sezella','mauro@dh.com','$2a$10$XuPjlJZvLd/cjNfXQZIUdOIZHoHe9GJwm.ERtB/KieRh7AbvM4ali','avatar_default.png',1,'CLIENTE'),
(3,'Luciana','Garcia','luciana@dh.com','$2a$10$Vjo4gp7bgoJBB35fgYMJROj8nC.CIvefFIw2k.8NgcGrFUizZwTL6','avatar_default.png',1,'CLIENTE'),
(4,'Fede','Coronel','fede@dh.com','$2a$10$v7MzhsxsinPGFf2FvErwVuVPulgznZt6CHvTYCacvV7QG.8cDONyy','avatar_default.png',1,'CLIENTE'),
(5,'Diego','Abraham','diego@dh.com','$2a$10$9YhLs5oW.39H.h580sM3TezoD4SdylrHpxVfji4FwunKF56VKY.n2','avatar_default.png',1,'CLIENTE');

INSERT INTO categorias (nombre, estado) values ('Galletas', 1);
INSERT INTO categorias (nombre, estado) values ('Alfajores', 1);
INSERT INTO categorias (nombre, estado) values ('Caramelos', 1);
INSERT INTO categorias (nombre, estado) values ('Chupetines', 1);

INSERT INTO productos (nombre, descripcion, en_oferta, precio, descuento, stock, imagen, categoria_id, estado) VALUES 
('Galleta Desfile Surtida X 398G.',  'La caja de Galletas desfile trae 21 unidades.', 1, 9945.5, 0, 100, 'img-galleta-desfile.jpg', 1, 1 );

INSERT INTO productos (nombre, descripcion, en_oferta, precio, descuento, stock, imagen, categoria_id, estado) VALUES 
('Alfajor Fantoche Triple Negro x 85G.',  'La caja de alfajor fantoche trae 12 unidades.', 0, 3335, 0, 200, 'img-fantoche-negro.png', 2, 1 );

INSERT INTO productos (nombre, descripcion, en_oferta, precio, descuento, stock, imagen, categoria_id, estado) VALUES 
('Misky Masticable Surtido x242U.', 'La caja de misky masticable trae 10 unidades.', 0, 19240, 0, 500, 'img-misky-masticable.jpg', 3, 1 );

INSERT INTO productos (nombre, descripcion, en_oferta, precio, descuento, stock, imagen, categoria_id, estado) VALUES 
('Chupetin Pelotita Frutal x100U.', 'La caja de Chupetin pelotita trae 12 unidades.', 1, 12940, 0, 0, 'img-Chupetin-pelotita-frutal.jpg', 4, 1 );
