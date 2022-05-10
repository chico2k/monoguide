/// <reference types="node" />
import type { UploaderTypes, IGetUploadURLParams } from './types';
import stream from 'stream';
import AWS from 'aws-sdk';
export declare class Uploader {
    s3Uploader: {
        accessKeyId: string;
        secretAccessKey: string;
    };
    bucket: string;
    endpoint: string | undefined;
    s3: AWS.S3;
    private static instance;
    private constructor();
    static getInstance: () => Uploader;
    static getFileUrl: (fileKey: string, bucket: string) => string;
    static getBucketName: () => string;
    private getFileExtension;
    static getMetaData: (bucket: string, key: string) => Promise<{
        o: string;
        oType: UploaderTypes;
    }>;
    static generateFileName: () => string;
    static getUploadURL: ({ userId, uploadType, fileName, newFileName, mimeType, itemId }: IGetUploadURLParams) => Promise<{
        signedUrl: string;
        fileKey: string;
    }>;
    private getLocalUploadURL;
    static generateBlurURL: (originalURL: string) => string;
    static uploadBlur: (image: string, originalURL: string) => Promise<string>;
    static readFileFromS3: (fileKey: string) => Promise<AWS.S3.GetObjectOutput>;
    static readStreamFromS3: ({ Bucket, Key }: {
        Bucket: string;
        Key: string;
    }) => stream.Readable;
    static writeStreamToS3: ({ Bucket, Key }: {
        Bucket: string;
        Key: string;
    }) => {
        writeStream: stream.PassThrough;
        uploadFinished: Promise<AWS.S3.ManagedUpload.SendData>;
    };
}
