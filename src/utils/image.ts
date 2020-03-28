type ImageResult = {
  complete: boolean;
  width: number;
  height: number;
  src: string;
};

interface ImageCache {
  [key: string]: ImageResult;
}

const IMAGE_CACHE: ImageCache = {};

export function resolveImg (src: string): Promise<ImageResult> {
  return new Promise((resolve, reject) => {
    const result: ImageResult = {
      complete: false,
      width: 0,
      height: 0,
      src,
    };

    if (!src) {
      reject(result);
      return;
    }

    if (IMAGE_CACHE[src]) {
      resolve({ ...IMAGE_CACHE[src] });
      return;
    }

    const img = new Image();

    img.onload = () => {
      result.width = img.width;
      result.height = img.height;
      result.complete = true;

      IMAGE_CACHE[src] = { ...result };
      resolve(result);
    };

    img.onerror = () => {
      reject(result);
    };

    img.src = src;
  });
}

export const enum ImageDisplay {
  INLINE = 'inline',
  BREAK_TEXT = 'break_text',
  FLOAT_LEFT = 'float_left',
  FLOAT_RIGHT = 'float_right',
};

export const IMAGE_DISPLAY_ATTR_MAPPING = new Map([
  [ImageDisplay.INLINE, 'inline'],
  [ImageDisplay.BREAK_TEXT, 'block'],
  [ImageDisplay.FLOAT_LEFT, 'float-left'],
  [ImageDisplay.FLOAT_RIGHT, 'float-right'],
]);
