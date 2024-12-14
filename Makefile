prisma-generate:
	npx prisma generate

prisma-push:
	npx prisma db push

prisma-studio:
	npx prisma studio

prisma: prisma-generate prisma-push