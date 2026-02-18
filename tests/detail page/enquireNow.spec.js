

const { test, expect } = require("@playwright/test");

test("Enquire Now Form", async ({ page }) => {

  await page.goto("https://ul1.devbeta.in/united-kingdom/london/property/iq-sterling-court");

  // Click first Enquire now under Bronze En Suite
  const firstEnquire = page.locator('div')
    .filter({ hasText: 'Bronze En Suite' })
    .getByRole('button', { name: /enquire now/i })
    .first();

  await firstEnquire.click();

  // Wait for modal heading
  const modal = page.getByRole('heading', {
    name: /enquire now/i,
    level: 4
  }).locator('..');

  await modal.waitFor({ state: 'visible', timeout: 15000 });

  // ===== Generate Dynamic Email & Phone =====
  const date = new Date();

  const unique =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

  const phone =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}`;

  const email = `user_${unique}.university@yopmail.com`;

  console.log("Email for CRM check:", email);
  console.log("Phone:", phone);

  // ===== Fill Full Name =====
  await modal.getByPlaceholder('Full Name')
    .fill('kanhaiya lal sharma');

  // ===== Fill Email =====
  await modal.getByPlaceholder('Email Address')
    .fill(email);

  // ===== Select Country Code =====
  await modal.locator('.selected-flag').click();
  await modal.getByRole('option', { name: '+244' }).click();

  // ===== Fill Phone (React Input Fix) =====
  const phoneInput = modal.locator('#contactNumber');

  await phoneInput.click();
  await phoneInput.press('Control+A');
  await phoneInput.press('Backspace');
  await phoneInput.type(phone, { delay: 100 });

  // ===== Select Nationality =====
  await modal.getByRole("combobox", { name: /nationality/i })
    .selectOption({ label: "Indian" });

  // ===== Select University =====
  const universityInput = modal.locator('[data_automation_id="university-input-field"]');

  await universityInput.click();
  await universityInput.fill('UCFB London');
  await page.waitForTimeout(1000);  // wait for dropdown suggestions
  await universityInput.press('Enter');

  // ===== Click Submit =====
  const submitBtn = modal.getByRole("button", { name: /submit/i });

  await expect(submitBtn).toBeEnabled();
  await submitBtn.click();

  // ===== Optional: Success Validation =====
  // await expect(page.locator("text=Thank you")).toBeVisible();

});
