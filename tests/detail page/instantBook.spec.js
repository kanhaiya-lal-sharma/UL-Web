
const{test,expect}=require("@playwright/test");

test("Instant Book",async({page})=>{

     await page.goto("https://ul1.devbeta.in/united-kingdom/london/property/iq-sterling-court");

     // Click first Instant Book  under Bronze En Suite

    const firstInstantBook = page.locator('div')
    .filter({ hasText: 'Bronze En Suite' })
    .getByRole('button', { name: /Instant book/i })
    .first();

  await firstInstantBook.click();

  //login modal

  const logInModal = page.getByText("Welcome to University Living").locator('..');

  const emailInput=logInModal.getByRole("textbox",{name:"email"});

  const date = new Date();

 const eno = `${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

const phone =`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}${date.getHours()}${date.getMinutes()}`;

  const email=`user_${eno}.university@yopmail.com`;

  console.log(email);

  
  await emailInput.fill(email);

  logInModal.getByRole("Button",{name:"Login"}).click();

  //sign up modal

  const signUpModal = page.getByRole("button",{name:"Sign Up"}).locator('..');

  // filling sign up form

const firstNameInput =signUpModal.getByRole("textbox",{name:"First Name"});
await firstNameInput.fill("kanhaiya lal");

const lastNameInput =signUpModal.getByRole("textbox",{name:"Last Name"});
await lastNameInput.fill("sharma");

// const phoneNumberInput =signUpModal.getByRole("textbox",{name:"contanctNumber"});
// await phoneNumberInput.fill(phone);


const countryCodeInput=signUpModal.locator('//div[@class="flag in"  ]');
await countryCodeInput.click();
await signUpModal.getByText('Angola', { exact: false }).click();
//await signUpModal.locator('#contactNumber').fill(phone);

// const phoneNumberInput = signUpModal.locator('#contactNumber');
// await expect(phoneNumberInput).toBeVisible();

// await phoneNumberInput.click();
// await phoneNumberInput.fill("");               
// await phoneNumberInput.fill("1234567890");

const phoneInput = signUpModal.locator('#contactNumber');

await phoneInput.focus();               // pehle focus forcefully
await page.keyboard.down('Control');    // ya Meta key Mac pe
await page.keyboard.press('A');         // select all
await page.keyboard.up('Control');
await page.keyboard.press('Backspace'); // clear karo

// Ab ek-ek digit type karo (delay ke saath)
await phoneInput.type(phone, { delay: 120 });  
// ya
//await phoneInput.pressSequentially(phone, { delay: 100 });

/*
const phoneNumberInput =page.getByRole("textbox",{name:"Phone Number"});
await expect(phoneNumberInput).toBeVisible();
await phoneNumberInput.fill(phone);
*/

// const phoneNumberInput =signUpModal.getByRole("textbox",{name:"contactNumber"});
// //console.log({phone, phoneNumberInput});
// await expect(phoneNumberInput).toBeVisible();
//  await phoneNumberInput.press('Control+A');
//   await phoneNumberInput.press('Enter');
//  await phoneNumberInput.type(phone, { delay: 100 });

//  await phoneNumberInput.click();
//  await phoneNumberInput.clear();
//  await phoneNumberInput.fill(phone);

const signUpCTA= signUpModal.getByRole("button",{name:"Sign Up"});

  await expect(signUpCTA).toBeEnabled();
  
  await signUpCTA.click();

const otpModal= page.getByText("To continue, please enter the 5-digit code sent to").locator('..');
 
 expect(otpModal).toBeVisible();
})