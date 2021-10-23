export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  login: Scalars['String'];
  lastname: Scalars['String'];
  firstname: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  semester?: Maybe<Scalars['Int']>;
  promo?: Maybe<Scalars['Int']>;
  studentyear: Scalars['String'];
  credits: Scalars['Int'];
  gpa: Scalars['String'];
  scolaryear: Scalars['String'];
};

export type Module = {
  __typename?: 'Module';
  title_module: Scalars['String'];
  code_module: Scalars['String'];
  scolaryear: Scalars['String'];
  codeinstance: Scalars['String'];
  type_acti: Scalars['String'];
  title_acti: Scalars['String'];
  code_acti: Scalars['String'];
  begin_mod: Scalars['String'];
  end_mod: Scalars['String'];
  registered: Scalars['Boolean'];
};

export type Student = {
  __typename?: 'Student';
  login: Scalars['String'];
  name: Scalars['String'];
  picture: Scalars['String'];
  promo: Scalars['Int'];
};

export type Resp = {
  __typename?: 'resp';
  title: Scalars['String'];
  picture: Scalars['String'];
};

export type Activites = {
  __typename?: 'activites';
  codeacti: Scalars['String'];
  module_title: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  type_title: Scalars['String'];
  end_register: Scalars['String'];
  deadline: Scalars['String'];
  end: Scalars['String'];
  register: Scalars['String'];
  id_projet: Scalars['String'];
  project_title: Scalars['String'];
};

export type ModuleDetail = {
  __typename?: 'moduleDetail';
  title: Scalars['String'];
  end_register: Scalars['String'];
  closed: Scalars['String'];
  opened: Scalars['String'];
  credits: Scalars['Int'];
  description: Scalars['String'];
  competence: Scalars['String'];
  resp: Array<Resp>;
  allow_register?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  activites: Array<Activites>;
  studentRegistered: Array<Maybe<Student>>;
  file: Array<Scalars['String']>;
};

export type Projects = {
  __typename?: 'Projects';
  title: Scalars['String'];
  code_acti: Scalars['String'];
  code_module: Scalars['String'];
  scolaryear: Scalars['String'];
  codeinstance: Scalars['String'];
  timeline_start: Scalars['String'];
  timeline_end: Scalars['String'];
  timeline_barre: Scalars['Float'];
};

export type Notes = {
  __typename?: 'Notes';
  title: Scalars['String'];
  code_acti: Scalars['String'];
  code_module: Scalars['String'];
  scolaryear: Scalars['String'];
  codeinstance: Scalars['String'];
  note: Scalars['String'];
  noteur: Scalars['String'];
};

export type ActivitesBoard = {
  __typename?: 'ActivitesBoard';
  title: Scalars['String'];
  code_acti: Scalars['String'];
  code_module: Scalars['String'];
  scolaryear: Scalars['String'];
  codeinstance: Scalars['String'];
  module: Scalars['String'];
  timeline_start: Scalars['String'];
  timeline_end: Scalars['String'];
  timeline_barre: Scalars['Float'];
  salle: Scalars['String'];
  registerLink: Scalars['String'];
};

export type UserHistory = {
  __typename?: 'UserHistory';
  picture?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type History = {
  __typename?: 'History';
  title: Scalars['String'];
  user: UserHistory;
  content: Scalars['String'];
  date: Scalars['String'];
};

export type Board = {
  __typename?: 'Board';
  projets?: Maybe<Array<Projects>>;
  notes?: Maybe<Array<Notes>>;
  activites?: Maybe<Array<ActivitesBoard>>;
  historys?: Maybe<Array<History>>;
};

export type Planning = {
  __typename?: 'Planning';
  scolaryear: Scalars['String'];
  codemodule: Scalars['String'];
  codeinstance: Scalars['String'];
  codeacti: Scalars['String'];
  codeevent?: Maybe<Scalars['String']>;
  semester?: Maybe<Scalars['Int']>;
  titlemodule?: Maybe<Scalars['String']>;
  acti_title?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['String']>;
  total_students_registered?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  type_title?: Maybe<Scalars['String']>;
  type_code?: Maybe<Scalars['String']>;
  is_rdv?: Maybe<Scalars['String']>;
  nb_hours?: Maybe<Scalars['String']>;
  allowed_planning_start?: Maybe<Scalars['String']>;
  allowed_planning_end?: Maybe<Scalars['String']>;
  nb_group?: Maybe<Scalars['Int']>;
  nb_max_students_projet?: Maybe<Scalars['Int']>;
  salle?: Maybe<Scalars['String']>;
  nb_seat?: Maybe<Scalars['String']>;
  module_available?: Maybe<Scalars['Boolean']>;
  module_registered?: Maybe<Scalars['Boolean']>;
  past?: Maybe<Scalars['Boolean']>;
  allow_register?: Maybe<Scalars['Boolean']>;
  event_registered?: Maybe<Scalars['Boolean']>;
  project?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  GetPlanning?: Maybe<Array<Maybe<Planning>>>;
  GetAllModule: Array<Maybe<Module>>;
  GetModuleDetail: ModuleDetail;
  GetUserInfo: User;
  GetBoard: Board;
};


export type QueryGetPlanningArgs = {
  KeyAuth: Scalars['String'];
};


export type QueryGetAllModuleArgs = {
  KeyAuth: Scalars['String'];
  start: Scalars['String'];
  end: Scalars['String'];
};


export type QueryGetModuleDetailArgs = {
  KeyAuth: Scalars['String'];
  scolaryear: Scalars['String'];
  codemodule: Scalars['String'];
  codeinstance: Scalars['String'];
  codeActi?: Maybe<Scalars['String']>;
};


export type QueryGetUserInfoArgs = {
  KeyAuth: Scalars['String'];
};


export type QueryGetBoardArgs = {
  KeyAuth: Scalars['String'];
};
