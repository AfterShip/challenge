# This challenge is for the QA

* Create test specs, to cover the product requirment as detail as possible
* Use proper tools to run, record the tests, and report the defeat in the tools that you pick.
* Make automation test (Senior level, if you know how to do, you should do it. As it is used to judge your salary level)

## Product Requrements:
* As a public user, I can input a UPS tracking number in 

	https://track.aftership.com
	
	text input box, click submit and get the tracking result
	
	P.S. tracking number can be found from https://www.aftership.com/courier/ups or google it

* http://track.aftership.com should redirect to https://track.aftership.com with http status code 301

* As a public user, if visit more than 12 times of the tracking number result page within 60 mins, using same IP address
  
	i.e. https://track.aftership.com/:courier/:tracking_number
  
	the 13th visit, I should see the google recaptcha
  
* If I input `123456789` as tracking number, I should see a courier selection menu to ask for proper courier

* XSS attack should be handled properly



## What we care
1. Can you write the test cases to cover all the requirements?
2. Can find any defects?
3. Can you create a good defect report so that developer can follow and fix it without back and forth?
4. Can you make use of proper tools to do the QA tasks?
5. Can make the automation tests work?
6. Can you provide feedback / changes in requirement after test, to make the system better.