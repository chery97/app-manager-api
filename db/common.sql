-- 관리자 테이블
CREATE TABLE gs_users (
    `sno` INT NOT NULL AUTO_INCREMENT ,
    `id` VARCHAR(20) NOT NULL COMMENT '회원 ID' ,
    `password` VARCHAR(100) NOT NULL COMMENT '회원 비밀번호(암호화)' ,
    `userType` ENUM('admin','partner') NOT NULL COMMENT '회원 타입' ,
    `userName` VARCHAR(100) NOT NULL COMMENT '회원 이름' ,
    `userTel` VARCHAR(100) NOT NULL COMMENT '회원 전화번호' ,
    `userEmail` VARCHAR(100) NOT NULL COMMENT '회원 이메일' ,
    `refreshToken` VARCHAR(500) NOT NULL COMMENT '회원 리프레쉬 토큰' ,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일' ,
    `updatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일' ,
    PRIMARY KEY (`sno`))
;

-- 관리자 정보 테이블
CREATE TABLE `gs_userInfo` (
   `sno` int NOT NULL AUTO_INCREMENT,
   `userNo` int DEFAULT NULL,
   `name` varchar(100) NOT NULL,
   `email` varchar(100) NOT NULL,
   `tel` varchar(100) DEFAULT NULL,
   `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
   `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`sno`)
)

CREATE TABLE `gs_appDesign`
(
    `sno`       int NOT NULL AUTO_INCREMENT,
    `userNo`    int NOT NULL,
    `appId`    int NOT NULL,
    `imgUrl`    varchar(500) DEFAULT NULL,
    `duration`  int          DEFAULT NULL,
    `createdAt` timestamp NULL DEFAULT NULL,
    `updatedAt` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`sno`)
)

-- 앱 하단탭 디자인 테이블
CREATE TABLE gs_appTabDesign (
   sno INT auto_increment NOT NULL,
   userNo INT NULL,
   appId INT NOT NULL COMMENT '앱ID',
   tabData TEXT NULL COMMENT '하단탭 json 데이터',
   createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
   updatedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY (`sno`)
)

CREATE TABLE `gs_userToken` (
    sno INT NOT NULL AUTO_INCREMENT,
    userNo INT NOT NULL,
    deviceInfo TEXT NOT NULL,
    ip VARCHAR(255) DEFAULT NULL,
    uuid TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    refreshToken TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
    createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`sno`)
)
