# ⚡ TACN_GK - IT English Exam Revision Web Console

## Bản nâng cấp trải nghiệm học

- **Luyện tập / Thi thử / Cần ôn** là ba luồng riêng. Thi thử gồm 45 câu, cho sửa lựa chọn, đánh dấu và chỉ chấm khi nộp; có bản xem lại từng câu.
- Tự động lưu phiên riêng cho mỗi phần trên trình duyệt hiện tại. Đổi phần hoặc tải lại trang vẫn giữ tiến độ. Dữ liệu không đồng bộ giữa các thiết bị.
- Bảng nối có bốn lượt 12 câu hoặc toàn bộ 48 câu; tìm kiếm không làm mất focus, có hoàn tác ghép cặp và xác nhận khi làm lại.
- Câu sai được lưu qua các phiên. Câu đã làm sai và trả lời đúng lại được hẹn ôn sau 1, 3, 7, 14 ngày.
- Âm thanh mặc định tắt; hỗ trợ bàn phím, Escape đóng hộp thoại và tùy chọn giảm chuyển động của thiết bị.

### Cấu trúc mã

`index.html` và `IT_English_Quiz_Revision.html` dùng chung `questions.js` (148 câu gốc), `app.js` (quiz và bảng nối), `study.js` (phiên học, thi thử, lưu trữ) và `study.css` (giao diện bổ sung). Khi chia sẻ offline, giữ các file này cùng thư mục. Không cần bước build hoặc backend.

### Kiểm tra

`verify.cjs` kiểm tra các luồng thật bằng Playwright và Chrome: tìm kiếm, nối/hoàn tác, lưu phiên, đổi phần, thi thử/nộp/xem lại, luyện sai, chia lượt và mobile. Khởi chạy static server ở `http://127.0.0.1:4173`, rồi chạy `node verify.cjs` trong môi trường có package `playwright` và Chrome. Có thể đặt `PLAYWRIGHT_MODULE` thành đường dẫn package Playwright nếu dùng runtime có sẵn.

Các mô tả tính năng bên dưới là tài liệu ban đầu; phần cập nhật phía trên mô tả hành vi của bản hiện tại.

Ứng dụng web ôn thi trắc nghiệm & flashcard môn **Tiếng Anh Chuyên Ngành Công Nghệ Thông Tin (English for Information Technology)**.

Được thiết kế tối ưu cho phương pháp **Active Recall** (Tự nhớ trước - Mổ xẻ từ khóa sau), hỗ trợ đặc biệt cho các bạn sinh viên ngại dịch câu dài.

---

## 🌟 Tính Năng Nổi Bật

- **Toàn diện 148 câu đề cương cuối kỳ**:
  - **Phần I (48 câu):** Matching thuật ngữ CNTT & Định nghĩa.
  - **Phần II (50 câu):** Điền từ vào chỗ trống (Fill in the blanks).
  - **Phần III (50 câu):** Đúng / Sai (True / False) nhận diện bẫy ngữ nghĩa.
  - **Thi thử tổng hợp:** Rút ngẫu nhiên câu hỏi từ cả 3 phần.
- **Tự động Random / Shuffle:** Mỗi lần bắt đầu hoặc bấm <kbd>R</kbd>, thứ tự câu hỏi và đáp án A, B, C, D được xáo trộn 100%.
- **Active Recall nguyên bản:** Lúc làm bài câu hỏi giữ nguyên bản 100% không spoil gợi ý.
- **Bóc tách từ khóa sau khi trả lời:**
  - Tự động bôi sáng từ khóa cốt lõi ngay trên đề bài.
  - Hiển thị dấu hiệu nhận diện trong đề + Mẹo suy luận không cần dịch.
  - Dịch nghĩa toàn câu chuẩn xác tiếng Việt.
- **Luyện riêng câu làm sai:** Tự động lưu các câu sai vào hàng đợi riêng để cày lại đến khi đạt 100%.
- **Hỗ trợ phím tắt cực nhanh:**
  - <kbd>1</kbd> - <kbd>4</kbd> hoặc <kbd>A</kbd> - <kbd>D</kbd>: Chọn đáp án.
  - <kbd>T</kbd> / <kbd>F</kbd>: Trả lời True / False.
  - <kbd>Space</kbd> / <kbd>Enter</kbd>: Câu tiếp theo.
  - <kbd>R</kbd>: Trộn đề mới ngẫu nhiên.
- **Chuẩn giao diện Impeccable:** Tông màu Dark Obsidian, font Be Vietnam Pro & IBM Plex Mono, độ tương phản cao đạt chuẩn WCAG AA.

---

## 🚀 Cách Dùng Trực Tiếp

1. Mở trực tiếp file `index.html` trong bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Cốc Cốc).
2. Hoặc kích hoạt **GitHub Pages**:
   - Vào **Settings** > **Pages** trên repository này.
   - Chọn **Branch: main** và thư mục **/ (root)** rồi bấm **Save**.
   - Website sẽ chạy trực tiếp online trên cả máy tính lẫn điện thoại!
