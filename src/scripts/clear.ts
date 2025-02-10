import * as fs from "fs";
import * as path from "path";

const releaseDir = "release";

function clearReleaseFolder(releaseDir: string) {
  if (fs.existsSync(releaseDir)) {
    fs.readdirSync(releaseDir).forEach((file) => {
      const filePath = path.join(releaseDir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        clearReleaseFolder(filePath);
      } else {
        fs.rmSync(filePath);
      }
    });
  }
}

clearReleaseFolder(releaseDir);
