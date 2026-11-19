import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve('public/image');
const outputDir = path.resolve('public/image/thumbs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter((file) => {
  const stat = fs.statSync(path.join(inputDir, file));
  return stat.isFile() && /\.(jpe?g|png|webp)$/i.test(file);
});

// Natural collation sort
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
files.sort(collator.compare);

console.log(`Found ${files.length} images to process...`);

let originalTotalBytes = 0;
let thumbTotalBytes = 0;

async function processImages() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(inputDir, file);
    const parsed = path.parse(file);
    const outputFilename = `${parsed.name}.webp`;
    const outputPath = path.join(outputDir, outputFilename);

    const stat = fs.statSync(inputPath);
    originalTotalBytes += stat.size;

    try {
      await sharp(inputPath)
        .rotate() // auto-orient based on EXIF
        .resize({
          width: 420,
          fit: 'inside', // preserves exact aspect ratio without ANY cropping
          withoutEnlargement: true,
        })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      thumbTotalBytes += outStat.size;

      if ((i + 1) % 20 === 0 || i === files.length - 1) {
        console.log(`Processed ${i + 1}/${files.length} images...`);
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  const origMB = (originalTotalBytes / (1024 * 1024)).toFixed(2);
  const thumbMB = (thumbTotalBytes / (1024 * 1024)).toFixed(2);
  const savedPercent = (((originalTotalBytes - thumbTotalBytes) / originalTotalBytes) * 100).toFixed(1);

  console.log('--------------------------------------------------');
  console.log(`COMPLETE!`);
  console.log(`Original Total: ${origMB} MB`);
  console.log(`Thumbnails Total: ${thumbMB} MB`);
  console.log(`Saved: ${savedPercent}% bandwidth reduction!`);
  console.log('--------------------------------------------------');
}

processImages();
