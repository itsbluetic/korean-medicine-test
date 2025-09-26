const DBF = require('node-dbf');
const fs = require('fs');
const path = require('path');

async function parseDBFFile(filePath) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`\n=== Parsing ${path.basename(filePath)} ===`);

      const dbf = new DBF(filePath, 'cp949'); // Korean encoding

      dbf.on('header', (header) => {
        console.log(`Records: ${header.numberOfRecords}`);
        console.log('Fields:', header.fields.map(f => `${f.name} (${f.type}, ${f.length})`));
      });

      const records = [];

      dbf.on('record', (record) => {
        records.push(record);
      });

      dbf.on('end', () => {
        console.log('\nFirst 3 records:');
        records.slice(0, 3).forEach((record, index) => {
          console.log(`Record ${index + 1}:`, JSON.stringify(record, null, 2));
        });

        resolve({
          filename: path.basename(filePath),
          recordCount: records.length,
          records: records
        });
      });

      dbf.on('error', (error) => {
        reject(error);
      });

      dbf.read();
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error.message);
      resolve(null);
    }
  });
}

async function main() {
  const referenceDir = './reference';
  const dbfFiles = [
    'k_15_ss.DBF',
    'k_15_wt.DBF',
    'ks15.dbf',
    'ks15_set.dbf'
  ];

  const results = {};

  for (const filename of dbfFiles) {
    const filePath = path.join(referenceDir, filename);
    if (fs.existsSync(filePath)) {
      const result = await parseDBFFile(filePath);
      if (result) {
        results[filename] = result;
      }
    } else {
      console.log(`File not found: ${filePath}`);
    }
  }

  // Save parsed data to JSON
  const outputFile = './reference/parsed-data.json';
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nParsed data saved to: ${outputFile}`);
}

main().catch(console.error);