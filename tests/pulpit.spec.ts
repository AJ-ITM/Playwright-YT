import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';
import { loginData } from '../test-data/login.data';

test.describe('Pulpit tests', () => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        const loginPage = new LoginPage(page);
        await loginPage.loginInput.fill(userId);
        await loginPage.passwordInput.fill(userPassword);
        await loginPage.loginButton.click();
    });

    test('quick payment with correct data', async ({ page }) => {
        // Arrange
        const receiverId = '2';
        const transferAmount = '150';
        const transferTitle = 'pizza';
        const expectedTransferReceiver = 'Chuck Demobankowy';
        const expectedConfirmationMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;
        // Act
        const pulpitPage = new PulpitPage(page);
        await pulpitPage.transferReceiver.selectOption(receiverId);
        await pulpitPage.transferAmount.fill(transferAmount);
        await pulpitPage.transferTitle.fill(transferTitle);
        await pulpitPage.executeButton.click();
        await pulpitPage.closeButton.click();
        // Assert
        await expect(pulpitPage.confirmationMessage).toHaveText(
            expectedConfirmationMessage);
    });

    test('successful mobile top-up', async ({ page }) => {
        // Arrange
        const phoneNumber = '500 xxx xxx';
        const amountOfMoney = '50';
        const expectedMessage = `Doładowanie wykonane! ${amountOfMoney},00PLN na numer ${phoneNumber}`;
        // Act
        const pulpitPage = new PulpitPage(page);
        await pulpitPage.receiverDropdown.selectOption(phoneNumber);
        await pulpitPage.moneyAmount.fill(amountOfMoney);
        await pulpitPage.agreementCheckmark.click();
        await pulpitPage.confirmationButton.click();
        await pulpitPage.closeButton.click();
        // Assert
        await expect(pulpitPage.confirmationMessage).toHaveText(expectedMessage);
    });

    test('correct balance after successful mobile top-up', async ({ page }) => {
        // Arrange
        const phoneNumber = '500 xxx xxx';
        const amountOfMoney = '50';
        const initialBalance = await page.locator('#money_value').innerText();
        const expectedBalance = Number(initialBalance) - Number(amountOfMoney);
        // Act
        const pulpitPage = new PulpitPage(page);
        await pulpitPage.receiverDropdown.selectOption(phoneNumber);
        await pulpitPage.moneyAmount.fill(amountOfMoney);
        await pulpitPage.agreementCheckmark.click();
        await pulpitPage.confirmationButton.click();
        await pulpitPage.closeButton.click();
        // Assert
        await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
    });
});
