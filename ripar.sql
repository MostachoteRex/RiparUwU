-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-12-2023 a las 00:23:01
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ripar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficiarios`
--

CREATE TABLE `beneficiarios` (
  `id` int(11) NOT NULL,
  `idBeneficiario` varchar(255) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `primerApellido` varchar(100) NOT NULL,
  `segundoApellido` varchar(100) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `idSuscriptor` varchar(255) NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id` int(11) NOT NULL,
  `idCita` varchar(255) NOT NULL,
  `idSuscripcion` varchar(255) NOT NULL,
  `idPaciente` varchar(255) NOT NULL,
  `idConvenio` varchar(255) NOT NULL,
  `fechaCita` date NOT NULL,
  `horaCita` time NOT NULL,
  `ahorro` varchar(255) NOT NULL,
  `idUsuario` varchar(255) NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contabilidad`
--

CREATE TABLE `contabilidad` (
  `id` int(11) NOT NULL,
  `noContrato` varchar(50) NOT NULL,
  `suscriptor` varchar(50) NOT NULL,
  `valor` varchar(50) NOT NULL,
  `metodoPago` enum('Trasferencia','Tarjeta','Efectivo') NOT NULL,
  `asesor` varchar(50) NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `contabilidad`
--

INSERT INTO `contabilidad` (`id`, `noContrato`, `suscriptor`, `valor`, `metodoPago`, `asesor`, `fechaRegistro`) VALUES
(6, 'ghgmnjdhgs', 'f9d02320-e1e0-439f-b9c1-42e20fa41455', '2345678', 'Tarjeta', '10e0474a-ca11-49bd-8ed8-45c4d97938ce', '2023-12-21 20:13:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `convenio`
--

CREATE TABLE `convenio` (
  `id` int(11) NOT NULL,
  `idConvenio` varchar(255) NOT NULL,
  `idEspecialidad` varchar(255) NOT NULL,
  `idInstitucion` varchar(255) NOT NULL,
  `nombreDr` varchar(100) NOT NULL,
  `tarifaParticular` varchar(255) NOT NULL,
  `tarifaMultipreventiva` varchar(255) NOT NULL,
  `telefono` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `convenio`
--

INSERT INTO `convenio` (`id`, `idConvenio`, `idEspecialidad`, `idInstitucion`, `nombreDr`, `tarifaParticular`, `tarifaMultipreventiva`, `telefono`, `email`, `fechaRegistro`) VALUES
(42, '8846f65b-3fbc-4304-b3c8-07defbbc8015', 'b40f6edb-d4df-456b-a280-46d37658f8fa', 'd30530ca-122b-4073-b21d-07e98b7d2ecd', 'Carlos M. Cardenas', '160.000', '90.000', '5750681-3128604151', 'mauriciocs@hotmail.com', '2023-11-23 05:30:53'),
(43, 'f285f23b-378f-4477-b1e9-c20462c50f75', '1aa0e65a-908d-48ec-b1a1-f0acee129d2b', '884c2da0-9d46-46e1-889a-1284ffe0a287', 'Carlos Arciniegas', '250.000', '170.000', '5774302-5774909-5833951-5725050', '', '2023-11-23 05:28:50'),
(44, '4a24ee00-38ff-49a0-afe0-ab8f2782fc37', '1aa0e65a-908d-48ec-b1a1-f0acee129d2b', '884c2da0-9d46-46e1-889a-1284ffe0a287', 'Juan Carlos Ortega', '250.000', '170.000', '3164568716', 'cardinor.ltda@hotmail.com', '2023-11-23 05:33:18'),
(46, '14c0b5a0-d267-473b-94f2-f907961774ee', '418148d3-b5f3-4d03-b890-b4690af8e4a8', 'dd907165-93cf-4f1e-986e-29a8360b8176', 'Daniel Quintero', '150.000', '95.000', '5893293-3123707736', 'quinterod@hotmail.com   cardiopediatriacucuta@hotmail.com', '2023-11-23 05:35:46'),
(47, '44bdd878-66f3-4ea2-b20a-376c94606f85', '7a76659f-8311-46a3-a605-4bc02d90efd5', 'e2d5b724-a16c-4710-9361-7674469718ce', 'Juan Arturo San Juan', '360.000', '290.000', '5747250', 'civajas@yahoo.com', '2023-11-23 05:37:08'),
(48, 'ad7daf3c-2814-4699-b5f2-cb85d8fd7ce4', '7a76659f-8311-46a3-a605-4bc02d90efd5', '8cdd930d-007f-490e-b827-4b49c2c4a525', 'Luis Soto', '250.000', '170.000', '3188670540', '', '2023-11-23 05:39:56'),
(50, '53525a6c-a724-491e-be69-971c3b84709d', '26b4558d-b53b-4a1f-9f7b-938c91a87792', '108d3df4-2ea3-4942-959e-1020c1c33c85', 'Pedro E. Pérez', '30.000', '15.000', '6075970069', 'PEDROELIASPEREZ@hotmail.com', '2023-11-23 05:47:00'),
(51, '1314f9a4-f566-42b9-90bb-154f21d35497', 'b1d764c1-51ed-4273-90f1-4d402bf1e669', '64c3e285-c2af-49d7-a66d-b6a0b596ac40', 'Gatromed', '250.000', '180.000', '5745853-5921933', 'gastromedcucuta.gmail.com', '2023-11-23 05:51:37'),
(52, '8e78b4d4-398d-4e29-bdf8-79c109848762', 'bea640a9-8d7d-40d4-9c93-fd7bbe7e9489', 'bbd48ed8-0269-404f-b54c-c521b5f0b0a6', 'Emiro Andrade Chaparro', '300.000', '150.000', '5836565', 'emiroandrade312@hotmail.com', '2023-11-23 05:55:05'),
(53, '8f5257e0-62ce-44d1-9c0a-c5f92ee5e5ab', 'bea640a9-8d7d-40d4-9c93-fd7bbe7e9489', '4cb18495-b3a3-4dd0-a2c0-348f0befa93b', 'Pablo E. Colmenares', '180.000', '100.000', '5712367-5833258-3108732360', '', '2023-11-23 05:57:36'),
(54, 'fedc200b-98d7-4e8c-98b9-df31da6141f6', '3295337c-3b33-410c-9b00-0f681023be6e', '9a6f3f3c-cdf4-403a-bd6e-5f4965db69ba', 'Daniel Quintero', '260.000', '190.000', '5893293-3123707736', '', '2023-11-23 06:00:32'),
(55, '513a715d-8f0a-4292-a0ea-6d2402fc45ac', '3295337c-3b33-410c-9b00-0f681023be6e', '9a6f3f3c-cdf4-403a-bd6e-5f4965db69ba', 'Daniel Quintero', '70.000', '50.000', '5893293-3123707736', '', '2023-11-23 06:01:22'),
(56, '2defcec6-486d-4371-b732-3d0328be8746', '6e3e90fc-d20a-433b-8c2e-571d7710244c', 'f17cfbec-9ea7-457d-b2da-64430633c681', 'Cardinor', 'Ver portafolio', '40.000', '3164568716', '', '2023-11-23 06:03:30'),
(58, 'c603f30e-662c-4da4-8ef8-fe4010cde1fc', '443e8200-defe-476a-83be-58e32bb45c8e', '9e856997-2f6e-4b6d-9f29-a79b35358371', 'William Fuentes T.', 'Ver portafolio', 'Ver portafolio', '', 'fuentesrx@yahoo.com', '2023-11-23 06:14:33'),
(59, 'c44a1a90-243d-483b-b0a3-65aae95037a8', '443e8200-defe-476a-83be-58e32bb45c8e', '2859c251-aabe-46f0-b62a-695cdcbfe35c', 'Ecoimagen', 'Ver portafolio', 'Ver portafolio', '3148198780', '', '2023-11-23 06:15:38'),
(60, 'df0072bc-3ace-4239-a45f-1d876bb71df7', '443e8200-defe-476a-83be-58e32bb45c8e', '7e8959aa-0669-430e-9eb9-17f0894f9b88', 'Idime', 'Ver portafolio', 'Ver portafolio', '3212008509', '', '2023-11-23 06:16:28'),
(61, '223cc7e7-dc53-477c-b7e2-d596f0d2ce2d', 'f2102d6f-583e-48d7-9f6c-1784da2047a3', '3da197ed-6cc9-48bf-a07f-e6a93a9d2b60', 'Freddy Niño Prato', '300.000', '250.000', '5715177-5943345', 'endocrinorte@hotmail.com', '2023-11-23 06:19:28'),
(62, 'b3800ed1-c6ab-454f-a0e6-30c3dc4d84e4', 'f2102d6f-583e-48d7-9f6c-1784da2047a3', '9ee38fdb-a0b4-4e78-8d50-3255ff34714c', 'Hugo Alvarado', '270.000', '170.000', '5730682', 'halvarado_md@hotmail.com', '2023-11-23 06:22:53'),
(63, '42d54be7-8979-4d39-8327-01d2309ffc8e', '4bf2edb2-f317-4aff-8876-e9b33388c40f', 'c66669d4-87a3-451f-b64f-e2333750b7ed', 'Gastromed', '300.000', '230.000', '5834089', '', '2023-11-23 06:24:17'),
(64, '6e324e63-2182-4053-9cdf-1d63530657eb', '28f1ca36-559a-4faf-bc28-1fb0c8aad9c8', 'bba31c32-c735-44f8-a497-af69b88c64e3', 'Centro de psicologia y terapias', '90.000', '50.000', '3003242519', '', '2023-11-23 06:32:43'),
(65, '6f91b114-5cf3-405a-afdb-05d33cdf9ffc', 'ebe6eb9e-de12-4ada-a58d-cfaccdab27b3', '2916bf18-4c2e-484a-97ab-c0a8727d936c', 'Somefir ltda', 'Ver portafolio', '140.000', '5891720 - 5891968 - 3008521200', '', '2023-11-23 06:34:05'),
(66, 'df9cb6f1-2f1f-416b-9ca6-d7bad7473751', '84cf0707-e968-43bd-aadd-199a487fa15e', 'af6a1ff4-6aa2-4ab7-b817-805d574203a6', 'Centro de psicologia y terapias', '80.000', '50.000', '3003242519', '', '2023-11-23 06:35:05'),
(67, '88e78cff-0238-4493-a8f5-a2e64cbfe97b', 'f5d28a55-4436-4433-93ed-31cdba015f1c', '271ed4f9-f462-469a-ad1c-7f38c006cab2', 'Gastromed', '250.000', '180.000', '3507282887', 'gastromedcucuta.gmail.com', '2023-11-23 06:36:55'),
(68, '74e6aba4-3d39-4e38-8c09-c9b8f3977801', '55bd0574-a13c-4ccd-9ed7-8388a934c9c3', '5a28fc7a-a09f-481b-a708-b800cc36e044', 'Bernardo Vega', '180.000', '110.000', '5717768', 'bernardovega54@hotmail.com', '2023-11-23 06:38:44'),
(69, 'd09b1289-7cbf-41a1-8680-5bfe6a1e88a9', '55bd0574-a13c-4ccd-9ed7-8388a934c9c3', '4a43e724-07c8-4eac-8f5d-f6fbc88b032a', 'Ximena Galeano', '200.000', '120.000', '5834254', 'maespesa@hotmail.com', '2023-11-23 06:40:29'),
(70, 'c58f0161-dfdf-44d2-a654-48c716497196', '55bd0574-a13c-4ccd-9ed7-8388a934c9c3', '3113b736-9702-456d-8f8b-bed42d257159', 'Orlando Villamizar', '180.000', '135.000', '', '', '2023-11-23 06:43:08'),
(71, '722d1063-3312-4fde-9825-e7c78a8e52b8', 'cd66b2b6-d86e-4ced-9b17-3985bb6a3a05', 'c8c7d1fb-9186-4ffa-95d7-8099b4979b45', 'Rafael Dario Rolon', '250.000', '100.000', '5714055', 'radaroldu@gmail.com', '2023-11-23 06:52:16'),
(72, '9b6fc8d7-6ac0-4342-aa9a-8d6b15540faf', 'baf04ae3-5934-4b6a-86be-7111f928550f', 'f91f1db6-ee12-46d4-8ff8-e8b9c656d146', 'Imagnorte', 'Ver portafolio', 'Ver portafolio', '3102388455', 'servicios@imagnorte.com', '2023-11-23 06:53:20'),
(74, 'cba5a739-69e1-4a00-9339-ab0c21c802ca', 'baf04ae3-5934-4b6a-86be-7111f928550f', 'b664eb10-4202-4039-942c-321b6a1676b5', 'Idime', 'Ver portafolio', 'Ver portafolio', '3212008509', '', '2023-11-23 06:54:01'),
(75, '6671a01e-2e7f-46f2-b64d-3ada9b1e2038', 'baf04ae3-5934-4b6a-86be-7111f928550f', '8f3bfb03-c67b-471c-827b-27f82eb2070d', 'Ecoimagen', 'Ver portafolio', 'Ver portafolio', '3148198780', '', '2023-11-23 06:54:39'),
(76, '837a94d9-a101-4cdf-b315-41d15f2fd5d8', '46b4ae1f-6320-4ba6-9131-04770fbeb6b8', 'ee4e3a16-63c9-47cd-94ee-adeb49ae6608', 'Scire clinical', 'Ver portafolio', 'Ver portafolio', '3148198780', 'gerencia@sciredx.com', '2023-11-23 06:55:49'),
(77, 'a3b8c68d-c058-42aa-808b-dac2e8b9575c', '8bdb4768-781e-45f6-97eb-9d79daf1e127', 'b66ba8fa-f2c3-49e8-895b-fa8f432e47d5', 'Carlos Figueredo', '250.000', '180.000', '5730619', '', '2023-11-23 06:57:02'),
(78, '5e327ee0-f74c-4cb0-bc79-6b073dd98b45', '107a124a-7553-45b0-a812-f87f01d130b5', '4c90b396-7654-4382-b1dd-2c82b2403627', 'Clinica los andes', '0', '80.000', '', '', '2023-11-23 06:59:50'),
(79, '49c024a5-0442-4657-a21e-7b372bcb3ec7', '107a124a-7553-45b0-a812-f87f01d130b5', '02671eaa-9de4-4dfe-a033-e723c0d9e52e', 'Mayra Lagos', '100.000', '80.000', '3012383022', '', '2023-11-23 07:00:33'),
(80, 'f4c0d0c7-4d51-4c34-b3bc-de4a7289d199', '107a124a-7553-45b0-a812-f87f01d130b5', 'd2bf6126-6f97-4f53-bd46-079022a49707', 'Milton Sanchez', '100.000', '80.000', '5713281', '', '2023-11-23 07:01:19'),
(81, 'ae25063b-4529-42b3-bc7f-6fa30852c8a2', '49a806cf-4bb2-48f0-8e30-aaf9eff24f76', '562fc3fa-fda2-4069-9fbe-4fcab37a45c0', 'Miguel Chain', '200.000', '90.000', '5831598', 'mchahinr@yahoo.es', '2023-11-23 07:02:48'),
(82, 'b8eaba8c-6727-429c-b6fc-950a5d9d0a2a', 'b52a3047-92b0-4eff-981f-06fc792755b4', 'a892db11-6230-42c6-b993-661b87a7cc18', 'Oscar Prada', '250.000', '200.000', '5896709-5722683-3176428442-3176428407', 'respirarsas@hotmail.com ', '2023-11-23 07:04:01'),
(83, '47e83041-e756-4795-b393-f82799aeb972', 'a1d77c61-c8af-4d5c-b8f5-9ee219cea3a4', '20075580-a827-455f-81e5-eee8510cc2e3', 'Felix Martin Bermudez', '180.000', '130.000', '5715439', '', '2023-11-23 07:04:59'),
(84, 'cde9ba37-1f3d-4875-a708-0cd79429362c', '43e809f6-8b09-4103-bc95-615be5aca63b', 'c262a581-4a24-44d6-b88b-316000a493ae', 'Somefir ltda', 'Ver portafolio', '140.000', '5891720 - 5891968 - 3008521200', '', '2023-11-23 07:05:41'),
(85, 'b7083899-60fe-4c63-845c-e0dfa4b860b7', '43e809f6-8b09-4103-bc95-615be5aca63b', '7bcc8d55-8e53-4587-81f7-0d58b1b0cc51', 'Rafael Fandiño', '350.000', '200.000', '5719723-5713495', '', '2023-11-23 07:06:39'),
(86, 'b1a6dbfd-da91-4bf6-a2eb-38eccab2adc7', '5bbf511b-b7a5-485b-8522-69cf34a8028c', 'da1690db-ece7-4c6f-bb29-8b2429dd3b54', 'Victor Antolinez', '220.000', '150.000', '3503832177', 'kantolinez2005@yahoo.com', '2023-11-23 07:07:56'),
(87, 'd1d76a57-656b-46c1-8013-026caae55cf7', '5bbf511b-b7a5-485b-8522-69cf34a8028c', '231e8af3-f659-4772-9433-fa81484fa89b', 'Somefir ltda', 'Ver portafolio', '140.000', '5891720 - 5891968 - 3008521200', '', '2023-11-23 07:09:57'),
(88, '34bcf81c-ffc9-4fd1-a929-2d69db5e3c83', '5bbf511b-b7a5-485b-8522-69cf34a8028c', 'a4fe7851-3b1d-474f-a968-914864d5fc6e', 'Coneuro', 'Ver portafolio', '240.000', '', '', '2023-11-23 07:10:43'),
(89, '5e848228-a7d4-4603-8267-c3d2102f6015', '0764247e-1734-46bb-80bd-fbc800eb81b2', 'a03b03ae-d462-4b52-8dff-99f4e18c0fb0', 'Alba Pérez Pedrozo', '30.000', '0', '', 'albapepe7@hotmail.com', '2023-11-23 07:11:54'),
(90, 'f2f33f0e-0790-45aa-8c03-4ab6fc906571', '0764247e-1734-46bb-80bd-fbc800eb81b2', '6f40bc43-51eb-4f7e-bfc4-51b9ec34d5ec', 'Alexandra Gonzalez', 'Ver portafolio', 'Ver portafolio', '3242246262', 'alexgonzavedo@gmail.com', '2023-11-23 07:13:32'),
(91, 'b955c8d9-01b8-4cdd-bbbc-534b3df8b143', '8bc92843-50f5-4ac1-b9c7-b5dfd2e0f6d7', '733b2e33-cfdf-493a-b3a9-db67df9c2dd2', 'Jairo Peñaranda', '210.000', '175.000', '3102388455', '', '2023-11-23 07:14:27'),
(92, '5a842d0c-d107-478d-b904-0d9a8a4073b1', '296b784d-49d1-451b-b5b1-ae1bca1e7920', '45fa3a61-46dc-4e8c-a3d5-5ba76f46d785', 'Daniel Aristizábal Olaya', '40.000', '15.000', '5714215', 'opticasaludvisual.15@hotmail.com', '2023-11-23 07:15:48'),
(93, '16a26d85-4db8-40f0-a95e-dc2c0d56532d', '296b784d-49d1-451b-b5b1-ae1bca1e7920', '712a4bac-0fcb-4ef3-9f71-4ca1602222df', 'Marcela Rolón', '70.000', '30.000', '3114448903', '', '2023-11-23 07:16:47'),
(94, '62535097-8bf6-40bc-813d-0fe0d4c6cac3', '94619fdc-8890-4bdf-8027-c68a1e72caf5', '6dd8750d-ec88-4ee0-83ad-31cc7f868682', 'Jesús Miguel Muriel', '250.000', '150.000', '3133965359-5922953-3112236887', 'chuchomurielotero@hotmail.com', '2023-11-23 07:18:11'),
(95, 'bad53d73-69bb-4b30-8f75-b0db01ea82d3', '94619fdc-8890-4bdf-8027-c68a1e72caf5', '589b362f-9227-457d-a19c-25767e02a0ae', 'Omar Páez', '250.000', '180.000', '5713690-5715956', 'sportcontact@yahoo.es', '2023-11-23 07:19:18'),
(96, '91c804be-1d4c-4d9f-aab4-846aa94fa44a', '94619fdc-8890-4bdf-8027-c68a1e72caf5', '84fb5d90-f753-41f6-879d-5d2d16227d77', 'Pedro Alfonso Fuentes', '220.000', '140.000', '5834333', 'CONSULTORIO401JERICO@hotmail.com', '2023-11-23 07:22:20'),
(97, 'c6070cdb-0810-4b3a-90c3-56bd92d7d41b', 'd95dd485-d93b-4812-9877-6f2334e94b95', 'd166cd74-cb9c-4dcc-8a61-157e83f884de', 'Luis Carlos Becerra', '220.000', '150.000', '5721271-3177189122', 'lcbecerraa72@yahoo.com', '2023-11-23 07:28:26'),
(98, 'e78c0095-4e73-4d81-afee-15654011eedb', 'a6e6e0ea-d89c-42c4-a8f4-dc37f4ad5ca4', '1ae6c453-ad88-455f-8997-d24391fd9593', 'Carlos Eduardo Parra', '220.000', '140.000', '3204422877', 'ceparram@yahoo.es', '2023-11-23 07:31:45'),
(99, 'e87c6d5b-ca52-471d-8ca1-3278cd6bea46', 'a6e6e0ea-d89c-42c4-a8f4-dc37f4ad5ca4', '58ebeff4-9992-4b58-858a-7712be1c2012', 'Iván E. Castiblanco', '300.000', '150.000', '5712367-5713690', 'ivancas29@hotmail.com', '2023-11-23 07:33:13'),
(100, '3bcbc941-c092-4d28-bc54-1e527611aba2', 'a6e6e0ea-d89c-42c4-a8f4-dc37f4ad5ca4', 'a8c4c654-afb2-41c4-92d3-f0753d578790', 'Jorge José Mirep Corona', '200.000', '120.000', '5717286', 'jjmc35@hotmail.com', '2023-11-23 07:34:32'),
(101, '780090ec-a991-402c-8e68-96a12656e71c', 'e840ca6c-f4f5-463c-b798-9003365ae530', 'fcdf9c22-799b-4a5e-8b7f-8c0643722a7d', 'Pedro E. Pérez', '80.000', '40.000', '5742311', 'pedroeliasperez@hotmail.com', '2023-11-23 07:35:48'),
(102, 'd2be765b-296b-4ed0-8d47-4dc9bfaf6d57', 'dc78bc14-6530-4ad1-a35f-31aadd2e0d4a', 'dade12de-74c8-46ab-b731-c29cb3d44abf', 'Carlos M. Cardenas', '160.000', '90.000', '5750681', 'mauriciocs@hotmail.com', '2023-11-23 07:44:09'),
(103, '7c1e2331-7e50-4ebd-9c43-20398267a78e', 'dc78bc14-6530-4ad1-a35f-31aadd2e0d4a', 'd0f40f10-9ebc-48dd-a55d-06c212376813', 'Luis Montaguth', '150.000', '90.000', '3103410325', '', '2023-11-23 07:46:08'),
(104, '60ca732d-8b28-4ec7-843c-bf8e5e2f8013', 'dc78bc14-6530-4ad1-a35f-31aadd2e0d4a', '5390e664-4aec-4ade-9f2d-3091c1f2adb7', 'Felix Martin Bermudez', '200.000', '140.000', '5717286 -571 5439', 'bermudezsantaella@hotmail.com', '2023-11-23 07:51:17'),
(105, 'd1803231-8cc5-48dc-8452-080b38ad17a0', 'a641979f-ed1f-4951-9bbb-8d42f1a91f1a', '5d51b888-b7c2-4e5c-9571-1fb421108bb2', 'Somefir ltda', 'Ver portafolio', '35.00', '', '', '2023-11-23 07:53:06'),
(106, '19710459-469b-41d3-9cf8-f01f889463c5', 'a641979f-ed1f-4951-9bbb-8d42f1a91f1a', 'b2543758-bd3a-4fab-b3b0-6d62edd91b58', 'Centro de psicologia y terapias', '160.000', '80.000', '5834029-3003242519', 'centrodepsicologia_@hotmail.com', '2023-11-23 07:55:44'),
(107, '41ca2659-e1c5-4484-a21f-e85ac670aa60', 'a641979f-ed1f-4951-9bbb-8d42f1a91f1a', 'b9055ddd-baca-4a65-8915-8e234369f445', 'Gastromed', '120.000', '90.000', '5891720 - 5891968 - 3008521200', 'gastromedcucuta.gmail.com', '2023-11-23 07:57:12'),
(108, '530d2564-d975-49cc-a2f6-3c80434a0d2b', '4ef41a95-14ff-487f-85d0-affd2074ba46', '4250e586-bc64-40b8-b548-a0086c0968cd', 'Jorge Ramirez', '300.000', '150.000', '3002026045', '', '2023-11-23 07:58:47'),
(109, '62cce5ef-18e2-454a-939a-a9a8da38164d', 'cee8456a-9fe8-451d-8c94-c4e33c5a4f3b', '934d8088-d7b3-449e-b860-c943c63725ac', 'Rayos X oral center', '290.000', '70.000', '', 'drbustamante@hotmail.com', '2023-11-23 08:02:18'),
(110, 'dfeb797e-f64a-462d-b6dd-33e16b01996a', '889ac0b3-1cdb-42b5-ac4a-f79dcd19e271', '77b9e147-e705-4bcf-9d76-aece7aff7983', 'Javier Ramirez', '290.000', '70.000', '6075886611 ext 101', 'bioreuma@hotmail.com', '2023-11-23 08:05:50'),
(111, 'e7e662d4-03a6-40b9-a75a-493e84bec170', '5005f934-a934-48ff-9893-72b5717fc481', '18de4668-77ed-464c-926a-c58e9406f047', 'Pedro Fuentes', '220.000', '140.000', '30042088848', 'pedrofuentes1@hotmail.com', '2023-11-23 08:07:48'),
(112, '4ca4c0c0-e6d0-4fd5-ae5b-62f7702f6341', 'f31dc3fe-e059-43a8-9627-8f20da55bdb4', 'b51cca4f-eabb-4512-a6f0-6248b489d70c', 'Julián Arenas', '240.000', '180.000', '(607)5715661-3223967989', '', '2023-11-23 08:12:28'),
(114, '24b7ec21-5cba-4169-b14d-a02df9f02a50', 'f31dc3fe-e059-43a8-9627-8f20da55bdb4', 'b51cca4f-eabb-4512-a6f0-6248b489d70c', 'Adriana Chavez', '240.000', '180.000', '3223967989', '', '2023-11-23 08:15:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL,
  `idEspecialidad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id`, `idEspecialidad`, `nombre`, `fechaRegistro`) VALUES
(2, 'b40f6edb-d4df-456b-a280-46d37658f8fa', 'Alergologia pediatrico', '2023-11-22 22:57:24'),
(3, '1aa0e65a-908d-48ec-b1a1-f0acee129d2b', 'Cardiologia', '2023-11-22 22:57:24'),
(4, '418148d3-b5f3-4d03-b890-b4690af8e4a8', 'Cardiologia pediatrica', '2023-11-22 22:57:24'),
(5, '7a76659f-8311-46a3-a605-4bc02d90efd5', 'Cirugia vascular', '2023-11-22 22:57:24'),
(6, '26b4558d-b53b-4a1f-9f7b-938c91a87792', 'Citología', '2023-11-22 22:57:24'),
(7, 'b1d764c1-51ed-4273-90f1-4d402bf1e669', 'Colonoscopia', '2023-11-22 22:57:24'),
(8, 'bea640a9-8d7d-40d4-9c93-fd7bbe7e9489', 'Dermatologia', '2023-11-22 22:57:24'),
(9, '3295337c-3b33-410c-9b00-0f681023be6e', 'Ecocardiografia y electrocardiograma pediatrico', '2023-11-22 22:57:24'),
(10, '6e3e90fc-d20a-433b-8c2e-571d7710244c', 'Ecocardiograma y electrocardiograma', '2023-11-22 22:57:24'),
(11, '443e8200-defe-476a-83be-58e32bb45c8e', 'Ecografias', '2023-11-22 22:57:24'),
(12, 'f2102d6f-583e-48d7-9f6c-1784da2047a3', 'Endocrinologia', '2023-11-22 22:57:24'),
(13, '4bf2edb2-f317-4aff-8876-e9b33388c40f', 'Endoscopia', '2023-11-22 22:57:24'),
(14, '28f1ca36-559a-4faf-bc28-1fb0c8aad9c8', 'Fonoaudiologia', '2023-11-22 22:57:24'),
(15, 'ebe6eb9e-de12-4ada-a58d-cfaccdab27b3', 'Fisiatria', '2023-11-22 22:57:24'),
(16, '84cf0707-e968-43bd-aadd-199a487fa15e', 'Fisioterapia', '2023-11-22 22:57:24'),
(17, 'f5d28a55-4436-4433-93ed-31cdba015f1c', 'Gastroenterologia ', '2023-11-22 22:57:24'),
(18, '55bd0574-a13c-4ccd-9ed7-8388a934c9c3', 'Ginecologia', '2023-11-22 22:57:24'),
(19, 'cd66b2b6-d86e-4ced-9b17-3985bb6a3a05', 'Ginecologia y obstetricia', '2023-11-22 22:57:24'),
(20, 'baf04ae3-5934-4b6a-86be-7111f928550f', 'Imágenes diagnosticas', '2023-11-22 22:57:24'),
(21, '46b4ae1f-6320-4ba6-9131-04770fbeb6b8', 'Laboratorio clinico', '2023-11-22 22:57:24'),
(22, '8bdb4768-781e-45f6-97eb-9d79daf1e127', 'Mastologo', '2023-11-22 22:57:24'),
(23, '107a124a-7553-45b0-a812-f87f01d130b5', 'Medicina general', '2023-11-22 22:57:24'),
(24, '49a806cf-4bb2-48f0-8e30-aaf9eff24f76', 'Medicina interna', '2023-11-22 22:57:24'),
(25, 'b52a3047-92b0-4eff-981f-06fc792755b4', 'Neumologia', '2023-11-22 22:57:24'),
(26, 'a1d77c61-c8af-4d5c-b8f5-9ee219cea3a4', 'Neumologia pediatrica', '2023-11-22 22:57:24'),
(27, '43e809f6-8b09-4103-bc95-615be5aca63b', 'Neurocirujano', '2023-11-22 22:59:22'),
(28, '5bbf511b-b7a5-485b-8522-69cf34a8028c', 'Neurologia', '2023-11-22 22:59:22'),
(29, '0764247e-1734-46bb-80bd-fbc800eb81b2', 'Odontología estetica', '2023-11-22 22:59:22'),
(30, '8bc92843-50f5-4ac1-b9c7-b5dfd2e0f6d7', 'Oftamologia', '2023-11-22 22:59:22'),
(31, '296b784d-49d1-451b-b5b1-ae1bca1e7920', 'Optometría', '2023-11-22 22:59:22'),
(32, '94619fdc-8890-4bdf-8027-c68a1e72caf5', 'Ortopedia', '2023-11-22 22:59:22'),
(33, 'd95dd485-d93b-4812-9877-6f2334e94b95', 'Ortopedia infantil', '2023-11-22 22:59:22'),
(34, 'a6e6e0ea-d89c-42c4-a8f4-dc37f4ad5ca4', 'Otorrinolaringologia', '2023-11-22 22:59:22'),
(35, 'e840ca6c-f4f5-463c-b798-9003365ae530', 'Patologia', '2023-11-22 22:59:22'),
(36, 'dc78bc14-6530-4ad1-a35f-31aadd2e0d4a', 'Pediatria', '2023-11-22 22:59:22'),
(37, 'a641979f-ed1f-4951-9bbb-8d42f1a91f1a', 'Psicologia', '2023-11-22 22:59:22'),
(38, '4ef41a95-14ff-487f-85d0-affd2074ba46', 'Psiquiatria', '2023-11-22 22:59:22'),
(39, 'cee8456a-9fe8-451d-8c94-c4e33c5a4f3b', 'Radiologia oral', '2023-11-22 22:59:22'),
(40, '889ac0b3-1cdb-42b5-ac4a-f79dcd19e271', 'Reumatologia', '2023-11-22 22:59:22'),
(41, '5005f934-a934-48ff-9893-72b5717fc481', 'Traumatologia', '2023-11-22 22:59:22'),
(42, 'f31dc3fe-e059-43a8-9627-8f20da55bdb4', 'Urologia', '2023-11-22 22:59:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `institucion`
--

CREATE TABLE `institucion` (
  `id` int(11) NOT NULL,
  `idInstitucion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `idEspecialidad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `institucion`
--

INSERT INTO `institucion` (`id`, `idInstitucion`, `nombre`, `direccion`, `idEspecialidad`, `fechaRegistro`) VALUES
(48, 'd30530ca-122b-4073-b21d-07e98b7d2ecd', 'Unidad pediatrica', 'Calle 5 no. 0e-10, Ceiba', 'b40f6edb-d4df-456b-a280-46d37658f8fa', '2023-11-22 23:33:00'),
(49, '884c2da0-9d46-46e1-889a-1284ffe0a287', 'Cardinor - centro especialistas jerico', 'Avenida 1 no. 15-43, La playa', '1aa0e65a-908d-48ec-b1a1-f0acee129d2b', '2023-11-22 23:33:00'),
(50, 'dd907165-93cf-4f1e-986e-29a8360b8176', 'Consultorio privado', 'Avenida 1 no 13-90, Consultorio 205', '418148d3-b5f3-4d03-b890-b4690af8e4a8', '2023-11-22 23:33:00'),
(51, 'e2d5b724-a16c-4710-9361-7674469718ce', 'Centro médico samanes, Consultorio 204', 'Avenida 12 e no. 4- 30, Colsag', '7a76659f-8311-46a3-a605-4bc02d90efd5', '2023-11-22 23:33:00'),
(52, '8cdd930d-007f-490e-b827-4b49c2c4a525', 'Ecoimagen', 'Calle 16a no. 2e-101, barrio blanco', '7a76659f-8311-46a3-a605-4bc02d90efd5', '2023-11-22 23:33:00'),
(53, '108d3df4-2ea3-4942-959e-1020c1c33c85', 'Centro de especialistas, santa ana cons 103', 'Avenida 11e no. 8- 15, Colsag', '26b4558d-b53b-4a1f-9f7b-938c91a87792', '2023-11-22 23:33:00'),
(54, '64c3e285-c2af-49d7-a66d-b6a0b596ac40', 'Gastromed', 'Calle 14 no. 2e-22, Caobos', 'b1d764c1-51ed-4273-90f1-4d402bf1e669', '2023-11-22 23:33:00'),
(55, 'bbd48ed8-0269-404f-b54c-c521b5f0b0a6', 'Edificio los almendros, cons 202', 'Avenida 2e no. 13-12, Caobos', 'bea640a9-8d7d-40d4-9c93-fd7bbe7e9489', '2023-11-22 23:33:00'),
(56, '4cb18495-b3a3-4dd0-a2c0-348f0befa93b', 'Centro médico norte, Cons 203 ', 'Avenida 1 no. 17-93, Centro', 'bea640a9-8d7d-40d4-9c93-fd7bbe7e9489', '2023-11-22 23:33:00'),
(57, '9a6f3f3c-cdf4-403a-bd6e-5f4965db69ba', 'Consultorio particular', 'Avenida 1 no. 13-90, Consultorio 205', '3295337c-3b33-410c-9b00-0f681023be6e', '2023-11-22 23:33:00'),
(59, 'f17cfbec-9ea7-457d-b2da-64430633c681', 'Cardinor - centro especialistas jerico', 'Avenida 1 no. 15-43, La playa', '6e3e90fc-d20a-433b-8c2e-571d7710244c', '2023-11-22 23:33:00'),
(60, '9e856997-2f6e-4b6d-9f29-a79b35358371', 'Centro medico de especialistas jerico, cons 407', 'Avenida 1 no. 15-43, La playa', '443e8200-defe-476a-83be-58e32bb45c8e', '2023-11-22 23:33:00'),
(61, '2859c251-aabe-46f0-b62a-695cdcbfe35c', 'Ecoimagen', 'Calle 16a  no. 2e-101, barrio caobos', '443e8200-defe-476a-83be-58e32bb45c8e', '2023-11-22 23:33:00'),
(62, '7e8959aa-0669-430e-9eb9-17f0894f9b88', 'Idime', 'Calle 12a no. 1e- 24, barrio caobos', '443e8200-defe-476a-83be-58e32bb45c8e', '2023-11-22 23:33:00'),
(63, '3da197ed-6cc9-48bf-a07f-e6a93a9d2b60', 'Endocrinorte', 'Calle 17a  no.1e -106, barrio caobos', 'f2102d6f-583e-48d7-9f6c-1784da2047a3', '2023-11-22 23:33:00'),
(64, '9ee38fdb-a0b4-4e78-8d50-3255ff34714c', 'Centro de especialistas san josé, cons 213 b', 'Calle 13 no. 1e-44, barrio caobos', 'f2102d6f-583e-48d7-9f6c-1784da2047a3', '2023-11-22 23:33:00'),
(65, 'c66669d4-87a3-451f-b64f-e2333750b7ed', 'Gastromed', 'Calle 14 no.2e-22, barrio caobos', '4bf2edb2-f317-4aff-8876-e9b33388c40f', '2023-11-22 23:33:00'),
(72, 'bba31c32-c735-44f8-a497-af69b88c64e3', 'Centro de psicologia y terapias', 'Calle 15a no. 1e-62, barrio caobos', '28f1ca36-559a-4faf-bc28-1fb0c8aad9c8', '2023-11-23 06:31:14'),
(73, '2916bf18-4c2e-484a-97ab-c0a8727d936c', 'Somefir ltda.', 'Calle 15 #3ae-06, barrio caobos', 'ebe6eb9e-de12-4ada-a58d-cfaccdab27b3', '2023-11-22 23:33:00'),
(74, 'af6a1ff4-6aa2-4ab7-b817-805d574203a6', 'Centro de psicologia y terapias', 'Calle 15a no. 1e-62, barrio caobos', '84cf0707-e968-43bd-aadd-199a487fa15e', '2023-11-22 23:33:00'),
(75, '271ed4f9-f462-469a-ad1c-7f38c006cab2', 'Gastromed', 'Calle 14 no.2e-22, barrio caobos', 'f5d28a55-4436-4433-93ed-31cdba015f1c', '2023-11-22 23:33:00'),
(76, '5a28fc7a-a09f-481b-a708-b800cc36e044', 'Vita', 'Avenida 1 # 21b - 29, barrio blanco', '55bd0574-a13c-4ccd-9ed7-8388a934c9c3', '2023-11-22 23:33:00'),
(77, '4a43e724-07c8-4eac-8f5d-f6fbc88b032a', 'Centro de especialistas san josé, consultorio 511 b', 'Calle 13 no. 1e-44, barrio caobos', '55bd0574-a13c-4ccd-9ed7-8388a934c9c3', '2023-11-22 23:33:00'),
(78, '3113b736-9702-456d-8f8b-bed42d257159', 'Consultorio de la mujer', 'Avenida 1 no. 17-14, la playa', '55bd0574-a13c-4ccd-9ed7-8388a934c9c3', '2023-11-22 23:33:00'),
(79, 'c8c7d1fb-9186-4ffa-95d7-8099b4979b45', 'Centro de especialistas san josé, consultorio 104 a ', 'Calle 13 no. 1e-44, barrio caobos', 'cd66b2b6-d86e-4ced-9b17-3985bb6a3a05', '2023-11-22 23:33:00'),
(80, 'f91f1db6-ee12-46d4-8ff8-e8b9c656d146', 'Imagnorte', 'Avenida 0 no 16-68, caobos', 'baf04ae3-5934-4b6a-86be-7111f928550f', '2023-11-22 23:47:26'),
(81, 'b664eb10-4202-4039-942c-321b6a1676b5', 'Idime', 'Calle 12a no. 1e- 24, barrio caobos', 'baf04ae3-5934-4b6a-86be-7111f928550f', '2023-11-22 23:47:26'),
(82, '8f3bfb03-c67b-471c-827b-27f82eb2070d', 'Ecoimagen', 'Calle 16a  no. 2e-101, barrio caobos', 'baf04ae3-5934-4b6a-86be-7111f928550f', '2023-11-22 23:47:26'),
(83, 'ee4e3a16-63c9-47cd-94ee-adeb49ae6608', 'Scire clinical', 'Avenida 0a no. 21-27 local 102, barrio blanco', '46b4ae1f-6320-4ba6-9131-04770fbeb6b8', '2023-11-22 23:47:26'),
(84, 'b66ba8fa-f2c3-49e8-895b-fa8f432e47d5', 'Centro especializado en enfermedades del seno', 'Avenida 0a no. 20-38, barrio blanco', '8bdb4768-781e-45f6-97eb-9d79daf1e127', '2023-11-22 23:47:26'),
(85, '4c90b396-7654-4382-b1dd-2c82b2403627', 'Clinica los andes', 'Av. 1 #17-21, barrio blanco', '107a124a-7553-45b0-a812-f87f01d130b5', '2023-11-22 23:47:26'),
(86, '02671eaa-9de4-4dfe-a033-e723c0d9e52e', 'Consultorio dra. mayra lagos', 'Av 11 #4-95 barrio carora / calle 2 #4e-110 la ceiba', '107a124a-7553-45b0-a812-f87f01d130b5', '2023-11-22 23:47:26'),
(87, 'd2bf6126-6f97-4f53-bd46-079022a49707', 'Ecoimagen', 'Calle 16a  no. 2e-101, barrio caobos', '107a124a-7553-45b0-a812-f87f01d130b5', '2023-11-22 23:47:26'),
(88, '562fc3fa-fda2-4069-9fbe-4fcab37a45c0', 'Centro medico 15', 'Calle 15 no. 0-19, centro', '49a806cf-4bb2-48f0-8e30-aaf9eff24f76', '2023-11-22 23:47:26'),
(89, 'a892db11-6230-42c6-b993-661b87a7cc18', 'Respirar ips unidad respiratoria de cucuta', 'Calle 15a no. 1e-31, barrio caobos', 'b52a3047-92b0-4eff-981f-06fc792755b4', '2023-11-22 23:47:26'),
(90, '20075580-a827-455f-81e5-eee8510cc2e3', 'Centro medico norte, cons 306', 'Avenida 1 no. 17-93 la playa', 'a1d77c61-c8af-4d5c-b8f5-9ee219cea3a4', '2023-11-22 23:47:26'),
(91, 'c262a581-4a24-44d6-b88b-316000a493ae', 'Somefir ltda', 'Calle 15 #3ae-06, barrio caobos', '43e809f6-8b09-4103-bc95-615be5aca63b', '2023-11-22 23:47:26'),
(92, '7bcc8d55-8e53-4587-81f7-0d58b1b0cc51', 'Centro medico norte', 'Avenida 1 no. 17-93, la playa', '43e809f6-8b09-4103-bc95-615be5aca63b', '2023-11-22 23:47:26'),
(93, 'da1690db-ece7-4c6f-bb29-8b2429dd3b54', 'Centro de especialistas san jose, cons 502 b', 'Calle 13 no. 1e-44, barrio caobos', '5bbf511b-b7a5-485b-8522-69cf34a8028c', '2023-11-22 23:47:26'),
(94, '231e8af3-f659-4772-9433-fa81484fa89b', 'Somefir ltda', 'Calle 15 #3ae-06, barrio caobos', '5bbf511b-b7a5-485b-8522-69cf34a8028c', '2023-11-22 23:47:26'),
(95, 'a4fe7851-3b1d-474f-a968-914864d5fc6e', 'Coneuro', 'Calle 7 no.11e-54, colsag', '5bbf511b-b7a5-485b-8522-69cf34a8028c', '2023-11-22 23:47:26'),
(96, 'a03b03ae-d462-4b52-8dff-99f4e18c0fb0', 'Consultorio odontologico alba perez', 'Avenida 4 no. 16-71, edificio la calera', '0764247e-1734-46bb-80bd-fbc800eb81b2', '2023-11-22 23:47:26'),
(97, '6f40bc43-51eb-4f7e-bfc4-51b9ec34d5ec', 'Centro comercial isla cero', 'Avenida 0 no. 12-44, local 16-24', '0764247e-1734-46bb-80bd-fbc800eb81b2', '2023-11-22 23:47:26'),
(98, '733b2e33-cfdf-493a-b3a9-db67df9c2dd2', 'Imagnorte', 'Avenida 0 no 16-68, caobos', '8bc92843-50f5-4ac1-b9c7-b5dfd2e0f6d7', '2023-11-22 23:47:26'),
(99, '45fa3a61-46dc-4e8c-a3d5-5ba76f46d785', 'Optica salud visual', 'Calle 15 no. 1-60, centro', '296b784d-49d1-451b-b5b1-ae1bca1e7920', '2023-11-22 23:47:26'),
(100, '712a4bac-0fcb-4ef3-9f71-4ca1602222df', 'Centro optico visualizar', 'Calle 11 no. 2-61, centro', '296b784d-49d1-451b-b5b1-ae1bca1e7920', '2023-11-22 23:47:26'),
(101, '6dd8750d-ec88-4ee0-83ad-31cc7f868682', 'Centro medico 15 / clinica san angel', 'Cll 15 no. 0-19, la playa / cll 15 no. 4e-25, caobos', '94619fdc-8890-4bdf-8027-c68a1e72caf5', '2023-11-22 23:47:26'),
(102, '589b362f-9227-457d-a19c-25767e02a0ae', 'Centro médico norte', 'Avenida 1 no.  17-93, consultorio 202 centro', '94619fdc-8890-4bdf-8027-c68a1e72caf5', '2023-11-22 23:47:26'),
(103, '84fb5d90-f753-41f6-879d-5d2d16227d77', 'Centro de especialistas jerico ', 'Avenida 1 no. 15-43 consultorio 401, la playa', '94619fdc-8890-4bdf-8027-c68a1e72caf5', '2023-11-22 23:47:26'),
(104, 'd166cd74-cb9c-4dcc-8a61-157e83f884de', 'Centro de especialistas jerico', 'Avenida 1 no. 15-43 consultorio 703, la playa', 'd95dd485-d93b-4812-9877-6f2334e94b95', '2023-11-22 23:47:26'),
(105, '1ae6c453-ad88-455f-8997-d24391fd9593', 'Centro médico norte, cons 305', 'Avenida 1 no. 17-93, centro', 'a6e6e0ea-d89c-42c4-a8f4-dc37f4ad5ca4', '2023-11-22 23:52:02'),
(106, '58ebeff4-9992-4b58-858a-7712be1c2012', 'Centro médico norte, cons 212', 'Avenida 1 no.  17-93, centro', 'a6e6e0ea-d89c-42c4-a8f4-dc37f4ad5ca4', '2023-11-22 23:52:02'),
(107, 'a8c4c654-afb2-41c4-92d3-f0753d578790', 'Centro médico norte, cons 303', 'Avenida 1 no.  17-93, centro', 'a6e6e0ea-d89c-42c4-a8f4-dc37f4ad5ca4', '2023-11-22 23:52:02'),
(108, 'fcdf9c22-799b-4a5e-8b7f-8c0643722a7d', 'Centro de especialistas santa ana', 'Avenida 11e no. 8- 15 consultorio 103, colsag', 'e840ca6c-f4f5-463c-b798-9003365ae530', '2023-11-22 23:52:02'),
(109, 'dade12de-74c8-46ab-b731-c29cb3d44abf', 'Unidad pediatrica', 'Calle 5 no. 0e-10, ceiba', 'dc78bc14-6530-4ad1-a35f-31aadd2e0d4a', '2023-11-22 23:52:02'),
(110, 'd0f40f10-9ebc-48dd-a55d-06c212376813', 'Orthomedic group', 'Avenida 1e no. 3-27, ceiba', 'dc78bc14-6530-4ad1-a35f-31aadd2e0d4a', '2023-11-22 23:52:02'),
(111, '5390e664-4aec-4ade-9f2d-3091c1f2adb7', 'Centro medico norte', 'Avenida 1 no.  17-93 consultorio 306, centro', 'dc78bc14-6530-4ad1-a35f-31aadd2e0d4a', '2023-11-22 23:52:02'),
(112, '5d51b888-b7c2-4e5c-9571-1fb421108bb2', 'Somefir ltda', 'Calle 15 #3ae-06, barrio caobos', 'a641979f-ed1f-4951-9bbb-8d42f1a91f1a', '2023-11-22 23:52:02'),
(113, 'b2543758-bd3a-4fab-b3b0-6d62edd91b58', 'Centro de psicologia y terapias', 'Calle 15a no. 1e-62, barrio caobos', 'a641979f-ed1f-4951-9bbb-8d42f1a91f1a', '2023-11-22 23:52:02'),
(114, 'b9055ddd-baca-4a65-8915-8e234369f445', 'Gastromed', 'Calle 14 no.2e-22, barrio caobos', 'a641979f-ed1f-4951-9bbb-8d42f1a91f1a', '2023-11-22 23:52:02'),
(115, '4250e586-bc64-40b8-b548-a0086c0968cd', 'Centro especialistas san jose, cons 406 b', 'Calle 13 no. 1e-44, barrio caobos', '4ef41a95-14ff-487f-85d0-affd2074ba46', '2023-11-22 23:52:02'),
(116, '934d8088-d7b3-449e-b860-c943c63725ac', 'Rx oral center c.c. el sol', 'Avenida 4 no. 9-23, centro', 'cee8456a-9fe8-451d-8c94-c4e33c5a4f3b', '2023-11-22 23:52:02'),
(117, '77b9e147-e705-4bcf-9d76-aece7aff7983', 'Consultorio privado', 'Calle 13 no. 2e-87, caobos', '889ac0b3-1cdb-42b5-ac4a-f79dcd19e271', '2023-11-22 23:52:03'),
(118, '18de4668-77ed-464c-926a-c58e9406f047', 'Centro de especialistas jerico cons 401', 'Avenida 1 no. 15-43, la playa', '5005f934-a934-48ff-9893-72b5717fc481', '2023-11-22 23:52:03'),
(119, 'b51cca4f-eabb-4512-a6f0-6248b489d70c', 'Centro medico libertadores', 'Calle 16 no. 0e-15', 'f31dc3fe-e059-43a8-9627-8f20da55bdb4', '2023-11-22 23:52:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estado` enum('ACTIVO','INACTIVO') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`idRol`, `nombre`, `fechaRegistro`, `estado`) VALUES
(1, 'Administrador', '2023-11-22 23:53:35', 'ACTIVO'),
(2, 'Asesor', '2023-11-22 23:53:35', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripciones`
--

CREATE TABLE `suscripciones` (
  `id` int(11) NOT NULL,
  `idSuscripcion` varchar(255) NOT NULL,
  `noContrato` varchar(50) NOT NULL,
  `fechaSuscripcion` date NOT NULL,
  `fechaVencimiento` date NOT NULL,
  `valor` varchar(100) NOT NULL,
  `metodoPago` enum('Transferencia','Tarjeta','Efectivo') NOT NULL,
  `idAsesor` varchar(255) NOT NULL,
  `tipoSuscripcion` enum('Nueva','Renovación') NOT NULL,
  `idSuscriptor` varchar(255) NOT NULL,
  `estado` enum('ACTIVA','INACTIVA','CANCELADA') NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `suscripciones`
--

INSERT INTO `suscripciones` (`id`, `idSuscripcion`, `noContrato`, `fechaSuscripcion`, `fechaVencimiento`, `valor`, `metodoPago`, `idAsesor`, `tipoSuscripcion`, `idSuscriptor`, `estado`, `fechaRegistro`) VALUES
(44, '334f2da1-21c5-42ea-bc1a-57cec3b5364e', 'ghgmnjdhgs', '2023-12-13', '2024-12-13', '2345678', 'Tarjeta', '10e0474a-ca11-49bd-8ed8-45c4d97938ce', 'Nueva', 'f9d02320-e1e0-439f-b9c1-42e20fa41455', 'ACTIVA', '2023-12-21 20:13:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscriptores`
--

CREATE TABLE `suscriptores` (
  `id` int(11) NOT NULL,
  `idSuscriptor` varchar(255) NOT NULL,
  `documento` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `primerApellido` varchar(100) NOT NULL,
  `segundoApellido` varchar(100) NOT NULL,
  `actividadEconomica` enum('Independiente','Pensionado','Asalariado') NOT NULL,
  `telefono` varchar(50) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `barrio` varchar(255) NOT NULL,
  `ciudad` varchar(255) NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `suscriptores`
--

INSERT INTO `suscriptores` (`id`, `idSuscriptor`, `documento`, `nombre`, `primerApellido`, `segundoApellido`, `actividadEconomica`, `telefono`, `fechaNacimiento`, `email`, `direccion`, `barrio`, `ciudad`, `fechaRegistro`) VALUES
(25, '53826397-a304-4db0-bae1-db1a1cad3335', '123456', 'Manuel', 'gutierrez', 'Salazar', 'Independiente', '98765432', '1997-11-12', 'Manuel@gmail.com', 'Calle 16A  No. 2E-101', 'Caobos', 'Cucuta', '2023-11-23 04:39:36'),
(26, '3f130dfb-d6da-4643-a0cb-9e04e13631e7', '45678', 'ghfvhc', 'dnsajkfh', 'sfgnbdsjka', 'Pensionado', '2345678', '1998-07-14', 'maria@example.com', 'djfgh', 'dfjghsj', 'rdfhgjhsjfhs', '2023-12-21 18:21:38'),
(27, '390b9071-5728-4803-87dd-29a61833fb1a', '12345676543', 'zdghfdhg', 'fgjdfhs', 'fturdhrd', 'Pensionado', '7654345678', '2023-12-13', 'valentinafernandez.S97@gmail.com', 'Calle 15 #3AE-06 Barrio Caobos', 'dfjghsj', 'jhgfthrfjykugkiu', '2023-12-21 20:06:02'),
(28, 'f9d02320-e1e0-439f-b9c1-42e20fa41455', '6787654', 'hjfgdfs', 'dghs', 'bfghrs', 'Asalariado', '2345678', '2023-12-14', 'Cesar.bayona@uniminuto.edu.co', 'cxvnmgxz', 'dtjhs', 'hfjdge', '2023-12-21 20:13:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `idUsuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `documento` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `passwordEncriptada` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `idRol` int(11) NOT NULL,
  `fechaRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=DYNAMIC;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `idUsuario`, `nombre`, `apellido`, `documento`, `email`, `passwordEncriptada`, `idRol`, `fechaRegistro`) VALUES
(29, 'e870d75e-91e8-4e9c-bcff-36f65671645f', 'valen', 'fernandez', '12321', 'valen@gmail.com', '$2b$10$ezgLBtIkPCCec1qF6U/3heLWFuph5mYhHiEdDOzDtQs8pSY1oxWfa', 1, '2023-10-07 15:21:37'),
(43, '10e0474a-ca11-49bd-8ed8-45c4d97938ce', 'Maria', 'Fernandez', '2345678', 'em1@gmail.com', '$2b$10$HjDeDfM0ORcM8NjY4xh35uvgCkSi1x4AKP2cR9oSWWtgjOhBlxeYi', 2, '2023-12-21 20:12:05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `beneficiarios`
--
ALTER TABLE `beneficiarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSuscriptor` (`idSuscriptor`),
  ADD KEY `idBeneficiario` (`idBeneficiario`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `convenio_ibfk_1` (`idConvenio`),
  ADD KEY `suscripcion_ibfk_1` (`idSuscripcion`),
  ADD KEY `usuario_ibfk_1` (`idUsuario`),
  ADD KEY `idCita` (`idCita`),
  ADD KEY `paciente` (`idPaciente`);

--
-- Indices de la tabla `contabilidad`
--
ALTER TABLE `contabilidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `convenio`
--
ALTER TABLE `convenio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idInstitucion` (`idInstitucion`),
  ADD KEY `idEspecialidad` (`idEspecialidad`),
  ADD KEY `idConvenio` (`idConvenio`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `idEspecialidad` (`idEspecialidad`) USING BTREE;

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idInstitucion` (`idInstitucion`),
  ADD KEY `idEspecialidad` (`idEspecialidad`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idRol`) USING BTREE;

--
-- Indices de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `suscriptor_ibfk_1` (`idSuscriptor`),
  ADD KEY `asesor_ibfk_1` (`idAsesor`),
  ADD KEY `idSuscripcion` (`idSuscripcion`);

--
-- Indices de la tabla `suscriptores`
--
ALTER TABLE `suscriptores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSuscriptor` (`idSuscriptor`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `rol_id` (`idRol`) USING BTREE,
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `documento` (`documento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `beneficiarios`
--
ALTER TABLE `beneficiarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT de la tabla `contabilidad`
--
ALTER TABLE `contabilidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `convenio`
--
ALTER TABLE `convenio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `institucion`
--
ALTER TABLE `institucion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `suscriptores`
--
ALTER TABLE `suscriptores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `beneficiarios`
--
ALTER TABLE `beneficiarios`
  ADD CONSTRAINT `fk_idSuscriptor` FOREIGN KEY (`idSuscriptor`) REFERENCES `suscripciones` (`idSuscriptor`) ON DELETE CASCADE;

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`idSuscripcion`) REFERENCES `suscripciones` (`idSuscripcion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`idConvenio`) REFERENCES `convenio` (`idConvenio`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `convenio`
--
ALTER TABLE `convenio`
  ADD CONSTRAINT `convenio_ibfk_1` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidad` (`idEspecialidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `convenio_ibfk_2` FOREIGN KEY (`idInstitucion`) REFERENCES `institucion` (`idInstitucion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD CONSTRAINT `institucion_ibfk_1` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidad` (`idEspecialidad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `suscripciones`
--
ALTER TABLE `suscripciones`
  ADD CONSTRAINT `suscripciones_ibfk_1` FOREIGN KEY (`idAsesor`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `suscripciones_ibfk_2` FOREIGN KEY (`idSuscriptor`) REFERENCES `suscriptores` (`idSuscriptor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
