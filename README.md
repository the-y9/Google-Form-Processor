# Google Sheets Form Response Processor

Google Apps Script automates the processing of form responses in a Google Spreadsheet. When a form is submitted, the script captures the timestamp and temperature data, determines the appropriate time bin, and records the temperature in a corresponding cell in the "Processed Data" sheet. Most recent temperature for particular date and particular time bin is recorded . It also includes a function to create a trigger for automatic execution upon form submission.

## Features

- **Automated Data Processing**: Captures and processes form responses automatically.
- **Time Binning**: Organizes data into predefined time bins.
- **Date Handling**: Formats and manages dates efficiently.
- **Error Logging**: Logs errors for debugging and troubleshooting.

## Functions

### `onFormSubmit(e)`

Handles form submission events. This function:

1. Extracts timestamp and temperature from the submitted data.
2. Determines the appropriate time bin based on the timestamp.
3. Updates the "Processed Data" sheet with the temperature in the corresponding time bin and date row.
4. Logs information and errors for debugging.

**Parameters:**
- `e` - The event object containing form submission data.

### `createFormSubmitTrigger()`

Creates a trigger that automatically runs the `onFormSubmit` function when a form is submitted.

## Setup

1. **Open Google Sheets**: Open your Google Spreadsheet where the form responses are recorded.
2. **Script Editor**: Go to `Extensions` > `Apps Script` to open the script editor.
3. **Copy and Paste**: Copy the provided script into the editor.
4. **Save**: Save the script.
5. **Create Trigger**: Run the `createFormSubmitTrigger` function to set up the trigger for form submissions.

## Example Usage

1. **Submit a Form**: Fill out and submit the form connected to your Google Spreadsheet.
2. **Check Processed Data**: Check the "Processed Data" sheet to see the updated temperature values organized by date and time bin.

![image](https://github.com/user-attachments/assets/32d41588-2e91-4f81-932d-dca2e625c6dc)
![image](https://github.com/user-attachments/assets/6f516b4a-6881-4540-9c3d-c15ac80fe71f)
![image](https://github.com/user-attachments/assets/17bc342f-2821-4892-a4e2-3a4eec46eb13)




## Notes

- Ensure the sheet names ("Form Responses 1" and "Processed Data") match those used in the script.
- Adjust the time bin intervals if needed by modifying the `if` conditions in the `onFormSubmit` function.
