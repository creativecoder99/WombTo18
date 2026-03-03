const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.impact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      childrenRegistered: 500,
      treesPlanted: 1200,
      schoolsOnboarded: 45,
      csrPartners: 12,
      totalFundingRequired: 5000000,
      totalFundingReceived: 1000000
    }
  });

  const p1 = await prisma.program.create({
    data: {
      name: 'Healthcare for Mothers',
      description: 'Providing essential healthcare for expecting mothers in rural areas.',
      category: 'Healthcare',
      totalRequired: 2000000,
      totalRaised: 500000,
      beneficiariesHelped: 150
    }
  });

  const p2 = await prisma.program.create({
    data: {
      name: 'Education for Every Child',
      description: 'Ensuring every child gets access to quality primary education.',
      category: 'Education',
      totalRequired: 3000000,
      totalRaised: 500000,
      beneficiariesHelped: 350
    }
  });

  await prisma.caseStudy.create({
    data: {
      slug: 'transforming-rural-healthcare',
      title: 'Transforming Rural Healthcare',
      problem: 'Lack of medical facilities in remote villages.',
      intervention: 'Mobile health clinics and trained local midwives.',
      outcome: 'Reduced maternal mortality by 40% in targeted areas.',
      impactNumbers: JSON.stringify({ mothersHelped: 150, clinicsEstablished: 5 }),
      visuals: JSON.stringify([ "image1.png", "image2.png" ])
    }
  });
  
  console.log('Seed completed.');
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
