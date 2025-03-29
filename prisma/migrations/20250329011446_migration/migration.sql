-- CreateTable
CREATE TABLE "usuarios" (
    "usuario_id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "usuario" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_usuario_key" ON "usuarios"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
