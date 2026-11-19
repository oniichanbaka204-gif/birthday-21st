# 🎂 Trang Web Chúc Mừng Sinh Nhật Tuổi 21 Rực Rỡ ✨

Trang web chúc mừng sinh nhật được thiết kế riêng với tông màu **Xanh Lục Bảo Huyền Ảo** kết hợp **Ánh Vàng Hoàng Kim** rực rỡ, tối ưu hoàn hảo cho cả điện thoại di động và máy tính.

🔗 **GitHub Repository:** [https://github.com/oniichanbaka204-gif/birthday-21st](https://github.com/oniichanbaka204-gif/birthday-21st)

---

## 🌟 Các Tính Năng Nổi Bật

1. **Màn hình mở đầu (Intro Gate):** Chạm mở hộp quà bí mật giúp vượt qua chính sách chặn tự động phát âm thanh của trình duyệt một cách mượt mà.
2. **Đếm ngược 10 ➔ 1 (Countdown Sync):** Số đếm vàng neon phát sáng, nảy nở nhịp nhàng theo tiếng chuông/nhịp nhạc đếm ngược.
3. **Tiêu đề Vàng Neon Phát Sáng (Golden Script Glow):** Dòng chữ *"Chúc Mừng Sinh Nhật"* viết uốn lượn phong cách thư pháp thanh lịch, tỏa sáng rực rỡ kèm hiệu ứng tia sáng 4 cánh (*Lens Flare Star*) chuẩn theo ảnh mẫu.
4. **Cuộn phim kỷ niệm 2 tầng (Dual-Row 35mm Filmstrip):** Ảnh trên và ảnh dưới xếp so le, cuộn êm ái từ trái sang phải với viền răng cưa phim nhựa hoài niệm. Hỗ trợ chạm để tạm dừng và bấm vào để xem chi tiết phóng to + thả tim tương tác.
5. **Hiệu ứng nền sống động:** Các đốm sáng hình trái tim và bụi vàng bồng bềnh lơ lửng trên nền xanh lục bảo.
6. **Mascot chú gà con tinh nghịch:** Chú gà đội mũ sinh nhật lấp ló thò đầu lên từ góc màn hình, nhấp nháy, vẫy cánh và trò chuyện khi được bấm vào.
7. **Lá thư sinh nhật đọc từ file `letter.txt`:** Mở phong bì thư có tem sáp niêm phong "21", bắn pháo hoa giấy confetti và chạy chữ máy đánh typewriter cảm xúc.

---

## 🛠️ Hướng Dẫn Tùy Biến Nhanh

### 1. Thay đổi lời chúc trong thư
- Mở file: `public/letter.txt`
- Viết bất kỳ lời chúc nào bạn muốn gửi đến bạn gái. Trang web sẽ tự động đọc nội dung file này và hiển thị hiệu ứng đánh máy.

### 2. Thêm nhạc đếm ngược của bạn
- Chuẩn bị file bài hát định dạng MP3.
- Đặt tên file là `birthday-song.mp3` và copy vào thư mục: `public/audio/birthday-song.mp3`.
- *(Nếu chưa có file, trang web đã tích hợp sẵn hệ thống âm thanh chuông pha lê đếm ngược tự động)*.

### 3. Thay ảnh kỷ niệm của bạn gái
- Copy các bức ảnh của bạn vào thư mục: `public/images/gallery/` (ví dụ `photo-1.jpg`, `photo-2.jpg`,...).
- Mở file `src/data/photos.js` để cập nhật đường dẫn ảnh và lời chú thích ngắn đi kèm.

---

## 🚀 Triển Khai Lên Vercel (1 Click)

Dự án đã được đưa lên GitHub tại: **[https://github.com/oniichanbaka204-gif/birthday-21st](https://github.com/oniichanbaka204-gif/birthday-21st)**

1. Truy cập: **[https://vercel.com/new](https://vercel.com/new)**
2. Đăng nhập tài khoản Vercel bằng GitHub `oniichanbaka204-gif`.
3. Bấm **"Import"** cạnh repository **`birthday-21st`**.
4. Bấm nút **"Deploy"** (Vercel sẽ tự động cấu hình Vite, build trong 15 giây).
5. Bạn sẽ nhận được đường link chính thức (dạng `https://birthday-21st.vercel.app`) để gửi ngay cho người ấy!
