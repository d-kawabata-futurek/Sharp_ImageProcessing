const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');

const inputDir = './_input';
const outputDir = './_output';

const qualityMapping = {
  'high': { jpeg: 80, avif: 64, webp: 82 },
  'medium-high': { jpeg: 70, avif: 56, webp: 72 },
  'medium-low': { jpeg: 60, avif: 51, webp: 64 },
  'low': { jpeg: 50, avif: 48, webp: 55 },
  'conversion-webp': { webp: 100 },
  'conversion-avif': { avif: 100 },
};

const qualityLevel = process.argv[2];
if (!qualityMapping[qualityLevel]) {
  console.error('Invalid quality level. Use high, medium-high, medium-low, low, conversion-webp, or conversion-avif.');
  process.exit(1);
}

const { jpeg, avif, webp } = qualityMapping[qualityLevel];

if (!fs.existsSync(inputDir)) {
  console.error(`Input directory "${inputDir}" does not exist.`);
  process.exit(1);
}

fs.ensureDirSync(outputDir);

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  files.forEach((file) => {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePathAvif = path.join(outputDir, file.replace(/\.\w+$/, '.avif'));
    const outputFilePathWebp = path.join(outputDir, file.replace(/\.\w+$/, '.webp'));
    const outputFilePathJpeg = path.join(outputDir, file.replace(/\.\w+$/, '.jpg'));

    if (/\.(jpe?g|png|gif|tiff|webp)$/i.test(file)) {
      if (qualityLevel === 'conversion-avif') {
        sharp(inputFilePath)
          .toFormat('avif', { quality: avif })
          .toFile(outputFilePathAvif)
          .then(() => {
            console.log(`Processed AVIF: ${file}`);
          })
          .catch((err) => {
            console.error(`Error processing AVIF ${file}:`, err);
          });
      } else if (qualityLevel === 'conversion-webp') {
        sharp(inputFilePath)
          .toFormat('webp', { quality: webp })
          .toFile(outputFilePathWebp)
          .then(() => {
            console.log(`Processed WebP: ${file}`);
          })
          .catch((err) => {
            console.error(`Error processing WebP ${file}:`, err);
          });
      } else {
        sharp(inputFilePath)
          .toFormat('avif', { quality: avif })
          .toFile(outputFilePathAvif)
          .then(() => {
            console.log(`Processed AVIF: ${file}`);
          })
          .catch((err) => {
            console.error(`Error processing AVIF ${file}:`, err);
          });

        sharp(inputFilePath)
          .toFormat('webp', { quality: webp })
          .toFile(outputFilePathWebp)
          .then(() => {
            console.log(`Processed WebP: ${file}`);
          })
          .catch((err) => {
            console.error(`Error processing WebP ${file}:`, err);
          });

        sharp(inputFilePath)
          .toFormat('jpeg', { quality: jpeg, mozjpeg: true })
          .toFile(outputFilePathJpeg)
          .then(() => {
            console.log(`Processed JPEG: ${file}`);
          })
          .catch((err) => {
            console.error(`Error processing JPEG ${file}:`, err);
          });
      }
    } else {
      console.log(`Skipped: ${file}`);
    }
  });
});
