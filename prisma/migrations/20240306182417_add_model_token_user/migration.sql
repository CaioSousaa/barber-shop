-- CreateTable
CREATE TABLE "tokenuser" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "used_in" TIMESTAMP(3),
    "expires_in" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tokenuser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokenuser" ADD CONSTRAINT "tokenuser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
