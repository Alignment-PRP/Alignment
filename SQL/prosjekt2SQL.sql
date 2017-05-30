-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: mysql.stud.ntnu.no
-- Generation Time: 26. Mai, 2017 23:30 PM
-- Server-versjon: 5.5.54-0ubuntu0.12.04.1
-- PHP Version: 7.0.15-0ubuntu0.16.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `andrris_sprint4`
--
CREATE DATABASE IF NOT EXISTS `[DATABASE NAME HERE]` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `[DATABASE NAME HERE]`;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Category`
--

CREATE TABLE `Category` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `ClassRight`
--

CREATE TABLE `ClassRight` (
  `NAME` varchar(255) NOT NULL,
  `RID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `HasAccess`
--

CREATE TABLE `HasAccess` (
  `NAME` varchar(255) NOT NULL,
  `PID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `HasStructure`
--

CREATE TABLE `HasStructure` (
  `RID` int(11) NOT NULL,
  `SID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `HasSubCategory`
--

CREATE TABLE `HasSubCategory` (
  `RID` int(11) NOT NULL,
  `SID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Tabellstruktur for tabell `Project`
--

CREATE TABLE `Project` (
  `ID` int(11) NOT NULL,
  `managerID` varchar(255) NOT NULL,
  `creatorID` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(4095) DEFAULT '-',
  `isPublic` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Tabellstruktur for tabell `ProjectMetaData`
--

CREATE TABLE `ProjectMetaData` (
  `PID` int(11) NOT NULL,
  `securityLevel` int(11) NOT NULL,
  `transactionVolume` varchar(255) NOT NULL,
  `userChannel` varchar(255) NOT NULL,
  `deploymentStyle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `ProjectRequirements`
--

CREATE TABLE `ProjectRequirements` (
  `PID` int(11) NOT NULL,
  `RID` int(11) NOT NULL,
  `reqNo` varchar(255) NOT NULL,
  `reqCode` varchar(255) NOT NULL,
  `comment` varchar(4095) NOT NULL,
  `description` varchar(4096) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



--
-- Tabellstruktur for tabell `RequirementMetaData`
--

CREATE TABLE `RequirementMetaData` (
  `RID` int(11) NOT NULL,
  `reqResponsible` varchar(255) NOT NULL,
  `description` varchar(4095) NOT NULL,
  `comment` varchar(4095) NOT NULL DEFAULT 'No Comment',
  `reqCode` varchar(255) NOT NULL,
  `reqNo` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Requirements`
--

CREATE TABLE `Requirements` (
  `ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Rights`
--

CREATE TABLE `Rights` (
  `ID` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(4096) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `Rights`
--

INSERT INTO `Rights` (`ID`, `name`, `description`) VALUES
(1, 'AdminPanel', 'Determines whether or not the user has sufficient rights to view the admin only options'),
(2, 'UserClass write', 'The user has the right to create and edit user classes and their rights'),
(3, 'AllProjects read', 'The user has the right to view all created projects both public and private regardless of part of'),
(4, 'AllProjects write', 'The user has the right to edit (alter and delete) any project regardless of belonging'),
(5, 'Users write', 'The user has the right to create and edit users at will'),
(6, 'Requirements write', 'The user has the right to create and edit new global requirements and their metadata'),
(7, 'ProjectRequirements write', 'The user has the right to add and edit any project requirement'),
(8, 'Categories write', 'The user has the right to create and edit categories and subcategories');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Structure`
--

CREATE TABLE `Structure` (
  `ID` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `content` varchar(511) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `SubCategory`
--

CREATE TABLE `SubCategory` (
  `ID` int(11) NOT NULL,
  `catID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(4096) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `UserClass`
--

CREATE TABLE `UserClass` (
  `NAME` varchar(255) NOT NULL,
  `description` varchar(4096) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `UserClass`
--

INSERT INTO `UserClass` (`NAME`, `description`) VALUES
('Admin', 'Administrator of the system'),
('User', 'User - Normal user');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `UserHasAccess`
--

CREATE TABLE `UserHasAccess` (
  `USERNAME` varchar(255) NOT NULL,
  `PID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `UserHasClass`
--

CREATE TABLE `UserHasClass` (
  `USERNAME` varchar(255) NOT NULL,
  `NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `UserHasClass`
--

INSERT INTO `UserHasClass` (`USERNAME`, `NAME`) VALUES
('Admin', 'Admin'),
('User', 'User');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `Users`
--

CREATE TABLE `Users` (
  `USERNAME` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` binary(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `Users`
--

INSERT INTO `Users` (`USERNAME`, `firstName`, `lastName`, `email`, `pass`) VALUES
('Admin', 'Admin', 'Admin', 'Admin@admin.com', 0x243261243130246634344e4d49474865486a57626753477057312e7875692f7966512e56357a5a7445647436614f6463384434734167545079374f75),
('User', 'User', 'User', 'user@user.com', 0x243261243130242e75503642352e6a6d3447736e6a45594e2f62334a4f7750725459446d445843436e4164493237714c4c6a346f5035774c3164504b);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `ClassRight`
--
ALTER TABLE `ClassRight`
  ADD PRIMARY KEY (`NAME`,`RID`),
  ADD KEY `RID` (`RID`);

--
-- Indexes for table `HasAccess`
--
ALTER TABLE `HasAccess`
  ADD PRIMARY KEY (`NAME`,`PID`),
  ADD KEY `PID` (`PID`);

--
-- Indexes for table `HasStructure`
--
ALTER TABLE `HasStructure`
  ADD PRIMARY KEY (`RID`,`SID`),
  ADD KEY `HasStructure_ibfk_2` (`SID`);

--
-- Indexes for table `HasSubCategory`
--
ALTER TABLE `HasSubCategory`
  ADD PRIMARY KEY (`RID`,`SID`),
  ADD KEY `SID` (`SID`);

--
-- Indexes for table `Project`
--
ALTER TABLE `Project`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD KEY `Project_ibfk_1` (`managerID`),
  ADD KEY `Project_ibfk_2` (`creatorID`);

--
-- Indexes for table `ProjectMetaData`
--
ALTER TABLE `ProjectMetaData`
  ADD PRIMARY KEY (`PID`);

--
-- Indexes for table `ProjectRequirements`
--
ALTER TABLE `ProjectRequirements`
  ADD PRIMARY KEY (`PID`,`RID`),
  ADD KEY `ProjectRequirements_ibfk_2` (`RID`);

--
-- Indexes for table `RequirementMetaData`
--
ALTER TABLE `RequirementMetaData`
  ADD PRIMARY KEY (`RID`),
  ADD KEY `reqResponsible` (`reqResponsible`);

--
-- Indexes for table `Requirements`
--
ALTER TABLE `Requirements`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `Rights`
--
ALTER TABLE `Rights`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- Indexes for table `Structure`
--
ALTER TABLE `Structure`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `SubCategory`
--
ALTER TABLE `SubCategory`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `SubCategory_ibfk_1` (`catID`);

--
-- Indexes for table `UserClass`
--
ALTER TABLE `UserClass`
  ADD PRIMARY KEY (`NAME`),
  ADD UNIQUE KEY `NAME` (`NAME`);

--
-- Indexes for table `UserHasAccess`
--
ALTER TABLE `UserHasAccess`
  ADD PRIMARY KEY (`USERNAME`,`PID`);

--
-- Indexes for table `UserHasClass`
--
ALTER TABLE `UserHasClass`
  ADD PRIMARY KEY (`USERNAME`,`NAME`),
  ADD KEY `NAME` (`NAME`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`USERNAME`),
  ADD UNIQUE KEY `USERNAME` (`USERNAME`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `Project`
--
ALTER TABLE `Project`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;
--
-- AUTO_INCREMENT for table `Requirements`
--
ALTER TABLE `Requirements`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;
--
-- AUTO_INCREMENT for table `Rights`
--
ALTER TABLE `Rights`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `Structure`
--
ALTER TABLE `Structure`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=488;
--
-- AUTO_INCREMENT for table `SubCategory`
--
ALTER TABLE `SubCategory`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `ClassRight`
--
ALTER TABLE `ClassRight`
  ADD CONSTRAINT `ClassRight_ibfk_1` FOREIGN KEY (`RID`) REFERENCES `Rights` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `ClassRight_ibfk_2` FOREIGN KEY (`NAME`) REFERENCES `UserClass` (`NAME`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Begrensninger for tabell `HasAccess`
--
ALTER TABLE `HasAccess`
  ADD CONSTRAINT `HasAccess_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `Project` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `HasAccess_ibfk_2` FOREIGN KEY (`NAME`) REFERENCES `UserClass` (`NAME`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Begrensninger for tabell `HasStructure`
--
ALTER TABLE `HasStructure`
  ADD CONSTRAINT `HasStructure_ibfk_1` FOREIGN KEY (`RID`) REFERENCES `Requirements` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `HasStructure_ibfk_2` FOREIGN KEY (`SID`) REFERENCES `Structure` (`ID`) ON DELETE CASCADE;

--
-- Begrensninger for tabell `HasSubCategory`
--
ALTER TABLE `HasSubCategory`
  ADD CONSTRAINT `HasSubCategory_ibfk_1` FOREIGN KEY (`RID`) REFERENCES `Requirements` (`ID`),
  ADD CONSTRAINT `HasSubCategory_ibfk_2` FOREIGN KEY (`SID`) REFERENCES `SubCategory` (`ID`);

--
-- Begrensninger for tabell `Project`
--
ALTER TABLE `Project`
  ADD CONSTRAINT `Project_ibfk_1` FOREIGN KEY (`managerID`) REFERENCES `Users` (`USERNAME`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Project_ibfk_2` FOREIGN KEY (`creatorID`) REFERENCES `Users` (`USERNAME`) ON UPDATE CASCADE;

--
-- Begrensninger for tabell `ProjectMetaData`
--
ALTER TABLE `ProjectMetaData`
  ADD CONSTRAINT `ProjectMetaData_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `Project` (`ID`) ON DELETE CASCADE;

--
-- Begrensninger for tabell `ProjectRequirements`
--
ALTER TABLE `ProjectRequirements`
  ADD CONSTRAINT `ProjectRequirements_ibfk_1` FOREIGN KEY (`PID`) REFERENCES `Project` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `ProjectRequirements_ibfk_2` FOREIGN KEY (`RID`) REFERENCES `Requirements` (`ID`) ON DELETE CASCADE;

--
-- Begrensninger for tabell `RequirementMetaData`
--
ALTER TABLE `RequirementMetaData`
  ADD CONSTRAINT `RequirementMetaData_ibfk_1` FOREIGN KEY (`RID`) REFERENCES `Requirements` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `RequirementMetaData_ibfk_3` FOREIGN KEY (`reqResponsible`) REFERENCES `Users` (`USERNAME`) ON UPDATE CASCADE;

--
-- Begrensninger for tabell `SubCategory`
--
ALTER TABLE `SubCategory`
  ADD CONSTRAINT `SubCategory_ibfk_1` FOREIGN KEY (`catID`) REFERENCES `Category` (`ID`) ON DELETE CASCADE;

--
-- Begrensninger for tabell `UserHasClass`
--
ALTER TABLE `UserHasClass`
  ADD CONSTRAINT `UserHasClass_ibfk_1` FOREIGN KEY (`USERNAME`) REFERENCES `Users` (`USERNAME`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserHasClass_ibfk_2` FOREIGN KEY (`NAME`) REFERENCES `UserClass` (`NAME`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
