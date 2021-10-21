import gql from "graphql-tag";


export const GET_ALL_MODULE = gql`
  query GetAllModule($KeyAuth: String!, $start: String!, $end: String!) {
    GetAllModule(KeyAuth: $KeyAuth, start: $start, end: $end) {
      title_acti
      end_mod
      begin_mod
      registered
      type_acti
      code_module
      codeinstance
      scolaryear
      title_acti
      title_module
      code_acti
  }
}`

export const GET_USER_INFO = gql`
  query GetUserInfo($KeyAuth: String!) {
    GetUserInfo(KeyAuth: $KeyAuth) {
    firstname
    lastname
    login
    credits
    gpa
    picture
    semester
    studentyear
    promo
    scolaryear
  }
}`

export const GET_MODULE_DETAIL = gql`
  query GetModuleDetail($KeyAuth: String!, $scolaryear: String!, $codemodule: String!, $codeinstance: String!, $codeActi: String) {
    GetModuleDetail(KeyAuth: $KeyAuth, scolaryear: $scolaryear, codemodule: $codemodule, codeinstance: $codeinstance, codeActi: $code_acti) {
    file
    studentRegistered {
      name
      login
      picture
      promo
    }
    title
    end_register
    closed
    opened
    credits
    description
    competence
    resp {
      title
      picture
    }
    allow_register
    color
    activites {
      title
      codeacti
      module_title
      description
      type_title
      end_register
      deadline
      end
      register
      id_projet
      project_title
    }
  }
}`

export const GET_BOARD = gql`
  query Query($KeyAuth: String!) {
    GetBoard(KeyAuth: $KeyAuth) {
      notes {
        title
        code_acti
        code_module
        note
        noteur
        codeinstance
        scolaryear
      }
      activites {
        title
        code_acti
        code_module
        scolaryear
        codeinstance
        module
        timeline_start
        timeline_end
        timeline_barre
        salle
        registerLink
      }
      projets {
        title
        code_acti
        code_module
        scolaryear
        codeinstance
        timeline_start
        timeline_end
        timeline_barre
      }
      historys {
        title
        content
        date
        user {
          title
        }
      }
    }
}`