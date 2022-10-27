export interface StickerType {
  id: number;
  imageUrl: string;
}

export interface getUSerInfoType {
  id: number;
  username: string;
}

export interface OwnerType extends getUSerInfoType {
  personalUrl: string;
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

export interface PatchUserNameType {
  jwt?: string;
  username: string;
}

export interface GetLetterType {
  id?: number;
  letterId?: number;
  password: string;
}
