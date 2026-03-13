const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outputDir = path.join(rootDir, 'dist-pages');

const artifacts = [
  {
    source: path.join(rootDir, 'apps', 'shell', 'dist'),
    target: outputDir
  },
  {
    source: path.join(rootDir, 'apps', 'product', 'dist'),
    target: path.join(outputDir, 'product')
  },
  {
    source: path.join(rootDir, 'apps', 'cart', 'dist'),
    target: path.join(outputDir, 'cart')
  }
];

for (const artifact of artifacts) {
  if (!fs.existsSync(artifact.source)) {
    throw new Error(`Build output is missing: ${artifact.source}`);
  }
}

fs.rmSync(outputDir, { recursive: true, force: true });

for (const artifact of artifacts) {
  fs.mkdirSync(path.dirname(artifact.target), { recursive: true });
  fs.cpSync(artifact.source, artifact.target, { recursive: true });
}

fs.writeFileSync(path.join(outputDir, '.nojekyll'), '');
