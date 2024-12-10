import bcrypt from "bcryptjs";
import { prisma } from "../../infra/config/prisma/prisma";

async function hashPasswords() {
  try {
    const users = await prisma.user.findMany(); // Busca todos os usuários no banco

    for (const user of users) {
      // Gera o hash para cada senha de usuário
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Atualiza a senha do usuário no banco
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });
    }

    console.log("Senhas atualizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar as senhas:", error);
  } finally {
    await prisma.$disconnect(); // Desconecta do banco após a execução
  }
}

hashPasswords();
