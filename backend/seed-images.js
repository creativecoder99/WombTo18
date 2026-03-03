const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const updates = [
        { name: 'Healthcare for Mothers', imageUrl: '/images/causes/healthcare.png' },
        { name: 'Education for Every Child', imageUrl: '/images/causes/education.png' },
    ];
    
    for (const update of updates) {
        const prog = await prisma.program.findFirst({ where: { name: update.name } });
        if (prog) {
            await prisma.program.update({
                where: { id: prog.id },
                data: { imageUrl: update.imageUrl }
            });
            console.log(`Updated ${update.name}`);
        } else {
            console.log(`Program not found: ${update.name}`);
        }
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
