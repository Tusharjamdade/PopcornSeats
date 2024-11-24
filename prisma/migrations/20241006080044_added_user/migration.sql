
ALTER TABLE "User" DROP COLUMN "gender",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

DROP TABLE "UserDetails";
