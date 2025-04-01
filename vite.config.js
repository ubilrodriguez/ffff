const path = require("path");
const { defineConfig } = require("vite");
const Banner = require("vite-plugin-banner");
const pkg = require("./package.json");
const friendlyTypeImports = require("rollup-plugin-friendly-type-imports");

module.exports = defineConfig({
    base: "./",
    // Configuración para desarrollo web
    root: "docs",
    publicDir: "../public",
    server: {
        fs: {
            strict: true,
            allow: [
                path.resolve(__dirname),
                path.resolve(__dirname, "node_modules")
            ]
        },
        open: true,
        port: 3000
    },
    // Configuración para build de librería
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "Kalidokit",
            fileName: (format) => `kalidokit.${format}.js`,
        },
        rollupOptions: {
            exports: "named",
            external: [],
            output: {
                globals: {},
            },
        },
    },
    plugins: [
        Banner(
            `/**\n * @${pkg.name} v${pkg.version}\n * ${pkg.description}\n * \n * @license\n * Copyright (c) ${pkg.year} ${pkg.author}\n * SPDX-License-Idntifier: ${pkg.license} \n * ${pkg.homepage}\n */`
        ),
        friendlyTypeImports(),
    ],
});