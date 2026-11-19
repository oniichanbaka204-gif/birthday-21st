// CẤU HÌNH LIÊN KẾT GOOGLE SHEETS ĐỂ LƯU VÀ HIỂN THỊ LỜI CHÚC
// Bạn chỉ cần tạo Google Sheet và dán link Apps Script vào đây:
export const GOOGLE_SCRIPT_URL = ""; 

// Danh sách lời chúc mặc định (sẽ tự động thay thế khi có dữ liệu từ Google Sheets)
export const initialWishes = [
  {
    name: "Một người bạn",
    wish: "Chúc bạn tuổi 21 luôn xinh đẹp, tự tin và ngập tràn hạnh phúc nhé! 🌸✨",
    timestamp: "Vừa xong"
  },
  {
    name: "Nhóm bạn thân",
    wish: "Happy 21st Birthday! Tuổi mới rực rỡ, mọi ước mơ đều thành hiện thực nha! 🎂💚",
    timestamp: "Hôm nay"
  },
  {
    name: "Người luôn ủng hộ bạn",
    wish: "Mãi luôn giữ nụ cười tỏa nắng và luôn yêu đời bạn nhé! 🐥🌿",
    timestamp: "Hôm nay"
  }
];
