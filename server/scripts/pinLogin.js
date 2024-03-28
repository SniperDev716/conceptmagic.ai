const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Launch the browser
  const page = await browser.newPage(); // Open a new page
  await page.goto('https://www.pinterest.com/login'); // Navigate to the login page

  // Fill in the username and password fields
  await page.type('#email', process.env.PINTEREST_EMAIL);
  await page.type('#password', process.env.PINTEREST_PASS);

  // Click the login button
  // Make sure the selector matches the login button
  await page.click('button[type="submit"]');

  // Wait for navigation after login
  await page.waitForNavigation();

  // Retrieve cookies after login
  const cookies = await page.cookies();
  console.log('Cookies:', cookies);

  // Optionally, filter for specific cookies or store them
  // const sessionCookie = cookies.find(cookie => cookie.name === 'session');

  // Perform further actions or close the browser
  await browser.close();
})();
