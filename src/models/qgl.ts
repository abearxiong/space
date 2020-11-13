const GET_ISSUES = '';
export const updateCache = ({ client, data }: any) => {
  client.writeQuery({
    query: GET_ISSUES,
    data: {
      ...data,
      repository: {
        issues: {
          __typename: data.repository.issues.__typename,
          pageInfo: data.repository.issues.pageInfo,
          totalCount: data.repository.issues.totalCount,
          edges: [...data.repository.issues.edges],
        },
        __typename: data.repository.__typename,
      },
    },
  });
};
