import React, { useState } from 'react';
import { useGetUploadImageListQuery } from '../../../../../../generated/graphql';

interface IProps {
  username: string;
  setLoadingMore: (boolean: boolean) => void;
}

const ImageOverviewLoadMore: React.FC<IProps> = ({ username, setLoadingMore }) => {
  const { data, fetchMore, loading, error } = useGetUploadImageListQuery({
    variables: {
      username,
      limit: 5,
    },
  });

  if (loading) return <div>Loading</div>;
  if (error)
    return (
      <div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );

  const [disabled, setDisabled] = useState(false);

  const {
    getUploadImageList: {
      pageInfo: { cursor },
    },
  } = data;

  const className = disabled
    ? 'flex flex-cols text-white bg-red-500  rounded-lg py-2 px-4 disabled:opacity-50 cursor-not-allowed'
    : 'flex flex-cols text-white bg-green-600  rounded-lg py-2 px-4 hover:text-green-600 hover:bg-white border border-solid border-green-600';

  return (
    <div>
      <button
        disabled={disabled}
        data-test="button"
        className={className.toString()}
        onClick={async () => {
          setDisabled(true);
          setLoadingMore(true);
          await fetchMore({
            variables: {
              limit: 3,
              username,
              cursor,
            },
          });
          setLoadingMore(false);
          setDisabled(false);
        }}
      >
        Load more
      </button>
    </div>
  );
};

export default ImageOverviewLoadMore;
