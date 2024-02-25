CREATE DATABASE golosinas_mailin;

USE golosinas_mailin;

CREATE TABLE IF NOT EXISTS `categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `estado` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE IF NOT EXISTS `productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(255) NOT NULL,
  `en_oferta` TINYINT(1) DEFAULT NULL,
  `precio` DECIMAL(10, 2) NOT NULL,
  `descuento` INT DEFAULT NULL,
  `stock` INT DEFAULT NULL,
  `imagen` VARCHAR(255) NOT NULL,
  `categoria_id` INT NOT NULL,
  `estado` TINYINT(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`));
  
  CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(100) NOT NULL,
  `avatar` VARCHAR(250) DEFAULT NULL,
  `estado` TINYINT(1) NOT NULL,
  `rol` ENUM('CLIENTE', 'ADMIN') NOT NULL,
  PRIMARY KEY (`id`)); 
  
  CREATE TABLE IF NOT EXISTS `carrito` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `total` DECIMAL(10, 2) NOT NULL,
  `fecha_pedido` DATE NOT NULL,
  `estado` ENUM('CONFIRMADO', 'FACTURADO', 'RETIRADO') DEFAULT NULL,
  `usuario_id` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`));
  
   CREATE TABLE IF NOT EXISTS `cupones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(100) NOT NULL, 
  `descuento` INT DEFAULT NULL,
  `estado` TINYINT(1) DEFAULT NULL,
  `fecha_expiracion` DATE DEFAULT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE IF NOT EXISTS `productos_carrito` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `producto_id` INT NOT NULL,
  `carrito_id` INT NOT NULL,
  `cantidad` INT NOT NULL,
  `subtotal` DECIMAL(10, 2) NOT NULL, 
  `cupon_id` INT DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`id`),
  FOREIGN KEY (`cupon_id`) REFERENCES `cupones` (`id`));
  
 



  
  

  
  

  
  
  




