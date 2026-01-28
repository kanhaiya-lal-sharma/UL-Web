const{test,expect}=require('@playwright/test');

test("login test case of existing user", async ({ page }) => {
  await page.goto("https://ul1.devbeta.in/", {
    waitUntil: "domcontentloaded",
  });

  // Header login
  await page.getByRole("button", { name: "Login" }).click();

  // Email input (direct)
  const emailInput = page.getByRole("textbox", { name: "Email*" });

  await expect(emailInput).toBeVisible();
  await emailInput.fill("kls49.university@yopmail.com");

  // Modal ka login button
  await page
    .getByRole("button", { name: "Login" })
    .nth(1) // header wala skip, modal wala click
    .click();

  // ================= OTP MODAL =================

  // Modal open check (WAIT + ASSERT)
  const welcomeText = page.getByText("Welcome to University Living");
  await expect(welcomeText).toBeVisible({ timeout: 10000 });

  console.log("Modal is open ✅");

  // OTP fill (name = otp0..otp4)
  const otpValues = ["5", "4", "3", "2", "1"];

  for (let i = 0; i < otpValues.length; i++) {
    const otpInput = page.locator(`input[name="otp${i}"]`);
    await expect(otpInput).toBeVisible();
    await otpInput.fill(otpValues[i]);
  }

  // Continue button
  await page.getByRole("button", { name: "Continue" }).click();

  console.log("OTP filled and Continue clicked ✅");

  //login verify karna 

const userMenu = page.locator('div.flex.items-center.peer.cursor-pointer.group');
await expect(userMenu).toBeVisible();
await userMenu.click();


//await expect(page.getByText("My Bookings")).toBeVisible();
await expect(page.getByText("Log Out")).toBeVisible();

console.log("User menu opened → Login confirmed ✅");


});
