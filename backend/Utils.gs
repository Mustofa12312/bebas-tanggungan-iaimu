/**
 * Utils.gs - Helper functions
 */

/**
 * Validates request payload
 */
function parseRequestBody(e) {
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    return null;
  }
}

/**
 * Format response as JSON
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get CORS headers
 * Note: Google Apps Script Web Apps automatically handle CORS if deployed correctly.
 * But sometimes manual preflight handling might be needed depending on the client.
 */
function handlePreflight() {
  const output = ContentService.createTextOutput('');
  // Google Apps script restricts headers, CORS is handled by GAS infrastructure
  // when published as "Execute as me" and "Access: Anyone"
  return output;
}
