export interface StickerType {
  id: number;
  imageUrl: string;
}

export interface AllLetterType {
  id: number;
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

export interface PatchUserNameType {
  id: number;
  username: string;
}

export interface GetLetterType {
  id?: number;
  letterId?: number;
  password: string;
}
