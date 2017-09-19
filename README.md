# Do you want to get paid and try this challenge?

Apply AfterShip's SRE role [here](https://www.aftership.com/jobs)

If we think that you are in good fit, you will be given:

1. FREE unlimited GCP / AWS credit to try all service / solution that you can think of.
2. FREE flight / train / ship ticket to Hong Kong, with min. 1 night hotel near our office (if you are not in HK)

What's that for?

You can demostrate, explain and show your design in front of our engineers.

Don't be surprised if our engineers challenge your solution, we like to make things better.


# AfterShip Site Reliability Engineer Challenge


The objective is to create a 3-tier architecture RESTful API application.

The following requirements should be achieved:

1. Deploy in AWS or GCP
2. Monthly uptime SLA 99.99%
3. High Availiably with data eventually consistency
4. The API is able to accept a https POST request, and response

	```json
	{
	"timestamp": 1482160415,
	"counter": 1,
	"message": "Hello world"
	}
	```
	
	The counter value should be increased by 1 for every request.
5. Scalable from 1 req / s to 1,000 req / s with min. error rate and timeout value.
6. Able to manange, patch the architecture easily

You can use any tools and programming language of your preference.


## Deliverable
The solution should deploy either in AWS or GCP.

Free AWS / GCP credit and login info should be given to you by email.

Make sure that there is a README on how to install and run the application when you submit the result by email.


## How we review
- `Architecture` - Does it able to provide the features that we ask for
- `SLA` - Does it fulfill what we need: 99.99% monthly uptime, any SPoF?
- `High Availiably` - Is it really able to support HA?
- `Maintainability` - How easy to deploy the architecture? How easy to patch the security vulnerability, such as Heartbleed bug
- `Documentation` - Explain what and why the stacks / technology you choose. Any difficulties / challenge for you. What did you learn from this challenge?

## Bonus
- `Security` - How secure of the system, any weakness?
- `Benchmark` - How do you do the benchmark? Is it justify? fair?
 
