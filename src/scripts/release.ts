import * as fs from "fs";
import * as path from "path";
import * as archiver from "archiver";
import { execSync } from "child_process";

const { version } = JSON.parse(fs.readFileSync("package.json", "utf-8"));

const outputDir = "dist";
const releaseDir = "release";
const filterFileName = `v${version}_kits_item_filter.filter`;

// create release directory
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

const filterFilePath = path.join(outputDir, filterFileName);
const baseFilterFilePath = "assets/kits-item-filter.filter";

fs.copyFileSync(baseFilterFilePath, filterFilePath);

// zip configuration
const zipFilePath = `release/v${version}_kits_item_filter.zip`;
const output = fs.createWriteStream(zipFilePath);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`ZIP Created: ${zipFilePath}`);
});

archive.pipe(output);
archive.file(filterFilePath, { name: filterFileName });

const folderToZip = "assets/resources";
archive.directory(folderToZip, "resources");

archive.finalize();
