/*
 Navicat Premium Data Transfer

 Source Server         : pg-local
 Source Server Type    : PostgreSQL
 Source Server Version : 130010
 Source Host           : localhost:5434
 Source Catalog        : midway_egg
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130010
 File Encoding         : 65001

 Date: 06/10/2023 02:30:34
*/


-- ----------------------------
-- Table structure for dic
-- ----------------------------
DROP TABLE IF EXISTS "public"."dic";
CREATE TABLE "public"."dic" (
  "id" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(25) COLLATE "pg_catalog"."default",
  "type" varchar(10) COLLATE "pg_catalog"."default",
  "is_delete" bool,
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6)
)
;

-- ----------------------------
-- Records of dic
-- ----------------------------

-- ----------------------------
-- Table structure for doc
-- ----------------------------
DROP TABLE IF EXISTS "public"."doc";
CREATE TABLE "public"."doc" (
  "id" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(25) COLLATE "pg_catalog"."default",
  "dic_id" varchar(25) COLLATE "pg_catalog"."default",
  "sort" int2,
  "is_delete" bool,
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6)
)
;

-- ----------------------------
-- Records of doc
-- ----------------------------

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS "public"."goods";
CREATE TABLE "public"."goods" (
  "id" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(25) COLLATE "pg_catalog"."default",
  "space_id" varchar(25) COLLATE "pg_catalog"."default",
  "tags" varchar[][][] COLLATE "pg_catalog"."default",
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6)
)
;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO "public"."goods" VALUES ('GODmCS5aCn', '上衣', 'SPCqxymmRv', NULL, NULL, 'YSHI', '2022-05-25 21:36:13.841+08', NULL, '2022-05-25 21:36:13.841+08');
INSERT INTO "public"."goods" VALUES ('GODVAyfNXj', '秋衣', 'SPCqxymmRv', NULL, NULL, 'YSHI', '2022-05-25 21:37:03.422+08', NULL, '2022-05-25 21:37:03.422+08');
INSERT INTO "public"."goods" VALUES ('GODd3gjTU7', '秋裤', 'SPCqxymmRv', NULL, NULL, 'YSHI', '2022-05-25 21:37:09.967+08', NULL, '2022-05-25 21:37:09.967+08');

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE IF EXISTS "public"."schedule";
CREATE TABLE "public"."schedule" (
  "id" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "source_id" varchar(25) COLLATE "pg_catalog"."default",
  "type" varchar(50) COLLATE "pg_catalog"."default",
  "time_offsets" json,
  "cron" json,
  "receiver" json,
  "state" int4,
  "desc" varchar(50) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6),
  "action" varchar(50) COLLATE "pg_catalog"."default",
  "index" int2
)
;
COMMENT ON COLUMN "public"."schedule"."id" IS '主键';
COMMENT ON COLUMN "public"."schedule"."source_id" IS '定时器记录来源id';
COMMENT ON COLUMN "public"."schedule"."type" IS '定时器类型';
COMMENT ON COLUMN "public"."schedule"."time_offsets" IS '提醒时间偏移时间，形如：[{"unit":"days","num":1,"state":1}]';
COMMENT ON COLUMN "public"."schedule"."cron" IS '提醒时间，字符串数组，形如：["0","9","30","*","*","*"]';
COMMENT ON COLUMN "public"."schedule"."receiver" IS '消息接收人';
COMMENT ON COLUMN "public"."schedule"."state" IS '状态; 1:开启, 0: 关闭; 默认值为 1';
COMMENT ON COLUMN "public"."schedule"."desc" IS '定时器描述';
COMMENT ON COLUMN "public"."schedule"."creator" IS '创建人';
COMMENT ON COLUMN "public"."schedule"."created_at" IS '创建时间';
COMMENT ON COLUMN "public"."schedule"."modifier" IS '修改人';
COMMENT ON COLUMN "public"."schedule"."updated_at" IS '修改时间';
COMMENT ON COLUMN "public"."schedule"."action" IS '定时器功能作用';
COMMENT ON COLUMN "public"."schedule"."index" IS '定时器排序';

-- ----------------------------
-- Records of schedule
-- ----------------------------

-- ----------------------------
-- Table structure for space
-- ----------------------------
DROP TABLE IF EXISTS "public"."space";
CREATE TABLE "public"."space" (
  "id" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "pid" varchar(25) COLLATE "pg_catalog"."default",
  "name" varchar(25) COLLATE "pg_catalog"."default",
  "tags" varchar[][] COLLATE "pg_catalog"."default",
  "desc" varchar(255) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6),
  "qrcode" text COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of space
-- ----------------------------
INSERT INTO "public"."space" VALUES ('SPCqxymmRv', NULL, '床', NULL, NULL, NULL, '2022-05-25 10:50:32.776+08', NULL, '2022-05-25 10:50:32.776+08', NULL);
INSERT INTO "public"."space" VALUES ('SPCqxymmRV', 'SPCqxymmRv', '衣柜下层', NULL, NULL, NULL, '2022-05-23 19:45:39.44+08', NULL, '2022-05-23 19:45:39.44+08', NULL);
INSERT INTO "public"."space" VALUES ('SPCqxymMRv', 'SPCqxymmRv', '衣柜上层', NULL, NULL, NULL, '2022-05-23 19:45:39.44+08', NULL, '2022-05-23 19:45:39.44+08', NULL);
INSERT INTO "public"."space" VALUES ('SPCs_fWSII', NULL, '左衣柜', NULL, NULL, 'YSHI', '2022-05-31 16:03:54.244+08', NULL, '2022-05-31 16:03:54.244+08', NULL);
INSERT INTO "public"."space" VALUES ('SPCvL0jicL', NULL, '右衣柜', NULL, NULL, 'YSHI', '2022-05-31 16:05:14.692+08', NULL, '2022-05-31 16:05:14.692+08', NULL);

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS "public"."task";
CREATE TABLE "public"."task" (
  "id" varchar(32) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "content" varchar(100) COLLATE "pg_catalog"."default",
  "plan_time" timestamptz(6),
  "node" varchar(10) COLLATE "pg_catalog"."default",
  "history" jsonb,
  "is_archive" bool NOT NULL,
  "is_close" bool NOT NULL,
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamp(6)
)
;
COMMENT ON COLUMN "public"."task"."id" IS '主键 TODO';
COMMENT ON COLUMN "public"."task"."title" IS '标题';
COMMENT ON COLUMN "public"."task"."content" IS '内容';
COMMENT ON COLUMN "public"."task"."plan_time" IS '计划时间';
COMMENT ON COLUMN "public"."task"."node" IS '节点名称';
COMMENT ON COLUMN "public"."task"."history" IS '历史记录';
COMMENT ON COLUMN "public"."task"."is_archive" IS '是否归档';
COMMENT ON COLUMN "public"."task"."is_close" IS '是否关闭';
COMMENT ON COLUMN "public"."task"."creator" IS '创建人';
COMMENT ON COLUMN "public"."task"."created_at" IS '创建时间';
COMMENT ON COLUMN "public"."task"."modifier" IS '修改人';
COMMENT ON COLUMN "public"."task"."updated_at" IS '修改时间';

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO "public"."task" VALUES ('TODOHaeSt9', '测试', '测试', NULL, 'testing', '[{"node": "planning", "time": "2022-06-04T08:16:17.302Z", "index": 0}, {"node": "ongoing", "time": "2022-06-04T08:16:21.504Z"}, {"node": "testing", "time": "2022-06-04T08:21:41.742Z"}]', 'f', 'f', 'YSHI', '2022-06-04 16:16:17.303', 'YSHI', '2022-06-04 16:21:41.744');
INSERT INTO "public"."task" VALUES ('TODOI4jhEu', '归档', '归档', NULL, 'done', '[{"node": "planning", "time": "2022-06-04T08:22:43.932Z", "index": 0}, {"node": "ongoing", "time": "2022-06-04T08:22:48.275Z"}, {"node": "testing", "time": "2022-06-04T08:22:51.953Z"}, {"node": "done", "time": "2022-06-04T08:22:54.863Z"}]', 't', 'f', 'YSHI', '2022-06-04 16:22:43.932', 'YSHI', '2022-06-04 16:22:57.23');
INSERT INTO "public"."task" VALUES ('TODOSQdKhb', '回收站', '回收站', NULL, 'done', '[{"node": "planning", "time": "2022-06-04T08:24:03.335Z", "index": 0}, {"node": "ongoing", "time": "2022-06-04T08:24:07.089Z"}, {"node": "testing", "time": "2022-06-04T08:24:09.195Z"}, {"node": "done", "time": "2022-06-04T08:24:11.506Z"}]', 'f', 't', 'YSHI', '2022-06-04 16:24:03.336', 'YSHI', '2022-06-04 16:24:15.769');
INSERT INTO "public"."task" VALUES ('TASKdv_n52', '2', '2', NULL, 'testing', '[{"node": "planning", "time": "2022-06-25T05:13:44.574Z", "index": 0}, {"node": "ongoing", "time": "2022-06-25T07:31:35.836Z"}, {"node": "testing", "time": "2022-06-25T07:31:40.531Z"}]', 'f', 't', 'YSHI', '2022-06-25 13:13:44.577', NULL, '2022-06-25 15:38:21.955');
INSERT INTO "public"."task" VALUES ('TASKJJtfej', '123', '123', NULL, 'testing', '[{"node": "planning", "time": "2022-06-25T05:29:27.449Z", "index": 0}, {"node": "ongoing", "time": "2022-06-25T05:29:30.334Z"}, {"node": "testing", "time": "2022-06-25T07:31:53.090Z"}]', 'f', 't', 'YSHI', '2022-06-25 13:29:27.453', NULL, '2022-06-25 15:40:47.955');
INSERT INTO "public"."task" VALUES ('TODOCa95WV', '计划', '计划', NULL, 'planning', '[{"node": "planning", "time": "2022-06-04T08:15:51.742Z", "index": 0}]', 'f', 'f', 'YSHI', '2022-06-04 16:15:51.745', 'YSHI', '2022-06-04 16:15:51.745');
INSERT INTO "public"."task" VALUES ('TASK123', '测试', '测试内容', NULL, 'planning', '[{"node": "planning", "time": "2022-06-25T04:07:15.311Z", "index": 0}]', 'f', 'f', 'YSHI', '2022-06-25 12:07:15.315', NULL, '2022-06-25 12:07:15.315');
INSERT INTO "public"."task" VALUES ('TASKSGd8AM', '测试', '测试内容', NULL, 'planning', '[{"node": "planning", "time": "2022-06-25T05:04:46.941Z", "index": 0}]', 'f', 'f', 'YSHI', '2022-06-25 13:04:46.945', NULL, '2022-06-25 13:04:46.945');
INSERT INTO "public"."task" VALUES ('TASKDy099R', '123', '123', NULL, 'planning', '[{"node": "planning", "time": "2022-06-25T05:22:44.980Z", "index": 0}]', 'f', 'f', 'YSHI', '2022-06-25 13:22:44.984', NULL, '2022-06-25 13:22:44.984');
INSERT INTO "public"."task" VALUES ('TODOFEuf0I', '吃药', '按时吃药', NULL, 'done', '[{"node": "planning", "time": "2022-06-01T10:14:13.079Z", "index": 0}, {"node": "done", "time": "2022-06-04T08:15:24.736Z"}]', 't', 'f', 'YSHI', '2022-06-01 18:14:13.079', 'YSHI', '2022-06-25 15:30:50.741');
INSERT INTO "public"."task" VALUES ('TODOa5Y2BW', '吃饭', '按时吃饭', NULL, 'done', '[{"node": "planning", "time": "2022-06-01T10:09:43.469Z", "index": 0}, {"node": "ongoing", "time": "2022-06-01T10:54:10.704Z"}, {"node": "testing", "time": "2022-06-01T11:04:00.969Z"}, {"node": "done", "time": "2022-06-01T11:04:06.255Z"}]', 't', 'f', 'YSHI', '2022-06-01 18:09:43.471', 'YSHI', '2022-06-25 15:30:51.546');
INSERT INTO "public"."task" VALUES ('TODODbuAy9', '进行', '进行', NULL, 'done', '[{"node": "planning", "time": "2022-06-04T08:16:00.721Z", "index": 0}, {"node": "ongoing", "time": "2022-06-04T08:16:04.986Z"}, {"node": "testing", "time": "2022-06-25T06:19:01.367Z"}, {"node": "done", "time": "2022-06-25T06:19:32.215Z"}]', 't', 'f', 'YSHI', '2022-06-04 16:16:00.721', 'YSHI', '2022-06-25 15:31:12.028');
INSERT INTO "public"."task" VALUES ('TASKVRKhPn', '1', '1', NULL, 'ongoing', '[{"node": "planning", "time": "2022-06-25T05:20:21.339Z", "index": 0}, {"node": "ongoing", "time": "2022-06-25T07:32:00.422Z"}]', 'f', 'f', 'YSHI', '2022-06-25 13:20:21.342', NULL, '2022-06-25 15:32:00.422');
INSERT INTO "public"."task" VALUES ('TASKJ8aX0H', '3', '3', NULL, 'planning', '[{"node": "planning", "time": "2022-06-25T05:18:19.304Z", "index": 0}]', 'f', 't', 'YSHI', '2022-06-25 13:18:19.307', NULL, '2022-06-25 15:37:25.078');
INSERT INTO "public"."task" VALUES ('TODOCl0REY', '完成', '完成', NULL, 'done', '[{"node": "planning", "time": "2022-06-04T08:21:56.902Z", "index": 0}, {"node": "ongoing", "time": "2022-06-04T08:22:00.410Z"}, {"node": "testing", "time": "2022-06-04T08:22:02.853Z"}, {"node": "done", "time": "2022-06-04T08:22:05.552Z"}]', 'f', 'f', 'YSHI', '2022-06-04 16:21:56.903', 'YSHI', '2022-06-25 15:30:46.816');

-- ----------------------------
-- Table structure for task_node
-- ----------------------------
DROP TABLE IF EXISTS "public"."task_node";
CREATE TABLE "public"."task_node" (
  "id" varchar(20) COLLATE "pg_catalog"."default" NOT NULL,
  "name" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "alias" varchar(10) COLLATE "pg_catalog"."default",
  "sort" int2 NOT NULL,
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamp(6)
)
;
COMMENT ON COLUMN "public"."task_node"."id" IS '主键 TONO';
COMMENT ON COLUMN "public"."task_node"."name" IS '英文名';
COMMENT ON COLUMN "public"."task_node"."title" IS '标题';
COMMENT ON COLUMN "public"."task_node"."alias" IS '别名';
COMMENT ON COLUMN "public"."task_node"."sort" IS '排序';
COMMENT ON COLUMN "public"."task_node"."creator" IS '创建人';
COMMENT ON COLUMN "public"."task_node"."created_at" IS '创建时间';
COMMENT ON COLUMN "public"."task_node"."modifier" IS '修改人';
COMMENT ON COLUMN "public"."task_node"."updated_at" IS '修改时间';

-- ----------------------------
-- Records of task_node
-- ----------------------------
INSERT INTO "public"."task_node" VALUES ('TONO001', 'planning', '计划中', '计划', 0, 'YSHI', '2022-06-01 18:43:12', 'YSHI', '2022-06-04 11:56:57.795');
INSERT INTO "public"."task_node" VALUES ('TONO002', 'ongoing', '进行中', '进行', 1, 'YSHI', '2022-06-01 18:43:13', 'YSHI', '2022-06-01 18:43:13');
INSERT INTO "public"."task_node" VALUES ('TONO003', 'testing', '测试中', '测试', 2, 'YSHI', '2022-06-01 18:43:14', 'YSHI', '2022-06-01 18:43:14');
INSERT INTO "public"."task_node" VALUES ('TONO004', 'done', '已完成', '完成', 3, 'YSHI', '2022-06-01 18:43:15', 'YSHI', '2022-06-01 18:43:15');

-- ----------------------------
-- Table structure for todo
-- ----------------------------
DROP TABLE IF EXISTS "public"."todo";
CREATE TABLE "public"."todo" (
  "id" varchar(32) COLLATE "pg_catalog"."default" NOT NULL,
  "title" varchar(50) COLLATE "pg_catalog"."default" NOT NULL,
  "plan_time" timestamptz(6),
  "is_abiding" bool NOT NULL,
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamp(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamp(6),
  "is_archive" bool NOT NULL,
  "cycle_value" int2,
  "cycle_unit" int2,
  "period_value" int2,
  "period_unit" int2
)
;
COMMENT ON COLUMN "public"."todo"."id" IS '主键 TODO';
COMMENT ON COLUMN "public"."todo"."title" IS '标题';
COMMENT ON COLUMN "public"."todo"."plan_time" IS '计划时间';
COMMENT ON COLUMN "public"."todo"."is_abiding" IS '是否常驻';
COMMENT ON COLUMN "public"."todo"."creator" IS '创建人';
COMMENT ON COLUMN "public"."todo"."created_at" IS '创建时间';
COMMENT ON COLUMN "public"."todo"."modifier" IS '修改人';
COMMENT ON COLUMN "public"."todo"."updated_at" IS '修改时间';
COMMENT ON COLUMN "public"."todo"."is_archive" IS '是否归档';
COMMENT ON COLUMN "public"."todo"."cycle_value" IS '循环数值';
COMMENT ON COLUMN "public"."todo"."cycle_unit" IS '循环单位;1:秒,2:分,3:时,4:日,5:月,6:年';
COMMENT ON COLUMN "public"."todo"."period_value" IS '持续数值';
COMMENT ON COLUMN "public"."todo"."period_unit" IS '持续单位;1:秒,2:分,3:时,4:日,5:月,6:年';

-- ----------------------------
-- Records of todo
-- ----------------------------
INSERT INTO "public"."todo" VALUES ('TODOZETwYV', '做饭', '2022-06-30 19:00:00+08', 'f', 'YSHI', '2022-06-30 18:40:26.046', NULL, '2022-06-30 18:40:26.046', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOMdcdBz', '吃饭', '2022-07-05 12:00:00+08', 'f', 'YSHI', '2022-07-06 21:01:35.763', NULL, '2022-07-06 21:01:35.763', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODO54e7SM', '1', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:20:58.368', NULL, '2022-07-06 23:20:58.368', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOkrG3YZ', '2', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:21:04.381', NULL, '2022-07-06 23:21:04.381', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODO9BYVBe', '3', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:21:10.921', NULL, '2022-07-06 23:21:10.921', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOtkt76a', '4', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:21:16.294', NULL, '2022-07-06 23:21:16.294', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOK5gQby', '5', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:21:21.002', NULL, '2022-07-06 23:21:21.002', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOtp_R3M', '6', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:21:26.123', NULL, '2022-07-06 23:21:26.123', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOIQbS2e', '7', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:21:32.293', NULL, '2022-07-06 23:21:32.293', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODONNYULL', '8', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:21:38.629', NULL, '2022-07-06 23:21:38.629', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOny9td1', '9', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:21:45.856', NULL, '2022-07-06 23:21:45.856', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOq2VNdm', '10', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:00.899', NULL, '2022-07-06 23:24:00.899', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOepXs5C', '11', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:06.68', NULL, '2022-07-06 23:24:06.68', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODO1mZyBH', '12', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:12.552', NULL, '2022-07-06 23:24:12.552', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODON6Op7p', '13', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:17.175', NULL, '2022-07-06 23:24:17.175', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODO2OqxGj', '14', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:22.935', NULL, '2022-07-06 23:24:22.935', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOZXfk7l', '15', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:28.08', NULL, '2022-07-06 23:24:28.08', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOPoZC1Z', '16', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:35.171', NULL, '2022-07-06 23:24:35.171', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOKEA7NW', '17', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:43.11', NULL, '2022-07-06 23:24:43.11', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODO0a96PR', '18', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:48.64', NULL, '2022-07-06 23:24:48.64', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOhyytDR', '19', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:53.876', NULL, '2022-07-06 23:24:53.876', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOFZ9Oel', '20', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:24:59.437', NULL, '2022-07-06 23:24:59.437', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODO2dB5Yb', '详情页', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:28:02.785', NULL, '2022-07-06 23:28:02.785', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOUYLE_J', '修改页', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:28:14.102', NULL, '2022-07-06 23:28:14.102', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOQ2Tfc1', '新建页', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:28:27.128', NULL, '2022-07-06 23:28:27.128', 'f', NULL, NULL, NULL, NULL);
INSERT INTO "public"."todo" VALUES ('TODOQVHJ4g', '模仿', '2022-07-07 12:00:00+08', 'f', 'YSHI', '2022-07-06 23:28:38.633', NULL, '2022-07-06 23:28:38.633', 'f', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" varchar(25) COLLATE "pg_catalog"."default" NOT NULL,
  "nickname" varchar(25) COLLATE "pg_catalog"."default",
  "password" varchar(50) COLLATE "pg_catalog"."default",
  "creator" varchar(50) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6),
  "modifier" varchar(50) COLLATE "pg_catalog"."default",
  "updated_at" timestamptz(6)
)
;
COMMENT ON COLUMN "public"."user"."id" IS '主键';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO "public"."user" VALUES ('SPCE646Hv_', 'YSHI', '25d55ad283aa400af464c76d713c07ad', 'YSHI', '2022-06-20 19:08:03.026+08', NULL, '2022-06-20 19:08:03.026+08');
INSERT INTO "public"."user" VALUES ('SPCsJo_gRV', 'ys', '25d55ad283aa400af464c76d713c07ad', 'YSHI', '2022-06-22 17:19:26.745+08', NULL, '2022-06-22 17:19:26.745+08');

-- ----------------------------
-- Primary Key structure for table dic
-- ----------------------------
ALTER TABLE "public"."dic" ADD CONSTRAINT "dic_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table doc
-- ----------------------------
ALTER TABLE "public"."doc" ADD CONSTRAINT "doc_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table goods
-- ----------------------------
ALTER TABLE "public"."goods" ADD CONSTRAINT "goods_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table schedule
-- ----------------------------
ALTER TABLE "public"."schedule" ADD CONSTRAINT "schedule_record_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table space
-- ----------------------------
ALTER TABLE "public"."space" ADD CONSTRAINT "space_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table task
-- ----------------------------
ALTER TABLE "public"."task" ADD CONSTRAINT "todo_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table task_node
-- ----------------------------
ALTER TABLE "public"."task_node" ADD CONSTRAINT "todo_node_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table todo
-- ----------------------------
ALTER TABLE "public"."todo" ADD CONSTRAINT "todo_pkey1" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
