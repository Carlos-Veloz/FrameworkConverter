package tests;

import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.Assertion;
import org.testng.asserts.SoftAssert;
import pages.*;
import utils.PropertiesConfig;
import utils.data.DataProviderReader;
import utils.data.ShippingInformation;
import utils.logs.Log;
import utils.reports.Reporter;

/**
 * This class contains the test cases related to Checkout process.
 *
 * @lastmodifier Cecilia Ocampo
 */
public class CheckoutTest extends BaseTest {
    private SoftAssert softAssert;
    private InventoryPage home;
    private MenuSection menu;
    private YourCartPage yourCart;
    private CheckoutStepOnePage yourInformation;
    private CheckoutStepTwoPage overview;
    private CheckoutCompletePage completePage;
    private ShippingInformation form;

    @BeforeMethod
    public void testInit() {
        LoginPage login = new LoginPage(driver);
        softAssert = new SoftAssert();
        home = new InventoryPage(driver);
        menu = new MenuSection(driver);
        yourCart = new YourCartPage(driver);
        yourInformation = new CheckoutStepOnePage(driver);
        overview = new CheckoutStepTwoPage(driver);
        completePage = new CheckoutCompletePage(driver);
        form = ShippingInformation.createShippingDetails();
        driver.get(PropertiesConfig.URL);
        login.login(PropertiesConfig.VALID_USER, PropertiesConfig.VALID_PASSWORD);
    }

    @Test(groups = {"smoketest"}, dataProvider = "product-provider", dataProviderClass = DataProviderReader.class)
    public void validate_item_at_checkout(String itemName, String itemDescription, String itemPrice) {
        WebElement item;
        home.waitUntilPageIsLoaded();
        menu.resetApp();
        home.addBackpackToCart();
        yourCart.clickShoppingCartLink();
        yourCart.waitUntilPageIsLoaded();
        yourCart.clickCheckoutButton();
        yourInformation.waitUntilPageIsLoaded();
        yourInformation.fillYourInformationForm(form.getFirstname(), form.getLastname(), form.getZipcode());
        yourInformation.clickContinueButton();
        overview.waitUntilPageIsLoaded();
        item = overview.getInventoryItem(itemName);
        softAssert.assertEquals(overview.getItemDescription(item), itemDescription);
        softAssert.assertEquals(overview.getItemPrice(item), itemPrice);
        softAssert.assertAll();
    }

    @Test(groups = {"smoketest"})
    public void validate_successful_checkout() {
        home.waitUntilPageIsLoaded();
        menu.resetApp();
        home.addBackpackToCart();
        yourCart.clickShoppingCartLink();
        yourCart.waitUntilPageIsLoaded();
        yourCart.clickCheckoutButton();
        yourInformation.waitUntilPageIsLoaded();
        yourInformation.fillYourInformationForm(form.getFirstname(), form.getLastname(), form.getZipcode());
        yourInformation.clickContinueButton();
        overview.waitUntilPageIsLoaded();
        overview.clickFinish();
        completePage.waitUntilPageIsLoaded();
        Assert.assertEquals(completePage.getHeaderText(), "THANK YOU FOR YOUR ORDER");
    }

}