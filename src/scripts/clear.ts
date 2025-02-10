import * as fs from "fs";
import * as path from "path";

const releaseDir = "release";

function clearReleaseFolder() {
  if (fs.existsSync(releaseDir)) {
    fs.readdirSync(releaseDir).forEach((file) => {
      const filePath = path.join(releaseDir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        fs.rmdirSync(filePath, { recursive: true });
      } else {
        fs.unlinkSync(filePath);
      }
    });
  }
}

clearReleaseFolder();
