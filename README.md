# This challenge is for the role: Testing Engineer

- Create test specs, to cover the product requirment as detail as possible
- Use proper tools to run, record the tests, and report the defeat in the tools that you pick.
- Make automation test (Senior level, if you know how to do, you should do it. As it is used to judge your salary level)


## Product Requrements

1. As a public user, I can input a UPS tracking number in 

	https://track.aftership.com
	
	text input box, click submit and get the tracking result
	

2. As a public user, when visit http://track.aftership.com should be redirected to https://track.aftership.com with http status code 301

3. As a public user, if visit more than 12 times of the tracking number result page within 60 mins, using same IP address
  
	i.e. https://track.aftership.com/:courier/:tracking_number
  
	the 13th visit, I should see the google recaptcha
  
4. As a public user, if input `123456789` as tracking number, I should see a courier selection menu to ask for proper courier
  Screenshot like this:
  ![image](https://cloud.githubusercontent.com/assets/1013507/15465901/79287f04-2109-11e6-93ee-00351ec0d1d8.png)

  If aftership detect the tracking number format fit more than 1 courier, this selection menu will be shown and ask the user to choose the correct courier to track.

5. XSS attack should be handled properly

6. As a registered aftership user, I should able to make an API call: `https://www.aftership.com/docs/api/4/couriers/post-couriers-detect` to detect the tracking number: `123456789`

	The number of matched couriers should be same as in PRD #4


## What we care
1. Does test cases cover all the requirements?
2. Any defect is found?
3. Can you create a good defect report so that developer can follow and fix it without back and forth?
4. Can you make use of proper tools to do the testing tasks?
5. Can make the automation tests work?
6. Can you provide feedback / changes in requirement after test, to make the system better.
7. Automation test should be applied if possible