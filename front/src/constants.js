export const categoryOptions = [
  { id: 1, name: 'Barbell', value: 'Barbell', color: '#D3455B' },
  { id: 2, name: 'Dumbbell', value: 'Dumbbell', color: '#E8833A' },
  { id: 3, name: 'Kettlebell', value: 'Kettlebell', color: '#1AAE9F' },
  { id: 4, name: 'Pull-up bar', value: 'Pull-up bar', color: '#BD34D1' },
];
export const sortingOptions = [
  { id: 0, name: '인기순', value: '인기순' },
  { id: 1, name: '최신순', value: '최신순' },
];
export const {
  google_id: currentUserId,
  username: currentUserName,
  img_path: currentUserImg,
} = JSON.parse(window.localStorage.getItem('userObj'));
