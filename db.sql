-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.20-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para treetech
CREATE DATABASE IF NOT EXISTS `treetech` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `treetech`;

-- Copiando estrutura para tabela treetech.alarmes
CREATE TABLE IF NOT EXISTS `alarmes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(50) NOT NULL,
  `classificacao_id` int(11) NOT NULL DEFAULT 0,
  `creat_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `equipamento_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 2,
  `vezes_autuado` int(11) NOT NULL DEFAULT 0,
  `entrada` timestamp NULL DEFAULT NULL,
  `saida` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_alarmes_equipamentos` (`equipamento_id`),
  KEY `FK_alarmes_status` (`status_id`),
  KEY `FK_alarmes_classificacoes` (`classificacao_id`) USING BTREE,
  CONSTRAINT `FK_alarmes_classificacoes` FOREIGN KEY (`classificacao_id`) REFERENCES `classificacoes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_alarmes_equipamentos` FOREIGN KEY (`equipamento_id`) REFERENCES `equipamentos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_alarmes_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela treetech.alarmes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `alarmes` DISABLE KEYS */;
/*!40000 ALTER TABLE `alarmes` ENABLE KEYS */;

-- Copiando estrutura para tabela treetech.classificacoes
CREATE TABLE IF NOT EXISTS `classificacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classificacao` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela treetech.classificacoes: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `classificacoes` DISABLE KEYS */;
INSERT INTO `classificacoes` (`id`, `classificacao`) VALUES
	(1, 'Baixo'),
	(2, 'Medio'),
	(3, 'Alto');
/*!40000 ALTER TABLE `classificacoes` ENABLE KEYS */;

-- Copiando estrutura para tabela treetech.equipamentos
CREATE TABLE IF NOT EXISTS `equipamentos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `numero_serie` varchar(50) NOT NULL,
  `tipo_id` int(11) NOT NULL,
  `descricao` varchar(50) NOT NULL,
  `creat_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_equipamentos_tipos` (`tipo_id`),
  CONSTRAINT `FK_equipamentos_tipos` FOREIGN KEY (`tipo_id`) REFERENCES `tipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela treetech.equipamentos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;

-- Copiando estrutura para tabela treetech.log
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `acao` varchar(50) NOT NULL,
  `dados_acessados` varchar(300) NOT NULL,
  `dados_alterados` varchar(300) NOT NULL,
  `rota` varchar(50) NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela treetech.log: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
/*!40000 ALTER TABLE `log` ENABLE KEYS */;

-- Copiando estrutura para tabela treetech.status
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela treetech.status: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` (`id`, `status`) VALUES
	(1, 'ON'),
	(2, 'OFF');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;

-- Copiando estrutura para tabela treetech.tipos
CREATE TABLE IF NOT EXISTS `tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela treetech.tipos: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tipos` DISABLE KEYS */;
INSERT INTO `tipos` (`id`, `tipo`) VALUES
	(1, 'Tensao'),
	(2, 'Corrente'),
	(3, 'Oleo');
/*!40000 ALTER TABLE `tipos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
