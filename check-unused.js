const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const publicDir = path.join(__dirname, 'public');
const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

const allPublicFiles = getAllFiles(publicDir);
const unusedFiles = [];

for (const file of allPublicFiles) {
  const relPath = file.replace(publicDir, '').replace(/\\/g, '/');
  const basename = path.basename(file);
  // Ignore standard Next.js files
  if (basename === 'favicon.ico' || basename === 'vercel.svg' || basename === 'next.svg' || basename === 'robots.txt' || basename === 'sitemap.xml' || basename === 'globe.svg' || basename === 'window.svg' || basename === 'file.svg') continue;

  try {
    // Search for the filename or the path in the src directory
    // We use a simple grep
    execSync(git grep -F "" src/);
  } catch (e) {
    // If grep exits with 1, it means not found
    unusedFiles.push(relPath);
  }
}

console.log('Unused files in public/:\n', unusedFiles.join('\n'));

// Now check unused components
const allSrcFiles = getAllFiles(srcDir);
const unusedComponents = [];

for (const file of allSrcFiles) {
  if (file.includes('page.tsx') || file.includes('layout.tsx') || file.includes('globals.css')) continue;
  
  const basename = path.basename(file, path.extname(file)); // e.g. floating-whatsapp-button
  try {
    // Look for the import or the usage
    execSync(git grep -F "" src/);
  } catch (e) {
    unusedComponents.push(file.replace(srcDir, '').replace(/\\/g, '/'));
  }
}

console.log('\nPotentially unused src files:\n', unusedComponents.join('\n'));

