import { gql } from '@apollo/client';
export default gql`
  mutation AddCommentPayload($subjectId: ID!, $body: String!) {
    addComment(input: { subjectId: $subjectId, body: $body }) {
      commentEdge {
        node {
          id
          body
          bodyHTML
          bodyText
        }
      }
    }
  }
`;
