-- =============================================================================
-- Diagram Name: 47rest
-- Created on: 04.01.2017 20:21:07
-- Diagram Version: 
-- =============================================================================
CREATE SCHEMA "koa";

CREATE TABLE "koa"."obj_user" (
	"id_user" SERIAL NOT NULL,
	"user_email" varchar NOT NULL,
	"user_name" varchar NOT NULL,
	"user_password" varchar NOT NULL,
	CONSTRAINT "obj_user_pkey" PRIMARY KEY("id_user")
)
WITH (
	OIDS = False
);

CREATE UNIQUE INDEX "idx_user_email" ON "koa"."obj_user" (
	"user_email"
);


COMMENT ON TABLE "koa"."obj_user" IS 'Пользователи';



