import processImage from "../Functions/ProcessImage";

const OCR = () => {
  const testOCR = async (testImage: string) => {
    // const testImage = "src/Components/image.png"; // Ensure this file is in your `public` folder

    try {
      console.log("Starting OCR for image:", testImage); // Debug log
      const result = await processImage(testImage); // Call the OCR function
      console.log("OCR Result:", result); // Log the result
      alert("OCR Result:\n" + result); // Display result in an alert
    } catch (error) {
      console.error("Error during OCR testing:", error); // Debug log
      alert("Failed to process the image.");
    }
  };
  return (
    <div className="button-container">
      <input
        type="text"
        placeholder="Enter you picture URL or path"
        id="inputImage"
      ></input>
      <button
        className="btn btn-outline-dark btn-sm"
        onClick={() => {
          const input = document.getElementById(
            "inputImage"
          ) as HTMLInputElement;
          testOCR(input.value);
        }}
      >
        OCR
      </button>
    </div>
  );
};

export default OCR;
