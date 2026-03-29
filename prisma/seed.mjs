import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const passwordHash = await bcrypt.hash("1234", 10);

const users = [
    {
        email: "sara@example.com",
        displayName: "Sara",
        passwordHash,
    },
    {
        email: "kratos@example.com",
        displayName: "Kratos",
        passwordHash,
    },
];

const ads = [
    {
        title: "iPhone 17 Pro",
        description: "iPhone 17 Pro 256GB en perfecto estado, con caja y accesorios originales.",
        price: 1000,
        tags: ["móvil", "apple", "tecnología"],
        imageUrl: "https://static.k-tuin.com/media/catalog/product/cache/1/image/0dc2d03fe217f8c83829496872af24a0/i/p/iphone-17-pro-naranja-cosmico-5.jpg",
    },
    {
        title: "Bicicleta",
        description: "Bicicleta talla M, cuadro de aluminio, frenos de disco hidráulicos.",
        price: 320,
        tags: ["deporte", "bicicleta"],
        imageUrl: "https://m.media-amazon.com/images/I/719lUE-7kjL._AC_SL1500_.jpg",
    },
    {
        title: "Sofá 3 plazas",
        description: "Sofá gris oscuro de 3 plazas, muy cómodo, sin manchas ni roturas.",
        price: 180,
        tags: ["hogar", "mueble"],
        imageUrl: "https://m.media-amazon.com/images/I/61DCnWlIhYL._AC_SL1024_.jpg",
    },
    {
        title: "PlayStation 5",
        description: "PS5 edición disco con dos mandos y 3 juegos incluidos.",
        price: 400,
        tags: ["gaming", "consola", "tecnología"],
        imageUrl: "https://m.media-amazon.com/images/I/51tztLywcbL._AC_SL1229_.jpg",
    },
    {
        title: "Guitarra española",
        description: "Guitarra clásica de madera maciza, ideal para principiantes y nivel intermedio.",
        price: 95,
        tags: ["música", "instrumento"],
        imageUrl: "https://guitarrasbros.com/public/images/1522303104_guitarra-clasica-b40-bros.jpg",
    },
    {
        title: "MacBook Air M2",
        description: "MacBook Air M2 2023, 8GB RAM, 256GB SSD. Batería al 94%.",
        price: 890,
        tags: ["portátil", "apple", "tecnología"],
        imageUrl: "https://static.carrefour.es/hd_1500x_/crs/cdn_static/catalog/hd/249892_00_1.jpg",
    },
];

async function main() {
    console.log("Limpiando datos existentes...");
    await prisma.ad.deleteMany();
    await prisma.user.deleteMany();

    console.log("Creando usuarios...");
    const createdUsers = [];
    for (const user of users) {
        const created = await prisma.user.create({ data: user });
        createdUsers.push(created);
        console.log(`   ✅ ${created.email}`);
    }

    console.log("Creando anuncios...");
    for (let i = 0; i < ads.length; i++) {
        const user = createdUsers[i % createdUsers.length];
        const created = await prisma.ad.create({
            data: {
                ...ads[i],
                userId: user.id,
            },
        });
        console.log(`   ✅ ${created.title} (por ${user.displayName})`);
    }

    console.log("\nSeed completado!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
