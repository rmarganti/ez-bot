# EZ-Bot

Simple Slack responder

## Setup

1. Run `yarn` to install dependencies.
2. Copy `.env.example` to `.env`, and add your token from slack
3. Copy `config.json.example` to `config.json` and update the trigger mappings
4. `yarn start` to start the app

## Docker

1. Follow steps 1-3 above.
2. `docker build -t <whatever_name_you_choose> .`
3. `docker run <your_new_container>`

> NOTE: The Docker image has not been built in a secure manner and should not be used in a non-secure environment. It should not be pushed to a public repo.

