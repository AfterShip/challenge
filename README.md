challenge-2
===========
Don't fork this repo, simply submit your answer via

https://gist.github.com/

write a method, transform:

```

var a =
	{
		origin_country_iso3: { message: 'Invalid origin_country_iso3.' },
		quantity: { message: 'Invalid quantity.' },
		weight: { message: 'Weight must > 0.' },
		box: {
			quantity: { message: 'Invalid quantity.' },
			weight: { message: 'Weight must > 0.' }
		},
		items: [
			{
				quantity: { message: 'Invalid quantity.' },
				weight: { message: 'Weight must > 0.' }
			},
			{
				quantity: { message: 'Invalid quantity.' },
				weight: { message: 'Weight must > 0.' }
			}
		]
	}

```

to

```
{ 
  'origin_country_iso3': 'Invalid origin_country_iso3.',
  'quantity': 'Invalid quantity.',
  'weight': 'Weight must > 0.',
  'box.quantity': 'Invalid quantity.',
  'box.weight': 'Weight must > 0.',
  'items[0].quantity': 'Invalid quantity.',
  'items[0].weight': 'Weight must > 0.',
  'items[1].quantity': 'Invalid quantity.',
  'items[1].weight': 'Weight must > 0.'
}
```

Scoring
===========
1. follow our coding guideline
2. use min. line of code
3. comment lines are exluded
