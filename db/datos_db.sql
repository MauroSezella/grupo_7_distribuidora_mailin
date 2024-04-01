USE golosinas_mailin;

INSERT INTO usuarios VALUES
(1,'Juan','Perez','admin@dh.com','$2a$10$WnvCOTO8vV3/aKhBxYCBauN701nCkSnGUSAzwIe/NAwaNAIYXZ1IW','avatar_default.png',1,'ADMIN'),
(2,'Mauro','Sezella','mauro@dh.com','$2a$10$XuPjlJZvLd/cjNfXQZIUdOIZHoHe9GJwm.ERtB/KieRh7AbvM4ali','avatar_default.png',1,'CLIENTE'),
(3,'Luciana','Garcia','luciana@dh.com','$2a$10$Vjo4gp7bgoJBB35fgYMJROj8nC.CIvefFIw2k.8NgcGrFUizZwTL6','avatar_default.png',1,'CLIENTE'),
(4,'Fede','Coronel','fede@dh.com','$2a$10$v7MzhsxsinPGFf2FvErwVuVPulgznZt6CHvTYCacvV7QG.8cDONyy','avatar_default.png',1,'CLIENTE'),
(5,'Diego','Abraham','diego@dh.com','$2a$10$9YhLs5oW.39H.h580sM3TezoD4SdylrHpxVfji4FwunKF56VKY.n2','avatar_default.png',1,'CLIENTE'),
(6,'Maria','Lopez','maria@dh.com','$2a$10$1i1l/52oGUGhGK4K5YJ/le0HzMVm9NQa0cK9ysQezOAG0Z2YSHCBK','avatar_default.png',1,'CLIENTE'),
(7,'Carlos','Rodriguez','carlos@dh.com','$2a$10$K2UPxuE/dxuKZ6V8q9pYU.4.Gw54e8m0hj0RKwdO.8nuqij4fqOM2','avatar_default.png',1,'CLIENTE'),
(8,'Laura','Gomez','laura@dh.com','$2a$10$WMELppATCmy3r0WTcCVm0OtWunXm0VDmVxJlFg2PR8T56S3NplJmC','avatar_default.png',1,'CLIENTE'),
(9,'Roberto','Sanchez','roberto@dh.com','$2a$10$ufaME47xWjGaz1/B8YAl6enP8A3K0vvwJG8wIz5K7CMKu6zZHyXDu','avatar_default.png',1,'CLIENTE'),
(10,'Ana','Martinez','ana@dh.com','$2a$10$V2RL7qMa7Krl0O5UpIT3wuc.8BByKJXXiAerX43CMxXKRmEe2eN3a','avatar_default.png',1,'CLIENTE'),
(11,'Pedro','Fernandez','pedro@dh.com','$2a$10$4I2q9s99x2qB8s0d6kUV3OwG9JN2t/2C7FE1rg9AfBq7DcStGUCPa','avatar_default.png',1,'CLIENTE'),
(12,'Sofia','Diaz','sofia@dh.com','$2a$10$nHQZWu7i7JJ4KckDfG3zBuq7OCXAYn3goq/QUL25GFD1Up2B9gOV2','avatar_default.png',1,'CLIENTE'),
(13,'Jorge','Rios','jorge@dh.com','$2a$10$tfpsR6V7TFS2ZiAb.dZ7Me9oP6S2Gqr0Hc7nGQ5c1haKsW7Fp6eOe','avatar_default.png',1,'CLIENTE'),
(14,'Mariana','Torres','mariana@dh.com','$2a$10$3SUd78s/fkRqR28xQm.EqOs6svhvmDfA8QbEw2D2T7gbNXyq.nxS.','avatar_default.png',1,'CLIENTE'),
(15,'Gabriel','Ruiz','gabriel@dh.com','$2a$10$M1Wc9CmRd1lIUNnBkeU0meKotE1ojpxzGyE/8MkSC3nBmNc6QhcHy','avatar_default.png',1,'CLIENTE'),
(16,'Natalia','Vazquez','natalia@dh.com','$2a$10$m5M/JWb.v5vWAlmDItWFL.uPML0KmmHkGzUQOzHj./jubTlBvqE1W','avatar_default.png',1,'CLIENTE'),
(17,'Fernando','Blanco','fernando@dh.com','$2a$10$6.sEfZpNfwf5/LyX8RTbmeSML./sEHYV0uY92ZHRViO3VH72dRV7e','avatar_default.png',1,'CLIENTE'),
(18,'Camila','Ortega','camila@dh.com','$2a$10$gaDFfTZZsTV4S31f1AQyzur1oDw9ThieSx5aLXG1PbROx3dQ8gP.C','avatar_default.png',1,'CLIENTE'),
(19,'Esteban','Cruz','esteban@dh.com','$2a$10$7x3YcwGczARr.zYV9Ym8deKz4PpUxIhWj95oQo8nGxBQG5m/J6g/K','avatar_default.png',1,'CLIENTE'),
(20,'Valentina','Perez','valentina@dh.com','$2a$10$ZcG9KDPWeZC0l.8f9CHJz.YcWfSfxKTPqpr8xVIpLeQcQ9dmIzUCq','avatar_default.png',1,'CLIENTE'),
(21,'Luis','Gonzalez','luis@dh.com','$2a$10$RkbgKAGpPOSSNtq3sOw8E..pGf7BjWJF2T3zl7J6fTW2Z1EiFlmU2','avatar_default.png',1,'CLIENTE'),
(22,'Carla','Perez','carla@dh.com','$2a$10$jvsEDq5lH7N93b8wqT5kge9tHhQ1zRM39V5fLdAVSLX67xIsICzDi','avatar_default.png',1,'CLIENTE'),
(23,'Ricardo','Mendoza','ricardo@dh.com','$2a$10$ReI5Yk49FqMjT9Bnkt3h7uKRlO9QZ31FkE9r2o7vFVKzFk9mDvQ2a','avatar_default.png',1,'CLIENTE');

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
('Chupetin Pelotita Frutal x100U.','La caja de Chupetin pelotita trae 12 unidades.',1,12940.00,0,0,'img-Chupetin-pelotita-frutal.jpg',4,1),
('Galleta Bagley Surtida X 398G.','La caja de Galletas desfile trae 21 unidades.',0,10670.00,0,0,'img-galleta-bagley.jpg',1,1),
('Alfajor fantoche triple blanco 85g x 12','Alfajor Fantoche triple blanco x 85g. Caja x 12 unidades.',0,4999.90,0,20,'img-fantoche-blanco.png',2,1),
('Alfajor Guaymallen Triple Blanco x70G. 24U','Alfajor Triple Guaymallen blanco x 70 grs x caja de 24 unidades.',0,5743.50,10,200,'img-alfajor-guaymallen-blanco.jpg',2,1),
('Alfajor guaymallen 70g triple negro x 24u.','Alfajor Triple Guaymallen Negro con dulce de leche  x 70 grs. Caja de 24 unidades.',0,5743.50,5,50,'img-alfajor-guaymallen-negro.jpg',2,1),
('Billiken Masticable Frutal x200U.','La caja de billiken masticable trae 12 unidades.',0,24740.00,0,500,'img-billiken-masticable-frutal.jpg',3,1),
('Chupetin Pelotita Dulce de Leche x50U.','La caja de Chupetin pelotita trae 12 unidades.',0,1940.00,0,50,'img-Chupetin-pelotita-ddl.jpg',4,1),
('Chupetin Bola Loca Max x24U.','La caja de Chupetin pelotita trae 12 unidades.',0,2910.00,0,100,'img-Chupetin-bola-loca-max.jpg',4,1),
('Chupetin MR POPS TROMPITO TUTTI 50u 11g','Chupetin MR POPS TROMPITO TUTTI 50u 11g',0,3131.00,20,3,'img_1702935012758_.png',4,1),
('Butter Toffees Avellana 648g','Butter Toffees Avellana 648g',0,3198.90,15,0,'img_1703045949496_.png',3,1),
('Chupetin Masticable Fierita Tatoo Frutilla','CHUPETIN MASTICABLE FIERITA SUPER TATOO FRUTILLA 50u 12g.',0,2197.50,0,100,'img_1705902152231_.jpg',4,1),
('Alka Cherry Super 200g','Caramelos Duros ALKA CHERRY SUPER 200g',0,1499.70,5,19,'imagen_1712014282033_.png',3,1),
('Galletitas Rex Sabor Original x75gr','Galletitas Rex Sabor Original x75gr. Podes encontrarlas disponibles por unidad o por bulto de 32 unidades.',0,20160.00,0,5,'imagen_1712014360639_.jpg',1,1),
('Jorgito Alfajor de Fruta Simple 50 g x24u','Jorgito Alfajor de Fruta Simple, 50 gr. x 24 unidades Rellenos de una capa de membrillo y cubierto con glaseado de azúcar.',0,5410.00,0,10,'imagen_1712014303805_.jpg',2,1),
('Galletitas Surtidas Diversión x 398g','Caja Galletitas Diversion Surtidas Dulces, 21 unidades',0,37639.00,5,2,'imagen_1712014802473_.jpg',1,1);