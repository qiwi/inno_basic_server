-- =============================================================================
-- Diagram Name: inno_basic_server
-- Created on: 4/17/2018 3:58:07 PM
-- Diagram Version: 
-- =============================================================================

CREATE TABLE "obj_user" (
	"id_user" SERIAL NOT NULL,
	"user_email" varchar NOT NULL,
	"user_name" varchar NOT NULL,
	"user_password" varchar NOT NULL,
	CONSTRAINT "obj_user_pkey" PRIMARY KEY("id_user")
)
WITH (
	OIDS = False
);

CREATE UNIQUE INDEX "idx_user_email" ON "obj_user" (
	"user_email"
);


COMMENT ON TABLE "obj_user" IS 'Пользователи';



