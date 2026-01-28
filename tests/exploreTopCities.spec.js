
const{test,expect}=require("@playwright/test");


test.describe("Explore Top Cities",()=>{

   test("United Kingdom",async({page})=>{

       await page.goto('https://www.universityliving.com');

  const exploreCitiesSection = page.locator('section.HomePage_alternateBgColor__BbiOf').first();
  await expect(exploreCitiesSection).toBeVisible();

   })
})

/*
test('Explore Top Cities section UI should be correct', async ({ page }) => {
  await page.goto('https://www.universityliving.com');

  const exploreCitiesSection = page.locator(
    'section.HomePage_alternateBgColor__BbiOf'
  ).first();

  await exploreCitiesSection.scrollIntoViewIfNeeded();
  await expect(exploreCitiesSection).toBeVisible();

  await expect(exploreCitiesSection).toHaveScreenshot(
    'explore-top-cities.png',
    {
      maxDiffPixelRatio: 0.02,
    }
  );
});

  
*/