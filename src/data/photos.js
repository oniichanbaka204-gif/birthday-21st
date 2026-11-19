// Tự động tải 90 ảnh kỷ niệm từ thư mục /image/
const imageFiles = [
  '0.png', '0.1.png', '0.2.png', '0.3.png', '0.4.png', '0.5.png', '0.6.jpg', '0.7.jpg',
  '0.8.jpg', '0.9.jpg', '0.10.jpg', '0.11.png', '0.12.png', '1.jpg', '2.jpg', '2.1.jpg',
  '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
  '11.png', '12.jpg', '13.png', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg',
  '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.png', '24.jpg', '25.jpg', '26.jpg',
  '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg',
  '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg', '41.jpg', '42.jpg',
  '43.jpg', '44.jpg', '45.jpg', '46.jpg', '47.jpg', '48.jpg', '49.jpg', '50.jpg',
  '51.jpg', '52.jpg', '53.jpg', '54.jpg', '55.jpg', '56.jpg', '57.jpg', '58.jpg',
  '59.jpg', '60.jpg', '61.jpg', '62.jpg', '63.jpg', '64.jpg', '65.jpg', '66.jpg',
  '67.jpg', '68.jpg', '69.jpg', '70.jpg', '71.jpg', '72.jpg', '73.jpg', '74.jpg',
  '75.jpg', '76.jpg'
];

export const galleryPhotos = imageFiles.map((filename, index) => ({
  id: index + 1,
  url: `/image/${filename}`,
  caption: `Kỷ niệm ngọt ngào #${index + 1} ✨`,
  date: `Tuổi 21 rạng rỡ`
}));
