# Cocktail Maker

Cocktail Maker will let you find out how to make popular cocktails. It uses the Cocktail DB API as the back-end.

## Usage

The Cocktail Maker skill works by being activated like this:

U: Alexa, open Cocktail Maker.
A. Hi! What cocktail would you like to make?

U. How do you make a margarita?
A. OK, you need: Tequila, Triple sec, Lime juice, and Salt. Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.

## Skill Configuration

Currently it uses an Alexa hosted skill with the following details:

* Skill Name: Cocktail Maker
* Invocation Name: cocktail maker

## Testing

You can test locally by running [Bespoken](https://read.bespoken.io/unit-testing/getting-started/):

```bash
bst test
```

This uses the fixtures defined in `test`.
