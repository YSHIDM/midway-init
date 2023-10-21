/*
 Navicat Premium Data Transfer

 Source Server         : pg-local
 Source Server Type    : PostgreSQL
 Source Server Version : 130010
 Source Host           : localhost:5434
 Source Catalog        : arrange_file
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130010
 File Encoding         : 65001

 Date: 06/10/2023 02:30:11
*/


-- ----------------------------
-- Sequence structure for user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."user_id_seq";
CREATE SEQUENCE "public"."user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;

-- ----------------------------
-- Table structure for A
-- ----------------------------
DROP TABLE IF EXISTS "public"."A";
CREATE TABLE "public"."A" (
  "id" int4 NOT NULL,
  "b_id" int4
)
;

-- ----------------------------
-- Records of A
-- ----------------------------
INSERT INTO "public"."A" VALUES (1, 1);

-- ----------------------------
-- Table structure for B
-- ----------------------------
DROP TABLE IF EXISTS "public"."B";
CREATE TABLE "public"."B" (
  "id" int4 NOT NULL,
  "a_id" int4
)
;

-- ----------------------------
-- Records of B
-- ----------------------------
INSERT INTO "public"."B" VALUES (1, NULL);
INSERT INTO "public"."B" VALUES (2, 1);

-- ----------------------------
-- Table structure for file_info
-- ----------------------------
DROP TABLE IF EXISTS "public"."file_info";
CREATE TABLE "public"."file_info" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "filename" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "format" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "duration" varchar COLLATE "pg_catalog"."default",
  "title" varchar COLLATE "pg_catalog"."default",
  "artist" varchar COLLATE "pg_catalog"."default",
  "md5" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "creator" varchar COLLATE "pg_catalog"."default",
  "modifier" varchar COLLATE "pg_catalog"."default",
  "size" varchar COLLATE "pg_catalog"."default",
  "created_at" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "updated_at" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of file_info
-- ----------------------------
INSERT INTO "public"."file_info" VALUES ('4eaf8b4f-3eaf-447a-b0ba-a7dc378afac0', 'D:\Projects\node\Project-Summary\视图\bpmn\api.bpmn', 'bpmn', NULL, NULL, NULL, 'b2316ee560b1a8ebb85c46871301c421', NULL, NULL, '826', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('0f93d4d9-7f13-4b8e-b1a8-4540030111bb', 'D:\Projects\node\Project-Summary\视图\bpmn\diagram-svg.svg', 'image2,svg', '0.040000', NULL, NULL, '521d28dde6d2943627a2ac80a44ca5ce', NULL, NULL, '21445', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('5463dd72-b996-464e-a206-ac873abbefde', 'D:\Projects\node\Project-Summary\视图\bpmn\diagram.bpmn', 'bpmn', NULL, NULL, NULL, 'c6146eb7bdee72f571fb8f7c044d71a7', NULL, NULL, '14475', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('4b7367f2-d3e4-4d23-ad44-2486ed3fe10a', 'D:\Projects\node\Project-Summary\视图\drawio_assets\actually_paid.html', 'html', NULL, NULL, NULL, 'dc17331eae1fc776ec576643338cc253', NULL, NULL, '1510', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('fcf8666a-e933-4230-ab24-24e1e0660035', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2.drawio', 'drawio', NULL, NULL, NULL, '64e492f6c3ef271e88afdd2a4339d2b8', NULL, NULL, '11564', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('3d1e5805-643a-4f9c-b576-28613f20bf01', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2.html', 'html', NULL, NULL, NULL, '985871c439970d0a9cf98302df0666db', NULL, NULL, '12312', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('b3ea79e0-98fc-45f0-a2ed-ebc66857b41d', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2.svg', 'svg_pipe', NULL, NULL, NULL, '1cb25c27bd1435738df5eadd784bf0a0', NULL, NULL, '287105', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('ec08be26-6b4b-4922-98e4-71699ae7757d', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2.xml', 'xml', NULL, NULL, NULL, 'a1cb0906a217a4f37be5b474c5b2bc8c', NULL, NULL, '16702', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('f480d2e2-7695-46fe-b1b4-74c864b5ed2b', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2_6x6.drawio', 'drawio', NULL, NULL, NULL, '6e84ea6e9424bd1bda65ce13432195d2', NULL, NULL, '80197', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('34b42b71-0578-4a6a-aace-7532f4cd4b4c', 'D:\Projects\node\Project-Summary\视图\drawio_assets\业务.drawio', 'drawio', NULL, NULL, NULL, '9f629d307125364e77dd42f7a823fb52', NULL, NULL, '3864', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('c941d983-9927-4306-9d75-916d08bfb8ea', 'D:\Projects\node\Project-Summary\视图\drawio_assets\金融产品.drawio', 'drawio', NULL, NULL, NULL, '0a917e77e2e5246e097ae4a912e10443', NULL, NULL, '2564', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('0510dab8-8a5d-4233-9a85-7defc7ad7bf2', 'D:\Projects\node\Project-Summary\视图\Graphviz\Graphviz.gv', 'gv', NULL, NULL, NULL, '2d2cc9d606da6cde66a5ae18b35a4c8a', NULL, NULL, '1492', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('a03fa4ea-25aa-4143-9b56-35a1276e52f9', 'D:\Projects\node\Project-Summary\视图\km-脑图\脑图.km', 'km', NULL, NULL, NULL, '473e74b68b01fe0087fa002937b17e5b', NULL, NULL, '4163', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('82a74606-1d0c-43af-b807-1e81c2424b22', 'D:\Projects\node\Project-Summary\视图\mind\KeZhou-egg.xmind', 'xmind', NULL, NULL, NULL, '655fc90675730ca0f5c7f9fe3b1aab91', NULL, NULL, '28698', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('c1ed325a-0bd5-4cba-b52c-f5092cb7e9d7', 'D:\Projects\node\Project-Summary\视图\mind\test.km', 'km', NULL, NULL, NULL, '11181a981604253134a97858deba4f0d', NULL, NULL, '1811', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('a76f557a-d507-4380-b898-c603dbcf5e14', 'D:\Projects\node\Project-Summary\视图\mind\test.xmind', 'xmind', NULL, NULL, NULL, '9c69dd85066cf6efe1fe8dd341f6b2a8', NULL, NULL, '40777', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('7243ef7c-dff9-4095-bb2f-134583bc2e75', 'D:\Projects\node\Project-Summary\视图\mind\事件.xmind', 'xmind', NULL, NULL, NULL, 'e35e79e106a7c694caf6aa779f8373ba', NULL, NULL, '71495', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('55d63d57-2936-491e-82d0-7da7e706793e', 'D:\Projects\node\Project-Summary\视图\mind\创建工作流.xmind', 'xmind', NULL, NULL, NULL, '9da7b7453242a91545cefe92822fae31', NULL, NULL, '42491', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('c5967ba3-1e26-47f9-bd87-24fba106e6da', 'D:\Projects\node\Project-Summary\视图\mind\发起流程.xmind', 'xmind', NULL, NULL, NULL, 'fccde3c9f123532138256794b963eca0', NULL, NULL, '110935', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('b04d9d33-de94-4b12-beb3-6b3edfe7f8b5', 'D:\Projects\node\Project-Summary\视图\mind\流程.xmind', 'xmind', NULL, NULL, NULL, 'a8bbda01f7de57c3c6c347a03a00fab0', NULL, NULL, '78006', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('b075dbc1-ded1-4886-ba24-b9b23ca919a2', 'D:\Projects\node\Project-Summary\视图\mind\消息.xmind', 'xmind', NULL, NULL, NULL, 'da78db096a4b64be9e1d9dfdc1584644', NULL, NULL, '40336', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('e6f4c98b-c8b7-4437-b137-51059265742d', 'D:\Projects\node\Project-Summary\视图\svg\test.svg', 'svg_pipe', NULL, NULL, NULL, '1e40dc7d3e17b0f4127e853801694e13', NULL, NULL, '815', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('2448b591-f17c-4a5c-8b5d-4fa5bc907450', 'D:\Projects\node\Project-Summary\视图\svg\test1.svg', 'svg_pipe', NULL, NULL, NULL, 'a6c2a67d3bbbe914a22657f21dcd5f56', NULL, NULL, '23976', '2023/3/9 14:25:47', '2023/3/9 14:25:47');
INSERT INTO "public"."file_info" VALUES ('76230d53-ea1a-48df-8d15-7ddb5b58f745', 'D:\Projects\node\Project-Summary\视图\bpmn\api.bpmn', 'bpmn', NULL, NULL, NULL, 'b2316ee560b1a8ebb85c46871301c421', NULL, NULL, '826', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('b61bac81-0de6-4445-80cb-eb68421ed4db', 'D:\Projects\node\Project-Summary\视图\bpmn\diagram-svg.svg', 'image2,svg', '0.040000', NULL, NULL, '521d28dde6d2943627a2ac80a44ca5ce', NULL, NULL, '21445', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('b5bfa199-b440-4319-ac43-6f90b5109ebe', 'D:\Projects\node\Project-Summary\视图\bpmn\diagram.bpmn', 'bpmn', NULL, NULL, NULL, 'c6146eb7bdee72f571fb8f7c044d71a7', NULL, NULL, '14475', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('312fda7e-43fd-4ad6-9599-0bd5545ae1ce', 'D:\Projects\node\Project-Summary\视图\drawio_assets\actually_paid.html', 'html', NULL, NULL, NULL, 'dc17331eae1fc776ec576643338cc253', NULL, NULL, '1510', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('d326d412-e29b-4e40-aa19-3354313fe766', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2.drawio', 'drawio', NULL, NULL, NULL, '64e492f6c3ef271e88afdd2a4339d2b8', NULL, NULL, '11564', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('942a80f1-bf60-4d80-817d-c5776732b385', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2.html', 'html', NULL, NULL, NULL, '985871c439970d0a9cf98302df0666db', NULL, NULL, '12312', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('b3915173-937e-4e0c-ada2-1c160e6cdf98', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2.svg', 'svg_pipe', NULL, NULL, NULL, '1cb25c27bd1435738df5eadd784bf0a0', NULL, NULL, '287105', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('e9bbe1e1-058f-42f5-ae5a-afbe1cc2d842', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2.xml', 'xml', NULL, NULL, NULL, 'a1cb0906a217a4f37be5b474c5b2bc8c', NULL, NULL, '16702', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('f5f3d0a1-cedf-4661-a810-d7f90477122d', 'D:\Projects\node\Project-Summary\视图\drawio_assets\assist2_6x6.drawio', 'drawio', NULL, NULL, NULL, '6e84ea6e9424bd1bda65ce13432195d2', NULL, NULL, '80197', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('e105fe3b-aa71-4833-bcca-b446a8ed5f0b', 'D:\Projects\node\Project-Summary\视图\drawio_assets\业务.drawio', 'drawio', NULL, NULL, NULL, '9f629d307125364e77dd42f7a823fb52', NULL, NULL, '3864', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('144a191c-c6d8-469e-b698-7e6272638a9d', 'D:\Projects\node\Project-Summary\视图\drawio_assets\金融产品.drawio', 'drawio', NULL, NULL, NULL, '0a917e77e2e5246e097ae4a912e10443', NULL, NULL, '2564', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('7799e360-327d-450f-8f0a-92f805e0119a', 'D:\Projects\node\Project-Summary\视图\Graphviz\Graphviz.gv', 'gv', NULL, NULL, NULL, '2d2cc9d606da6cde66a5ae18b35a4c8a', NULL, NULL, '1492', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('62094900-7fd1-41fe-9cdb-5632b31a78dc', 'D:\Projects\node\Project-Summary\视图\km-脑图\脑图.km', 'km', NULL, NULL, NULL, '473e74b68b01fe0087fa002937b17e5b', NULL, NULL, '4163', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('10fee86b-b3a4-4439-bd12-2ce0a3ae5778', 'D:\Projects\node\Project-Summary\视图\mind\KeZhou-egg.xmind', 'xmind', NULL, NULL, NULL, '655fc90675730ca0f5c7f9fe3b1aab91', NULL, NULL, '28698', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('d0ba24c1-343f-46c6-acb8-220b6fef8fcd', 'D:\Projects\node\Project-Summary\视图\mind\test.km', 'km', NULL, NULL, NULL, '11181a981604253134a97858deba4f0d', NULL, NULL, '1811', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('79faea3c-7797-4f70-9d10-1cdf1d05d90f', 'D:\Projects\node\Project-Summary\视图\mind\test.xmind', 'xmind', NULL, NULL, NULL, '9c69dd85066cf6efe1fe8dd341f6b2a8', NULL, NULL, '40777', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('d38174e0-6608-4f48-ab80-3b3322242c98', 'D:\Projects\node\Project-Summary\视图\mind\事件.xmind', 'xmind', NULL, NULL, NULL, 'e35e79e106a7c694caf6aa779f8373ba', NULL, NULL, '71495', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('92677b25-9b89-48dc-b291-e80298713c9f', 'D:\Projects\node\Project-Summary\视图\mind\创建工作流.xmind', 'xmind', NULL, NULL, NULL, '9da7b7453242a91545cefe92822fae31', NULL, NULL, '42491', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('2de754d3-f92e-44ee-adab-1d38fa2055a8', 'D:\Projects\node\Project-Summary\视图\mind\发起流程.xmind', 'xmind', NULL, NULL, NULL, 'fccde3c9f123532138256794b963eca0', NULL, NULL, '110935', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('e1eb17cd-e414-4ee2-b645-f6605ea91234', 'D:\Projects\node\Project-Summary\视图\mind\流程.xmind', 'xmind', NULL, NULL, NULL, 'a8bbda01f7de57c3c6c347a03a00fab0', NULL, NULL, '78006', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('ab033d85-cf98-4687-8ed2-57bb24c83a71', 'D:\Projects\node\Project-Summary\视图\mind\消息.xmind', 'xmind', NULL, NULL, NULL, 'da78db096a4b64be9e1d9dfdc1584644', NULL, NULL, '40336', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('d757e6d0-bf7e-4915-84fd-fffe87971076', 'D:\Projects\node\Project-Summary\视图\svg\test.svg', 'svg_pipe', NULL, NULL, NULL, '1e40dc7d3e17b0f4127e853801694e13', NULL, NULL, '815', '2023/3/19 16:36:45', '2023/3/19 16:36:45');
INSERT INTO "public"."file_info" VALUES ('e1d9e036-a25a-4e44-b144-62a0d91eecd1', 'D:\Projects\node\Project-Summary\视图\svg\test1.svg', 'svg_pipe', NULL, NULL, NULL, 'a6c2a67d3bbbe914a22657f21dcd5f56', NULL, NULL, '23976', '2023/3/19 16:36:45', '2023/3/19 16:36:45');

-- ----------------------------
-- Table structure for file_info_copy1
-- ----------------------------
DROP TABLE IF EXISTS "public"."file_info_copy1";
CREATE TABLE "public"."file_info_copy1" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
  "filename" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "format" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "duration" varchar COLLATE "pg_catalog"."default",
  "title" varchar COLLATE "pg_catalog"."default",
  "artist" varchar COLLATE "pg_catalog"."default",
  "md5" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "size" int4 NOT NULL,
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) NOT NULL,
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6) NOT NULL
)
;
COMMENT ON COLUMN "public"."file_info_copy1"."creator" IS '创建人';
COMMENT ON COLUMN "public"."file_info_copy1"."created_at" IS '创建时间';
COMMENT ON COLUMN "public"."file_info_copy1"."modifier" IS '修改人';
COMMENT ON COLUMN "public"."file_info_copy1"."updated_at" IS '修改时间';

-- ----------------------------
-- Records of file_info_copy1
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
  "age" int4 NOT NULL,
  "firstName" varchar COLLATE "pg_catalog"."default" NOT NULL,
  "lastName" varchar COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" VALUES (1, 25, 'Timber', 'Saw');

-- ----------------------------
-- Function structure for uuid_generate_v1
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v1mc
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v1mc"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v1mc"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v1mc'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v3
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v3"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v3"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v3'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v4
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v4"();
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v4"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v4'
  LANGUAGE c VOLATILE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_generate_v5
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_generate_v5"("namespace" uuid, "name" text);
CREATE OR REPLACE FUNCTION "public"."uuid_generate_v5"("namespace" uuid, "name" text)
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_generate_v5'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_nil
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_nil"();
CREATE OR REPLACE FUNCTION "public"."uuid_nil"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_nil'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_dns
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_dns"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_dns"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_dns'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_oid
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_oid"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_oid"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_oid'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_url
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_url"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_url"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_url'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Function structure for uuid_ns_x500
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."uuid_ns_x500"();
CREATE OR REPLACE FUNCTION "public"."uuid_ns_x500"()
  RETURNS "pg_catalog"."uuid" AS '$libdir/uuid-ossp', 'uuid_ns_x500'
  LANGUAGE c IMMUTABLE STRICT
  COST 1;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."user_id_seq"
OWNED BY "public"."user"."id";
SELECT setval('"public"."user_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table A
-- ----------------------------
ALTER TABLE "public"."A" ADD CONSTRAINT "A_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table B
-- ----------------------------
ALTER TABLE "public"."B" ADD CONSTRAINT "B_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table file_info
-- ----------------------------
ALTER TABLE "public"."file_info" ADD CONSTRAINT "PK_13933cc183be28374e28f2f8b87" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table file_info_copy1
-- ----------------------------
ALTER TABLE "public"."file_info_copy1" ADD CONSTRAINT "file_info_copy1_md5_key" UNIQUE ("md5");

-- ----------------------------
-- Primary Key structure for table file_info_copy1
-- ----------------------------
ALTER TABLE "public"."file_info_copy1" ADD CONSTRAINT "file_info_copy1_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table A
-- ----------------------------
ALTER TABLE "public"."A" ADD CONSTRAINT "b_id_fk" FOREIGN KEY ("b_id") REFERENCES "public"."B" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table B
-- ----------------------------
ALTER TABLE "public"."B" ADD CONSTRAINT "a_id_fk" FOREIGN KEY ("a_id") REFERENCES "public"."A" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
