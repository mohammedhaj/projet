import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import homepage from '../pages/HomePage';
import registerpage from '../pages/RegisterPage';
import loginpage from '../pages/LoginPage';
import customerpage from '../pages/CustomerPage';


const dataSet = require('../data/data.json');

const URL = 'https://demo.nopcommerce.com/';
const getURL = ClientFunction(() => window.location.href);
var randomNumber = Math.floor(Math.random() * 10000);
var userEmail = 'moataz'+randomNumber+'@test.com';

fixture`Registration Fixture`
    .page(URL);
 
test('Assert home page', async t => {
    await t
    .expect(getURL()).eql(URL)
    .takeScreenshot()
    .expect(homepage.subtitleHeader.exists).ok()
});

dataSet.forEach(data => {
 test('User Registration and Login Test',async t => {
  await t
     .click(homepage.registreLink)
     .expect(getURL()).contains('register')
     .click(registerpage.GenderOption)
     .typeText(registerpage.FirstName,data.firstname)
     .typeText(registerpage.LastName,data.lastname);
     await registerpage.selectDay(data.birthday);
     await registerpage.selectMonth(data.birthmonth);
     await registerpage.selectYear(data.birthyear);
     await t
     .typeText(registerpage.Email,data.email+randomNumber+'@test.com')
     .typeText(registerpage.Password,data.password)
     .typeText(registerpage.ConfirmPassword,data.password)
     .click(registerpage.RegisterButton)
     .expect(registerpage.SuccessfullMessage.exists).ok()
     .click(homepage.logoutLink) 
     .click(homepage.loginLink)
     .expect(loginpage.accountHeader.exists).ok()
     .typeText(loginpage.emailInput,data.email+randomNumber+'@test.com')
     .typeText(loginpage.passwordInput,data.password)
     .click(loginpage.submitButton)
     .click(homepage.MyaccountLink)
     .expect(customerpage.ordersLink.exists).ok()
     .click(customerpage.ordersLink)
     .expect(customerpage.noOrdersLabel.exists).ok();    
    });
});