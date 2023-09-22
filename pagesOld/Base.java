package pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import utils.PropertiesConfig;

/**
 * Parent class of the Pages classes.
 * It declares the driver Instance variable and defines some methods reused across the Page Classes
 *
 * @lastmodifier Cecilia Ocampo
 */
public abstract class Base {
    protected final WebDriver driver;
    protected WebDriverWait wait;

    public Base(WebDriver driver) {
        this.driver = driver;
        wait = new WebDriverWait(driver, PropertiesConfig.WAIT_TIME);
    }

    protected void waitForElementVisibility(WebElement element) {
        wait.until(ExpectedConditions.visibilityOf(element));
    }

    protected void waitForElementInvisibility(WebElement element) {
        wait.until(ExpectedConditions.invisibilityOf(element));
    }

    protected void waitForPageToReload(WebElement element) {
        wait.until(ExpectedConditions.stalenessOf(element));
    }

    protected void writeText(WebElement element, String text) {
        waitForElementVisibility(element);
        element.sendKeys(text);
    }
}