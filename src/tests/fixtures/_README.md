# Fixtures for Unit Tests

## What are fixtures?
Fixtures are **saved snapshots of real API responses** (in this case, from Contentful).  
They are stored as JSON files so tests can run against predictable, static data without making live API calls.

## Why are they important?
- ✅ **Stability**: Tests won’t break if the API is down or the data changes.  
- ✅ **Speed**: Running tests is much faster than making real network requests.  
- ✅ **Reproducibility**: Everyone on the team (and CI/CD pipelines) tests against the same data.  
- ✅ **Debugging**: Makes it easy to compare expected vs. actual results.

## How to get them from Contentful
1. Run your GraphQL query (the same one your app uses) against Contentful’s API.  
   - You can use the [Contentful GraphQL Playground](https://graphql.contentful.com/) or log the response in your app.  
2. Copy the JSON response into a new file inside this folder, for example:  

