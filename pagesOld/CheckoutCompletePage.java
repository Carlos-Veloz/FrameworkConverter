package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import utils.logs.Log;

public class CheckoutCompletePage extends Base {
    public CheckoutCompletePage(WebDriver driver) {
        super(driver);
    }

    private WebElement pageTitle() {
        return driver.findElement(By.xpath("//span[text() = 'Checkout: Complete!']"));
    }

    private WebElement pageHeader() {
        return driver.findElement(By.className("complete-header"));
    }

    public void waitUntilPageIsLoaded() {
        Log.info("Wait for Checkout Complete page to be loaded");
        waitForElementVisibility(pageTitle());
    }

    public String getHeaderText() {
        Log.info("Get Checkout Complete header text");
        return pageHeader().getText();
    }

}