import type { UploaderTypes, IGetUploadURLParams } from './types';
import { v4 as uuidv4 } from 'uuid';
import stream from 'stream';
import AWS from 'aws-sdk';
import sharp from 'sharp';
import { Logger } from '../Logger';

export class Uploader {
  s3Uploader = {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  };
  bucket = 'development';
  endpoint =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4566/'
      : undefined;

  s3: AWS.S3;

  private static instance: Uploader;
  private constructor() {
    AWS.config.update({
      accessKeyId: this.s3Uploader.accessKeyId,
      secretAccessKey: this.s3Uploader.secretAccessKey,
      signatureVersion: 'v4',
      s3ForcePathStyle: true
    });

    this.s3 = new AWS.S3({ endpoint: this.endpoint });
  }

  public static getInstance = (): Uploader => {
    if (!Uploader.instance) {
      Uploader.instance = new Uploader();
    }

    return Uploader.instance;
  };

  public static getFileUrl = (fileKey: string, bucket: string): string => {
    const uploader = Uploader.getInstance();
    if (process.env.NODE_ENV === 'development')
      return `${uploader.endpoint}${bucket}/${fileKey}`;

    return `https://${bucket}.s3.amazonaws.com/${fileKey}`;
  };

  public static getBucketName = (): string => {
    const uploader = Uploader.getInstance();
    return uploader.bucket;
  };

  private getFileExtension = (fileName: string): string => {
    return fileName.split('.')[fileName.split('.').length - 1];
  };

  static getMetaData = async (
    bucket: string,
    key: string
  ): Promise<{ o: string; oType: UploaderTypes }> => {
    const uploader = Uploader.getInstance();

    const params = {
      Bucket: bucket,
      Key: key
    };

    const resp = await uploader.s3.headObject(params).promise();
    return resp.Metadata as { o: string; oType: UploaderTypes };
  };

  static generateFileName = (): string => {
    return uuidv4();
  };

  static getUploadURL = async ({
    userId,
    uploadType,
    fileName,
    newFileName,
    mimeType,
    itemId
  }: IGetUploadURLParams): Promise<{ signedUrl: string; fileKey: string }> => {
    const uploader = Uploader.getInstance();
    const fileExtension = uploader.getFileExtension(fileName);
    const fileKey = `${uploadType}/${userId}/${newFileName}.${fileExtension}`;

    const url = await uploader.s3.getSignedUrlPromise('putObject', {
      Bucket: uploader.bucket,
      Key: fileKey,
      Metadata: {
        o: itemId.toString(),
        oType: uploadType
      },
      ContentType: `${mimeType}`
    });

    if (process.env.NODE_ENV === 'development')
      return uploader.getLocalUploadURL(
        { signedUrl: url, fileKey },
        uploader.bucket
      );
    return { signedUrl: url, fileKey };
  };

  private getLocalUploadURL = (
    { signedUrl, fileKey }: { signedUrl: string; fileKey: string },
    bucket: string
  ): { signedUrl: string; fileKey: string } => {
    const oldUrl = `http://${bucket}.localhost:4566/`;
    const newUrl = `http://localhost:4566/${bucket}/`;
    return { signedUrl: signedUrl.replace(oldUrl, newUrl), fileKey };
  };

  static generateBlurURL = (originalURL: string): string => {
    const uploader = Uploader.getInstance();
    const fileExtension = uploader.getFileExtension(originalURL);

    return originalURL.replace(`.${fileExtension}`, `_blur.${fileExtension}`);
  };

  static uploadBlur = async (
    image: string,
    originalURL: string
  ): Promise<string> => {
    try {
      const uploader = Uploader.getInstance();

      const blurURL = Uploader.generateBlurURL(originalURL);

      await uploader.s3
        .putObject({
          Bucket: uploader.bucket,
          Key: blurURL,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          Body: Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ''),
            'base64'
          )
        })
        .promise();
      return blurURL;
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  static readFileFromS3 = async (
    fileKey: string
  ): Promise<AWS.S3.GetObjectOutput> => {
    const uploader = Uploader.getInstance();
    const params = { Bucket: uploader.bucket, Key: fileKey };
    try {
      return await uploader.s3.getObject(params).promise();
    } catch (error) {
      Logger.error('error', error);
      throw error;
    }
  };

  static readStreamFromS3 = ({
    Bucket,
    Key
  }: {
    Bucket: string;
    Key: string;
  }) => {
    const uploader = Uploader.getInstance();
    return uploader.s3.getObject({ Bucket, Key }).createReadStream();
  };
  static writeStreamToS3 = ({
    Bucket,
    Key
  }: {
    Bucket: string;
    Key: string;
  }) => {
    const uploader = Uploader.getInstance();
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      uploadFinished: uploader.s3
        .upload({
          Body: pass,
          Bucket,
          ContentType: 'image/png',
          Key
        })
        .promise()
    };
  };
}
