import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

async function main() {
  await prisma.todo.create({
    data:{
      title:'Third ToDo',
      body:'Description Second Todo',
      user_id:''
    }
  })
}

main()
 .then(() => {
    console.log('✅ Seeding completed.');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })