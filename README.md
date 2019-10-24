## Simple blog app
This is a simple GraphQL web application to demonstrate Dgraph's GraphQL capabilities.
The web app is built using ReactJS and Apollo-React client libraries.
And the GraphQL API's for the web app is powered by Dgraph.

[Dgraph](https://graphql.dgraph.io) is an open-source, distributed, and transactional graph database with a native GraphQL interface.

Using Dgraph, you can get GraphQL APIs without writing any code.

You need to define just the GraphQL type definitions, Dgraph auto-generates the GraphQL APIs for you.

These APIs provide you with capabilities to perform CRUD operations on the types defined.

Dgraph provides custom directives for your GraphQL type definitions. You need to add them to your GraphQL type definitions be able to make use of some of Dgraph's advanced database features.
Here are the docs explaining Dgraph's custom GraphQL directives.

Here is how we arrived at the GraphQL type definition for our blog application. 

Step 1: Define your application graph
Create an illustration with author, country, and blog linked together.

Step 2: Translate the application Graph into a GraphQL type definition. 

Step 3: Add Dgraph custom annotations. 

----


*Note:* Point the GraphQL docs with instructions for writing the type definitions with annotations.
*Running the GraphQL server on a GCP instance for Paul.*


## Runnning the app 
Note: Need to add the GraphQL standalone image reference to start Dgraph server.

```sh
$ git clone https://github.com/hackintoshrao/dgraph-graphql-js.git
$ cd dgraph-graphql-js
$ Install yarn
$ yarn add apollo-boost react-apollo graphql react-router react-router-dom
$ yarn start
```

---





