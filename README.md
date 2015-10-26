## The challenge
---

* DOWNLOAD this repository to your own Github public repository.
* Create a new repo, name it by using this shortGUID generator
* REMOVE ALL the content in this readme, don't put anyw wording like "aftership" or "challenge" so that other candidates cannot search your repo and copy your code.
* Do NOT fork, as other candidates would be able to see your solution easily.
* Use [beanstalkd](http://kr.github.io/beanstalkd/), mongodb, nodejs (v4.2.1)
* Get the exchange rate from xe.com or other source, store it in mongodb for every 1 min.
* The code will be run in Max OSX for testing, and Amazon Linux AMI or Ubuntu 14.04 for final review if needed.
* If you are using windows, find way to code and test it before submit.


## Goal
----
Code a currency exchagne rate `worker`

1. Input currency `FROM` and `TO`, say USD to HKD, one currency conversation per job.
2. Get `FROM` and `TO` currency every 1 min, save 10 successful rate results to mongodb include the timestamp, then that currency converstaion job is done.
3. If any problem during the get rate attempt, retry it delay with 3s
4. If failed more than 3 times in total (not consecutive), bury the job.

## Requirements

- Scale horizontally (can run the process in multiple machines at the same time)
- Using [co](https://github.com/tj/co) + [bluebird](https://github.com/petkaantonov/bluebird)
- MUST apply our coding gudieline by using [eslint check](https://github.com/AfterShip/eslint-config-aftership)
- MUST follow [coding documentation](https://github.com/AfterShip/jsdoc)
- MUST include unit test in your code

## FAQ
- `consumer worker` is the script to take the job from the queue, in this case is the scraper to get the exchange rate.
- `seed` is the first data input, say HKD to USD to the queue.
- `producer worker` is used to `SEED` the data only, it is optional in this challenge.
- If you don't have xe.com api key, use your own way to get the answer.


## How it work?
---

1. Seed your job in beanstalkd, tube_name = your_github_username

##### Sample beanstalk payload for getting HKD to USD currency, you can use any format or modify the payload to fit your need.
```
{
  "from": "HKD",
  "to": "USD"
}
```

2. Code a nodejs worker, get the job from beanstalkd, get the data from xe.com and save it to mongodb. Exchange rate need to be round off to `2` decmicals in `STRING` type.
	
	a. If request is failed, reput to the tube and delay with 3s.

	b. If request is succeed, reput to the tube and delay with 60s.

##### mongodb data:
```
{
	"from": "HKD",
	"to": "USD",
	"created_at": new Date(1347772624825),
	"rate": "0.13"
}

```

3. Stop the task if you tried 10 succeed attempts or 3 failed attempts in total.

4. Scale horizontally: NOTICE that the above bs payload is just an example, you should make sure your script can be run as `distributed` system (in multiple instances / servers. Using CLUSER mode in NODE.JS DO NOT help)

5. You are coding the `consumer worker`, NEVER use your `consumer worker` to `SEED` the data.

6. You can seed the data to the tube with bs console or coding another `producer worker` to `SEED` the data.


## Tools you may need
---
1. beanstalkd server is setup for you already, make a JSON request to this:

	/POST http://challenge.aftership.net:9578/v1/beanstalkd
	
	header: aftership-api-key: a6403a2b-af21-47c5-aab5-a2420d20bbec

2. Get a free mongodb server at [mongolab](https://mongolab.com/welcome/)


3. You may also need [Beanstalk console](https://github.com/ptrofimov/beanstalk_console) or any tools u like.


## Help?
---
am9ic0BhZnRlcnNoaXAuY29t
