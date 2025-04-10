const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

/**
 * Recursively copy files and directories from source to destination
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 */
function copyRecursive(src, dest) {
    // Get stats of the source
    const stats = fs.statSync(src);

    // If source is a file, copy it directly
    if (stats.isFile()) {
        fs.copyFileSync(src, dest);
        return;
    }

    // If source is a directory, create it in destination if it doesn't exist
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        // Read all files/directories in the source directory
        const entries = fs.readdirSync(src);

        // Recursively copy each entry
        for (const entry of entries) {
            const srcPath = path.join(src, entry);
            const destPath = path.join(dest, entry);
            copyRecursive(srcPath, destPath);
        }
    }
}

// Start the recursive copy process
copyRecursive(srcDir, distDir);

console.log('Build completed successfully!');
