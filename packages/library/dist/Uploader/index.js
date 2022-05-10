"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uploader = void 0;
const uuid_1 = require("uuid");
const stream_1 = __importDefault(require("stream"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const Logger_1 = require("../Logger");
class Uploader {
    constructor() {
        this.s3Uploader = {
            accessKeyId: 'test',
            secretAccessKey: 'test'
        };
        this.bucket = 'development';
        this.endpoint = process.env.NODE_ENV === 'development'
            ? 'http://localhost:4566/'
            : undefined;
        this.getFileExtension = (fileName) => {
            return fileName.split('.')[fileName.split('.').length - 1];
        };
        this.getLocalUploadURL = ({ signedUrl, fileKey }, bucket) => {
            const oldUrl = `http://${bucket}.localhost:4566/`;
            const newUrl = `http://localhost:4566/${bucket}/`;
            return { signedUrl: signedUrl.replace(oldUrl, newUrl), fileKey };
        };
        aws_sdk_1.default.config.update({
            accessKeyId: this.s3Uploader.accessKeyId,
            secretAccessKey: this.s3Uploader.secretAccessKey,
            signatureVersion: 'v4',
            s3ForcePathStyle: true
        });
        this.s3 = new aws_sdk_1.default.S3({ endpoint: this.endpoint });
    }
}
exports.Uploader = Uploader;
_a = Uploader;
Uploader.getInstance = () => {
    if (!Uploader.instance) {
        Uploader.instance = new Uploader();
    }
    return Uploader.instance;
};
Uploader.getFileUrl = (fileKey, bucket) => {
    const uploader = Uploader.getInstance();
    if (process.env.NODE_ENV === 'development')
        return `${uploader.endpoint}${bucket}/${fileKey}`;
    return `https://${bucket}.s3.amazonaws.com/${fileKey}`;
};
Uploader.getBucketName = () => {
    const uploader = Uploader.getInstance();
    return uploader.bucket;
};
Uploader.getMetaData = async (bucket, key) => {
    const uploader = Uploader.getInstance();
    const params = {
        Bucket: bucket,
        Key: key
    };
    const resp = await uploader.s3.headObject(params).promise();
    return resp.Metadata;
};
Uploader.generateFileName = () => {
    return (0, uuid_1.v4)();
};
Uploader.getUploadURL = async ({ userId, uploadType, fileName, newFileName, mimeType, itemId }) => {
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
        return uploader.getLocalUploadURL({ signedUrl: url, fileKey }, uploader.bucket);
    return { signedUrl: url, fileKey };
};
Uploader.generateBlurURL = (originalURL) => {
    const uploader = Uploader.getInstance();
    const fileExtension = uploader.getFileExtension(originalURL);
    return originalURL.replace(`.${fileExtension}`, `_blur.${fileExtension}`);
};
Uploader.uploadBlur = async (image, originalURL) => {
    try {
        const uploader = Uploader.getInstance();
        const blurURL = Uploader.generateBlurURL(originalURL);
        await uploader.s3
            .putObject({
            Bucket: uploader.bucket,
            Key: blurURL,
            ACL: 'public-read',
            ContentEncoding: 'base64',
            Body: Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
        })
            .promise();
        return blurURL;
    }
    catch (error) {
        Logger_1.Logger.error('error', error);
        throw error;
    }
};
Uploader.readFileFromS3 = async (fileKey) => {
    const uploader = Uploader.getInstance();
    const params = { Bucket: uploader.bucket, Key: fileKey };
    try {
        return await uploader.s3.getObject(params).promise();
    }
    catch (error) {
        Logger_1.Logger.error('error', error);
        throw error;
    }
};
Uploader.readStreamFromS3 = ({ Bucket, Key }) => {
    const uploader = Uploader.getInstance();
    return uploader.s3.getObject({ Bucket, Key }).createReadStream();
};
Uploader.writeStreamToS3 = ({ Bucket, Key }) => {
    const uploader = Uploader.getInstance();
    const pass = new stream_1.default.PassThrough();
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
//# sourceMappingURL=index.js.map