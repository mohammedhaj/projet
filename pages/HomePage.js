import { Selector,t } from "testcafe";
class HomePage{
    constructor(){
        this.subtitleHeader = Selector('h2').withText('Welcome to our store')
        this.registreLink=Selector('a.ico-register');
        this.loginLink=Selector('a.ico-login')
        this.carteLink=Selector('a').withText('Shopping cart')
        this.currencyList=Selector('select#customerCurrency')
        this.MyaccountLink=Selector('a').withText('My account')
        this.logoutLink=Selector('a.ico-logout')
    }
    get productSearch(){
        return Selector("input[id='small-searchterms']");
    }
    async search(product){

        await t 
        .typeText(this.productSearch,product)
        .wait(3000)
        .pressKey('enter');

    }
    async changeCurrency(currency){
        await t 
        .click(this.currencyList)
        .click(Selector('option',{text:currency}));
    }

}
export default new HomePage();