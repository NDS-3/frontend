export interface StickerType {
  id: number;
  image_url: string;
}

export interface AllLetterType {
  letterId: number;
  sticker: StickerType;
}

export interface EachLetterType extends AllLetterType {
  content: string;
}

export interface PostLetterType {
  userId?: number;
  password: string;
  stickerId: number;
  content: string;
}

export interface PutLetterType {
  letterId: number;
  stickerId: number;
  content: string;
}

export interface OwnerType {
  userId: number;
  userName: string;
  url: string;
}
