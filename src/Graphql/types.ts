export type Maybe<T> = T | null;
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: String;
  String: String;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  _Any: any;
};


type Projects = {
  title: Scalars['String']
  code_acti: Scalars['String']
  code_module: Scalars['String']
  scolaryear: Scalars['String']
  codeinstance: Scalars['String']
  timeline_start: Scalars['String']
  timeline_end: Scalars['String']
  timeline_barre: Scalars['Float']
}

type Notes = {
  title: Scalars['String']
  code_acti: Scalars['String']
  code_module: Scalars['String']
  scolaryear: Scalars['String']
  codeinstance: Scalars['String']
  note: Scalars['String']
  noteur: Scalars['String']
}

type ActivitesBoard = {
  title: Scalars['String']
  code_acti: Scalars['String']
  code_module: Scalars['String']
  scolaryear: Scalars['String']
  codeinstance: Scalars['String']
  module: Scalars['String']
  timeline_start: Scalars['String']
  timeline_end: Scalars['String']
  timeline_barre: Scalars['Float']
  salle: Scalars['String']
  registerLink: Scalars['String']
}


type UserHistory = {
  picture: Scalars['String']
  title: Scalars['String']
}

type History = {
  title: Scalars['String']
  user: Array<UserHistory>
  content: Scalars['String']
  date: Scalars['String']
}

export type QueryGetBoardReponse = {
  projets: Array<Projects>
  notes: Array<Notes>
  activites: Array<ActivitesBoard>
  historys: Array<History>
}

export type QueryGetUserInfoResponse = {
  firstname: Scalars['String']
  lastname: Scalars['String']
  login: Scalars['String']
  credits: Scalars['Int']
  gpa: Scalars['String']
  picture: Scalars['String']
  semeste: Scalars['Int']
  studentyear: Scalars['String']
  promo: Scalars['Int']
  scolaryear: Scalars['String']
}

export type QueryGetPlanning = {
  scolaryear: Scalars['String']
  codemodule: Scalars['String']
  codeinstance: Scalars['String']
  codeacti: Scalars['String']
  codeevent: Scalars['String']
  semester: Scalars['Int']
  titlemodule: Scalars['String']
  acti_title: Scalars['String']
  start: Scalars['String']
  end: Scalars['String']
  total_students_registered: Scalars['Int']
  title: Scalars['String']
  type_title: Scalars['String']
  type_code: Scalars['String']
  is_rdv: Scalars['String']
  nb_hours: Scalars['String']
  allowed_planning_start: Scalars['String']
  allowed_planning_end: Scalars['String']
  nb_group: Scalars['Int']
  nb_max_students_projet: Scalars['Int']
  salle: Scalars['String']
  nb_seat: Scalars['String']
  module_available: Scalars['Boolean']
  module_registered: Scalars['Boolean']
  past: Scalars['Boolean']
  allow_register: Scalars['Boolean']
  event_registered: Scalars['Boolean']
  project: Scalars['Boolean']
}

export type Result = {
  result: Scalars['Int'];
}