import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  query LoginUser {
    viewer {
      id
      login
      name
      avatarUrl
      bio
      email
      company
      location
      resourcePath
      createdAt
      updatedAt
      status {
        id
        message
        emoji
        createdAt
        updatedAt
      }
      sponsorsListing {
        id
      }
      isCampusExpert
      isDeveloperProgramMember
      isEmployee
      isHireable
      isSiteAdmin
      isViewer
      viewerCanFollow
      websiteUrl
      twitterUsername
    }
  }
`;
