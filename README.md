## Challenge
Notice that you should do this challenge only AFTER the first interview.

Make a product requirements document (PRD) for postmen.com

Goal for this PRD:
1. Change the revuene model for postmen.com from free to pay model
2. Minimize the impact for the existing users for this migration
3. No downtime and data lost is allowed during migration

Here are some assumptions:

1. Total users: 100,000
2. Active users 10,000
3. Active user = who create the shipment label at least 1 per day in last 30 days in production	
4. 50% of the users create <=100 labels per month
5. 45% of the users create >100 and <=1,000 labels per month
6. 4% of the users create > 1,000 and <=10,000 labels per month
7. 1% of the users create >10,000 and <=1,000,000 labels per month
8. Geolocation 80% of the users in USA, 20% rest of the world 


## Business requirements

- Will charge user 1 cent per label generated
- Accept online credit card payment only
- Billing model is prepaid, like skype credit
- New pricing model should roll out on a specific date, say 1st Sept. All exisitng and new users should use change to the new pricing model. No transaction period is allowed.

## Question?

Reply to the email that you got the challenge.



