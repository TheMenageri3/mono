module.exports = {
    schema: './packages/db/prisma/schema.zmodel',
    plugins: ['@zenstackhq/runtime/plugin', '@zenstackhq/trpc'],
    output: {
        runtime: './packages/db/.zenstack',
        trpc: './packages/api/src/server/routers',
    },
};
