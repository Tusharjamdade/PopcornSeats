
ALTER TABLE "Movie" DROP COLUMN "seats";

CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "seatname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "MoveId" INTEGER NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Seat" ADD CONSTRAINT "Seat_MoveId_fkey" FOREIGN KEY ("MoveId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
