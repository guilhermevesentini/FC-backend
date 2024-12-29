-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "vencimento" DATETIME NOT NULL,
    "tipoLancamento" TEXT NOT NULL,
    "inicio" DATETIME,
    "fim" DATETIME,
    "replicar" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "expensesMonths" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "vencimento" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL,
    "despesaId" TEXT NOT NULL,
    "contaId" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "incomes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "recebimento" DATETIME NOT NULL,
    "tipoLancamento" TEXT NOT NULL,
    "inicio" DATETIME,
    "fim" DATETIME,
    "replicar" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "incomesMonths" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "valor" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "recebimento" DATETIME NOT NULL,
    "descricao" TEXT NOT NULL,
    "incomeId" TEXT NOT NULL,
    "contaId" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "bankAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "conta" TEXT NOT NULL,
    "banco" INTEGER NOT NULL,
    "nomeBanco" TEXT NOT NULL,
    "contaPrincipal" BOOLEAN NOT NULL,
    "agencia" TEXT NOT NULL,
    "saldo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "expenses_vencimento_id_nome_key" ON "expenses"("vencimento", "id", "nome");

-- CreateIndex
CREATE UNIQUE INDEX "expensesMonths_id_despesaId_key" ON "expensesMonths"("id", "despesaId");

-- CreateIndex
CREATE UNIQUE INDEX "incomes_id_key" ON "incomes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "incomesMonths_id_incomeId_mes_key" ON "incomesMonths"("id", "incomeId", "mes");

-- CreateIndex
CREATE UNIQUE INDEX "bankAccount_conta_agencia_key" ON "bankAccount"("conta", "agencia");
