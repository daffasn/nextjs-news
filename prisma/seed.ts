const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  const categories = ['Intermezzo', 'Technology', 'Economy', 'Tips & Tricks'];
  const authors = ['daffreybrklyn@gmail.com', 'itachi@123.com', 'madara@123.com']

  await Promise.all(
    Array.from({ length: 100 }).map(async () => {
      const title = faker.lorem.sentence(3); // Menghasilkan kalimat dengan 3 kata
      const content = faker.lorem.paragraphs(2); // Menghasilkan 2 paragraf
      const image = faker.image.urlPicsumPhotos(); // Menghasilkan URL gambar
      const category = faker.helpers.arrayElement(categories); // Memilih kategori secara acak
      const author = faker.helpers.arrayElement(authors); // Memilih kategori secara acak

      // Memastikan title tidak lebih dari 50 karakter
      const trimmedTitle = title.length > 50 ? title.substring(0, 50) : title;

      // Memastikan content tidak lebih dari 500 karakter
      const trimmedContent = content.length > 500 ? content.substring(0, 500) : content;

      await prisma.post.create({
        data: {
          title: trimmedTitle,
          content: trimmedContent,
          image: image, // Menambahkan URL gambar
          catName: category, // Menambahkan kategori
          authorEmail: author, // Menambahkan kategori
        },
      });
    })
  );
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
