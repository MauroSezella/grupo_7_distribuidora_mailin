CREATE DATABASE golosinas_mailin;

USE golosinas_mailin;

CREATE TABLE IF NOT EXISTS categorias (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  estado TINYINT(1),
  PRIMARY KEY (id));
  
  CREATE TABLE IF NOT EXISTS productos (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  descripcion VARCHAR(255) ,
  en_oferta TINYINT(1),
  precio DECIMAL(10, 2),
  descuento INT,
  stock INT,
  imagen VARCHAR(255),
  categoria_id INT,
  estado TINYINT(1) ,
  PRIMARY KEY (id),
  FOREIGN KEY (categoria_id) REFERENCES categorias (id));
  
  CREATE TABLE IF NOT EXISTS usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) ,
  apellido VARCHAR(45),
  email VARCHAR(100) ,
  password VARCHAR(100) ,
  avatar VARCHAR(250),
  estado TINYINT(1),
  rol ENUM('CLIENTE', 'ADMIN'),
  PRIMARY KEY (id)); 
  
  CREATE TABLE IF NOT EXISTS carrito (
  id INT NOT NULL AUTO_INCREMENT,
  total DECIMAL(10, 2),
  fecha_pedido DATE,
  estado ENUM('CONFIRMADO', 'FACTURADO', 'RETIRADO'),
  usuario_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios (id));
  
   CREATE TABLE IF NOT EXISTS cupones (
  id INT NOT NULL AUTO_INCREMENT,
  codigo VARCHAR(100) , 
  descuento INT ,
  estado TINYINT(1) ,
  fecha_expiracion DATE,
  PRIMARY KEY (id));
  
  CREATE TABLE IF NOT EXISTS productos_carrito (
  id INT NOT NULL AUTO_INCREMENT,
  producto_id INT,
  carrito_id INT,
  cantidad INT,
  subtotal DECIMAL(10, 2), 
  cupon_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (producto_id) REFERENCES productos (id),
  FOREIGN KEY (carrito_id) REFERENCES carrito (id),
  FOREIGN KEY (cupon_id) REFERENCES cupones (id));
  
 



  
  

  
  

  
  
  




