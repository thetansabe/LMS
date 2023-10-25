export interface CourseCard {
  id: string;
  imgSrc: string;
  timeOutline: string;
  badge: string;
  titleLink: string;
  rating: number;
  totalRates: number;
  price: number;
  lessonNumber: number;
  studentNumber: number;
  linkTo: string;
}

export const MOCK_COURSE_CARDS: CourseCard[] = [
  {
    id: '421072a3-dba5-42cc-acde-9345226889d8',
    imgSrc: 'http://localhost:4200/assets/images/course-1.jpg',
    timeOutline: '3 Weeks',
    badge: 'Beginner',
    titleLink: 'Build Responsive Real- World Websites with HTML and CSS',
    rating: 5.0,
    totalRates: 7,
    price: 29.0,
    lessonNumber: 8,
    studentNumber: 20,
    linkTo: '/courses',
  },
  {
    id: '1e1158da-1868-4818-8c71-e814d356269d',
    imgSrc: 'http://localhost:4200/assets/images/course-2.jpg',
    timeOutline: '3 Weeks',
    badge: 'Advanced',
    titleLink: 'Java Programming Masterclass for Software Developers',
    rating: 4.8,
    totalRates: 7,
    price: 39.0,
    lessonNumber: 8,
    studentNumber: 20,
    linkTo: '/courses',
  },
  {
    id: '5becce74-2905-43f9-a641-448538f7765a',
    imgSrc: 'http://localhost:4200/assets/images/course-3.jpg',
    timeOutline: '3 Weeks',
    badge: 'Intermediate',
    titleLink: 'The Complete Camtasia Course for Content Creators',
    rating: 4.9,
    totalRates: 7,
    price: 32.0,
    lessonNumber: 8,
    studentNumber: 20,
    linkTo: '/courses',
  },
];
