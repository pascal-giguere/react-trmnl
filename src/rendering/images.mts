export enum OutputImageFormat {
  BMP = "bmp", // Uncompressed, 1-channel, 1-bit
  PNG = "png", // Compressed, 1-channel, 1-bit
  Raw = "raw", // Uncompressed, 1-channel, 8-bit
}

enum InputImageFormat {
  AVIF = "avif",
  BMP = "bmp",
  GIF = "gif",
  JPEG = "jpeg",
  PNG = "png",
  SVG = "svg",
  TIFF = "tiff",
  WebP = "webp",
}

const mimeTypeByInputFormat: { [key in InputImageFormat]: string } = {
  [InputImageFormat.AVIF]: "image/avif",
  [InputImageFormat.BMP]: "image/bmp",
  [InputImageFormat.GIF]: "image/gif",
  [InputImageFormat.JPEG]: "image/jpeg",
  [InputImageFormat.PNG]: "image/png",
  [InputImageFormat.SVG]: "image/svg+xml",
  [InputImageFormat.TIFF]: "image/tiff",
  [InputImageFormat.WebP]: "image/webp",
};

const supportedInputMimeTypes: string[] = Object.values(mimeTypeByInputFormat);

export function validateImageMimeType(mimeType: string): void {
  if (!supportedInputMimeTypes.includes(mimeType.toLowerCase())) {
    throw new Error(
      `Unsupported image MIME type: ${mimeType}. Supported MIME types are: ${supportedInputMimeTypes.join(", ")}.` +
        ` Make sure you're loading a valid image file.`,
    );
  }
}
