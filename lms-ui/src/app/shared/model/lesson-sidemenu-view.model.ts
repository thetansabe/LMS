export interface LESSON_SIDEMENU_VIEW {
  title: string;
  isOpen: boolean;
  lessons: LESSON_SIDEMENU_SUBITEM[];
}

export interface LESSON_SIDEMENU_SUBITEM {
  title: string;
  isCompleted: boolean;
  link: string;
}

export const MOCK_CHAPTERS: LESSON_SIDEMENU_VIEW[] = [
  {
    title: 'Giới thiệu khóa học',
    isOpen: false,
    lessons: [
      {
        title: 'Intro (Nhớ đọc lưu ý quan trọng)',
        isCompleted: true,
        link: '/courses/1/1'
      },
      {
        title: 'Cài đặt IDE',
        isCompleted: true,
        link: '/courses/1/2'
      },
      {
        title: 'Cài đặt môi trường',
        isCompleted: false,
        link: '/courses/1/3'
      },
      {
        title: 'Dev tools',
        isCompleted: false,
        link: '/courses/1/4'
      },
      {
        title: 'Tổng quan khóa học',
        isCompleted: false,
        link: '/courses/1/5'
      },
    ],
  },

  {
    title: 'Data binding in angular',
    isOpen: false,
    lessons: [
      {
        title: 'Intro (Nhớ đọc lưu ý quan trọng)',
        isCompleted: true,
        link: '/courses/2/1'
      },
      {
        title: 'Cài đặt IDE',
        isCompleted: true,
        link: '/courses/2/2'
      },
      {
        title: 'Cài đặt môi trường',
        isCompleted: false,
        link: '/courses/2/3'
      },
      {
        title: 'Dev tools',
        isCompleted: false,
        link: '/courses/2/4'
      },
      {
        title: 'Tổng quan khóa học',
        isCompleted: false,
        link: '/courses/2/5'
      },
    ],
  },
];
