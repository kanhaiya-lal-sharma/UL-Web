
const { test, expect } = require('@playwright/test');

test.describe.serial("Search bar test", () => {

  test("city search", async ({ page }) => {

    await page.goto("https://www.universityliving.com/");
   const inputBox = page.getByPlaceholder("Search for City, University, Property").nth(1);

    await inputBox.fill("sydney");
    await inputBox.press('Enter');
  
    await expect(page).toHaveURL("https://www.universityliving.com/australia/city/sydney");
  });

  test("Property search",async({page})=>{

    await page.goto("https://www.universityliving.com/");
   const inputBox = page.getByPlaceholder("Search for City, University, Property").nth(1);

    await inputBox.fill("canvas Lofts");
    await inputBox.press('Enter');
  
    await expect(page).toHaveURL("https://www.universityliving.com/canada/ottawa/apartment/canvas-lofts");
})

test("University search",async({page})=>{

    await page.goto("https://www.universityliving.com/");
   const inputBox = page.getByPlaceholder("Search for City, University, Property").nth(1);

    await inputBox.fill("University of Manchester");
    await inputBox.press('Enter');
  
    await expect(page).toHaveURL("https://www.universityliving.com/united-kingdom/manchester/u/university-of-manchester");
})

});

test("hero image",async({page})=>{

   await page.goto("https://www.universityliving.com/");
   const heroImage=page.getByAltText("university living banner image");
    await expect(heroImage).toHaveScreenshot('ul-heroImage.png');
})

test.describe("nav bar test",()=>{

   test("download App",async({page})=>{

    await page.goto("https://www.universityliving.com/", {
    waitUntil: "domcontentloaded",
  });

    const daButton=  page.getByRole("button",{ name: /Download App/i,});
    await expect(daButton).toBeVisible();
})

test("My kind room",async({page})=>{

     await page.goto("https://www.universityliving.com/", {
    waitUntil: "domcontentloaded",
  });

    const mkrButton=  page.getByRole("link",{ name: /My Kinda Room/i,});
    await expect(mkrButton).toBeVisible();
})

test("Group Booking",async({page})=>{ 

    await page.goto("https://www.universityliving.com/", {
    waitUntil: "domcontentloaded",
  });

    const gbButton=  page.getByRole("link",{ name: /Group Booking/i,});
    await expect(gbButton).toBeVisible();
})

test("contact us",async({page})=>{

   await page.goto("https://www.universityliving.com/",{
     waitUntil:"domcontentloaded",
   });

   const cuButton= await page.getByRole('navigation').getByText('Contact Us');

   await expect(cuButton).toBeVisible();
})


})