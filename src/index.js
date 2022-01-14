const {ApolloServer, gql} = require('apollo-server');
let books = require('./data.js')

const typeDefs = gql` 
    type Book {
        title: String!,
        author: String!
    }

    type Author {
        name: String,
    }

    type Query {
        books: [Book] 
    }

    type Mutation {
        addBook(title: String, author: String) : Book
    }
`;	

// [<object>] for an array of objects
// () after the key for the parameters

const resolvers = {
    Query: {
        books : () => books
    },
    Mutation: {
        addBook: (parent, args, context, info) => {
            books.push({
                title : args.title,
                author : args.author
            })
            return {
                title : args.title,
                author: args.author
            }
        }
    } 
}

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => console.log(`Server up at ${url}`));
