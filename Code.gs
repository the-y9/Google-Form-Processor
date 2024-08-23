function onFormSubmit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var responseSheet = sheet.getSheetByName('Form Responses 1'); 
  var processedSheet = sheet.getSheetByName('Processed Data');
  
  // Getting the submitted data from the event object
  var timestamp = e.values[0]; // timestamp is in the first column
  var temp = e.values[1]; // temperature is in the second column
  
  // Log the received data for debugging
  Logger.log("Timestamp: " + timestamp);
  Logger.log("Temperature: " + temp);
  
  try {
    // Formatting the date
    var date = Utilities.formatDate(new Date(timestamp), Session.getScriptTimeZone(), "MM/dd/yyyy");
    var hour = new Date(timestamp).getHours();
    
    // Determine the time bin (every 4 hours)
    var bin;
    if (hour >= 5 && hour < 8) {
      bin = '6:00 AM';
    } else if (hour >= 8 && hour < 12) {
      bin = '10:00 AM';
    } else if (hour >= 12 && hour < 16) {
      bin = '2:00 PM';
    } else if (hour >= 16 && hour < 20) {
      bin = '6:00 PM';
    } else if (hour >= 20 && hour < 24) {
      bin = '10:00 PM';
    }     
    // else {
    //   bin = '8 PM - 12 AM';
    // }
    
    // Logging the determined date and bin for debugging
    Logger.log("Formatted Date: " + date);
    Logger.log("Time Bin: " + bin);
    
    // Finding or creating the correct row for the date
    var dateRow;
    var dateFinder = processedSheet.createTextFinder(date).findNext();
    if (dateFinder !== null) {
      dateRow = dateFinder.getRow();
    } else {
      // If the date is not found, add it to the first empty row
      dateRow = processedSheet.getLastRow() + 1;
      processedSheet.getRange(dateRow, 1).setValue(date);
    }
    
    // Logging the identified row for the date
    Logger.log("Date Row: " + dateRow);
    
    // Finding the correct column for the time bin
    var binColumnFinder = processedSheet.getRange(1, 1, 1, processedSheet.getLastColumn()).createTextFinder(bin).findNext();
    if (binColumnFinder !== null) {
      var binColumn = binColumnFinder.getColumn();
    } else {
      throw new Error("Time bin not found in the header row.");
    }
    
    // Logging the identified column for the bin
    Logger.log("Bin Column: " + binColumn);
    
    // Writing the temperature to the appropriate cell
    processedSheet.getRange(dateRow, binColumn).setValue(temp);
    
  } catch (error) {
    Logger.log("Error: " + error.message);
  }
}

// Trigger for the onFormSubmit function
function createFormSubmitTrigger() {
  ScriptApp.newTrigger('onFormSubmit')
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();
}

// function testOnFormSubmit() {
//   var e = {
//     values: ["8/12/2024 18:34:41", 98]  // Hardcoded timestamp and temperature for testing
//   };
//   onFormSubmit(e);
// }
