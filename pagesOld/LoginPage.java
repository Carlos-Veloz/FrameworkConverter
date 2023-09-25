package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import utils.logs.Log;

import java.util.Objects;

/**
 * LoginPage Class models the Login page from SauceDemo website.
 * It defines the Page Variables, WebElements and Page Methods.
 *
 * @lastmodifier Cecilia Ocampo
 */
public class LoginPage extends Base {
    public LoginPage(WebDriver driver) {
        super(driver);
    }

    private WebElement userNameInput() {
        return driver.findElement(By.id("user-name"));
    }

    private WebElement passwordInput() {
        return driver.findElement(By.id("password"));
    }

    private WebElement loginButton() {
        return driver.findElement(By.id("login-button"));
    }

    private WebElement errorMessage() {
        return driver.findElement(By.cssSelector(".error-message-container"));
    }

    public void login(String username, String password) {
        Log.info("Enter user name:'"+ username + "' and password: '"+ password +"'");
        userNameInput().sendKeys(username);
        passwordInput().sendKeys((password));
        loginButton().click();
    }

    public String getErrorMsgText() {
        waitForElementVisibility(errorMessage());
        String text = errorMessage().getText();
        if (Objects.nonNull(text)) {
            return text.trim();
        }
        return "";
    }

    public boolean formIsDisplayed() {
        return userNameInput().isDisplayed();
    }
}