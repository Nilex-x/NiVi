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