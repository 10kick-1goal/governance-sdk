import * as fs from 'fs';
import * as path from 'path';

const INPUT = {
  source: 'src',
  json: 'package.json',
  css: 'styles.css',
};

const OUTPUT = {
  dest: 'lib',
};

const makePackageJson = (source, dirs) => ({
  name: source.name,
  author: source.author,
  description: source.description,
  license: source.license,
  type: source.type,
  main: 'cjs/index.js',
  module: 'esm/index.mjs',
  types: 'types/index.d.ts',
  style: 'styles.css',
  exports: {
    '.': {
      import: './esm/index.mjs',
      require: './cjs/index.js',
    },
    './styles.css': './styles.css',
    ...dirs.reduce((acc, cur) => {
      acc[`./${cur}`] = {
        import: `./esm/${cur}/index.mjs`,
        require: `./cjs/${cur}/index.js`,
      };

      return acc;
    }, {}),
  },
  sideEffects: source.sideEffects,
  version: source.version,
  peerDependencies: source.peerDependencies,
  dependencies: source.dependencies,
});

const makeSubpackageJson = (name) => ({
  main: `../cjs/${name}/index.js`,
  module: `../esm/${name}/index.mjs`,
  typings: `../types/${name}/index.d.ts`,
});

const run = () => {
  const sourcePackageJson = JSON.parse(fs.readFileSync(INPUT.json));
  const sourceFilesAndDirs = fs.readdirSync(path.resolve(INPUT.source));
  const dirs = sourceFilesAndDirs.filter(
    (name) => !(name.endsWith('.ts') || name.endsWith('.tsx'))
  );

  const destPackageJson = makePackageJson(sourcePackageJson, dirs);

  fs.writeFileSync(
    path.resolve(OUTPUT.dest, 'package.json'),
    JSON.stringify(destPackageJson, null, 2)
  );

  for (const dir of dirs) {
    fs.mkdirSync(path.resolve(OUTPUT.dest, dir));

    const subpackageJson = makeSubpackageJson(dir);

    fs.writeFileSync(
      path.resolve(OUTPUT.dest, dir, 'package.json'),
      JSON.stringify(subpackageJson, null, 2)
    );
  }

  fs.copyFileSync(INPUT.css, path.resolve(OUTPUT.dest, 'styles.css'));
};

run();
