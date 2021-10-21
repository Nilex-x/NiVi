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

export type Result = {
  result : Scalars['Int'];
}