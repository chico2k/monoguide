import { Resolver, Query, Arg, Mutation, UseMiddleware } from 'type-graphql';
import Container, { Service } from 'typedi';
import { AuthProvider } from '@sportsguide/auth';
import TagRef from './graph';
import { TagRefController } from './controller';

@Service()
@Resolver()
export class TagRefResolver {
  tagRefController = Container.get(TagRefController);

  @Query(() => [TagRef])
  async getTagList(): Promise<TagRef[]> {
    return this.tagRefController.getTagRefListController();
  }

  @UseMiddleware(AuthProvider)
  @Mutation(() => TagRef)
  async createTagRef(@Arg('text') text: string): Promise<TagRef> {
    return this.tagRefController.createTagRefController(text);
  }
}
