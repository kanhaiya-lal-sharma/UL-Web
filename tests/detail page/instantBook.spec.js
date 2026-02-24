

const { test, expect } = require("@playwright/test");

test.skip("Instant Book test ", async ({ page }) => {

   test.setTimeout(60000);

  await page.goto("https://ul1.devbeta.in/united-kingdom/london/property/iq-sterling-court");

  // Bronze En Suite Instant Book
  const firstInstantBook = page
    .locator("div")
    .filter({ hasText: "Bronze En Suite" })
    .getByRole("button", { name: /instant book/i })
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
  await page.waitForSelector('h4:has-text("Great choice!")', {
    state: "visible",
    timeout: 30000,
  });

  const partialBookmodal = page.getByRole("heading", { name: /Great choice!/i, level: 4 }).locator("..");

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




 
await page.getByText('Please enter your payment details').waitFor();



await page.locator('input[name="name"]').fill('Kanhaiya Lal');

await page.frameLocator('#access-worldpay-pan')
          .locator('#pan')
          .fill('4000000000001000');



const expiryFrame = page.frameLocator('#access-worldpay-expiry');

const expiryInput = expiryFrame.locator('#expiry');

await expect(expiryInput).toBeVisible({ timeout: 20000 });

await expiryInput.click();
await expiryInput.pressSequentially('1228', { delay: 100 });


await page.frameLocator('#access-worldpay-cvv')
          .locator('input')
          .fill('123');

await page.getByRole('button', { name: 'Pay £260' }).click();

const successModal =  page.getByText("Payment of").locator("..");

await expect(successModal).toBeVisible({ timeout: 30000 });

// 📸 Take screenshot
await successModal.screenshot({ 
  path: `screenshots/payment-success-${Date.now()}.png`,
  fullPage: false
});

 await successModal.getByRole("button",{name:"Complete Booking"}).click();


await expect(page).toHaveURL(
  'https://ul1.devbeta.in/united-kingdom/london/iq-sterling-court/book-now'
);


});

