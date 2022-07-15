import * as fs from 'fs';
import * as path from 'path';

const INPUT = {
  source: 'src',
  json: 'package.json',
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
  exports: {
    '.': {
      import: './esm/index.mjs',
      require: './cjs/index.js',
    },
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
  const dirs = sourceFilesAndDirs.filter((name) => !name.endsWith('.ts'));

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
};

run();
