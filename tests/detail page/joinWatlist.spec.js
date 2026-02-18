
const{expect,test}=require("@playwright/test");

test("Join waitlist form",async({page})=>{

    await page.goto("https://ul1.devbeta.in/united-kingdom/london/property/iq-sterling-court");

  // Click first Enquire now under Bronze En Suite
  const firstEnquire = page.locator('div')
    .filter({ hasText: 'Bronze En Suite' })
    .getByRole('button', { name: /Join waitlist/i })
    .first();

  await firstEnquire.click();


} )

