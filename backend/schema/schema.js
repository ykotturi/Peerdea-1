/*
The level of abstraction is:
1. user uses graphQL
2. graphQl uses mongoose
3. mongoose actually interacts with database
*/

const graphql = require('graphql');
const Book = require('../src/book');
const Author = require('../src/author');
const Group = require('../src/group');
const Concept = require('../src/concept');

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt,GraphQLSchema,
    GraphQLList,GraphQLNonNull
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const BookType = new GraphQLObjectType({
    name: 'Book',
    //We are wrapping fields in the function as we dont want to execute this ultil
    //everything is initialized. For example below code will throw error AuthorType not
    //found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString },
        pages: { type: GraphQLInt },
        author: {
          type: AuthorType,
          resolve(parent, args) {
              return Author.findById(parent.authorID);
        }
    }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({ authorID: parent.id });
            }
        }
    })
})


const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: () => ({
      id: { type: GraphQLID },
      name: {type: GraphQLString}
    })
})

const ConceptType = new GraphQLObjectType({
    name: 'Concept',
    fields: () => ({
        id: { type: GraphQLID },
        group: {
          //can a concept belong to multiple groups?
          type: GroupType,
          resolve(parent, args){
              return Group.findByID(parent.groupId)
          }
        },
        name: {type: GraphQLString},
        /*
        media: {
            //what is the type?
            type: new GraphQLList(GraphQLString)
        },
        */
        description: {type: GraphQLString},
        yes: {type: GraphQLInt},
        yesand: {type: GraphQLString}
    })
})

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all authors, get all books, get a particular
//book or get a particular author.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        concept: {
            type: ConceptType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Concept.findByID(args.id);
            }
        },
        group: {
            type: GroupType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                return Group.findById(args.id);
            }
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve(parent, args){
                return Group.find({});
            }
        },
        book: {
            type: BookType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument
                //by the user
                return Book.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({});
            }
        },
        author:{
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Author.findById(args.id);
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            }
        }
    }
});

//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addConcept: {
          //add more stuff here
            type: ConceptType,
            args: {
                groupId:  { type: new GraphQLNonNull(GraphQLID)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                //media: {}
                description: {type: new GraphQLNonNull(GraphQLString)},
                yes: {type: new GraphQLNonNull(GraphQLInt)},
                yesand: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
              let concept = new Concept({
                groupId: args.groupID,
                name: args.name,
                description: args.description,
                yes: args.yes,
                yesand: args.yesand
              })
              return concept.save();
            }
        },
        addGroup: {
            type: GroupType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
              let group = new Group({
                  name: args.name
              })
              return group.save();
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                //GraphQLNonNull make these field required
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                pages: { type: new GraphQLNonNull(GraphQLInt)},
                authorID: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    pages:args.pages,
                    authorID:args.authorID
                })
                return book.save()
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});
