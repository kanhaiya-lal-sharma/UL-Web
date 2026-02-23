

const { test, expect } = require("@playwright/test");

test("Instant Book - Select DOB in Calendar (Working)", async ({ page }) => {
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

  const modal = page.getByRole("heading", { name: /Great choice!/i, level: 4 }).locator("..");

  // ────────────────────────────────────────
  // Calendar open
  // ────────────────────────────────────────

  const calendarBtn = modal
    .locator('button[class*="calendarIcon"]')
    .or(modal.locator('button:has(svg[class*="calendarIcon"])'))
    .or(modal.getByRole("button", { name: /calendar|date/i }));

  await calendarBtn.click({ timeout: 15000 });

  await page.waitForTimeout(1500); // render buffer

  // ────────────────────────────────────────
  // SELECT FIRST ENABLED DATE (FIXED)
  // ────────────────────────────────────────

  const enabledDates = modal.locator(
    'td.CalendarDay[role="button"][aria-disabled="false"]'
  );

  const count = await enabledDates.count();
  console.log("Enabled dates found:", count);

  if (count === 0) {
    throw new Error("No enabled date found in calendar");
  }

  const firstDate = enabledDates.first();
  await expect(firstDate).toBeVisible({ timeout: 10000 });
  await firstDate.click();

  console.log("Date selected successfully");

  // DOB verify
  const dobInput = modal.getByRole("textbox", { name: /Date of Birth/i });
  await expect(dobInput).toHaveValue(/\d{1,2}\/\d{1,2}\/\d{4}/, { timeout: 10000 });

  console.log("Test passed: DOB selected successfully!");
});