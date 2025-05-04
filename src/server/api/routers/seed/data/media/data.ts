import { MediaType, StorageType } from "@/generated/prisma";

export const mediaData = [
  {
    title: "Company Logo",
    type: MediaType.IMAGE,
    storageType: StorageType.CLOUDINARY,
    url: "https://cloudinary.com/company-logo.jpg",
    originalFilename: "company-logo.jpg",
    sizeInBytes: 102400,
    mimeType: "image/jpeg",
    metadata: {
      width: 800,
      height: 600,
      format: "jpg",
    },
  },
  {
    title: "Product Demo Video",
    type: MediaType.VIDEO,
    storageType: StorageType.YOUTUBE,
    url: "https://youtube.com/watch?v=product-demo",
    originalFilename: "product-demo.mp4",
    sizeInBytes: 5120000,
    mimeType: "video/mp4",
    metadata: {
      duration: 120,
      resolution: "1080p",
    },
  },
  {
    title: "User Profile Picture",
    type: MediaType.IMAGE,
    storageType: StorageType.S3,
    url: "https://s3.amazonaws.com/profile-picture.jpg",
    originalFilename: "profile.jpg",
    sizeInBytes: 204800,
    mimeType: "image/jpeg",
    metadata: {
      width: 400,
      height: 400,
      format: "jpg",
    },
  },
  {
    title: "Resume Document",
    type: MediaType.PDF,
    storageType: StorageType.LOCAL,
    url: "/uploads/resume.pdf",
    originalFilename: "resume.pdf",
    sizeInBytes: 1024000,
    mimeType: "application/pdf",
    metadata: {
      pages: 2,
      author: "John Doe",
    },
  },
  {
    title: "Company Brochure",
    type: MediaType.DOCUMENT,
    storageType: StorageType.EXTERNAL,
    url: "https://external.com/brochure.pdf",
    originalFilename: "brochure.pdf",
    sizeInBytes: 3072000,
    mimeType: "application/pdf",
    metadata: {
      pages: 10,
      version: "1.0",
    },
  },
];
