const sharp = require('sharp');
const path = require('path');

const inputPath = 'C:/Users/Teste/Downloads/RF Turismo Passeio de Lancha/img/002.jpeg';
const outputPath = path.join(__dirname, 'public', 'images', 'galeria', '002.avif');

(async () => {
    try {
        console.log('Converting ' + inputPath + ' to ' + outputPath);
        await sharp(inputPath).avif({ quality: 80 }).toFile(outputPath);
        console.log('Conversion complete!');
    } catch (err) {
        console.error(err);
    }
})();
