import { createWorker } from "tesseract.js";

const processImage = async (image: File | string): Promise<string> => {
    try {
        // Use tesseract.js to recognize text in the image
        const worker = await createWorker('eng');
        await worker.setParameters({
            tessedit_char_whitelist: '123456789'}); // Whitelist only numeric characters
        
        const res = await worker.recognize(image);
        return res.data.text;
        await worker.terminate();
    } catch (error) {
        console.error('Error during OCR processing:', error);
        throw new Error('Failed to process the image.');
    }
    
};

export default processImage;