export const teacherRoutes = [
  {
    name: 'Αρχική',
    link: '/teacher',
    icon: 'home',
    activeIndex: 0,
  },
  {
    name: 'Βιβλιοθήκη',
    link: '/teacher/library/',
    icon: 'library_books',
    activeIndex: 1,
  },
  {
    name: 'Στατιστικά',
    link: '/teacher/statistics',
    icon: 'leaderboard',
    activeIndex: 2,
  },
  {
    name: 'Ψηφιακή Τάξη',
    link: '/teacher/digiClass',
    icon: 'school',
    activeIndex: 3,
  },
  {
    name: 'Δημιουργία Κουίζ',
    link: '/teacher/create-quiz',
    icon: 'add_circle_outline',
    activeIndex: 4,
  },
];

export const studentRoutes = [
  { name: 'Αρχική', link: '/student', icon: 'home', activeIndex: 0 },
  {
    name: 'Στατιστικά',
    link: '/student/statistics',
    icon: 'leaderboard',
    activeIndex: 1,
  },
  {
    name: 'Ψηφιακή Τάξη',
    link: '/student/digiClass',
    icon: 'school',
    activeIndex: 2,
  },
];

export const mainRoutes = [
  {
    name: 'Προφίλ',
    link: '/teacher/profile',
    icon: 'manage_accounts',
    activeIndex: 5,
  },
  /*   {
    name: 'Αποσύνδεση',
    link: '/logout',
    icon: 'logout',
    activeIndex: 1500,
  }, */
];
