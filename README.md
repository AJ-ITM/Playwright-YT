# Test Automation in Playwright

## Links
- course https://jaktestowac.pl/course/playwright-wprowadzenie/
- test site https://demo-bank.vercel.app/  
if link is broken check https://jaktestowac.pl/lesson/pw1s01l01/
- code repository https://github.com/jaktestowac/playwright_automatyzacja_wprowadzenie

## Commands
- check `NodeJS` version  
`node -v`
- new project with Playwright  
`npm init playwright@latest`
- record tests for given site  
`npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
`npx playwright test`
- run tests with browser GUI  
`npx playwright test --headed`
- view report  
`npx playwright show-report`
- cancelling Node process  
hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>

## Playwright Config modifications
- config file `playwright.config.ts`
- disable browsers, i.e. Firefox  
    ```javascript
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },
    ```

## Visual Studio Code
- Preview: for README.md -> double space at the end forces next line
- Autosave: in File -> Auto Save  
- Timeline: file context menu  
- Formatting: editor -> contex menu -> Format document (Shift+Alt+F)  

## Playwright snippets
- test:
    ```javascript
    test('test description', async ({ page }) => {
    
    });
    ```
- describe:
    ```javascript
     test.describe('Group description', () => {

     });
    ```
- running one test: `test.only`
- exit from focus on element: `(element).blur()`