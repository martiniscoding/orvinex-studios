-- CreateTable
CREATE TABLE "service_pages" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "faq" JSONB NOT NULL DEFAULT '[]',
    "meta_title" TEXT,
    "meta_description" TEXT,
    "keyword" TEXT,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "service_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_pages_slug_key" ON "service_pages"("slug");
