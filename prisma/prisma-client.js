const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();

module.exports = {
  prisma
}