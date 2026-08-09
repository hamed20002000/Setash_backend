export function isSameDate(requestDateTime: Date): boolean {
    const today = new Date();
    
    // Normalize both dates to 00:00:00 (ignore time part)
    const currentDate = new Date(today.setHours(0, 0, 0, 0)); // Set time to 00:00:00
    const requestDate = new Date(requestDateTime);
    requestDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
  
    return currentDate.getTime() === requestDate.getTime();
  }

  export function getDifferenceInHours(startDate: Date, endDate: Date): number {
    const diffInMillis = endDate.getTime() - startDate.getTime(); // Difference in milliseconds
    const diffInHours = diffInMillis / (1000 * 60 * 60); // Convert to hours
    return diffInHours;
  }
  
  export function getDifferenceInSeconds(startDate: Date, endDate: Date): number {
    const diffInMillis = endDate.getTime() - startDate.getTime(); // Difference in milliseconds
    const diffInSeconds = diffInMillis / 1000; // Convert to seconds
    return diffInSeconds;
  }
 // Function to get the remaining time in seconds
export function getRemainingTimeInSeconds(startDate: Date,minutes:number): number {
    // Add 3 minutes to the start date
    const endDate = new Date(startDate.getTime() + minutes * 60000); // 3 minutes = 3 * 60 * 1000 milliseconds
  
    // Get the current time
    const currentDate = new Date();
  
    // Calculate the difference in milliseconds
    const remainingTimeMs = endDate.getTime() - currentDate.getTime();
  
    // Convert milliseconds to seconds
    const remainingTimeInSeconds = Math.max(0, Math.floor(remainingTimeMs / 1000)); // Ensure it doesn't return negative
  
    return remainingTimeInSeconds;
  }
  
  export function formatSecondsToHMS(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
    const seconds = totalSeconds % 60; // Calculate remaining seconds
  
    return `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;
  }
  
  function padNumber(value: number): string {
    return value.toString().padStart(2, '0'); // Add leading zero for single-digit numbers
  }
  

  
  