DROP DATABASE IF EXISTS todo_db;
CREATE DATABASE todo_db;
USE todo_db;
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) UNIQUE NOT NULL, email VARCHAR(150) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL);
CREATE TABLE todos (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL, task VARCHAR(255) NOT NULL, is_completed BOOLEAN NOT NULL DEFAULT FALSE, FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE);
INSERT INTO users (username, email, password) VALUES
('Andi','andi@example.com','$2b$10$X2DCTEHJzujlkOJ0dRgwaOR8Ul2YTJzIqkVRzN3EpcS94H90DBfjy'),
('Budi','budi@example.com','$2b$10$X2DCTEHJzujlkOJ0dRgwaOR8Ul2YTJzIqkVRzN3EpcS94H90DBfjy'),
('Citra','citra@example.com','$2b$10$X2DCTEHJzujlkOJ0dRgwaOR8Ul2YTJzIqkVRzN3EpcS94H90DBfjy'),
('Doni','doni@example.com','$2b$10$X2DCTEHJzujlkOJ0dRgwaOR8Ul2YTJzIqkVRzN3EpcS94H90DBfjy');
INSERT INTO todos (user_id, task, is_completed) VALUES
(1,'Mengerjakan tugas sebelum deadline',FALSE),(1,'Belajar untuk ujian besok',FALSE),(2,'Merapikan folder tugas kuliah',TRUE),(2,'Mengerjakan laporan praktikum',FALSE),(2,'Push project ke GitHub',TRUE),(3,'Menyelesaikan tugas kelompok',FALSE),(3,'Membuat slide presentasi',FALSE),(3,'Cari tempat nyaman untuk nugas',TRUE),(4,'Mengerjakan tugas yang sudah ditunda seminggu',FALSE),(4,'Review materi sebelum praktikum',FALSE),(4,'Membalas chat kelompok yang sudah menunggu',TRUE);