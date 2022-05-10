import { gql } from 'apollo-server';

export const createSport = gql`
  mutation createSport($level: Int!, $sportRef_id: Int!) {
    createSport(data: { level: $level, sportRef_id: $sportRef_id }) {
      id
      level
      sportRef {
        title
        id
      }
    }
  }
`;
