

CREATE DATABASE hotel_db;
USE hotel_db;

-- Customers Table
CREATE TABLE Customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15)
);

-- Rooms Table
CREATE TABLE Rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_number INT UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status ENUM('available', 'booked') DEFAULT 'available'
);

-- Reservations Table
CREATE TABLE Reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    room_id INT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES Rooms(id) ON DELETE CASCADE
);

-- Admins Table
CREATE TABLE Admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Triggers
DELIMITER //

CREATE TRIGGER after_reservation_insert
AFTER INSERT ON Reservations
FOR EACH ROW
BEGIN
    UPDATE Rooms
    SET status = 'booked'
    WHERE id = NEW.room_id;
END;
//

CREATE TRIGGER after_reservation_delete
AFTER DELETE ON Reservations
FOR EACH ROW
BEGIN
    UPDATE Rooms
    SET status = 'available'
    WHERE id = OLD.room_id;
END;
//

DELIMITER ;

