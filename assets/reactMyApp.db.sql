BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Chapter" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	"videoUrl"	TEXT,
	"chapterNumber"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "CompleteChapters" (
	"id"	INTEGER NOT NULL,
	"completeChapterId"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "TagType" (
	"type"	TEXT,
	"seq"	INTEGER,
	PRIMARY KEY("type")
);
CREATE TABLE IF NOT EXISTS "Tags" (
	"id"	INTEGER NOT NULL,
	"type"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("type") REFERENCES "TagType"("type")
);
CREATE TABLE IF NOT EXISTS "Button" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	"icon"	TEXT,
	"tag"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("tag") REFERENCES "Tags"("id")
);
CREATE TABLE IF NOT EXISTS "CourseList" (
	"id"	INTEGER NOT NULL,
	"name"	TEXT,
	"banner"	TEXT,
	"totalChapter"	INTEGER,
	"description"	TEXT,
	"slug"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "CL_Chapter" (
	"id"	INTEGER,
	"chapter_id_FK"	INTEGER,
	"CL_id_FK"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("CL_id_FK") REFERENCES "CourseList"("id"),
	FOREIGN KEY("chapter_id_FK") REFERENCES "Chapter"("id")
);
CREATE TABLE IF NOT EXISTS "CL_Tags" (
	"id"	INTEGER,
	"CL_id_FK"	INTEGER,
	"Tags_id_FK"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("Tags_id_FK") REFERENCES "Tags"("id"),
	FOREIGN KEY("CL_id_FK") REFERENCES "CourseList"("id")
);
CREATE TABLE IF NOT EXISTS "UEC_CC" (
	"id"	INTEGER,
	"uec_id_FK"	INTEGER,
	"cc_id_FK"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("cc_id_FK") REFERENCES "CompleteChapters"("id"),
	FOREIGN KEY("uec_id_FK") REFERENCES "UserEnrollCourse"("id")
);
CREATE TABLE IF NOT EXISTS "UserEnrollCourse" (
	"id"	INTEGER NOT NULL,
	"CourseId"	TEXT,
	"CourseList"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("CourseList") REFERENCES "CourseList"("id")
);
INSERT INTO "Chapter" ("id","name","videoUrl","chapterNumber") VALUES (1,'25 useful phrases for beginners','https://media.graphassets.com/UkzSxPuqThWEyIlQt4AL',1),
 (2,'25 useful Questions in everyday life','https://media.graphassets.com/rK685WMS5i8s1dYidza9',2),
 (3,'25 useful road signs ｜ Straßenschilder','https://media.graphassets.com/CuYVUxFKQoedmKQTYGdw',3),
 (4,'25 useful verbs for beginners','https://media.graphassets.com/ndLYpdHQOuocEICjwDeA',4),
 (5,'25 useful Wishes ｜ Wish someone ','https://media.graphassets.com/bTJ7HMRQTKyDowl1XSGR',5),
 (6,'Akkusativ｜ A2 - Lesson 1','https://media.graphassets.com/X8KZvh5TviAT6UZ4NRAf',1),
 (7,' Akkusativ ｜ A2 - Lesson 2','https://media.graphassets.com/aI0SpLQ06N59X91MaEjw',2),
 (8,'Character traits｜ A2 - Lesson 3','https://media.graphassets.com/5yQO3BPTCmSxhTcY5Z8g',3),
 (9,' Introducing yourself ｜ A2 - Lesson 4','https://media.graphassets.com/RW3dPhIwSdancrUh9kLO',4),
 (10,' S01E01 Demon Slayer','https://media.graphassets.com/rueMxV0KTqb7ldgVmMFa',1),
 (11,'S01E02 DemonSlayer','https://media.graphassets.com/2o7jI3VqQZOAcTL4Js4a',2);
INSERT INTO "TagType" ("type","seq") VALUES ('a1',1),
 ('a2',2),
 ('media',3),
 ('courses',4),
 ('all',5);
INSERT INTO "Tags" ("id","type") VALUES (1,'a1'),
 (2,'a2'),
 (3,'media'),
 (4,'courses'),
 (5,'all');
INSERT INTO "Button" ("id","name","icon","tag") VALUES (1,'A1','https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/lKG35mftSb6kyr0wwWOq',1),
 (2,'A2','https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/aNloJTxXSuuTnCp99V4E',2),
 (3,'Media','https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/NGfzLB05Q9iyjZVSqGYU',3),
 (4,'All','https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/CpNYqsZtTBm46rDjDmhO',5);
INSERT INTO "CourseList" ("id","name","banner","totalChapter","description","slug") VALUES (1,'A1 Course, Part I','https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/lKG35mftSb6kyr0wwWOq',5,'This is a beginner friendly course for learning needed information to reach A1 in german!','a1-part-i-course'),
 (2,'A2 Course,  Part I','https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/aNloJTxXSuuTnCp99V4E',4,'It''s a great course to continue your goal towards reaching A2 in german.','a2-part-i-course'),
 (3,'Media','https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/NGfzLB05Q9iyjZVSqGYU',2,'Watch various media in german!','media-anim-course'),
 (4,'A1 Course, Part II','https://media.graphassets.com/output=format:jpg/resize=height:800,fit:max/lKG35mftSb6kyr0wwWOq',0,'This course is still in progress! Please wait for it to be updated! ','a1-part-ii-course');
INSERT INTO "CL_Chapter" ("id","chapter_id_FK","CL_id_FK") VALUES (1,1,1),
 (2,2,1),
 (3,3,1),
 (4,4,1),
 (5,5,1),
 (6,6,2),
 (7,7,2),
 (8,8,2),
 (9,9,2),
 (10,10,3),
 (11,11,3);
INSERT INTO "CL_Tags" ("id","CL_id_FK","Tags_id_FK") VALUES (1,1,1),
 (2,1,4),
 (3,1,5),
 (4,2,2),
 (5,2,4),
 (6,2,5),
 (7,3,3),
 (8,3,5),
 (9,4,1),
 (10,4,4),
 (11,4,5);
COMMIT;
