export interface IButton{
  id: number;
  name: string;
  icon: string;
  tag: number;
}

export interface ICourseList{
  id: number;
  name: string;
  banner: string;
  totalChapter: number;
  description: string;
  slug: string;
}
export interface ITags{
  id: number;
 type: string;
}
export interface ITagType{
 type: string;
 seq: number;
}
export interface ICL_Tags {
  id: number;
  CL_id_FK: number;
  Tags_id_FK: number;
} 

export interface IGetTags {
  course_name: string;
  tags: string;
}