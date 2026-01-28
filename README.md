
---

```md
# University Living – QA Automation (Playwright + JavaScript)

This repository contains **end-to-end QA automation tests** for the **University Living** website, created using **Playwright with JavaScript**.

The purpose of this project is to validate critical user flows, ensure UI stability, and demonstrate real-world QA automation skills using modern testing tools.

---

## 🚀 Tech Stack

- Playwright
- JavaScript (Node.js)
- Playwright Test Runner
- Git & GitHub

---

## 🧪 Test Coverage

The automation suite includes tests for the following scenarios:

- Homepage sanity validation  
- Hero section UI verification  
- Explore Top Cities section  
- New user registration flow  
- Existing user login flow  

All tests are written following **Playwright best practices** with reliable locators and meaningful assertions.

---

## 📁 Project Structure

UL-Web/
├── tests/
│   ├── sanityTest.spec.js
│   ├── heroSection.spec.js
│   ├── exploreTopCities.spec.js
│   ├── loginNewUser.spec.js
│   ├── loginExistingUser.spec.js
│   └── heroSection.spec.js-snapshots/
│       └── ul-heroImage-chromium-win32.png
|
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

```



---

## ▶️ How to Run Tests

### Install dependencies
```bash
npm install
````

### Run all tests

```bash
npx playwright test
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

### View test report

```bash
npx playwright show-report
```

---

## 🌐 Browser Coverage

The tests run on multiple browsers supported by Playwright:

* Chromium
* Firefox
* WebKit

---


---

## 🔒 Disclaimer

This project is created **solely for learning, practice, and skill demonstration purposes**.

* Tests are written against the **public University Living website**
* No internal systems, APIs, or confidential data are used
* This repository is **not officially affiliated** with University Living

---

<h2>👤 Author</h2>

<b>Kanhaiya Lal Sharma</b><br>
QA Automation Engineer<br>
Playwright | JavaScript | Web Automation<br>
<a href="https://github.com/kanhaiya-lal-sharma">GitHub Profile</a>





