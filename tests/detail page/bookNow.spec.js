


const { test, expect } = require("@playwright/test");

test("Book Now test ", async ({ page }) => {

   test.setTimeout(90000);

   //dashwood-studios-residence

    await page.goto("https://ul1.devbeta.in/");
   const inputBox = page.getByPlaceholder("Search for City, University, Property").nth(1);

    await inputBox.fill("dashwood studios residence");
    await inputBox.press('Enter');
  
    await expect(page).toHaveURL("https://ul1.devbeta.in/united-kingdom/london/property/dashwood-studios-residence");

  

  // Bronze En Suite Instant Book
  const firstInstantBook = page
    .locator("div")
    .filter({ hasText: "Premium Studio" })
    .getByRole("button", { name: /Book now/i })
    .first();

  await firstInstantBook.click();

  // Login
  const loginModal = page.getByText("Welcome to University Living").locator("..");
  const emailInput = loginModal.getByRole("textbox", { name: "email" });

  const now = new Date();
  const timestamp = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;
  const email = `user_${timestamp}.university@yopmail.com`;
  const phone = timestamp;

  console.log("Generated email:", email);

  await emailInput.fill(email);
  await loginModal.getByRole("button", { name: "Login" }).click();

  // Sign Up
  const signupModal = page.getByRole("button", { name: "Sign Up" }).locator("..");

  await signupModal.getByRole("textbox", { name: "First Name" }).fill("kanhaiya lal");
  await signupModal.getByRole("textbox", { name: "Last Name" }).fill("sharma");

  await signupModal.locator('//div[contains(@class, "flag in")]').click();
  await signupModal.getByText("Angola", { exact: false }).click();

  const phoneInput = signupModal.locator("#contactNumber");
  await phoneInput.focus();
  await phoneInput.press("Control+A");
  await phoneInput.press("Backspace");
  await phoneInput.pressSequentially(phone, { delay: 80 });

  const signupBtn = signupModal.getByRole("button", { name: "Sign Up" });
  await expect(signupBtn).toBeEnabled({ timeout: 10000 });
  await signupBtn.click();

  // OTP
  const otpModal = page.getByText("To continue, please enter the 5-digit code").locator("..");
  await expect(otpModal).toBeVisible({ timeout: 15000 });

  const otpDigits = ["5", "4", "3", "2", "1"];
  for (let i = 0; i < otpDigits.length; i++) {
    const input = otpModal.locator(`input[name="otp${i}"]`);
    await expect(input).toBeVisible();
    await input.pressSequentially(otpDigits[i], { delay: 50 });
  }

  await otpModal.getByRole("button", { name: "Continue" }).click();

  // Great choice modal
  await page.waitForSelector('h4:has-text("Great choice! Let’s reserve this")', {
    state: "visible",
    timeout: 30000,
  });

  const partialBookmodal = page.getByRole("heading", { name: /Great choice! Let’s reserve this/i, level: 4 }).locator("..");

  // ────────────────────────────────────────
  // Calendar open
  // ────────────────────────────────────────

  const calendarBtn = partialBookmodal
    .locator('button[class*="calendarIcon"]')
    .or(partialBookmodal.locator('button:has(svg[class*="calendarIcon"])'))
    .or(partialBookmodal.getByRole("button", { name: /calendar|date/i }));


  await calendarBtn.click({ timeout: 15000 });

  await page.waitForTimeout(1500); // render buffer

  // ────────────────────────────────────────
  // SELECT FIRST ENABLED DATE (FIXED)
  // ────────────────────────────────────────

  await partialBookmodal.locator("(//td[text()='13'])[2]").click();

   // ===== Select University =====
  const universityInput = partialBookmodal.locator('[data_automation_id="university-input-field"]');



 await universityInput.click();
await universityInput.fill('UCFB London');

// dropdown option visible hone ka wait
const uniOption = page.getByText('UCFB London', { exact: false });
await expect(uniOption).toBeVisible({ timeout: 10000 });
await uniOption.click();



  //await universityInput.press('Enter');

   // ===== Select Nationality =====
   await partialBookmodal
  .getByLabel('Nationality*')
  .selectOption({ value: 'angolan' });


 
  await partialBookmodal.getByRole("button",{name:"Continue"}).click();

  await expect(page).toHaveURL(
  'https://ul1.devbeta.in/united-kingdom/london/dashwood-studios-residence/book-now'
);

 await page.locator("#gender-male").click();
 
 await page.locator("#g_address").fill("rajendra nagar");
 
await page.getByRole("combobox",{name:"country"}).selectOption("Austria");

await page.getByRole("combobox",{name:"state"}).selectOption("Carinthia");

await page.locator("#city").selectOption("Althofen");

//await page.getByRole("textbox",{name:"postalCode"}).fill("201005");

const postalCode=  page.locator("#postalCode");

await postalCode.focus();

await postalCode.fill("201005");

await page.getByRole("button",{name:"Next"}).click();

await page.locator("#name").fill("gardian jii");


  await page.locator('//div[contains(@class, "flag in")]').click();
  await page.getByText("Angola", { exact: false }).click();

  const grphoneInput = page.locator("#contactNo");
  await grphoneInput.focus();
  await grphoneInput.press("Control+A");
  await grphoneInput.press("Backspace");
  await grphoneInput.pressSequentially("01234567890", { delay: 80 });

  await page.locator("#email").fill("gardian@yopmail.com");

  await page.getByRole("combobox",{name:"relationship"}).selectOption("Relative");

  await page.locator('//div[@class="intro-close-btn"]').click();

  await page.locator("//div[text()='Continue']").click();


  // const courseField = page.getByRole("textbox",{name:"courseName"});
  // courseField.focus();
  // courseField.fill("Bca");

  // await page.getByRole("combobox",{name:"yearOfStudy"}).selectOption("Second Year");

  // await page.getByRole("combobox",{name:"visaStatus"}).selectOption("Pending");

  // await page.getByRole("button",{name:"Social media"}).click();

  // await page.getByRole("button",{name:"Submit & reserve"}).click();


  await page.locator('//input[@name="courseName"]').fill('BCA');

 await page.locator('//select[@name="yearOfStudy"]').selectOption('fourthYear');

await page.locator('//select[@name="visaStatus"]').selectOption('Pending');

await page.locator('//button[div[contains(text(), "Social media")]]').click();

await page.locator('//button[.//div[text()="Submit & reserve"]]').click();

await page.waitForTimeout(3000);  // 3 seconds break – ya waitForURL / waitForLoadState use kar sakte ho

await expect(page).toHaveURL("https://ul1.devbeta.in/united-kingdom/london/dashwood-studios-residence/book-now/thank-you");

}
)