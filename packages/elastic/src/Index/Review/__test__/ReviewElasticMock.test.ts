import { ReviewElasticMock } from '../__mock__';
import { elasticReviewSeed } from '../__mock__/data';

describe('Review Elastic Mock Unit Test', () => {
  const elastiReviewMock = new ReviewElasticMock();

  it('should create the Elastic Mock', async () => {
    expect(!!elastiReviewMock).toBe(true);
  });

  it('should get the list of seeds', async () => {
    const listOrError = await elastiReviewMock.getReviewList({
      userId: 'user_1'
    });

    if (listOrError.type === 'ReviewListError')
      throw new Error(listOrError.type);

    const seedLength = elasticReviewSeed.length;

    const hits = listOrError.output.hits.hits.length;

    expect(hits).toEqual(seedLength);
  });

  it('should get the review detail', async () => {
    const detailOrError = await elastiReviewMock.getReviewDetail(1);

    if (detailOrError.type === 'ReviewDetailError')
      throw new Error(detailOrError.type);

    const {hits} = detailOrError.output.hits;

    expect(hits.length).toEqual(1);

    expect(JSON.stringify(elasticReviewSeed[0])).toMatch(
      JSON.stringify(hits[0]._source)
    );
  });

  it('should handle has reviewed true', async () => {
    const hasReviewedOrError = await elastiReviewMock.userHasReviewed(
      'user_2',
      'user_1'
    );
    if (hasReviewedOrError.type === 'ReviewHasReviewedError')
      throw new Error(hasReviewedOrError.type);
    expect(hasReviewedOrError.output).toBe(true);
  });
  it('should handle has reviewed false', async () => {
    const hasReviewedOrError = await elastiReviewMock.userHasReviewed(
      'user_2',
      'no_reviewed_user'
    );
    if (hasReviewedOrError.type === 'ReviewHasReviewedError')
      throw new Error(hasReviewedOrError.type);
    expect(hasReviewedOrError.output).toBe(false); //
  });

  it('should thorw an error if rewivew is not found', async () => {
    const detailOrError = await elastiReviewMock.getReviewDetail(1000);

    expect(detailOrError.type).toMatch('ReviewDetailError');
  });
});
