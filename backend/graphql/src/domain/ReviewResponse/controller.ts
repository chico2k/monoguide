import { ValidationError } from 'apollo-server';
import Container, { Service } from 'typedi';
import type { IContext } from "../../lib/apolloServer/types";
import type ReviewResponse from './graph';
import { ReviewResponseService } from './service';
import type { ReviewResponseInput } from './types';

@Service()
class ReviewResponseController {
  reviewResponseService = Container.get(ReviewResponseService);

  createReviewResponseService = async (
    data: ReviewResponseInput,
    ctx: IContext
  ): Promise<ReviewResponse> => {
    const reviewResponseOrError =
      await this.reviewResponseService.createReviewResponseService(data, ctx);

    switch (reviewResponseOrError.type) {
      case 'CreateReviewResponseSuccess':
        return reviewResponseOrError.data.reviewResponse;
      case 'CreateReviewResponseFail':
        throw new ValidationError('REVIEWRESPONSE_SERVICE_FAILED');
    }
  };
}

export { ReviewResponseController };
