const{test,expect }= require('@playwright/test');

test("login test case for new user", async ({ page }) => {
  await page.goto("https://ul1.devbeta.in/", {
    waitUntil: "domcontentloaded",
  });

  // Header login
  await page.getByRole("button", { name: "Login" }).click();

  // Email input (direct)
  const emailInput = page.getByRole("textbox", { name: "Email*" });

  const date = new Date();

 const eno = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

const phone =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}`;

  const email=`user_${eno}.university@yopmail.com`;

  console.log(email);

  await expect(emailInput).toBeVisible();
  await emailInput.fill(email);

  // Modal ka login button
  await page
    .getByRole("button", { name: "Login" })
    .nth(1) // header wala skip, modal wala click
    .click();

// ===========sign up modal===============

const signUpHeading = page
  .getByRole('paragraph')
  .filter({ hasText: 'Sign Up' });

await expect(signUpHeading).toBeVisible({ timeout: 10000 });

// filling sign up form

const firstNameInput =page.getByRole("textbox",{name:"First Name"});
await expect(firstNameInput).toBeVisible();
await firstNameInput.fill("test");

const lastNameInput =page.getByRole("textbox",{name:"Last Name"});
await expect(lastNameInput).toBeVisible();
await lastNameInput.fill("test");

const countryCodeInput=page.locator('//div[@class="flag in"  ]');
await expect(countryCodeInput).toBeVisible();
await countryCodeInput.click();
await page.getByText('Angola', { exact: false }).click();

const phoneNumberInput =page.getByRole("textbox",{name:"Phone Number"});
await expect(phoneNumberInput).toBeVisible();
await phoneNumberInput.fill(phone);


const signUpButton = page.getByRole('button', { name: 'Sign Up' });
await signUpButton.click();

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

const userMenu = page.locator('div.flex.items-center.peer.cursor-pointer.group.transition-all.h-full');
await expect(userMenu).toBeVisible();
await userMenu.click();


//await expect(page.getByText("My Bookings")).toBeVisible();
await expect(page.getByText("Log Out")).toBeVisible();

console.log("User menu opened → Login confirmed ✅");


});
