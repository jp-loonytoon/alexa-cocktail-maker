# Cocktail Maker

Cocktail Maker will let you find out how to make popular cocktails. It uses the [Cocktail DB API](https://www.thecocktaildb.com/) as the back-end service. The popular [Rapid API](https://rapidapi.com/thecocktaildb/api/the-cocktail-db) framework is used to access Cocktail DB API.

## Usage

The Cocktail Maker skill works by being activated like this:

U: Alexa, open Cocktail Maker.
A. Hi! What cocktail would you like to make?

U. How do you make a margarita?
A. OK, you need: Tequila, Triple sec, Lime juice, and Salt. Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.

## Skill Configuration

Currently it uses an Alexa hosted skill with the following details:

* Skill Name: Cocktail Maker
* Invocation Name: `cocktail maker`
* *Alexa Skill ID: `amzn1.ask.skill.7337c451-d15b-4a32-a47c-b1fdc3706eca`.

![Architecture](architecture.png)

### Rapid API Key

A Rapid API key is required to for access to Cocktail DB API. You can sign up for a key from: https://rapidapi.com/thecocktaildb/api/the-cocktail-db. The key needs to go into the `config.json` file in the `lambda` directory. It should have read-access permissions only.

## Testing

You can test locally by running [Bespoken](https://read.bespoken.io/unit-testing/getting-started/) which uses the uses the fixtures defined in `test`. Run the following command from the project root directory:

```bash
bst test
```

You should see output like this:

![Bespoken test](bst-test.jpg)

If you look in the `test-output/report` directory you'll see an `index.inline.html` report that should look like this:

![Bespoken test report](bst-test-report.png)

You can then use the Amazon Alexa `ask` tool to setup a test interactive session from your local environment like this:

```bash
ask dialog
```

Then initiate a conversation like this:

```bash
User  > Alexa, open Cocktail Maker.
Alexa > Hi! What cocktail would you like to make?
User  > Tell me how to make a Long Island Tea.
Alexa > OK, you need: Vodka, Light rum, Gin, Tequila, Lemon, and Coca-Cola. Combine all ingredients (except cola) and pour over ice in a highball glass. Add the splash of cola for color. Decorate with a slice of lemon and serve.
```

## Deployment to Amazon

To deploy to the Amazon Alexa hosted (development) environment you simply do a `git push` to of your master branch. You can then test the status of the skill like this:

```bash
ask smapi get-skill-status -s amzn1.ask.skill.7337c451-d15b-4a32-a47c-b1fdc3706eca
```

