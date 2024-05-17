'use client';
import { Billboard } from '@prisma/client';
import { useDropzone } from '@uploadthing/react';
import { CheckIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { generateClientDropzoneAccept } from 'uploadthing/client';

import { useMounted } from '@/hooks/useMounted';
import { useUploadThing } from '@/utils/uploadthing';

import { UploadIcon } from '../Icons';
import { LoadingSpinner } from '../Icons/LoadingSpinner';
import { Image } from '../Image/Image';
import { Button } from '../ui/button';

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  // onRemove: (value: string) => void;
  // value: string[];
  initialValues?: Billboard | null;
}

export const BillboardImageUpload = ({ disabled, onChange, initialValues }: ImageUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setPreviewImages([]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    console.log('acceptedFiles var', acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing('billboardUploader', {
    onUploadError: (e) => {
      toast.error(`Error uploading image (${e.code})`, {
        description: e.message,
      });
    },
    onClientUploadComplete: () => {
      toast.success('Image uploaded successfully');
      setUploaded(true);
    },
  });

  const onClick = async () => {
    if (!files.length) return toast.error('Please select an image');
    setUploading(true);
    try {
      const image = await startUpload(files);
      if (image) {
        onChange(image[0].url);
      }
    } catch (e) {
      console.log('error uploading image', e);
    } finally {
      setUploading(false);
    }
  };

  const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const isMounted = useMounted();
  if (!isMounted) return null;
  if (initialValues && !files.length && !previewImages.length) {
    return (
      <div className="flex w-full">
        <div className="flex flex-wrap px-10">
          <div className="relative mb-4 mr-4 flex rounded-lg border">
            <Image src={initialValues.imageUrl} alt="image" width={250} height={250} className="h-60 w-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full">
      {!files.length ? (
        <div
          {...getRootProps()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border p-10"
        >
          <input {...getInputProps()} />
          <UploadIcon className="size-10" />
          Upload files!
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="flex flex-wrap">
            {previewImages.map((img, index) => (
              <div key={index} className="relative mb-4 mr-4 flex rounded-lg border">
                {!uploaded && !uploading && (
                  <Button
                    variant="destructive"
                    className="absolute right-0 top-0"
                    size={'sm'}
                    onClick={() => {
                      previewImages.splice(index, 1);
                      files.splice(index, 1);
                      setPreviewImages([...previewImages]);
                    }}
                  >
                    X
                  </Button>
                )}
                <Image src={img} alt="image" width={250} height={250} className="h-60 w-auto" />
              </div>
            ))}
          </div>
          <Button
            type="button"
            className="w-fit"
            variant={'secondary'}
            onClick={async () => onClick()}
            disabled={uploading || disabled || uploaded}
          >
            {uploaded ? (
              <>
                <p className="flex items-center justify-center gap-2">
                  <CheckIcon /> Uploaded
                </p>
              </>
            ) : uploading ? (
              <>
                <p className="flex items-center justify-center gap-2">
                  <LoadingSpinner /> Uploading...
                </p>
              </>
            ) : (
              <>
                <p className="flex items-center justify-center gap-2">
                  <UploadIcon /> Upload
                </p>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
