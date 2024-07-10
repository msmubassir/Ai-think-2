const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle POST request for image generation
app.post('/generate', upload.single('image'), async (req, res) => {
    try {
        // Process uploaded image (using Sharp for image processing)
        const { path } = req.file;
        const generatedImage = await processImage(path); // Replace with your image processing logic

        // Respond with the generated image
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': generatedImage.length
        });
        res.end(generatedImage);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating image');
    }
});

// Example image processing function (using Sharp)
async function processImage(filePath) {
    const image = sharp(filePath).resize(300, 300); // Example resizing, adjust as needed
    return await image.png().toBuffer();
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
