import { gql } from "graphql-request";

export const BITES_CONTRACT_ADDRESS =
  "0xf37a972B8432260135eDaD65b499A1D29Beaf493";

export const GET_BITES_QUERY = gql`
  query bites(
    $first: Int
    $skip: Int
    $orderBy: Bite_orderBy
    $orderDirection: OrderDirection
    $where: Bite_filter
    $comments_first: Int
    $comments_skip: Int
    $comments_orderBy: Comment_orderBy
    $comments_orderDirection: OrderDirection
    $comments_where: Comment_filter
  ) {
    bites(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      content
      imageHash
      author {
        id
      }
      comments(
        first: $comments_first
        skip: $comments_skip
        orderBy: $comments_orderBy
        orderDirection: $comments_orderDirection
        where: $comments_where
      ) {
        id
        content
        author {
          id
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const GET_USERS_QUERY = gql`
  query users(
    $first: Int
    $skip: Int
    $orderBy: User_orderBy
    $orderDirection: OrderDirection
    $where: User_filter
  ) {
    users(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      address
      createdAt
      bites {
        id
        content
        imageHash
        createdAt
      }
      comments {
        id
        content
        createdAt
        bite {
          id
          content
        }
      }
    }
  }
`;
