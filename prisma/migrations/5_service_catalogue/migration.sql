-- AlterTable
ALTER TABLE "service_pages"
  ADD COLUMN "title"     TEXT NOT NULL DEFAULT '',
  ADD COLUMN "short"     TEXT NOT NULL DEFAULT '',
  ADD COLUMN "card_text" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "stack"     TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN "band"      TEXT NOT NULL DEFAULT 'build',
  ADD COLUMN "icon"      TEXT NOT NULL DEFAULT 'Code2',
  ADD COLUMN "featured"  BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "position"  INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "service_pages_band_position_idx" ON "service_pages"("band", "position");
