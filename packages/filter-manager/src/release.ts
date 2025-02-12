import * as fs from "fs";
import * as path from "path";
import archiver from "archiver";

const { version } = JSON.parse(fs.readFileSync("package.json", "utf-8"));

const releaseDir = "release";

const filterFiles: string[] = [];
const filterFolder = "assets";

fs.readdirSync(filterFolder).forEach((file) => {
  if (file.endsWith(".filter")) {
    filterFiles.push(path.join(filterFolder, file));
  }
});

if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

const zipFilePath = `release/v${version}_kits_item_filter.zip`;
const output = fs.createWriteStream(zipFilePath);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`ZIP Created: ${zipFilePath}`);
});

archive.pipe(output);

filterFiles.forEach((filterFilePath) => {
  const fileName = path.basename(filterFilePath);
  archive.file(filterFilePath, { name: `v${version}_${fileName}` });
});

const folderToZip = "assets/resources";
archive.directory(folderToZip, "resources");

archive.finalize();
