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
  id?: number;
  password: string;
  stickerId: number;
  content: string;
}

export interface PatchLetterType {
  letterId: number;
  stickerId: number;
  content: string;
}

export interface OwnerType {
  id: number;
  username: string;
  personalUrl: string;
}

export interface PatchUserName {
  id: number;
  username: string;
}
