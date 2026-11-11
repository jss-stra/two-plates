import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const version = process.argv[2];
if (!/^two-plates-v\d+$/.test(version || '')) throw new Error('Pass release cache name');
async function walk(dir) {
  const all = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) all.push(...await walk(path));
    else if (/\.(js|mjs)$/.test(path) && path !== 'js/sync-v2.js') all.push(path);
  }
  return all;
}
const paths = ['index.html', 'menu.html', 'css/styles.css', 'manifest.webmanifest', 'icons/icon.svg', ...await walk('js'), ...await walk('data')].sort();
const assets = [];
for (const path of paths) assets.push([path, createHash('sha256').update(await readFile(path)).digest('hex')]);
const template = await readFile('scripts/sw.template.js', 'utf8');
await writeFile('sw.js', template.replace('__CACHE__', JSON.stringify(version)).replace('__ASSETS__', JSON.stringify(assets, null, 2)));
console.log(`${version}: ${assets.length} verified assets`);
