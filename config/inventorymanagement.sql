-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 22, 2025 at 04:28 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventorymanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `auditlogs`
--

CREATE TABLE `auditlogs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `brand_id` int(11) NOT NULL,
  `brand_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`brand_id`, `brand_name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Sample Brand', 'Sample Brand', 'Active', '2025-01-31 12:47:00', '2025-01-31 12:47:00');

-- --------------------------------------------------------

--
-- Table structure for table `cashier_registers`
--

CREATE TABLE `cashier_registers` (
  `register_id` int(11) NOT NULL,
  `cashier_id` int(11) DEFAULT NULL,
  `opening_balance` decimal(10,2) DEFAULT NULL,
  `closing_balance` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cashier_register_transactions`
--

CREATE TABLE `cashier_register_transactions` (
  `transaction_id` int(11) NOT NULL,
  `register_id` int(11) DEFAULT NULL,
  `transaction_type` enum('Cash In','Cash Out') NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `transaction_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(21, 'mm', 'mm', 'Active', '2025-02-07 04:17:29', '2025-02-07 04:17:29'),
(22, 'mmmmm', 'mmmmm', 'Active', '2025-02-07 04:48:39', '2025-02-07 04:48:39'),
(23, 'mmmmm', 'mmmmm', 'Active', '2025-02-07 04:48:40', '2025-02-07 04:48:40'),
(24, 'mmmmm', 'mmmmm', 'Active', '2025-02-07 04:48:40', '2025-02-07 04:48:40'),
(25, 'mmmmm', 'mmmmm', 'Inactive', '2025-02-07 04:48:41', '2025-02-07 04:48:58');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_adjustments`
--

CREATE TABLE `inventory_adjustments` (
  `adjustment_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `adjustment_type` enum('Increase','Decrease') NOT NULL,
  `quantity` int(11) NOT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `adjustment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_adjustments`
--

INSERT INTO `inventory_adjustments` (`adjustment_id`, `product_id`, `user_id`, `adjustment_type`, `quantity`, `reason`, `adjustment_date`, `created_at`, `updated_at`) VALUES
(1, 6, 0, 'Increase', 2, 'asdsad', '2025-02-01 01:59:10', '2025-02-01 01:59:10', '2025-02-01 01:59:10'),
(2, 17, 0, 'Increase', 12, 'asdsad', '2025-02-07 02:24:26', '2025-02-07 02:24:26', '2025-02-07 02:24:26'),
(3, 19, 0, 'Increase', 12, '12', '2025-02-07 02:28:23', '2025-02-07 02:28:23', '2025-02-07 02:28:23'),
(4, 19, 0, 'Increase', 12, 'asdasd', '2025-02-07 02:28:51', '2025-02-07 02:28:51', '2025-02-07 02:28:51'),
(5, 19, 0, 'Decrease', 121, 'adasda', '2025-02-07 02:29:52', '2025-02-07 02:29:52', '2025-02-07 02:29:52'),
(6, 19, 0, 'Decrease', 12, 'asdas', '2025-02-07 02:30:05', '2025-02-07 02:30:05', '2025-02-07 02:30:05'),
(7, 19, 0, 'Increase', 121, 'adsad', '2025-02-07 02:30:27', '2025-02-07 02:30:27', '2025-02-07 02:30:27'),
(8, 19, 0, 'Increase', 121, 'asdas', '2025-02-07 02:31:55', '2025-02-07 02:31:55', '2025-02-07 02:31:55'),
(9, 19, 0, 'Increase', 6, 'aasdasd', '2025-02-07 02:32:03', '2025-02-07 02:32:03', '2025-02-07 02:32:03'),
(10, 1, 0, 'Increase', 121, '', '2025-02-07 04:05:24', '2025-02-07 04:05:24', '2025-02-07 04:05:24'),
(11, 1, 0, 'Decrease', 42, '', '2025-02-07 04:05:32', '2025-02-07 04:05:32', '2025-02-07 04:05:32'),
(12, 1, 0, 'Increase', 500, '', '2025-02-07 04:40:41', '2025-02-07 04:40:41', '2025-02-07 04:40:41'),
(13, 1, 0, 'Decrease', 1, '', '2025-02-07 04:58:09', '2025-02-07 04:58:09', '2025-02-07 04:58:09'),
(14, 1, 0, 'Increase', 5, '', '2025-02-07 05:28:47', '2025-02-07 05:28:47', '2025-02-07 05:28:47'),
(15, 35, 0, '', 0, '', '2025-02-11 03:46:48', '2025-02-11 03:46:48', '2025-02-11 03:46:48'),
(16, 35, 0, '', 0, '', '2025-02-11 03:46:49', '2025-02-11 03:46:49', '2025-02-11 03:46:49'),
(17, 35, 0, '', 0, '', '2025-02-11 03:46:49', '2025-02-11 03:46:49', '2025-02-11 03:46:49'),
(18, 35, 0, '', 0, '', '2025-02-11 03:46:49', '2025-02-11 03:46:49', '2025-02-11 03:46:49'),
(19, 42, 1, 'Increase', 12, 'dasd', '2025-02-12 13:37:44', '2025-02-12 13:37:44', '2025-02-12 13:37:44'),
(20, 42, 1, 'Increase', 1, 'asdasd', '2025-02-12 13:38:15', '2025-02-12 13:38:15', '2025-02-12 13:38:15'),
(21, 37, 2, 'Increase', 121, 'sasdasd', '2025-02-19 14:25:29', '2025-02-19 14:25:29', '2025-02-19 14:25:29'),
(22, 36, 2, 'Decrease', 121, '1212', '2025-02-19 14:25:54', '2025-02-19 14:25:54', '2025-02-19 14:25:54'),
(23, 35, 2, 'Decrease', 121, '121212', '2025-02-19 14:27:48', '2025-02-19 14:27:48', '2025-02-19 14:27:48'),
(24, 37, 2, 'Increase', 3, 'asdasd', '2025-02-19 14:28:58', '2025-02-19 14:28:58', '2025-02-19 14:28:58'),
(25, 37, 2, '', 0, '', '2025-02-19 14:33:23', '2025-02-19 14:33:23', '2025-02-19 14:33:23'),
(26, 37, 2, 'Increase', 121, 'sadasd', '2025-02-19 14:33:32', '2025-02-19 14:33:32', '2025-02-19 14:33:32'),
(27, 34, 2, 'Increase', 787, '', '2025-02-21 12:52:10', '2025-02-21 12:52:10', '2025-02-21 12:52:10'),
(28, 43, 2, 'Increase', 131313, '', '2025-02-22 02:41:14', '2025-02-22 02:41:14', '2025-02-22 02:41:14'),
(29, 34, 2, 'Increase', 1212, '', '2025-02-22 02:45:27', '2025-02-22 02:45:27', '2025-02-22 02:45:27'),
(30, 43, 2, 'Increase', 2147483647, 'asdasd', '2025-02-22 02:45:43', '2025-02-22 02:45:43', '2025-02-22 02:45:43'),
(31, 43, 2, 'Increase', 121, '122', '2025-02-22 02:54:10', '2025-02-22 02:54:10', '2025-02-22 02:54:10'),
(32, 34, 2, 'Increase', 4, '', '2025-02-22 03:01:51', '2025-02-22 03:01:51', '2025-02-22 03:01:51'),
(33, 55, 2, 'Increase', 2, '', '2025-02-22 09:22:55', '2025-02-22 09:22:55', '2025-02-22 09:22:55'),
(34, 51, 2, 'Increase', 3, '', '2025-02-22 09:36:03', '2025-02-22 09:36:03', '2025-02-22 09:36:03');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_valuation`
--

CREATE TABLE `inventory_valuation` (
  `valuation_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `valuation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `quantity` int(11) NOT NULL,
  `unit_cost` decimal(10,2) NOT NULL,
  `total_value` decimal(10,2) GENERATED ALWAYS AS (`quantity` * `unit_cost`) STORED,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `type` enum('low_stock','restock') NOT NULL,
  `product_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `payment_method_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`payment_method_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'asdasd1212', 'Active', '2024-12-11 10:41:51', '2024-12-11 10:41:58'),
(2, ' cvcvcv', 'Active', '2024-12-11 10:42:04', '2024-12-11 10:42:04'),
(3, 'sadasd', 'Active', '2024-12-11 11:21:37', '2024-12-11 11:21:37'),
(4, 'assad', 'Active', '2024-12-11 11:21:54', '2024-12-11 11:21:54'),
(5, 'asdsad', 'Active', '2024-12-11 11:23:27', '2024-12-11 11:23:27'),
(6, 'adasd', 'Active', '2024-12-11 11:24:46', '2024-12-11 11:24:46'),
(7, 'asdasdasd', 'Active', '2024-12-11 11:25:27', '2024-12-11 11:25:27');

-- --------------------------------------------------------

--
-- Table structure for table `po_supplier`
--

CREATE TABLE `po_supplier` (
  `po_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('Received','Pending','Cancelled') NOT NULL DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `po_supplier`
--

INSERT INTO `po_supplier` (`po_id`, `user_id`, `supplier_id`, `product_id`, `order_date`, `quantity`, `unit_price`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(1, 0, 2, 5, '2025-02-14', 121, 121.00, 14641.00, 'Cancelled', '2025-02-07 09:22:57', '2025-02-12 12:02:17'),
(2, 0, 2, 5, '2025-02-21', 121, 121.00, 14641.00, 'Cancelled', '2025-02-07 09:37:36', '2025-02-11 03:01:32'),
(3, 0, 1, 5, '2025-02-14', 12, 12.00, 144.00, 'Cancelled', '2025-02-07 10:26:03', '2025-02-11 03:02:42'),
(4, 2, 2, 38, '2025-02-21', 12, 12.00, 144.00, 'Cancelled', '2025-02-13 15:00:24', '2025-02-14 06:29:35'),
(5, 2, 2, 33, '2025-02-26', 12, 12.00, 144.00, 'Received', '2025-02-14 04:30:33', '2025-02-14 04:30:38');

-- --------------------------------------------------------

--
-- Table structure for table `products_tbl`
--

CREATE TABLE `products_tbl` (
  `id` int(11) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `brand_id` int(11) NOT NULL,
  `uom_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `reorder_level` int(11) NOT NULL DEFAULT 0,
  `status` enum('Active','Cancelled') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products_tbl`
--

INSERT INTO `products_tbl` (`id`, `sku`, `name`, `user_id`, `category_id`, `supplier_id`, `brand_id`, `uom_id`, `price`, `stock_quantity`, `reorder_level`, `status`, `created_at`, `updated_at`) VALUES
(1, 'we123', 'asdasd', 0, 21, 2, 1, 1, 50.00, 20, 0, 'Active', '2025-02-07 04:22:26', '2025-02-07 07:21:03'),
(5, 'sku', 'sample', 0, 22, 1, 1, 1, 12.00, 892, 12, 'Active', '2025-02-07 07:22:01', '2025-02-17 12:30:19'),
(30, 'asdsdsdsdsdsd', 'sadsdfdfdf', 0, 21, 2, 1, 1, 99999999.99, -12, 0, 'Active', '2025-02-11 03:31:19', '2025-02-14 06:22:26'),
(31, 'sdsdsfdf', 'dfdfdfdf', 0, 21, 2, 1, 1, 4345454.00, 565, 5656, 'Active', '2025-02-11 03:31:58', '2025-02-11 03:31:58'),
(33, 'kjkjkj', 'jkjk', 0, 21, 2, 1, 1, 6767.00, 5680, 5656, 'Active', '2025-02-11 03:34:15', '2025-02-14 10:33:18'),
(34, 'asd', 'asd', 0, 21, 2, 1, 1, 10.00, 1747, 0, 'Active', '2025-02-11 03:38:14', '2025-02-22 12:46:14'),
(43, 'asdasdasdasd', 'asdasdasdas', 2, 21, 2, 1, 1, 121.00, 2147483647, 121, 'Active', '2025-02-22 01:43:20', '2025-02-22 02:45:43'),
(44, 'asdasdasd', 'asdasdasdasd', 2, 21, 2, 1, 1, 12.00, 0, 0, 'Active', '2025-02-22 09:09:53', '2025-02-22 09:09:53'),
(46, 'asdasdasdfgdfgdfg', 'asdasdasdasd', 2, 21, 2, 1, 1, 12.00, 0, 0, 'Active', '2025-02-22 09:10:36', '2025-02-22 09:10:36'),
(49, 'asdasdasdfgdfgdfgdfdfdf', 'asdasdasdasddfdfdfdf', 2, 21, 2, 1, 1, 12.00, 12, 12, 'Cancelled', '2025-02-22 09:10:57', '2025-02-22 09:36:16'),
(50, 'asddfdf', 'asaSAsASasa', 2, 21, 2, 1, 1, 1212.00, 1091, 1212, 'Active', '2025-02-22 09:13:00', '2025-02-22 10:56:14'),
(51, 'xcxc', 'xcxc', 2, 21, 2, 1, 1, 121.00, 1215, 1212, 'Cancelled', '2025-02-22 09:15:52', '2025-02-22 10:42:52'),
(52, 'hjhjhjhj', 'hjhjhjhj', 2, 21, 2, 1, 1, 12121212.00, 0, 0, 'Cancelled', '2025-02-22 09:17:18', '2025-02-22 09:23:36'),
(53, 'nmnmnmnm', 'nmnmnmnm', 2, 21, 2, 1, 1, 1212.00, 21212, 21, 'Cancelled', '2025-02-22 09:20:20', '2025-02-22 09:23:33'),
(55, 'jkjkjk', 'jkjkjk', 2, 21, 2, 1, 1, 78787.00, 80, 7, 'Cancelled', '2025-02-22 09:22:37', '2025-02-22 09:23:31'),
(56, 'klklklkl', 'xcxcxcxcx', 2, 21, 2, 1, 1, 1212.00, 121, 12, 'Cancelled', '2025-02-22 09:26:16', '2025-02-22 09:35:55'),
(57, 'klkklklkl', 'klklklkkl', 2, 21, 2, 1, 1, 78.00, 78, 7, 'Cancelled', '2025-02-22 09:33:40', '2025-02-22 09:35:52'),
(58, 'asdxcxcxc', 'asdxcxc', 2, 21, 2, 1, 1, 11212.00, 1212, 1212, 'Active', '2025-02-22 13:09:47', '2025-02-22 13:09:47');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_returns`
--

CREATE TABLE `purchase_returns` (
  `return_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `po_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `replaced_date` date DEFAULT NULL,
  `status` enum('Returned','Replaced') DEFAULT 'Returned',
  `updated_by` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchase_returns`
--

INSERT INTO `purchase_returns` (`return_id`, `user_id`, `po_id`, `product_id`, `quantity`, `return_date`, `reason`, `replaced_date`, `status`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 0, 5, 6, 11, '2025-02-14', 'damage', NULL, 'Returned', 0, '2025-02-01 01:52:32', '2025-02-01 01:52:32'),
(2, 0, 13, 6, 12, '2025-02-21', 'asd', NULL, 'Returned', 0, '2025-02-01 04:40:10', '2025-02-01 04:40:10'),
(3, 0, 1, 5, 12, '2025-02-14', 'asdasads', '2025-02-19', 'Replaced', 2, '2025-02-07 11:28:48', '2025-02-14 05:19:54'),
(4, 0, 3, 5, 2, '2025-02-19', '', '2025-02-20', 'Replaced', 2, '2025-02-11 02:49:39', '2025-02-14 05:17:47'),
(5, 0, 4, 38, 121, '2025-02-21', 'asdasdsd', '2025-02-17', 'Replaced', 2, '2025-02-14 02:51:09', '2025-02-14 05:18:26'),
(6, 2, 4, 38, 12, '2025-02-11', 'asadsadasdcxzzz', '2025-02-17', 'Replaced', 2, '2025-02-14 02:56:54', '2025-02-14 05:17:36'),
(7, 2, 5, 33, 12, '2025-02-13', '1212', '2025-02-20', 'Replaced', 2, '2025-02-14 04:30:46', '2025-02-14 05:34:09'),
(8, 2, 5, 34, 12, '2025-02-19', 'asdsad', NULL, 'Returned', 0, '2025-02-14 06:19:44', '2025-02-14 06:19:44'),
(11, 2, 5, 30, 12, '2025-02-07', '12121', NULL, 'Returned', 0, '2025-02-14 06:22:26', '2025-02-14 06:22:26'),
(14, 2, 13, 32, 121, '2025-02-20', '1212', NULL, 'Returned', 0, '2025-02-14 06:26:47', '2025-02-14 06:26:47'),
(15, 2, 2, 38, 121, '2025-02-11', 'sadsad', '2025-02-21', '', 0, '2025-02-14 06:53:03', '2025-02-17 12:27:19'),
(16, 2, 5, 38, 121, '2025-02-11', 'asdasdasd', NULL, 'Returned', 0, '2025-02-14 06:53:32', '2025-02-14 06:53:32'),
(17, 2, 2, 37, 121, '2025-02-12', 'adasasd', '2025-02-27', 'Replaced', 2, '2025-02-14 06:56:44', '2025-02-17 12:21:56'),
(18, 2, 3, 37, 12, '2025-02-11', 'saasd', NULL, 'Returned', 0, '2025-02-14 10:29:23', '2025-02-14 10:29:23'),
(19, 2, 1, 38, 12, '2025-03-05', 'aasd', '2025-02-27', '', 2, '2025-02-14 10:29:56', '2025-02-17 12:31:47'),
(20, 2, 3, 33, 121, '2025-02-20', 'kkjjk', '0000-00-00', 'Replaced', 2, '2025-02-14 10:32:48', '2025-02-14 10:33:18'),
(21, 2, 3, 5, 12, '2025-02-14', 'sdadasd', '0000-00-00', '', 0, '2025-02-17 11:38:48', '2025-02-17 12:30:19');

-- --------------------------------------------------------

--
-- Table structure for table `sales_tbl`
--

CREATE TABLE `sales_tbl` (
  `sales_transaction_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` enum('Completed','Cancelled') NOT NULL DEFAULT 'Completed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales_tbl`
--

INSERT INTO `sales_tbl` (`sales_transaction_id`, `user_id`, `transaction_date`, `total_amount`, `customer_id`, `product_id`, `quantity`, `unit_price`, `total_price`, `status`, `created_at`, `updated_at`) VALUES
(10, 2, '2025-02-20', 12.00, '12', 33, 12, 12.00, 144.00, 'Completed', '2025-02-13 16:38:47', '2025-02-13 16:38:47'),
(11, 2, '2025-02-25', 12.00, '12', 37, 121, 12.00, 1452.00, 'Completed', '2025-02-14 06:35:43', '2025-02-14 06:35:43'),
(12, 2, '2025-02-21', 12.00, '12', 37, 12, 12.00, 144.00, 'Completed', '2025-02-18 01:29:07', '2025-02-18 01:29:07'),
(13, 2, '2025-02-18', 121.00, '12', 34, 121, 121.00, 14641.00, 'Completed', '2025-02-18 01:57:45', '2025-02-18 01:57:45'),
(14, 2, '2026-06-18', 12.00, '12', 37, 12, 12.00, 144.00, 'Completed', '2025-02-18 02:22:55', '2025-02-18 02:22:55'),
(15, 2, '2025-02-22', 12.00, '12', 50, 121, 121.00, 14641.00, 'Completed', '2025-02-22 10:56:14', '2025-02-22 10:56:14'),
(16, 2, '2025-02-22', 121.00, '121', 34, 121, 121.00, 14641.00, 'Completed', '2025-02-22 12:45:12', '2025-02-22 12:45:12'),
(17, 2, '2025-02-22', 1212.00, '1212', 34, 12, 12.00, 144.00, 'Completed', '2025-02-22 12:46:14', '2025-02-22 12:46:14');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `contact` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `contact`, `email`, `address`) VALUES
(1, 'Sample Supplier', '989898989898', 'aws@gmail.com', 'Koronadal'),
(2, 'Marvin Boloabio', '99999999999', 'marvinboloabio1@gmail.com', 'Koronadal , South cotabato');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_payments`
--

CREATE TABLE `supplier_payments` (
  `payment_id` int(11) NOT NULL,
  `purchase_order_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_payments`
--

CREATE TABLE `transaction_payments` (
  `payment_id` int(11) NOT NULL,
  `sales_transaction_id` int(11) DEFAULT NULL,
  `payment_method_id` int(11) DEFAULT NULL,
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uoms`
--

CREATE TABLE `uoms` (
  `uom_id` int(11) NOT NULL,
  `uom_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `uoms`
--

INSERT INTO `uoms` (`uom_id`, `uom_name`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Pieces', 'Pieces', 'Active', '2025-01-31 12:45:47', '2025-01-31 12:45:47');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('admin','staff','cashier') NOT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `status`, `created_at`) VALUES
(1, 'kk', 'kk', 'kk@yahoo.com', 'staff', 'Active', '2025-01-05 12:36:12'),
(2, 'asd', 'asd', 'asd', 'admin', 'Active', '2025-01-05 13:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `warehouses`
--

CREATE TABLE `warehouses` (
  `warehouse_id` int(11) NOT NULL,
  `warehouse_name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `warehouses`
--

INSERT INTO `warehouses` (`warehouse_id`, `warehouse_name`, `location`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'asdasd', 'asdsadsd', 'asdsdsdsd', 'Active', '2024-12-10 12:06:21', '2024-12-10 12:06:21'),
(2, 'asd', 'asdasd', 'asdasds', 'Active', '2024-12-10 14:18:47', '2024-12-10 14:18:47'),
(3, 'asd2323', 'asdasd23232', 'asdasds32323', 'Active', '2024-12-10 14:18:48', '2024-12-10 14:35:26'),
(4, 'asdasd2323', 'asdsd2323', 'sdsdsdsd2323', 'Active', '2024-12-10 14:19:03', '2024-12-10 14:37:25'),
(5, 'assd6767', 'sdsd6767', 'sdsd676767', 'Active', '2024-12-10 14:20:24', '2024-12-10 14:36:01'),
(6, 'sdsd121212', 'sdsdsd1212', 'sdsdsd1212', 'Active', '2024-12-10 14:38:48', '2024-12-10 14:38:48'),
(7, 'sad5653434klkl', 'asdasd4343434klkl', 'asdasdsad3445556klkl', 'Active', '2024-12-10 14:40:09', '2024-12-10 14:43:19'),
(8, 'klklkl899898', 'klkljlk9889', 'lkklkllk8998', 'Active', '2024-12-10 14:46:11', '2024-12-10 14:46:45');

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_transfers`
--

CREATE TABLE `warehouse_transfers` (
  `transfer_id` int(11) NOT NULL,
  `from_warehouse_id` int(11) DEFAULT NULL,
  `to_warehouse_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `transfer_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auditlogs`
--
ALTER TABLE `auditlogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indexes for table `cashier_registers`
--
ALTER TABLE `cashier_registers`
  ADD PRIMARY KEY (`register_id`);

--
-- Indexes for table `cashier_register_transactions`
--
ALTER TABLE `cashier_register_transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `register_id` (`register_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `inventory_adjustments`
--
ALTER TABLE `inventory_adjustments`
  ADD PRIMARY KEY (`adjustment_id`),
  ADD KEY `inventory_adjustments_ibfk_1` (`product_id`);

--
-- Indexes for table `inventory_valuation`
--
ALTER TABLE `inventory_valuation`
  ADD PRIMARY KEY (`valuation_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`payment_method_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `po_supplier`
--
ALTER TABLE `po_supplier`
  ADD PRIMARY KEY (`po_id`);

--
-- Indexes for table `products_tbl`
--
ALTER TABLE `products_tbl`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `products_tbl_ibfk_2` (`supplier_id`),
  ADD KEY `products_tbl_ibfk_3` (`brand_id`),
  ADD KEY `products_tbl_ibfk_4` (`uom_id`),
  ADD KEY `products_tbl_ibfk_5` (`category_id`);

--
-- Indexes for table `purchase_returns`
--
ALTER TABLE `purchase_returns`
  ADD PRIMARY KEY (`return_id`),
  ADD KEY `purchase_returns_ibfk_1` (`po_id`),
  ADD KEY `purchase_returns_ibfk_2` (`product_id`);

--
-- Indexes for table `sales_tbl`
--
ALTER TABLE `sales_tbl`
  ADD PRIMARY KEY (`sales_transaction_id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier_payments`
--
ALTER TABLE `supplier_payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `purchase_order_id` (`purchase_order_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `transaction_payments`
--
ALTER TABLE `transaction_payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `sales_transaction_id` (`sales_transaction_id`),
  ADD KEY `payment_method_id` (`payment_method_id`);

--
-- Indexes for table `uoms`
--
ALTER TABLE `uoms`
  ADD PRIMARY KEY (`uom_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`warehouse_id`);

--
-- Indexes for table `warehouse_transfers`
--
ALTER TABLE `warehouse_transfers`
  ADD PRIMARY KEY (`transfer_id`),
  ADD KEY `from_warehouse_id` (`from_warehouse_id`),
  ADD KEY `to_warehouse_id` (`to_warehouse_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auditlogs`
--
ALTER TABLE `auditlogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cashier_registers`
--
ALTER TABLE `cashier_registers`
  MODIFY `register_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cashier_register_transactions`
--
ALTER TABLE `cashier_register_transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_adjustments`
--
ALTER TABLE `inventory_adjustments`
  MODIFY `adjustment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `inventory_valuation`
--
ALTER TABLE `inventory_valuation`
  MODIFY `valuation_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `payment_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `po_supplier`
--
ALTER TABLE `po_supplier`
  MODIFY `po_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products_tbl`
--
ALTER TABLE `products_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `purchase_returns`
--
ALTER TABLE `purchase_returns`
  MODIFY `return_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `sales_tbl`
--
ALTER TABLE `sales_tbl`
  MODIFY `sales_transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `supplier_payments`
--
ALTER TABLE `supplier_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_payments`
--
ALTER TABLE `transaction_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uoms`
--
ALTER TABLE `uoms`
  MODIFY `uom_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `warehouse_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `warehouse_transfers`
--
ALTER TABLE `warehouse_transfers`
  MODIFY `transfer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auditlogs`
--
ALTER TABLE `auditlogs`
  ADD CONSTRAINT `auditlogs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `cashier_register_transactions`
--
ALTER TABLE `cashier_register_transactions`
  ADD CONSTRAINT `cashier_register_transactions_ibfk_1` FOREIGN KEY (`register_id`) REFERENCES `cashier_registers` (`register_id`);

--
-- Constraints for table `inventory_valuation`
--
ALTER TABLE `inventory_valuation`
  ADD CONSTRAINT `inventory_valuation_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products_tbl`
--
ALTER TABLE `products_tbl`
  ADD CONSTRAINT `products_tbl_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`),
  ADD CONSTRAINT `products_tbl_ibfk_3` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`brand_id`),
  ADD CONSTRAINT `products_tbl_ibfk_4` FOREIGN KEY (`uom_id`) REFERENCES `uoms` (`uom_id`),
  ADD CONSTRAINT `products_tbl_ibfk_5` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `supplier_payments`
--
ALTER TABLE `supplier_payments`
  ADD CONSTRAINT `supplier_payments_ibfk_1` FOREIGN KEY (`purchase_order_id`) REFERENCES `purchase_orders` (`po_id`),
  ADD CONSTRAINT `supplier_payments_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`payment_method_id`);

--
-- Constraints for table `transaction_payments`
--
ALTER TABLE `transaction_payments`
  ADD CONSTRAINT `transaction_payments_ibfk_1` FOREIGN KEY (`sales_transaction_id`) REFERENCES `sales_transactions` (`sales_transaction_id`),
  ADD CONSTRAINT `transaction_payments_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`payment_method_id`);

--
-- Constraints for table `warehouse_transfers`
--
ALTER TABLE `warehouse_transfers`
  ADD CONSTRAINT `warehouse_transfers_ibfk_1` FOREIGN KEY (`from_warehouse_id`) REFERENCES `warehouses` (`warehouse_id`),
  ADD CONSTRAINT `warehouse_transfers_ibfk_2` FOREIGN KEY (`to_warehouse_id`) REFERENCES `warehouses` (`warehouse_id`),
  ADD CONSTRAINT `warehouse_transfers_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
