 const{test,expect}=require('@playwright/test');

 
test("url test case",async({page})=>{

     await page.goto("https://www.universityliving.com/");

     const url = await page.url();

     expect(url).toBe("https://www.universityliving.com/");
})


test("title test case", async ({ page }) => {
  await page.goto("https://www.universityliving.com/");

  const title = await page.title();
  expect(title).toBe(
    "University Living: #1 Trusted Platform for Student Accommodation"
  );
});


