-- 관리자 테이블
CREATE TABLE gs_manager (
    `sno` INT NOT NULL AUTO_INCREMENT ,
    `id` VARCHAR(20) NOT NULL COMMENT '회원 ID' ,
    `password` VARCHAR(100) NOT NULL COMMENT '회원 비밀번호(암호화)' ,
    `managerType` ENUM('admin','partner') NOT NULL COMMENT '회원 타입' ,
    `partnerSno` INT NOT NULL COMMENT '파트너 sno' ,
    `managerName` VARCHAR(100) NOT NULL COMMENT '회원 이름' ,
    `managerTel` VARCHAR(100) NOT NULL COMMENT '회원 전화번호' ,
    `managerEmail` VARCHAR(100) NOT NULL COMMENT '회원 이메일' ,
    `refreshToken` VARCHAR(500) NOT NULL COMMENT '회원 리프레쉬 토큰' ,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일' ,
    `updatedAt` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '수정일' ,
    PRIMARY KEY (`sno`))
;
