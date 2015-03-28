# Get Tracking info from Courier

The goal of this challenge is to get the tracking information from the courier's system.

There are 3 tests:

```
purolator
330218400340
KEB100467043
330217139535


estes
0416762345
143-0036202-0
107-0120425

elta-courier
RE257466475GR
CP332216823GR
PD124478756GR
```




# Usage

## Instructions

1. [DOWNLOAD this repository](https://github.com/AfterShip/aftership-challenge/archive/master.zip) to your own Github `public` repository.
2. Create a new repo, name it by using [this shortGUID generator](http://www.shortguid.com/)
3. Do NOT fork, as other candidates would be able to see your solution easily.
4. Do preserve commit history so it is easy for us to add your repository as a remote.
5. Send us a link to the public repository you used and an estimate of how long you will take
6. Run `npm install`
7. Implement `courier` in `couriers/lib/the_courier_name.js`
8. Ensure all tests pass in node via `npm test`
9. When finished, send us an email to ask for a review
10. You may modify the test case, or using other tracking number. as the tracking number in the test case may be expired.

## Hints

* Before starting, try to see how AfterShip API work, our coding guideline, you will get a better idea what tracking info should return.
* You can use ANY method to get the tracking result, including API, web crawler, or even you paid someone else to code for you. LoL

## Scoring

1. How do you identify the courier
2. How do you get the tracking result (By API, by web, by any other method)
3. If the code follow our guideline, easy to read, docmentaiton, etc.
4. Performance, the speed for getting the result
5. HOW do you solve the problems, if any.


## Problem?
Contact us at jobs AT aftership.com

