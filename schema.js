export const typeDefs = `#graphql
  type Question {
    id: String!
    text: String!
    code: String!
    problem: String!
    group: String!
  },
  type Query {
    questions: [Question] 
  }
`