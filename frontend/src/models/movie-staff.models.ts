export interface Staff {
  staffId: string;
  nameRu?: string;
  nameEn?: string;
  description?: string;
  posterUrl: string;
  professionText: string;
  professionKey: StaffRole;
}

export interface Person {
  personId: string;
  nameRu?: string;
  nameEn?: string;
  sex?: Sex;
  posterUrl: string;
  birthday?: string;
  death?: string;
  age?: number;
  birthplace?: string;
  deathplace?: string;
  hasAwards?: number;
  profession?: string;
  facts: string[];
  films: PersonFilm[];
}

export interface PersonFilm {
  filmId: string;
  nameRu?: string;
  nameEn?: string;
  rating?: string;
  general: boolean;
  description?: string;
  professionKey: StaffRole;
}

export enum StaffRole {
  WRITER = 'WRITER',
  OPERATOR = 'OPERATOR',
  EDITOR = 'EDITOR',
  COMPOSER = 'COMPOSER',
  PRODUCER_USSR = 'PRODUCER_USSR',
  TRANSLATOR = 'TRANSLATOR',
  DIRECTOR = 'DIRECTOR',
  DESIGN = 'DESIGN',
  PRODUCER = 'DESIGN',
  ACTOR = 'ACTOR',
  VOICE_DIRECTOR = 'VOICE_DIRECTOR',
  UNKNOWN = 'UNKNOWN',
}

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
