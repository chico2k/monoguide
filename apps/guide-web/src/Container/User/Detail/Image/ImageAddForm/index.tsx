import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import Spinner from '../../../../../Components/Spinner';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LocationInput from '../../../../../Components/Elements/Form/LocationInput';
import TextInput from '../../../../../Components/Elements/Form/TextInput';
import Button from '../../../../../Components/Elements/Form/Button';

import useImageAdd from './hooks';

const AddImageForm = () => {
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const initialValues: {
    image?: any;
    caption?: string;
    location?: any;
  } = {
    image: undefined,
    caption: undefined,
    location: undefined,
  };

  const { submitting, submitHandler } = useImageAdd();

  const validationSchema = () =>
    Yup.object().shape({
      image: Yup.mixed().required('Add a Image?'),
    });

  if (submitting) return <Spinner />;
  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={async ({ caption, location, image }) => {
          const isProfileImage = false;
          await submitHandler({ caption, location, image, isProfileImage });
        }}
      >
        {({ setFieldValue, handleSubmit }) => {
          const onDrop = useCallback(async (acceptedFiles) => {
            setAcceptedFiles(
              acceptedFiles.map((file) =>
                Object.assign(file, {
                  preview: URL.createObjectURL(file),
                }),
              ),
            );

            setFieldValue('image', acceptedFiles);
          }, []);

          const { getRootProps, getInputProps } = useDropzone({
            onDrop,
            multiple: false,
          });
          return (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div {...getRootProps()} className="w-full h-full">
                  <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                  {acceptedFiles.length < 1 && (
                    <div className="mt-2 flex justify-center px-6 h-full pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center flex justify-center items-center">
                        <div className="">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <div className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                              <span>Upload a file</span>
                              <input
                                {...getInputProps()}
                                id="file-upload"
                                name="file-upload"
                                // type="file"
                                className="sr-only"
                              />
                            </div>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {acceptedFiles.length > 0 && (
                    <div>
                      {acceptedFiles.map((file) => (
                        <div>
                          <img src={file.preview} />
                        </div>
                      ))}
                      <button onClick={() => setAcceptedFiles([])}>Clear </button>
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <TextInput type="input" name="caption" label="Caption" />
                  <LocationInput name="location" />
                  <Button type="submit">Submit Review</Button>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddImageForm;
