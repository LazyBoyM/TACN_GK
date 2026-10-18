# ⚡ TACN_GK - IT English Exam Revision Web Console

## Bản nâng cấp trải nghiệm học

- **Bài II tự điền từ**: gõ từ/cụm từ không có lựa chọn. Gợi ý theo mức: nghĩa tiếng Việt → chữ đầu → xem đáp án. Giữ 50 câu gốc; hai câu trùng nội dung được học chung thành 49 mẫu, không xóa câu khỏi bài thi.
- Sau khi trả lời, xem cụm từ cần nhớ, lưu ý dạng từ và phần chính tả khác đáp án. Câu sai có ô gõ lại; thao tác chép lại không được tính là tự nhớ đúng. Câu dùng gợi ý/sai quay lại sau các câu khác và vẫn nằm trong lịch ôn.
- **Thi viết Bài II** gồm đủ 50 câu, có lưu bản nháp, đánh dấu, quay lại sửa và chỉ chấm khi nộp. Bài II trong thi thử tổng hợp và hàng đợi ôn cũng yêu cầu tự gõ từ.
- Chấm theo đáp án đề cương, bỏ qua hoa/thường và khoảng trắng thừa; không tự chấp nhận lỗi chính tả hoặc từ đồng nghĩa chưa được xác nhận. Lịch ôn theo dõi việc tự điền đúng ở các ngày khác nhau, giữ riêng kết quả lần đầu và kết quả có trợ giúp.

- **Bài I mặc định Học nhớ**: tự nhẩm trước khi mở lựa chọn, trả lời và đánh dấu Chắc/Chưa chắc rồi xem đáp án, nghĩa tiếng Việt và cách nhớ ngay. Các lựa chọn độc lập ở mỗi câu; câu hỏi luân phiên giữa thuật ngữ → định nghĩa và chiều ngược lại.
- Mỗi lượt tối đa 6 thuật ngữ; câu sai, chưa chắc hoặc cần trợ giúp được đưa lại sau các câu khác, với tối đa một lượt kiểm tra lại cho mỗi câu gốc. Điểm lần đầu được giữ riêng; câu còn yếu tiếp tục nằm trong lịch ôn.
- Theo dõi toàn bộ 48 thuật ngữ, kể cả câu từng đúng. “Nhớ qua nhiều buổi” cần đúng và chắc ở ít nhất 3 ngày khác nhau; lặp trong cùng ngày không tăng số ngày. Lịch 1/3/7/14 ngày là quy tắc thực hành của ứng dụng, không phải dự đoán đảm bảo trí nhớ.

- **Luyện tập / Thi thử / Cần ôn** là ba luồng riêng. Thi thử gồm 45 câu, cho sửa lựa chọn, đánh dấu và chỉ chấm khi nộp; có bản xem lại từng câu.
- Tự động lưu phiên riêng cho mỗi phần trên trình duyệt hiện tại. Đổi phần hoặc tải lại trang vẫn giữ tiến độ. Dữ liệu không đồng bộ giữa các thiết bị.
- Bài I ghép từng câu: thuật ngữ luôn nằm trên các lựa chọn, mặc định 6 câu/lượt; có nhóm 12 câu hoặc đủ 48 câu. Định nghĩa đã dùng được ẩn bớt, có quay lại sửa, hoàn tác, tìm kiếm và danh sách nhảy đến từng câu. Chỉ hiện đúng/sai khi chấm lượt.
- Chuyển giữa ghép từng câu và luyện 4 đáp án giữ riêng tiến độ của mỗi kiểu luyện.
- Câu sai được lưu qua các phiên. Câu đã làm sai và trả lời đúng lại được hẹn ôn sau 1, 3, 7, 14 ngày.
- Âm thanh mặc định tắt; hỗ trợ bàn phím và tùy chọn giảm chuyển động của thiết bị.

### Cấu trúc mã

`index.html` và `IT_English_Quiz_Revision.html` dùng chung `questions.js` (148 câu gốc), `app.js` (quiz và logic ghép cặp), `part1.js` (ghép từng câu), `memory.js` (Học nhớ và lịch ôn Bài I), `writing.js` (học điền từ, thi viết và lịch ôn Bài II), `study.js` (phiên học, thi thử, lưu trữ), `base.css` (kiểu giao diện chung) và `study.css` (giao diện bổ sung). Khi chia sẻ offline, giữ các file này cùng thư mục. Không cần bước build hoặc backend.

### Kiểm tra

`verify.cjs` kiểm tra các luồng thật bằng Playwright và Chrome: tìm kiếm, nối/hoàn tác, lưu phiên, đổi phần, thi thử/nộp/xem lại, luyện sai, chia lượt và mobile. Khởi chạy static server ở `http://127.0.0.1:4173`, rồi chạy `node verify.cjs` trong môi trường có package `playwright` và Chrome. Có thể đặt `PLAYWRIGHT_MODULE` thành đường dẫn package Playwright nếu dùng runtime có sẵn.

`node verify-memory.cjs` kiểm tra thêm việc giấu đáp án, mức chắc chắn, lịch ôn, lặp câu yếu theo chiều ngược lại, số ngày ghi nhớ, chống ghi điểm trùng, hoàn thành phiên, khôi phục và nâng cấp phiên cũ.

`node verify-writing.cjs` kiểm tra học điền từ, gợi ý, chính tả/dạng từ, gõ lại không tăng mức thành thạo, lịch lặp hữu hạn, bài thi viết 50 câu, câu tự điền trong thi tổng hợp/ôn tập, lưu bản nháp, nâng cấp dữ liệu cũ và mobile.

Ảnh kiểm tra được lưu vào `.test-artifacts/` và không đưa lên Git.

### Mở ứng dụng

Mở `index.html` trực tiếp, hoặc phục vụ thư mục bằng một static server. Để dùng GitHub Pages, chọn nhánh `main` và thư mục gốc trong Settings → Pages. Không cần cài đặt hay build ứng dụng.
