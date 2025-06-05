// Sample country specifications for passport photos
// This data can be imported into MongoDB

const countrySpecs = [
  {
    country: "United States",
    width: 600,
    height: 600,
    maxSizeKB: 240,
    backgroundColor: "White or off-white",
    eyesOpen: true,
    neutralExpression: true,
    faceCoverage: 70,
    additionalRequirements: [
      "Head must be between 1 inch and 1 3/8 inches from the bottom of the chin to the top of the head",
      "No glasses or head coverings (except for religious purposes)",
      "Taken within the last 6 months",
      "No digital alterations"
    ]
  },
  {
    country: "United Kingdom",
    width: 450,
    height: 550,
    maxSizeKB: 200,
    backgroundColor: "Light grey or cream",
    eyesOpen: true,
    neutralExpression: true,
    faceCoverage: 65,
    additionalRequirements: [
      "Head must be between 29mm and 34mm from chin to crown",
      "No sunglasses or tinted glasses",
      "Taken within the last month",
      "Must be facing forward, looking straight at the camera"
    ]
  },
  {
    country: "Canada",
    width: 420,
    height: 540,
    maxSizeKB: 250,
    backgroundColor: "White or light-colored",
    eyesOpen: true,
    neutralExpression: true,
    faceCoverage: 70,
    additionalRequirements: [
      "Head must be between 31mm and 36mm from chin to crown",
      "Frame size must be 50mm x 70mm",
      "No shadows on face or background",
      "No red-eye effect"
    ]
  },
  {
    country: "Australia",
    width: 413,
    height: 531,
    maxSizeKB: 280,
    backgroundColor: "Light grey or white",
    eyesOpen: true,
    neutralExpression: true,
    faceCoverage: 65,
    additionalRequirements: [
      "Head height between 32mm and 36mm",
      "No head coverings except for religious reasons",
      "No hair across eyes",
      "Taken within the last 6 months"
    ]
  },
  {
    country: "European Union",
    width: 413,
    height: 531,
    maxSizeKB: 200,
    backgroundColor: "Light grey or off-white",
    eyesOpen: true,
    neutralExpression: true,
    faceCoverage: 70,
    additionalRequirements: [
      "Face must take up 70-80% of the photo",
      "No shadows on face or background",
      "Must show both edges of face clearly",
      "No head coverings except for religious purposes"
    ]
  },
  {
    country: "India",
    width: 450,
    height: 450,
    maxSizeKB: 150,
    backgroundColor: "White",
    eyesOpen: true,
    neutralExpression: true,
    faceCoverage: 75,
    additionalRequirements: [
      "Face should be 70-80% of the photograph",
      "Both ears should be visible",
      "No shadows on face",
      "Photograph must be in color"
    ]
  },
  {
    country: "Japan",
    width: 600,
    height: 600,
    maxSizeKB: 200,
    backgroundColor: "Blue or white",
    eyesOpen: true,
    neutralExpression: true,
    faceCoverage: 70,
    additionalRequirements: [
      "No hats or other head coverings",
      "No shadows on face or background",
      "Full front view of face",
      "Taken within the last 6 months"
    ]
  },
  {
    country: "China",
    width: 354,
    height: 472,
    maxSizeKB: 150,
    backgroundColor: "White or light blue",
    eyesOpen: true,
    neutralExpression: true,
    faceCoverage: 70,
    additionalRequirements: [
      "Head should be between 33mm and 36mm from chin to top",
      "No shadows in the background",
      "Ears must be visible",
      "No accessories that cover any part of the face"
    ]
  }
];

// Instructions for importing this data into MongoDB:
// 1. Save this file as 'sample-data.js'
// 2. Connect to your MongoDB instance using MongoDB Compass or the mongo shell
// 3. Create a database called 'passport_validator' (if not already created)
// 4. Create a collection called 'countryspec'
// 5. Import this data into the 'countryspec' collection

module.exports = countrySpecs;