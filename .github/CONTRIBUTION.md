# Contribution Guide

## Developing

There are two simple ways of testing your changes. Either run the nebula development server or build the extension and add it to Qlik Sense

1. Install dependencies with `yarn`
1. Run it using nebula development server with `yarn start`
   - The development server needs to connect to and communicate with the Qlik Associative Engine running within any of Qlik's product offerings.
   - For the Saas Edition of Qlik Sense, you can add your webIntegrationId and pointing the engine URL to your tenant following [Nebula serve configuration file](https://qlik.dev/libraries-and-tools/nebulajs/nebula-serve#configuration-file) or the introduction page of `http://localhost:8000` when you run the development server.
1. Or, run `yarn build` and upload the /dist folder as an extension on [Qlik Sense Enterprise for Windows](https://help.qlik.com/en-US/sense-developer/November2021/Subsystems/Extensions/Content/Sense_Extensions/Howtos/deploy-extensions.htm) or [Qlik Sense SaaS](https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Admin/mc-extensions.htm)

## API spec generating and verification

TBD

## Testing

### Unit test

Run unit tests with:

    yarn test:unit

### Rendering test

Run rendering tests with:

    # Install dependencies
    yarn --frozen-lockfile

    # Run tests
    yarn test:e2e

## Linting

Run lint with:

    yarn lint

## Type checking

Run type checking with:

    yarn tsc

## Releasing

TBD

### Step-By-Step

TBD
