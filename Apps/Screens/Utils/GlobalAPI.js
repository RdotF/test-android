import { request, gql } from "graphql-request"
//hygraph 

const MASTER_URL = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clsd9e5ul0lia01w6dicnboh9/master';
const getCategory= async () => {
  const query = gql`
  query MyQuery {
    buttons {
      id
      name
      icon {
        url
      }
      tag
    }
  }
  
  
  `
  const result = await request(MASTER_URL, query); 
  return result;
}

const  getCourseList=async()=>{
  const query=gql`
  query CourseListQuery {
    courseLists(first: 10) {
      id
      name
      description
      demoUrl
      youtubeUrl
      banner {
        url
      }
      chapter {
        ... on Chapter {
          id
          name
          video {
            url
            iconCategory {
              id
            }
          }
        }
      }
      tag
      slug
    }
  }
   `
  const result = await request(MASTER_URL, query); 
  return result;
}
const checkUserCourseEnrollement=async(slug) =>{
  const query=gql`
  query MyQuery {
    userEnrollCourses(where: {courseId: "`+slug+`"}) {
      completedChapter {
        ... on CompletedChapter {
          id
          completedChapterId
        }
      }
      courseId
      id
    }
  }
  
  
  `
  const result = await request(MASTER_URL, query); 
  return result;
}

const saveUserCourseEnrollment = async(slug)=>{
  const query=gql`
  mutation MyMutation {
    createUserEnrollCourse(data: {courseId: "`+slug+`", courseList: {connect: {slug: "`+slug+`"}}}) {
      id
    }
    publishManyUserEnrollCoursesConnection {
      aggregate {
        count
      }
    }
  }
  
  `
  const result = await request(MASTER_URL, query); 
  return result;
}

const getAllUserEnrollCourses=async()=>{
  const query=gql`
  query MyQuery {
    userEnrollCourses {
      completedChapter {
        ... on CompletedChapter {
          id
          completedChapterId
        }
      }
      courseId
      courseList {
        banner {
          url
        }
        chapter {
          ... on Chapter {
            id
            name
            video {
              url
            }
          }
        }
        description
        id
        name
        slug
        tag
        totalChapters
      }
    }
  }
  
  `
  const result = await request(MASTER_URL, query); 
  return result;
}
const markChapterCompleted=async(recordId, chapterId)=>{
  const query=gql`
  mutation MutationCompleteChapter {
    updateUserEnrollCourse(
      data: {completedChapter:
      {create: {CompletedChapter: {data: {completedChapterId: "`+chapterId+`"}}}}}
      where: {id: "`+recordId+`"}
    ) {
      id
    }
    publishManyUserEnrollCoursesConnection {
      aggregate {
        count
      }
    }
  }
  
  `

  const result = await request(MASTER_URL, query); 
  return result;
}
export default {
  getCategory,
  getCourseList,
  checkUserCourseEnrollement,
  saveUserCourseEnrollment,
  markChapterCompleted,
  getAllUserEnrollCourses
}