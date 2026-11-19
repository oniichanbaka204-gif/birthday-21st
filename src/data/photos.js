// Tự động tải 43 ảnh kỷ niệm từ thư mục /image/
const imageFiles = [
  '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
  '11.png', '12.jpg', '13.png', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg',
  '21.jpg', '22.jpg', '23.png', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg',
  '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg',
  '41.jpg', '42.jpg', '43.jpg'
];

export const galleryPhotos = imageFiles.map((filename, index) => ({
  id: index + 1,
  url: `/image/${filename}`,
  caption: `Kỷ niệm ngọt ngào #${index + 1} ✨`,
  date: `Tuổi 21 rạng rỡ`
}));
