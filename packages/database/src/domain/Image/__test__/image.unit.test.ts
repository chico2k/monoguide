import { datatype } from 'faker';
import { ImageTestDatabase, IImageWithLocation, IImageCreateInput } from '..';
import { LocationHelper, LocationTestFactory } from '../../Location';

describe('Image Unit Test', () => {
  const testDB = new ImageTestDatabase();

  const locationFactory = new LocationTestFactory();
  const location = locationFactory.getExampleLocationMapbox();

  let imageWithLocation: IImageWithLocation;

  const userId = datatype.uuid();
  const url = 'http://image.com/url.jpg';
  const blurBase64 = 'Ymx1cg==;';

  it('should create a new image without Location', async () => {
    const payload: IImageCreateInput = {
      userId,
      origin: 'gallery',
      isProfileImage: false,
      fileName: 'image.jpg'
    };

    const imageWithOutLocation = await testDB.createImage(payload);

    expect(imageWithOutLocation).toEqual(
      expect.objectContaining({
        userId,
        origin: payload.origin,
        fileName: payload.fileName,
        isProfileImage: payload.isProfileImage,
        location: null
      })
    );
  });

  it('should create a new Image with Location', async () => {
    const payload: IImageCreateInput = {
      userId,
      origin: 'gallery',
      isProfileImage: false,
      location,
      fileName: 'image.jpg'
    };

    imageWithLocation = await testDB.createImage(payload);

    expect(!!imageWithLocation).toBe(true);

    const assertLocation = LocationHelper.getLocationMapping(userId, location);

    expect(imageWithLocation.location).toEqual(
      expect.objectContaining(assertLocation.data)
    );

    expect(imageWithLocation).toEqual(
      expect.objectContaining({
        userId,
        isProfileImage: payload.isProfileImage
      })
    );
  });

  it('should update the image with a url', async () => {
    const result = await testDB.updateImageWithUrl({
      imageId: imageWithLocation.id,
      url,
      blurBase64
    });

    expect(result).toBe(true);
  });

  it('should get the image detail', async () => {
    const detail = await testDB.getImageDetail(imageWithLocation.id);

    expect(detail).toEqual(
      expect.objectContaining({
        ...imageWithLocation,
        url,
        blurBase64
      })
    );
  });

  it('should set a image to profile image', async () => {
    const detail = await testDB.setExistingImageAsAvatar(imageWithLocation.id);

    expect(detail.isProfileImage).toBe(true);
  });

  it('should get the current avatar images', async () => {
    const avatarImages = await testDB.getCurrentAvatarImages(userId);

    expect(avatarImages.length).toBe(1);
  });

  it('should remove the existing Avatar images', async () => {
    const payload: IImageCreateInput = {
      userId,
      origin: 'gallery',
      isProfileImage: true,
      fileName: 'image.jpg'
    };

    imageWithLocation = await testDB.createImage(payload);

    const currentImages = await testDB.getCurrentAvatarImages(userId);

    expect(currentImages.length).toBe(2);

    const result = await testDB.removeExistingAvatarImages(currentImages);
    expect(result).toBe(true);

    const updatedImages = await testDB.getCurrentAvatarImages(userId);

    expect(updatedImages.length).toBe(0);
  });
});
