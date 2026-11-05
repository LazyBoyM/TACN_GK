// Imported from nmxla.txt. Answers are inferred reference answers, not an official key.
const IMAGE_BANK = {
  "title": "Nhập môn xử lý ảnh",
  "questions": [
    {
      "id": 1,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Nhiễu ngẫu nhiên?",
      "options": [
        "Thường cho khả năng nén cao hơn nhưng dữ liệu phục hồi không hoàn toàn giống ảnh gốc",
        "Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc",
        "Có thể được trích chọn bằng các toán tử như gradient, la bàn hoặc Laplace để hỗ trợ nhận dạng",
        "Gồm các khâu thu nhận và tiền xử lý, biểu diễn dữ liệu, nhận dạng và ra quyết định"
      ],
      "answer": 1,
      "explanation": "Nhiễu ngẫu nhiên: Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 2,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Tăng số mức xám?",
      "options": [
        "Biểu diễn cường độ sáng của điểm ảnh",
        "Giảm không gian lưu trữ dữ liệu ảnh",
        "Cho phép phục hồi dữ liệu ảnh sau giải nén mà không làm mất thông tin gốc",
        "Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh"
      ],
      "answer": 3,
      "explanation": "Tăng số mức xám: Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 3,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Ảnh số?",
      "options": [
        "Mẫu đầu vào được gán vào một lớp đã xác định dựa trên mẫu chuẩn",
        "Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh",
        "Ảnh số có thể được biểu diễn bằng một ma trận các điểm ảnh sau quá trình số hóa",
        "Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc"
      ],
      "answer": 2,
      "explanation": "Ảnh số: Ảnh số có thể được biểu diễn bằng một ma trận các điểm ảnh sau quá trình số hóa.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 4,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Nén không bảo toàn thông tin?",
      "options": [
        "Có thể được trích chọn bằng các toán tử như gradient, la bàn hoặc Laplace để hỗ trợ nhận dạng",
        "Thường cho khả năng nén cao hơn nhưng dữ liệu phục hồi không hoàn toàn giống ảnh gốc",
        "Khắc phục biến dạng do thiết bị quang học và điện tử bằng các phép chiếu dựa trên điểm điều khiển",
        "Các mẫu được nhóm thành lớp theo tiêu chuẩn đồng dạng khi lớp chưa được định danh trước"
      ],
      "answer": 1,
      "explanation": "Nén không bảo toàn thông tin: Thường cho khả năng nén cao hơn nhưng dữ liệu phục hồi không hoàn toàn giống ảnh gốc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 5,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Nén không bảo toàn thông tin?",
      "options": [
        "Có thể được trích chọn bằng các toán tử như gradient, la bàn hoặc Laplace để hỗ trợ nhận dạng",
        "Biểu diễn cường độ sáng của điểm ảnh",
        "Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh",
        "Thường cho khả năng nén cao hơn nhưng dữ liệu phục hồi không hoàn toàn giống ảnh gốc"
      ],
      "answer": 3,
      "explanation": "Nén không bảo toàn thông tin: Thường cho khả năng nén cao hơn nhưng dữ liệu phục hồi không hoàn toàn giống ảnh gốc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 6,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Ảnh màu RGB?",
      "options": [
        "Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng",
        "Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn",
        "Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng",
        "Ảnh chỉ có hai mức biểu diễn"
      ],
      "answer": 2,
      "explanation": "Ảnh màu RGB: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 7,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Ảnh màu RGB?",
      "options": [
        "Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng",
        "Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh",
        "Định dạng ảnh có sử dụng mã hóa loạt dài trong lưu trữ dữ liệu ảnh"
      ],
      "answer": 0,
      "explanation": "Ảnh màu RGB: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 8,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Mô hình HSV?",
      "options": [
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn",
        "Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng",
        "Mô hình màu liên hệ với RGB theo nguyên tắc bù màu",
        "Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng"
      ],
      "answer": 3,
      "explanation": "Mô hình HSV: Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng.",
      "topic": "Cơ bản và màu sắc",
      "caution": "HSV dùng Value (giá trị sáng); HSL dùng Lightness (độ sáng). Cách dùng từ trong đề khá gần nhau; ưu tiên phương án ghi rõ giá trị sáng."
    },
    {
      "id": 9,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với BMP?",
      "options": [
        "Camera và scanner là các thiết bị thu nhận ảnh Raster thông dụng",
        "Định dạng ảnh bitmap lưu dữ liệu ảnh theo cấu trúc điểm ảnh",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh",
        "Kỹ thuật in tạo cảm giác nhiều mức xám bằng cách thay đổi mật độ các điểm in"
      ],
      "answer": 1,
      "explanation": "BMP: Định dạng ảnh bitmap lưu dữ liệu ảnh theo cấu trúc điểm ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 10,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Phối màu cộng?",
      "options": [
        "Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB",
        "Định dạng ảnh hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu",
        "Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh"
      ],
      "answer": 0,
      "explanation": "Phối màu cộng: Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 11,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Phối màu trừ?",
      "options": [
        "Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận",
        "Kỹ thuật in tạo cảm giác nhiều mức xám bằng cách thay đổi mật độ các điểm in",
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn",
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy"
      ],
      "answer": 2,
      "explanation": "Phối màu trừ: Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 12,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về RAW?",
      "options": [
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn",
        "Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ",
        "Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh"
      ],
      "answer": 1,
      "explanation": "RAW: Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 13,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Thiết bị thu nhận ảnh Raster?",
      "options": [
        "Camera và scanner là các thiết bị thu nhận ảnh Raster thông dụng",
        "Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn",
        "Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ",
        "Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector"
      ],
      "answer": 0,
      "explanation": "Thiết bị thu nhận ảnh Raster: Camera và scanner là các thiết bị thu nhận ảnh Raster thông dụng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 14,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Lấy mẫu?",
      "options": [
        "Camera và scanner là các thiết bị thu nhận ảnh Raster thông dụng",
        "Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng",
        "Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc",
        "Mở rộng mô hình CMY bằng thành phần đen để phù hợp hơn với quá trình in"
      ],
      "answer": 2,
      "explanation": "Lấy mẫu: Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 15,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Mô hình Vector?",
      "options": [
        "Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh",
        "Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình",
        "Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian",
        "Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc"
      ],
      "answer": 1,
      "explanation": "Mô hình Vector: Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 16,
      "prompt": "Nội dung nào phản ánh đúng bản chất của Lọc Bayer?",
      "options": [
        "Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng",
        "Camera và scanner là các thiết bị thu nhận ảnh Raster thông dụng",
        "Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh"
      ],
      "answer": 3,
      "explanation": "Lọc Bayer: Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 17,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Three-CCD?",
      "options": [
        "Mở rộng mô hình CMY bằng thành phần đen để phù hợp hơn với quá trình in",
        "Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ",
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Định dạng ảnh hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu"
      ],
      "answer": 2,
      "explanation": "Three-CCD: Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 18,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Mô hình HSV?",
      "options": [
        "Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng",
        "Mở rộng mô hình CMY bằng thành phần đen để phù hợp hơn với quá trình in",
        "Ảnh chỉ có hai mức biểu diễn",
        "Định dạng ảnh hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu"
      ],
      "answer": 0,
      "explanation": "Mô hình HSV: Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng.",
      "topic": "Cơ bản và màu sắc",
      "caution": "HSV dùng Value (giá trị sáng); HSL dùng Lightness (độ sáng). Cách dùng từ trong đề khá gần nhau; ưu tiên phương án ghi rõ giá trị sáng."
    },
    {
      "id": 19,
      "prompt": "Đặc điểm nào sau đây gắn đúng với TIFF?",
      "options": [
        "Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng",
        "Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector",
        "Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình",
        "Định dạng ảnh hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu"
      ],
      "answer": 3,
      "explanation": "TIFF: Định dạng ảnh hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 20,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Phối màu cộng?",
      "options": [
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB",
        "Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận",
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn"
      ],
      "answer": 1,
      "explanation": "Phối màu cộng: Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 21,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Lọc trung bình?",
      "options": [
        "Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh",
        "Thay điểm ảnh bằng trung vị của các giá trị trong cửa sổ lân cận và phù hợp với nhiễu xung",
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn",
        "Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét"
      ],
      "answer": 0,
      "explanation": "Lọc trung bình: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 22,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Khôi phục ảnh?",
      "options": [
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn",
        "Biến đổi mức xám theo quan hệ nghịch đảo so với thang mức xám",
        "Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu",
        "Phân bố lại mức xám để cải thiện độ tương phản của ảnh"
      ],
      "answer": 2,
      "explanation": "Khôi phục ảnh: Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 23,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Mặt phẳng bit cao?",
      "options": [
        "Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh",
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Khôi phục ảnh bằng cách bù trực tiếp hàm suy hao trong miền tần số khi điều kiện cho phép",
        "Thay điểm ảnh bằng trung vị của các giá trị trong cửa sổ lân cận và phù hợp với nhiễu xung"
      ],
      "answer": 1,
      "explanation": "Mặt phẳng bit cao: Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 24,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Mặt phẳng bit cao?",
      "options": [
        "Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định",
        "Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra",
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm",
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám"
      ],
      "answer": 3,
      "explanation": "Mặt phẳng bit cao: Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 25,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Lọc Wiener?",
      "options": [
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn",
        "Biểu diễn số điểm ảnh tương ứng với từng mức xám",
        "Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu",
        "Nhiễu có biên độ tuân theo phân bố Gaussian"
      ],
      "answer": 2,
      "explanation": "Lọc Wiener: Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 26,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Tăng độ sáng?",
      "options": [
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn",
        "Phân bố lại mức xám để cải thiện độ tương phản của ảnh",
        "Cộng một hằng số âm vào mức xám làm ảnh tối hơn",
        "Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối"
      ],
      "answer": 0,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 27,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Cân bằng histogram?",
      "options": [
        "Nhiễu có biên độ tuân theo phân bố Gaussian",
        "Cộng một hằng số âm vào mức xám làm ảnh tối hơn",
        "Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra",
        "Phân bố lại mức xám để cải thiện độ tương phản của ảnh"
      ],
      "answer": 3,
      "explanation": "Cân bằng histogram: Phân bố lại mức xám để cải thiện độ tương phản của ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 28,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Dãn độ tương phản?",
      "options": [
        "Phân bố lại mức xám để cải thiện độ tương phản của ảnh",
        "Nhiễu có biên độ tuân theo phân bố Gaussian",
        "Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối",
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn"
      ],
      "answer": 2,
      "explanation": "Dãn độ tương phản: Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 29,
      "prompt": "Khi xét Lọc trung bình, phát biểu nào là chính xác?",
      "options": [
        "Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh",
        "Phân bố lại mức xám để cải thiện độ tương phản của ảnh",
        "Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công",
        "Thay điểm ảnh bằng trung vị của các giá trị trong cửa sổ lân cận và phù hợp với nhiễu xung"
      ],
      "answer": 0,
      "explanation": "Lọc trung bình: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 30,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Lọc trung bình theo k giá trị gần nhất?",
      "options": [
        "Biến đổi mức xám theo quan hệ nghịch đảo so với thang mức xám",
        "Nhiễu có biên độ tuân theo phân bố Gaussian",
        "Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu",
        "Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét"
      ],
      "answer": 3,
      "explanation": "Lọc trung bình theo k giá trị gần nhất: Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 31,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Nhiễu muối tiêu?",
      "options": [
        "Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định",
        "Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh",
        "Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu",
        "Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh"
      ],
      "answer": 1,
      "explanation": "Nhiễu muối tiêu: Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 32,
      "prompt": "Khi xét Mặt phẳng bit cao, phát biểu nào là chính xác?",
      "options": [
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm",
        "Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét",
        "Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công"
      ],
      "answer": 0,
      "explanation": "Mặt phẳng bit cao: Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 33,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Lọc đảo?",
      "options": [
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn",
        "Cộng một hằng số âm vào mức xám làm ảnh tối hơn",
        "Khôi phục ảnh bằng cách bù trực tiếp hàm suy hao trong miền tần số khi điều kiện cho phép",
        "Biến đổi mức xám theo quan hệ nghịch đảo so với thang mức xám"
      ],
      "answer": 2,
      "explanation": "Lọc đảo: Khôi phục ảnh bằng cách bù trực tiếp hàm suy hao trong miền tần số khi điều kiện cho phép.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 34,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Tăng độ sáng?",
      "options": [
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn",
        "Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh",
        "Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh"
      ],
      "answer": 1,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 35,
      "prompt": "Nội dung nào phản ánh đúng bản chất của Cân bằng histogram?",
      "options": [
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn",
        "Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công",
        "Biểu diễn số điểm ảnh tương ứng với từng mức xám",
        "Phân bố lại mức xám để cải thiện độ tương phản của ảnh"
      ],
      "answer": 3,
      "explanation": "Cân bằng histogram: Phân bố lại mức xám để cải thiện độ tương phản của ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 36,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Trích biên hình thái?",
      "options": [
        "Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc",
        "Bao gồm cả bốn hướng chéo ngoài bốn láng giềng trực giao",
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc"
      ],
      "answer": 2,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 37,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Trích biên hình thái?",
      "options": [
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co",
        "Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau",
        "Toán tử gradient có trọng số lớn hơn ở hàng hoặc cột giữa của mặt nạ",
        "Làm mở rộng vùng đối tượng theo phần tử cấu trúc"
      ],
      "answer": 0,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 38,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Ngưỡng kép Canny?",
      "options": [
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm",
        "Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám",
        "Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên"
      ],
      "answer": 3,
      "explanation": "Ngưỡng kép Canny: Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 39,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Trích biên trong?",
      "options": [
        "Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên",
        "Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm",
        "Phương pháp phát hiện biên nhiều bước nhằm tạo biên mảnh và liên tục hơn"
      ],
      "answer": 1,
      "explanation": "Trích biên trong: Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 40,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Phát hiện biên trực tiếp?",
      "options": [
        "Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm",
        "Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny",
        "Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau",
        "Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập"
      ],
      "answer": 0,
      "explanation": "Phát hiện biên trực tiếp: Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 41,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Prewitt?",
      "options": [
        "Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập",
        "Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co",
        "Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng",
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co"
      ],
      "answer": 2,
      "explanation": "Prewitt: Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 42,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Sobel?",
      "options": [
        "Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau",
        "Toán tử gradient có trọng số lớn hơn ở hàng hoặc cột giữa của mặt nạ",
        "Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng",
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh"
      ],
      "answer": 1,
      "explanation": "Sobel: Toán tử gradient có trọng số lớn hơn ở hàng hoặc cột giữa của mặt nạ.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 43,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Canny?",
      "options": [
        "Phương pháp phát hiện biên nhiều bước nhằm tạo biên mảnh và liên tục hơn",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm",
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập"
      ],
      "answer": 0,
      "explanation": "Canny: Phương pháp phát hiện biên nhiều bước nhằm tạo biên mảnh và liên tục hơn.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 44,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Phép co ảnh?",
      "options": [
        "Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc",
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc"
      ],
      "answer": 2,
      "explanation": "Phép co ảnh: Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 45,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Phép đóng?",
      "options": [
        "Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc",
        "Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau",
        "Phương pháp phát hiện biên nhiều bước nhằm tạo biên mảnh và liên tục hơn"
      ],
      "answer": 1,
      "explanation": "Phép đóng: Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 46,
      "prompt": "Khi xét Đạo hàm bậc hai, phát biểu nào là chính xác?",
      "options": [
        "Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám",
        "Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm",
        "Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn"
      ],
      "answer": 3,
      "explanation": "Đạo hàm bậc hai: Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 47,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Ngưỡng kép Canny?",
      "options": [
        "Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập",
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co",
        "Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên",
        "Xác định biên từ ranh giới của các vùng sau khi phân vùng"
      ],
      "answer": 2,
      "explanation": "Ngưỡng kép Canny: Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 48,
      "prompt": "Khi xét Phần tử cấu trúc, phát biểu nào là chính xác?",
      "options": [
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh",
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co",
        "Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng"
      ],
      "answer": 0,
      "explanation": "Phần tử cấu trúc: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 49,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Phát hiện biên trực tiếp?",
      "options": [
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc",
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh",
        "Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc",
        "Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm"
      ],
      "answer": 3,
      "explanation": "Phát hiện biên trực tiếp: Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 50,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Gradient?",
      "options": [
        "Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau",
        "Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám",
        "Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên",
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh"
      ],
      "answer": 1,
      "explanation": "Gradient: Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 51,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Kết cấu texture?",
      "options": [
        "Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt",
        "Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng",
        "Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng",
        "Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định"
      ],
      "answer": 0,
      "explanation": "Kết cấu texture: Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 52,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Phân vùng theo ngưỡng?",
      "options": [
        "Sử dụng thông tin đường biên để xác định ranh giới các vùng",
        "Chia một vùng chưa đồng nhất thành các vùng nhỏ hơn",
        "Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám",
        "Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất"
      ],
      "answer": 2,
      "explanation": "Phân vùng theo ngưỡng: Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 53,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Làm trơn histogram?",
      "options": [
        "Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất",
        "Giảm dao động không cần thiết trên histogram trước khi xác định ngưỡng",
        "Dựa vào đặc trưng texture để phân biệt các vùng có cấu trúc bề mặt khác nhau",
        "Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng"
      ],
      "answer": 1,
      "explanation": "Làm trơn histogram: Giảm dao động không cần thiết trên histogram trước khi xác định ngưỡng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 54,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Đối xứng nền?",
      "options": [
        "Sử dụng thông tin đường biên để xác định ranh giới các vùng",
        "Dựa vào đặc trưng texture để phân biệt các vùng có cấu trúc bề mặt khác nhau",
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh",
        "Ước lượng ngưỡng dựa trên tính đối xứng của phân bố mức xám thuộc nền"
      ],
      "answer": 3,
      "explanation": "Đối xứng nền: Ước lượng ngưỡng dựa trên tính đối xứng của phân bố mức xám thuộc nền.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 55,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Hợp vùng?",
      "options": [
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh",
        "Dựa trên thông tin của toàn ảnh, ví dụ histogram",
        "Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất",
        "Chia một vùng chưa đồng nhất thành các vùng nhỏ hơn"
      ],
      "answer": 2,
      "explanation": "Hợp vùng: Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 56,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Phân vùng theo kết cấu bề mặt?",
      "options": [
        "Dựa vào đặc trưng texture để phân biệt các vùng có cấu trúc bề mặt khác nhau",
        "Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất",
        "Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng",
        "Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất"
      ],
      "answer": 0,
      "explanation": "Phân vùng theo kết cấu bề mặt: Dựa vào đặc trưng texture để phân biệt các vùng có cấu trúc bề mặt khác nhau.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 57,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Histogram hai đỉnh?",
      "options": [
        "Sử dụng thông tin đường biên để xác định ranh giới các vùng",
        "Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất",
        "Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt",
        "Thường gợi ý khả năng tồn tại hai nhóm mức xám tương ứng gần với nền và đối tượng"
      ],
      "answer": 3,
      "explanation": "Histogram hai đỉnh: Thường gợi ý khả năng tồn tại hai nhóm mức xám tương ứng gần với nền và đối tượng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 58,
      "prompt": "Khi xét Phân vùng cục bộ, phát biểu nào là chính xác?",
      "options": [
        "Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng",
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh",
        "Sử dụng thông tin đường biên để xác định ranh giới các vùng",
        "Giảm dao động không cần thiết trên histogram trước khi xác định ngưỡng"
      ],
      "answer": 1,
      "explanation": "Phân vùng cục bộ: Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 59,
      "prompt": "Khi xét Phân vùng theo ngưỡng, phát biểu nào là chính xác?",
      "options": [
        "Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám",
        "Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt",
        "Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định",
        "Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất"
      ],
      "answer": 0,
      "explanation": "Phân vùng theo ngưỡng: Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 60,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Thuật toán đẳng điệu?",
      "options": [
        "Giảm dao động không cần thiết trên histogram trước khi xác định ngưỡng",
        "Sử dụng thông tin đường biên để xác định ranh giới các vùng",
        "Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định",
        "Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám"
      ],
      "answer": 2,
      "explanation": "Thuật toán đẳng điệu: Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 61,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Học có giám sát?",
      "options": [
        "Giảm ảnh hưởng của các láng giềng ở xa bằng cách gán trọng số phụ thuộc khoảng cách",
        "Sử dụng thư viện mẫu chuẩn đã biết để học và so sánh đối tượng cần nhận dạng",
        "Tại một thời điểm chọn nơron có vector trọng số gần đầu vào nhất rồi hiệu chỉnh vùng lân cận",
        "Thường được dùng để xác định mẫu hoặc tâm cụm gần nhất trong không gian đặc trưng"
      ],
      "answer": 1,
      "explanation": "Học có giám sát: Sử dụng thư viện mẫu chuẩn đã biết để học và so sánh đối tượng cần nhận dạng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 62,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Biểu diễn trong không gian đặc trưng?",
      "options": [
        "Sử dụng hàm phân biệt tuyến tính tạo siêu phẳng giữa các lớp",
        "Tại một thời điểm chọn nơron có vector trọng số gần đầu vào nhất rồi hiệu chỉnh vùng lân cận",
        "Tạo lớp mới từ phần tử xa nhất khi khoảng cách vượt điều kiện ngưỡng",
        "Mô tả mỗi đối tượng bằng một vector nhiều chiều, mỗi chiều là một đặc trưng"
      ],
      "answer": 3,
      "explanation": "Biểu diễn trong không gian đặc trưng: Mô tả mỗi đối tượng bằng một vector nhiều chiều, mỗi chiều là một đặc trưng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 63,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với K-means?",
      "options": [
        "Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu",
        "Tự hình thành các lớp và đặc trưng lớp khi không có thư viện mẫu chuẩn",
        "Phân đối tượng vào K cụm bằng cách lặp gán điểm tới tâm gần nhất và cập nhật tâm",
        "Sử dụng hàm phân biệt tuyến tính tạo siêu phẳng giữa các lớp"
      ],
      "answer": 2,
      "explanation": "K-means: Phân đối tượng vào K cụm bằng cách lặp gán điểm tới tâm gần nhất và cập nhật tâm.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 64,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với K láng giềng?",
      "options": [
        "Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc",
        "Gán lớp theo lớp chiếm đa số trong số K mẫu gần nhất của đối tượng cần nhận dạng",
        "Giảm ảnh hưởng của các láng giềng ở xa bằng cách gán trọng số phụ thuộc khoảng cách",
        "Quá trình gán đối tượng vào một lớp dựa trên mô hình biểu diễn, quy luật và mẫu chuẩn"
      ],
      "answer": 1,
      "explanation": "K láng giềng: Gán lớp theo lớp chiếm đa số trong số K mẫu gần nhất của đối tượng cần nhận dạng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 65,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Mạng Hopfield?",
      "options": [
        "Quá trình gán đối tượng vào một lớp dựa trên mô hình biểu diễn, quy luật và mẫu chuẩn",
        "Mạng Hopfield trong bài giảng sử dụng các giá trị đầu vào -1 và 1",
        "Sử dụng hàm phân biệt tuyến tính tạo siêu phẳng giữa các lớp",
        "Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu"
      ],
      "answer": 3,
      "explanation": "Mạng Hopfield: Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 66,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Quét Zig-Zag?",
      "options": [
        "Bao gồm các phương pháp mã hóa tương đối trực tiếp như RLE, Huffman và LZW",
        "Tỷ số giữa kích thước dữ liệu trước nén và kích thước dữ liệu sau nén",
        "Sắp xếp các hệ số sau lượng tử theo thứ tự từ tần số thấp đến cao trước khi mã hóa",
        "Biểu diễn các khối dữ liệu bằng các từ mã tương ứng"
      ],
      "answer": 2,
      "explanation": "Quét Zig-Zag: Sắp xếp các hệ số sau lượng tử theo thứ tự từ tần số thấp đến cao trước khi mã hóa.",
      "topic": "Nén ảnh"
    },
    {
      "id": 67,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Kim tự tháp ảnh?",
      "options": [
        "Biểu diễn ảnh ở nhiều mức kích thước bằng thành phần low-pass và các phần chi tiết high-pass",
        "Khai thác tính tự tương đồng của ảnh nhưng quá trình tìm phép biến đổi thường tốn thời gian mã hóa",
        "Gán từ mã ngắn cho ký hiệu có xác suất xuất hiện cao và từ mã dài hơn cho ký hiệu ít xuất hiện",
        "JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin"
      ],
      "answer": 0,
      "explanation": "Kim tự tháp ảnh: Biểu diễn ảnh ở nhiều mức kích thước bằng thành phần low-pass và các phần chi tiết high-pass.",
      "topic": "Nén ảnh"
    },
    {
      "id": 68,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Nén có mất thông tin?",
      "options": [
        "Được mở rộng động khi xuất hiện các chuỗi mới trong dữ liệu đầu vào",
        "Xây dựng và mở rộng từ điển các chuỗi trong quá trình mã hóa mà không cần truyền từ điển hoàn chỉnh",
        "Biểu diễn các khối dữ liệu bằng các từ mã tương ứng",
        "Sau giải nén không thu được hoàn toàn dữ liệu gốc nhưng thường đạt tỷ lệ nén cao hơn"
      ],
      "answer": 3,
      "explanation": "Nén có mất thông tin: Sau giải nén không thu được hoàn toàn dữ liệu gốc nhưng thường đạt tỷ lệ nén cao hơn.",
      "topic": "Nén ảnh"
    },
    {
      "id": 69,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Nén sử dụng biến đổi?",
      "options": [
        "Khai thác cấu trúc và mô hình ảnh ở mức cao hơn nhằm vượt giới hạn của các phương pháp truyền thống",
        "Biến đổi ảnh sang miền khác trước khi lượng tử hoặc mã hóa các hệ số",
        "Chuyển dữ liệu ảnh từ miền không gian sang miền tần số để tập trung năng lượng và thuận lợi loại bớt chi tiết",
        "Xây dựng và mở rộng từ điển các chuỗi trong quá trình mã hóa mà không cần truyền từ điển hoàn chỉnh"
      ],
      "answer": 1,
      "explanation": "Nén sử dụng biến đổi: Biến đổi ảnh sang miền khác trước khi lượng tử hoặc mã hóa các hệ số.",
      "topic": "Nén ảnh"
    },
    {
      "id": 70,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Cây Huffman?",
      "options": [
        "Được xây dựng bằng cách lặp ghép hai nút có xác suất nhỏ nhất",
        "Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian",
        "Được mở rộng động khi xuất hiện các chuỗi mới trong dữ liệu đầu vào",
        "Mã đặc biệt đánh dấu kết thúc thông tin"
      ],
      "answer": 0,
      "explanation": "Cây Huffman: Được xây dựng bằng cách lặp ghép hai nút có xác suất nhỏ nhất.",
      "topic": "Nén ảnh"
    },
    {
      "id": 71,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về LZW?",
      "options": [
        "Mã đặc biệt đánh dấu kết thúc thông tin",
        "Sắp xếp các hệ số sau lượng tử theo thứ tự từ tần số thấp đến cao trước khi mã hóa",
        "Xây dựng và mở rộng từ điển các chuỗi trong quá trình mã hóa mà không cần truyền từ điển hoàn chỉnh",
        "Thay một chuỗi ký hiệu lặp liên tiếp bằng biểu diễn gồm độ dài loạt và ký hiệu"
      ],
      "answer": 2,
      "explanation": "LZW: Xây dựng và mở rộng từ điển các chuỗi trong quá trình mã hóa mà không cần truyền từ điển hoàn chỉnh.",
      "topic": "Nén ảnh"
    },
    {
      "id": 72,
      "prompt": "Theo nội dung bài giảng, phát biểu nào mô tả đúng nhất về Độ dư thừa dữ liệu?",
      "options": [
        "Mã hóa từng dòng bằng độ dài các chuỗi bit liên tiếp, thường bắt đầu từ số lượng bit 0",
        "Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén",
        "Sau giải nén không thu được hoàn toàn dữ liệu gốc nhưng thường đạt tỷ lệ nén cao hơn",
        "Mã đặc biệt dùng để kết thúc từ điển hiện tại và bắt đầu lại từ điển mới khi cần"
      ],
      "answer": 1,
      "explanation": "Độ dư thừa dữ liệu: Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén.",
      "topic": "Nén ảnh"
    },
    {
      "id": 73,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Nén thế hệ thứ hai?",
      "options": [
        "Biến đổi ảnh sang miền khác trước khi lượng tử hoặc mã hóa các hệ số",
        "Chia các hệ số DCT cho ma trận lượng tử và làm tròn, khiến nhiều hệ số tần số cao trở thành 0",
        "Chuyển dữ liệu ảnh từ miền không gian sang miền tần số để tập trung năng lượng và thuận lợi loại bớt chi tiết",
        "Khai thác cấu trúc và mô hình ảnh ở mức cao hơn nhằm vượt giới hạn của các phương pháp truyền thống"
      ],
      "answer": 3,
      "explanation": "Nén thế hệ thứ hai: Khai thác cấu trúc và mô hình ảnh ở mức cao hơn nhằm vượt giới hạn của các phương pháp truyền thống.",
      "topic": "Nén ảnh"
    },
    {
      "id": 74,
      "prompt": "Trong xử lý ảnh số, nhận định nào phù hợp nhất với Huffman thích nghi?",
      "options": [
        "Tỷ số giữa kích thước dữ liệu trước nén và kích thước dữ liệu sau nén",
        "Bao gồm các phương pháp mã hóa tương đối trực tiếp như RLE, Huffman và LZW",
        "Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý",
        "Mã đặc biệt đánh dấu kết thúc thông tin"
      ],
      "answer": 2,
      "explanation": "Huffman thích nghi: Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý.",
      "topic": "Nén ảnh"
    },
    {
      "id": 75,
      "prompt": "Đặc điểm nào sau đây gắn đúng với Giới hạn từ điển LZW?",
      "options": [
        "Từ điển trong bài giảng có tối đa 4096 phần tử nên từ mã lớn nhất dài 12 bit",
        "Mã đặc biệt dùng để kết thúc từ điển hiện tại và bắt đầu lại từ điển mới khi cần",
        "Gán từ mã ngắn cho ký hiệu có xác suất xuất hiện cao và từ mã dài hơn cho ký hiệu ít xuất hiện",
        "Biểu diễn các khối dữ liệu bằng các từ mã tương ứng"
      ],
      "answer": 0,
      "explanation": "Giới hạn từ điển LZW: Từ điển trong bài giảng có tối đa 4096 phần tử nên từ mã lớn nhất dài 12 bit.",
      "topic": "Nén ảnh",
      "caution": "Giới hạn 4096 mã (12 bit) ứng với biến thể LZW nêu trong đề, không phải mọi cách triển khai LZW."
    },
    {
      "id": 76,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Mức xám",
        "Pixel",
        "Hệ thống nhận dạng tự động",
        "Nhiễu ngẫu nhiên"
      ],
      "answer": 3,
      "explanation": "Nhiễu ngẫu nhiên: Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 77,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Nén không bảo toàn thông tin",
        "Tăng số mức xám",
        "Nén có bảo toàn thông tin",
        "Hệ thống nhận dạng tự động"
      ],
      "answer": 1,
      "explanation": "Tăng số mức xám: Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 78,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Các mẫu được nhóm thành lớp theo tiêu chuẩn đồng dạng khi lớp chưa được định danh trước. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Pixel",
        "Nén không bảo toàn thông tin",
        "Tăng số mức xám",
        "Phân loại không có mẫu"
      ],
      "answer": 3,
      "explanation": "Phân loại không có mẫu: Các mẫu được nhóm thành lớp theo tiêu chuẩn đồng dạng khi lớp chưa được định danh trước.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 79,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Gồm các khâu thu nhận và tiền xử lý, biểu diễn dữ liệu, nhận dạng và ra quyết định. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Giảm số mức xám",
        "Pixel",
        "Hệ thống nhận dạng tự động",
        "Nhiễu hệ thống"
      ],
      "answer": 2,
      "explanation": "Hệ thống nhận dạng tự động: Gồm các khâu thu nhận và tiền xử lý, biểu diễn dữ liệu, nhận dạng và ra quyết định.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 80,
      "prompt": "Khi gặp tình huống có đặc điểm: Biểu diễn cường độ sáng của điểm ảnh, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Mức xám",
        "Tăng số mức xám",
        "Pixel",
        "Phân loại không có mẫu"
      ],
      "answer": 0,
      "explanation": "Mức xám: Biểu diễn cường độ sáng của điểm ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 81,
      "prompt": "Khi gặp tình huống có đặc điểm: Loại nhiễu có quy luật và có thể khử bằng các phép biến đổi thích hợp, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Pixel",
        "Mức xám",
        "Nén có bảo toàn thông tin",
        "Nhiễu hệ thống"
      ],
      "answer": 3,
      "explanation": "Nhiễu hệ thống: Loại nhiễu có quy luật và có thể khử bằng các phép biến đổi thích hợp.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 82,
      "prompt": "Một hệ thống được thiết kế để Loại nhiễu có quy luật và có thể khử bằng các phép biến đổi thích hợp. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Hệ thống nhận dạng tự động",
        "Nhiễu hệ thống",
        "Phân loại có mẫu",
        "Phân loại không có mẫu"
      ],
      "answer": 1,
      "explanation": "Nhiễu hệ thống: Loại nhiễu có quy luật và có thể khử bằng các phép biến đổi thích hợp.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 83,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Nhóm các mức xám gần nhau thành một nhóm để giảm số mức biểu diễn. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Nén có bảo toàn thông tin",
        "Đặc điểm biên",
        "Nén ảnh",
        "Giảm số mức xám"
      ],
      "answer": 3,
      "explanation": "Giảm số mức xám: Nhóm các mức xám gần nhau thành một nhóm để giảm số mức biểu diễn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 84,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Ảnh chỉ có hai mức biểu diễn. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "PCX",
        "RAW",
        "Ảnh nhị phân",
        "CMYK"
      ],
      "answer": 2,
      "explanation": "Ảnh nhị phân: Ảnh chỉ có hai mức biểu diễn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 85,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Ảnh màu RGB",
        "Mô hình Raster",
        "TIFF",
        "Mô hình Vector"
      ],
      "answer": 0,
      "explanation": "Ảnh màu RGB: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 86,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Mô hình màu liên hệ với RGB theo nguyên tắc bù màu. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Three-CCD",
        "Nội suy màu Bayer",
        "Lấy mẫu",
        "Mô hình CMY"
      ],
      "answer": 3,
      "explanation": "Mô hình CMY: Mô hình màu liên hệ với RGB theo nguyên tắc bù màu.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 87,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Định lý lấy mẫu",
        "Mô hình HSL",
        "Mô hình Raster",
        "Thiết bị thu nhận ảnh Vector"
      ],
      "answer": 1,
      "explanation": "Mô hình HSL: Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 88,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Độ phân giải ảnh",
        "Thiết bị thu nhận ảnh Vector",
        "Thiết bị thu nhận ảnh Raster",
        "Ảnh mức xám"
      ],
      "answer": 0,
      "explanation": "Độ phân giải ảnh: Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 89,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "PCX",
        "Lấy mẫu",
        "Phối màu trừ",
        "TIFF"
      ],
      "answer": 2,
      "explanation": "Phối màu trừ: Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 90,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Độ phân giải ảnh",
        "RAW",
        "Thiết bị thu nhận ảnh Vector",
        "Mô hình Raster"
      ],
      "answer": 1,
      "explanation": "RAW: Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 91,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Thiết bị thu nhận ảnh Vector",
        "Phối màu trừ",
        "Phối màu cộng",
        "Nội suy màu Bayer"
      ],
      "answer": 3,
      "explanation": "Nội suy màu Bayer: Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 92,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc. Lựa chọn nào phù hợp nhất?",
      "options": [
        "BMP",
        "CMYK",
        "Lấy mẫu",
        "RAW"
      ],
      "answer": 2,
      "explanation": "Lấy mẫu: Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 93,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Định lý lấy mẫu",
        "Nội suy màu Bayer",
        "Thiết bị thu nhận ảnh Raster",
        "Lượng tử hóa"
      ],
      "answer": 0,
      "explanation": "Định lý lấy mẫu: Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 94,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Ảnh chỉ có hai mức biểu diễn. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Thiết bị thu nhận ảnh Vector",
        "RAW",
        "BMP",
        "Ảnh nhị phân"
      ],
      "answer": 3,
      "explanation": "Ảnh nhị phân: Ảnh chỉ có hai mức biểu diễn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 95,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Nội suy màu Bayer",
        "Ảnh màu RGB",
        "Thiết bị thu nhận ảnh Raster",
        "Định lý lấy mẫu"
      ],
      "answer": 1,
      "explanation": "Ảnh màu RGB: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 96,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy. Lựa chọn nào phù hợp nhất?",
      "options": [
        "TIFF",
        "Phối màu trừ",
        "Lấy mẫu",
        "Three-CCD"
      ],
      "answer": 3,
      "explanation": "Three-CCD: Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 97,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng. Lựa chọn nào phù hợp nhất?",
      "options": [
        "TIFF",
        "CMYK",
        "Mô hình HSL",
        "Three-CCD"
      ],
      "answer": 2,
      "explanation": "Mô hình HSL: Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 98,
      "prompt": "Mô tả hoạt động sau thuộc về khái niệm nào: Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB?",
      "options": [
        "Phối màu cộng",
        "Nội suy màu Bayer",
        "Thiết bị thu nhận ảnh Raster",
        "Mô hình HSL"
      ],
      "answer": 0,
      "explanation": "Phối màu cộng: Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 99,
      "prompt": "Một hệ thống được thiết kế để Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "CMYK",
        "RAW",
        "Độ phân giải ảnh",
        "Phối màu trừ"
      ],
      "answer": 3,
      "explanation": "Phối màu trừ: Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 100,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Định dạng ảnh có sử dụng mã hóa loạt dài trong lưu trữ dữ liệu ảnh. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Độ phân giải ảnh",
        "PCX",
        "Phối màu trừ",
        "Lọc Bayer"
      ],
      "answer": 1,
      "explanation": "PCX: Định dạng ảnh có sử dụng mã hóa loạt dài trong lưu trữ dữ liệu ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 101,
      "prompt": "Một hệ thống được thiết kế để Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Nội suy màu Bayer",
        "Thiết bị thu nhận ảnh Vector",
        "Lấy mẫu",
        "Thiết bị thu nhận ảnh Raster"
      ],
      "answer": 0,
      "explanation": "Nội suy màu Bayer: Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 102,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Mô hình Vector",
        "Định lý lấy mẫu",
        "Thiết bị thu nhận ảnh Vector",
        "RAW"
      ],
      "answer": 2,
      "explanation": "Thiết bị thu nhận ảnh Vector: Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 103,
      "prompt": "Một hệ thống được thiết kế để Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Nội suy màu Bayer",
        "Mô hình Raster",
        "Độ phân giải ảnh",
        "Thiết bị thu nhận ảnh Raster"
      ],
      "answer": 1,
      "explanation": "Mô hình Raster: Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 104,
      "prompt": "Khi gặp tình huống có đặc điểm: Ảnh chỉ có hai mức biểu diễn, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Lấy mẫu",
        "Three-CCD",
        "Mô hình Vector",
        "Ảnh nhị phân"
      ],
      "answer": 3,
      "explanation": "Ảnh nhị phân: Ảnh chỉ có hai mức biểu diễn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 105,
      "prompt": "Khi gặp tình huống có đặc điểm: Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Lấy mẫu",
        "RAW",
        "Lọc Bayer",
        "PCX"
      ],
      "answer": 2,
      "explanation": "Lọc Bayer: Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 106,
      "prompt": "Khi gặp tình huống có đặc điểm: Mô hình màu liên hệ với RGB theo nguyên tắc bù màu, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Mô hình CMY",
        "Định lý lấy mẫu",
        "BMP",
        "Thiết bị thu nhận ảnh Raster"
      ],
      "answer": 0,
      "explanation": "Mô hình CMY: Mô hình màu liên hệ với RGB theo nguyên tắc bù màu.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 107,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Mặt phẳng bit cao",
        "Lọc giả đảo",
        "Tách ngưỡng",
        "Lọc trung bình"
      ],
      "answer": 3,
      "explanation": "Lọc trung bình: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 108,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Dãn độ tương phản",
        "Nhiễu muối tiêu",
        "Tìm ngưỡng tự động",
        "Mặt phẳng bit cao"
      ],
      "answer": 1,
      "explanation": "Nhiễu muối tiêu: Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 109,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Trích chọn bit",
        "Cân bằng histogram",
        "Tách ngưỡng",
        "Dãn độ tương phản"
      ],
      "answer": 0,
      "explanation": "Trích chọn bit: Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 110,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Tách ngưỡng",
        "Lọc giả đảo",
        "Mặt phẳng bit cao",
        "Khôi phục ảnh"
      ],
      "answer": 2,
      "explanation": "Mặt phẳng bit cao: Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 111,
      "prompt": "Một hệ thống được thiết kế để Cộng một hằng số dương vào mức xám làm ảnh sáng hơn. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Nhiễu muối tiêu",
        "Tăng độ sáng",
        "Phép nhân chập",
        "Tìm ngưỡng tự động"
      ],
      "answer": 1,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 112,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Lọc Wiener",
        "Lọc đảo",
        "Trích chọn bit",
        "Tăng độ sáng"
      ],
      "answer": 3,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 113,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Phân bố lại mức xám để cải thiện độ tương phản của ảnh. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Ảnh âm bản",
        "Nhiễu Gaussian",
        "Cân bằng histogram",
        "Phép nhân chập"
      ],
      "answer": 2,
      "explanation": "Cân bằng histogram: Phân bố lại mức xám để cải thiện độ tương phản của ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 114,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Biến đổi mức xám theo quan hệ nghịch đảo so với thang mức xám. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Ảnh âm bản",
        "Tìm ngưỡng tự động",
        "Lọc đảo",
        "Phép nhân chập"
      ],
      "answer": 0,
      "explanation": "Ảnh âm bản: Biến đổi mức xám theo quan hệ nghịch đảo so với thang mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 115,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Tách ngưỡng",
        "Lọc giả đảo",
        "Tìm ngưỡng tự động",
        "Phép nhân chập"
      ],
      "answer": 3,
      "explanation": "Phép nhân chập: Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 116,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Dãn độ tương phản",
        "Lọc trung bình",
        "Cân bằng histogram",
        "Mô hình suy giảm ảnh"
      ],
      "answer": 1,
      "explanation": "Lọc trung bình: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 117,
      "prompt": "Một hệ thống được thiết kế để Nhiễu có biên độ tuân theo phân bố Gaussian. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Nhiễu Gaussian",
        "Tìm ngưỡng tự động",
        "Tách ngưỡng",
        "Lọc trung bình theo k giá trị gần nhất"
      ],
      "answer": 0,
      "explanation": "Nhiễu Gaussian: Nhiễu có biên độ tuân theo phân bố Gaussian.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 118,
      "prompt": "Một hệ thống được thiết kế để Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Giảm độ sáng",
        "Lọc giả đảo",
        "Trích chọn bit",
        "Tăng độ sáng"
      ],
      "answer": 2,
      "explanation": "Trích chọn bit: Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 119,
      "prompt": "Khi gặp tình huống có đặc điểm: Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Lọc giả đảo",
        "Cân bằng histogram",
        "Nhiễu muối tiêu",
        "Histogram"
      ],
      "answer": 0,
      "explanation": "Lọc giả đảo: Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 120,
      "prompt": "Mô tả hoạt động sau thuộc về khái niệm nào: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn?",
      "options": [
        "Histogram",
        "Ảnh âm bản",
        "Dãn độ tương phản",
        "Tăng độ sáng"
      ],
      "answer": 3,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 121,
      "prompt": "Khi gặp tình huống có đặc điểm: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Nhiễu Gaussian",
        "Tăng độ sáng",
        "Lọc trung bình theo k giá trị gần nhất",
        "Mô hình suy giảm ảnh"
      ],
      "answer": 1,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 122,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Biểu diễn số điểm ảnh tương ứng với từng mức xám. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Histogram",
        "Lọc đảo",
        "Tách ngưỡng",
        "Bó cụm mức xám"
      ],
      "answer": 0,
      "explanation": "Histogram: Biểu diễn số điểm ảnh tương ứng với từng mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 123,
      "prompt": "Khi gặp tình huống có đặc điểm: Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Histogram",
        "Tách ngưỡng",
        "Dãn độ tương phản",
        "Giảm độ sáng"
      ],
      "answer": 2,
      "explanation": "Dãn độ tương phản: Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 124,
      "prompt": "Khi gặp tình huống có đặc điểm: Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Mô hình suy giảm ảnh",
        "Phép nhân chập",
        "Tìm ngưỡng tự động",
        "Lọc trung bình theo k giá trị gần nhất"
      ],
      "answer": 1,
      "explanation": "Phép nhân chập: Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 125,
      "prompt": "Một hệ thống được thiết kế để Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Mặt phẳng bit cao",
        "Histogram",
        "Tăng độ sáng",
        "Lọc trung bình"
      ],
      "answer": 3,
      "explanation": "Lọc trung bình: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 126,
      "prompt": "Khi gặp tình huống có đặc điểm: Nhiễu có biên độ tuân theo phân bố Gaussian, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Ảnh âm bản",
        "Tăng độ sáng",
        "Nhiễu Gaussian",
        "Giảm độ sáng"
      ],
      "answer": 2,
      "explanation": "Nhiễu Gaussian: Nhiễu có biên độ tuân theo phân bố Gaussian.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 127,
      "prompt": "Khi gặp tình huống có đặc điểm: Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Trích chọn bit",
        "Dãn độ tương phản",
        "Lọc giả đảo",
        "Cân bằng histogram"
      ],
      "answer": 0,
      "explanation": "Trích chọn bit: Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 128,
      "prompt": "Một hệ thống có biểu hiện: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn. Nhận định nào xác định đúng kỹ thuật liên quan?",
      "options": [
        "Histogram",
        "Dãn độ tương phản",
        "Ảnh âm bản",
        "Tăng độ sáng"
      ],
      "answer": 3,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 129,
      "prompt": "Để đáp ứng yêu cầu Cộng một hằng số dương vào mức xám làm ảnh sáng hơn, khái niệm hoặc kỹ thuật nào phù hợp nhất?",
      "options": [
        "Mô hình suy giảm ảnh",
        "Tăng độ sáng",
        "Lọc trung bình theo k giá trị gần nhất",
        "Nhiễu Gaussian"
      ],
      "answer": 1,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 130,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Phép mở",
        "Phép co ảnh",
        "Phép giãn ảnh",
        "Sobel"
      ],
      "answer": 0,
      "explanation": "Phép mở: Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 131,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Phép đóng",
        "Phép co ảnh",
        "Trích biên hình thái",
        "Phép mở"
      ],
      "answer": 2,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 132,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Dò biên theo quy hoạch động",
        "Ức chế cực đại không",
        "Phát hiện biên trực tiếp",
        "Phát hiện biên gián tiếp"
      ],
      "answer": 1,
      "explanation": "Ức chế cực đại không: Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 133,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Phát hiện biên trực tiếp",
        "Phép giãn ảnh",
        "Láng giềng 4",
        "Phần tử cấu trúc"
      ],
      "answer": 3,
      "explanation": "Phần tử cấu trúc: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 134,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Đạo hàm bậc hai",
        "Toán tử la bàn",
        "Phát hiện biên trực tiếp",
        "Canny"
      ],
      "answer": 2,
      "explanation": "Phát hiện biên trực tiếp: Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 135,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Gradient",
        "Canny",
        "Ức chế cực đại không",
        "Phép giãn ảnh"
      ],
      "answer": 0,
      "explanation": "Gradient: Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 136,
      "prompt": "Một hệ thống được thiết kế để Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Sobel",
        "Canny",
        "Đạo hàm bậc nhất",
        "Laplace"
      ],
      "answer": 3,
      "explanation": "Laplace: Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 137,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Trích biên hình thái",
        "Laplace",
        "Phép giãn ảnh",
        "Đạo hàm bậc hai"
      ],
      "answer": 1,
      "explanation": "Laplace: Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 138,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Phép co ảnh",
        "Phần tử cấu trúc",
        "Trích biên hình thái",
        "Gradient"
      ],
      "answer": 0,
      "explanation": "Phép co ảnh: Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 139,
      "prompt": "Khi gặp tình huống có đặc điểm: Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Phép mở",
        "Canny",
        "Phép đóng",
        "Laplace"
      ],
      "answer": 2,
      "explanation": "Phép đóng: Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 140,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Phát hiện biên trực tiếp",
        "Trích biên hình thái",
        "Dò biên theo quy hoạch động",
        "Phát hiện biên gián tiếp"
      ],
      "answer": 1,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 141,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Phép giãn ảnh",
        "Phép mở",
        "Dò biên theo quy hoạch động",
        "Đạo hàm bậc hai"
      ],
      "answer": 3,
      "explanation": "Đạo hàm bậc hai: Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 142,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Dò biên theo quy hoạch động",
        "Ngưỡng kép Canny",
        "Ức chế cực đại không",
        "Phát hiện biên trực tiếp"
      ],
      "answer": 1,
      "explanation": "Ngưỡng kép Canny: Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 143,
      "prompt": "Một hệ thống được thiết kế để Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Biên ảnh",
        "Canny",
        "Phép giãn ảnh",
        "Dò biên theo quy hoạch động"
      ],
      "answer": 0,
      "explanation": "Biên ảnh: Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 144,
      "prompt": "Một hệ thống được thiết kế để Xác định biên từ ranh giới của các vùng sau khi phân vùng. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Láng giềng 4",
        "Phần tử cấu trúc",
        "Phát hiện biên gián tiếp",
        "Phép giãn ảnh"
      ],
      "answer": 2,
      "explanation": "Phát hiện biên gián tiếp: Xác định biên từ ranh giới của các vùng sau khi phân vùng.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 145,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Toán tử gradient có trọng số lớn hơn ở hàng hoặc cột giữa của mặt nạ. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Phép đóng",
        "Sobel",
        "Phép mở",
        "Phép giãn ảnh"
      ],
      "answer": 1,
      "explanation": "Sobel: Toán tử gradient có trọng số lớn hơn ở hàng hoặc cột giữa của mặt nạ.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 146,
      "prompt": "Khi gặp tình huống có đặc điểm: Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Phép đóng",
        "Canny",
        "Sobel",
        "Laplace"
      ],
      "answer": 3,
      "explanation": "Laplace: Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 147,
      "prompt": "Một hệ thống được thiết kế để Gồm các điểm lân cận trên, dưới, trái và phải của điểm đang xét. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Phép mở",
        "Phép đóng",
        "Láng giềng 4",
        "Gradient"
      ],
      "answer": 2,
      "explanation": "Láng giềng 4: Gồm các điểm lân cận trên, dưới, trái và phải của điểm đang xét.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 148,
      "prompt": "Khi gặp tình huống có đặc điểm: Làm mở rộng vùng đối tượng theo phần tử cấu trúc, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Phép giãn ảnh",
        "Trích biên trong",
        "Phép co ảnh",
        "Trích biên hình thái"
      ],
      "answer": 0,
      "explanation": "Phép giãn ảnh: Làm mở rộng vùng đối tượng theo phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 149,
      "prompt": "Khi gặp tình huống có đặc điểm: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Sobel",
        "Toán tử la bàn",
        "Phát hiện biên gián tiếp",
        "Trích biên hình thái"
      ],
      "answer": 3,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 150,
      "prompt": "Khi gặp tình huống có đặc điểm: Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Ức chế cực đại không",
        "Đạo hàm bậc hai",
        "Phát hiện biên trực tiếp",
        "Trích biên hình thái"
      ],
      "answer": 1,
      "explanation": "Đạo hàm bậc hai: Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 151,
      "prompt": "Khi gặp tình huống có đặc điểm: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Phần tử cấu trúc",
        "Phát hiện biên gián tiếp",
        "Phép co ảnh",
        "Trích biên hình thái"
      ],
      "answer": 0,
      "explanation": "Phần tử cấu trúc: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 152,
      "prompt": "Một hệ thống được thiết kế để Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Phép co ảnh",
        "Phép đóng",
        "Phần tử cấu trúc",
        "Phép mở"
      ],
      "answer": 2,
      "explanation": "Phần tử cấu trúc: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 153,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Histogram hai đỉnh",
        "Kết cấu texture",
        "Phân vùng theo miền đồng nhất",
        "Thuật toán tam giác"
      ],
      "answer": 1,
      "explanation": "Kết cấu texture: Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 154,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Dựa trên thông tin của toàn ảnh, ví dụ histogram. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Hợp vùng",
        "Tách vùng",
        "Thuật toán đẳng điệu",
        "Phân vùng toàn thể"
      ],
      "answer": 3,
      "explanation": "Phân vùng toàn thể: Dựa trên thông tin của toàn ảnh, ví dụ histogram.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 155,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Tách vùng",
        "Phát triển vùng",
        "Thuật toán đẳng điệu",
        "Hợp vùng"
      ],
      "answer": 2,
      "explanation": "Thuật toán đẳng điệu: Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 156,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Thuật toán tam giác",
        "Phân vùng theo miền đồng nhất",
        "Kết cấu texture",
        "Phân vùng theo kết cấu bề mặt"
      ],
      "answer": 0,
      "explanation": "Thuật toán tam giác: Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 157,
      "prompt": "Mô tả hoạt động sau thuộc về khái niệm nào: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất?",
      "options": [
        "Phân vùng ảnh",
        "Tách vùng",
        "Phân vùng theo ngưỡng",
        "Phát triển vùng"
      ],
      "answer": 3,
      "explanation": "Phát triển vùng: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 158,
      "prompt": "Khi gặp tình huống có đặc điểm: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Phân vùng toàn thể",
        "Phát triển vùng",
        "Phân vùng theo kết cấu bề mặt",
        "Phân vùng dựa theo đường biên"
      ],
      "answer": 1,
      "explanation": "Phát triển vùng: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 159,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Tiêu chuẩn đồng nhất",
        "Phân vùng toàn thể",
        "Phân vùng theo miền đồng nhất",
        "Phân vùng theo kết cấu bề mặt"
      ],
      "answer": 0,
      "explanation": "Tiêu chuẩn đồng nhất: Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 160,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Hợp vùng",
        "Tách vùng",
        "Phân vùng theo miền đồng nhất",
        "Phân vùng ảnh"
      ],
      "answer": 3,
      "explanation": "Phân vùng ảnh: Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 161,
      "prompt": "Một hệ thống được thiết kế để Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Phân vùng theo kết cấu bề mặt",
        "Phân vùng theo ngưỡng",
        "Phân vùng dựa theo đường biên",
        "Phân vùng theo miền đồng nhất"
      ],
      "answer": 1,
      "explanation": "Phân vùng theo ngưỡng: Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 162,
      "prompt": "Một hệ thống được thiết kế để Ước lượng ngưỡng dựa trên tính đối xứng của phân bố mức xám thuộc nền. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Đối xứng nền",
        "Phân vùng toàn thể",
        "Tách vùng",
        "Phân vùng theo ngưỡng"
      ],
      "answer": 0,
      "explanation": "Đối xứng nền: Ước lượng ngưỡng dựa trên tính đối xứng của phân bố mức xám thuộc nền.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 163,
      "prompt": "Một hệ thống được thiết kế để Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Tiêu chuẩn đồng nhất",
        "Hợp vùng",
        "Phân vùng theo miền đồng nhất",
        "Phát triển vùng"
      ],
      "answer": 2,
      "explanation": "Phân vùng theo miền đồng nhất: Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 164,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Phát triển vùng",
        "Hợp vùng",
        "Làm trơn histogram",
        "Thuật toán đẳng điệu"
      ],
      "answer": 1,
      "explanation": "Hợp vùng: Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 165,
      "prompt": "Một kỹ sư cần thực hiện chức năng: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất. Lựa chọn nào phù hợp?",
      "options": [
        "Thuật toán tam giác",
        "Đối xứng nền",
        "Hợp vùng",
        "Phát triển vùng"
      ],
      "answer": 3,
      "explanation": "Phát triển vùng: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 166,
      "prompt": "Khi gặp tình huống có đặc điểm: Thường gợi ý khả năng tồn tại hai nhóm mức xám tương ứng gần với nền và đối tượng, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Kết cấu texture",
        "Phân vùng ảnh",
        "Histogram hai đỉnh",
        "Đối xứng nền"
      ],
      "answer": 2,
      "explanation": "Histogram hai đỉnh: Thường gợi ý khả năng tồn tại hai nhóm mức xám tương ứng gần với nền và đối tượng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 167,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Phân vùng ảnh",
        "Tách vùng",
        "Histogram hai đỉnh",
        "Phân vùng theo kết cấu bề mặt"
      ],
      "answer": 0,
      "explanation": "Phân vùng ảnh: Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 168,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Quá trình gán đối tượng vào một lớp dựa trên mô hình biểu diễn, quy luật và mẫu chuẩn. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "K-means",
        "ISODATA",
        "Nhận dạng cấu trúc",
        "Nhận dạng ảnh"
      ],
      "answer": 3,
      "explanation": "Nhận dạng ảnh: Quá trình gán đối tượng vào một lớp dựa trên mô hình biểu diễn, quy luật và mẫu chuẩn.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 169,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Tự hình thành các lớp và đặc trưng lớp khi không có thư viện mẫu chuẩn. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Học cạnh tranh Kohonen",
        "Học không giám sát",
        "Tín hiệu lưỡng cực Hopfield",
        "Thuật toán khoảng cách lớn nhất"
      ],
      "answer": 1,
      "explanation": "Học không giám sát: Tự hình thành các lớp và đặc trưng lớp khi không có thư viện mẫu chuẩn.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 170,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Hàm hỗ trợ quyết định đối tượng thuộc lớp nào dựa trên giá trị các đặc trưng. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "ISODATA",
        "Nhận dạng cấu trúc",
        "K-means",
        "Hàm phân lớp"
      ],
      "answer": 3,
      "explanation": "Hàm phân lớp: Hàm hỗ trợ quyết định đối tượng thuộc lớp nào dựa trên giá trị các đặc trưng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 171,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Tạo lớp mới từ phần tử xa nhất khi khoảng cách vượt điều kiện ngưỡng. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Hàm phân lớp",
        "Mạng Hopfield",
        "Thuật toán khoảng cách lớn nhất",
        "Nhận dạng ảnh"
      ],
      "answer": 2,
      "explanation": "Thuật toán khoảng cách lớn nhất: Tạo lớp mới từ phần tử xa nhất khi khoảng cách vượt điều kiện ngưỡng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 172,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Nhận dạng cấu trúc",
        "Học cạnh tranh Kohonen",
        "Thuật toán khoảng cách lớn nhất",
        "Hàm phân lớp"
      ],
      "answer": 0,
      "explanation": "Nhận dạng cấu trúc: Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 173,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Bản đồ tự tổ chức ánh xạ các vector gần nhau vào các nơron lân cận. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "ISODATA",
        "Bản đồ tự tổ chức",
        "K-means",
        "Mạng Kohonen"
      ],
      "answer": 1,
      "explanation": "Bản đồ tự tổ chức: Bản đồ tự tổ chức ánh xạ các vector gần nhau vào các nơron lân cận.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 174,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Thường được dùng để xác định mẫu hoặc tâm cụm gần nhất trong không gian đặc trưng. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Tín hiệu lưỡng cực Hopfield",
        "Khoảng cách Euclidean",
        "Thuật toán khoảng cách lớn nhất",
        "Biểu diễn trong không gian đặc trưng"
      ],
      "answer": 1,
      "explanation": "Khoảng cách Euclidean: Thường được dùng để xác định mẫu hoặc tâm cụm gần nhất trong không gian đặc trưng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 175,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Mạng Hopfield trong bài giảng sử dụng các giá trị đầu vào -1 và 1. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Biểu diễn trong không gian đặc trưng",
        "Học có giám sát",
        "Bản đồ tự tổ chức",
        "Tín hiệu lưỡng cực Hopfield"
      ],
      "answer": 3,
      "explanation": "Tín hiệu lưỡng cực Hopfield: Mạng Hopfield trong bài giảng sử dụng các giá trị đầu vào -1 và 1.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 176,
      "prompt": "Một bước xử lý cần đạt đặc điểm sau: Chia các hệ số DCT cho ma trận lượng tử và làm tròn, khiến nhiều hệ số tần số cao trở thành 0. Kỹ thuật hoặc khái niệm nào phù hợp nhất?",
      "options": [
        "Cây Huffman",
        "Quét Zig-Zag",
        "Lượng tử hóa JPEG",
        "Nén Fractal"
      ],
      "answer": 2,
      "explanation": "Lượng tử hóa JPEG: Chia các hệ số DCT cho ma trận lượng tử và làm tròn, khiến nhiều hệ số tần số cao trở thành 0.",
      "topic": "Nén ảnh"
    },
    {
      "id": 177,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Biểu diễn ảnh ở nhiều mức kích thước bằng thành phần low-pass và các phần chi tiết high-pass. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Kim tự tháp ảnh",
        "Mã hóa khối",
        "Nén sử dụng biến đổi",
        "RLE cho ảnh nhị phân"
      ],
      "answer": 0,
      "explanation": "Kim tự tháp ảnh: Biểu diễn ảnh ở nhiều mức kích thước bằng thành phần low-pass và các phần chi tiết high-pass.",
      "topic": "Nén ảnh"
    },
    {
      "id": 178,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Sau giải nén không thu được hoàn toàn dữ liệu gốc nhưng thường đạt tỷ lệ nén cao hơn. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Từ điển LZW",
        "Nén Fractal",
        "Nén không mất thông tin",
        "Nén có mất thông tin"
      ],
      "answer": 3,
      "explanation": "Nén có mất thông tin: Sau giải nén không thu được hoàn toàn dữ liệu gốc nhưng thường đạt tỷ lệ nén cao hơn.",
      "topic": "Nén ảnh"
    },
    {
      "id": 179,
      "prompt": "Khi gặp tình huống có đặc điểm: Gán từ mã ngắn cho ký hiệu có xác suất xuất hiện cao và từ mã dài hơn cho ký hiệu ít xuất hiện, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Nén thế hệ thứ nhất",
        "Mã Huffman",
        "RLE cho ảnh nhị phân",
        "Clear Code của LZW"
      ],
      "answer": 1,
      "explanation": "Mã Huffman: Gán từ mã ngắn cho ký hiệu có xác suất xuất hiện cao và từ mã dài hơn cho ký hiệu ít xuất hiện.",
      "topic": "Nén ảnh"
    },
    {
      "id": 180,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Gán từ mã ngắn cho ký hiệu có xác suất xuất hiện cao và từ mã dài hơn cho ký hiệu ít xuất hiện. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Mã Huffman",
        "LZW",
        "Nén thế hệ thứ hai",
        "Quét Zig-Zag"
      ],
      "answer": 0,
      "explanation": "Mã Huffman: Gán từ mã ngắn cho ký hiệu có xác suất xuất hiện cao và từ mã dài hơn cho ký hiệu ít xuất hiện.",
      "topic": "Nén ảnh"
    },
    {
      "id": 181,
      "prompt": "Khi gặp tình huống có đặc điểm: Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén, kỹ thuật nào nên được nhận diện?",
      "options": [
        "Nén không gian",
        "Từ điển LZW",
        "Độ dư thừa dữ liệu",
        "Mã Huffman"
      ],
      "answer": 2,
      "explanation": "Độ dư thừa dữ liệu: Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén.",
      "topic": "Nén ảnh"
    },
    {
      "id": 182,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Nén có mất thông tin",
        "Độ dư thừa dữ liệu",
        "Giới hạn từ điển LZW",
        "Giảm mẫu màu trong JPEG"
      ],
      "answer": 1,
      "explanation": "Độ dư thừa dữ liệu: Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén.",
      "topic": "Nén ảnh"
    },
    {
      "id": 183,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Mã hóa từng dòng bằng độ dài các chuỗi bit liên tiếp, thường bắt đầu từ số lượng bit 0. Lựa chọn nào phù hợp nhất?",
      "options": [
        "RLE cho ảnh nhị phân",
        "Phân khối JPEG",
        "Giảm mẫu màu trong JPEG",
        "Nén không mất thông tin"
      ],
      "answer": 0,
      "explanation": "RLE cho ảnh nhị phân: Mã hóa từng dòng bằng độ dài các chuỗi bit liên tiếp, thường bắt đầu từ số lượng bit 0.",
      "topic": "Nén ảnh"
    },
    {
      "id": 184,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý. Lựa chọn nào phù hợp nhất?",
      "options": [
        "DCT trong JPEG",
        "EOI trong LZW",
        "Huffman thích nghi",
        "Tỷ lệ nén"
      ],
      "answer": 2,
      "explanation": "Huffman thích nghi: Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý.",
      "topic": "Nén ảnh"
    },
    {
      "id": 185,
      "prompt": "Một hệ thống được thiết kế để JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Nén thế hệ thứ hai",
        "Phân khối JPEG",
        "RLE cho ảnh nhị phân",
        "Giảm mẫu màu trong JPEG"
      ],
      "answer": 1,
      "explanation": "Phân khối JPEG: JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin.",
      "topic": "Nén ảnh"
    },
    {
      "id": 186,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin. Lựa chọn nào phù hợp nhất?",
      "options": [
        "Mã hóa loạt dài RLE",
        "Mã Huffman",
        "Cây Huffman",
        "Phân khối JPEG"
      ],
      "answer": 3,
      "explanation": "Phân khối JPEG: JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin.",
      "topic": "Nén ảnh"
    },
    {
      "id": 187,
      "prompt": "Trong một bài toán xử lý ảnh, yêu cầu là: Sắp xếp các hệ số sau lượng tử theo thứ tự từ tần số thấp đến cao trước khi mã hóa. Lựa chọn nào phù hợp nhất?",
      "options": [
        "LZW",
        "Mã Huffman",
        "Quét Zig-Zag",
        "Tỷ lệ nén"
      ],
      "answer": 2,
      "explanation": "Quét Zig-Zag: Sắp xếp các hệ số sau lượng tử theo thứ tự từ tần số thấp đến cao trước khi mã hóa.",
      "topic": "Nén ảnh"
    },
    {
      "id": 188,
      "prompt": "Một hệ thống được thiết kế để Khai thác tính tự tương đồng của ảnh nhưng quá trình tìm phép biến đổi thường tốn thời gian mã hóa. Nội dung nào tương ứng đúng nhất?",
      "options": [
        "Nén Fractal",
        "Độ dư thừa dữ liệu",
        "LZW",
        "Mã hóa loạt dài RLE"
      ],
      "answer": 0,
      "explanation": "Nén Fractal: Khai thác tính tự tương đồng của ảnh nhưng quá trình tìm phép biến đổi thường tốn thời gian mã hóa.",
      "topic": "Nén ảnh"
    },
    {
      "id": 189,
      "prompt": "Khi gặp tình huống có đặc điểm: Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian, kỹ thuật nào nên được nhận diện?",
      "options": [
        "LZW",
        "Nén Fractal",
        "Mã hóa loạt dài RLE",
        "Nén không gian"
      ],
      "answer": 3,
      "explanation": "Nén không gian: Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian.",
      "topic": "Nén ảnh"
    },
    {
      "id": 190,
      "prompt": "Mô tả hoạt động sau thuộc về khái niệm nào: Gán từ mã ngắn cho ký hiệu có xác suất xuất hiện cao và từ mã dài hơn cho ký hiệu ít xuất hiện?",
      "options": [
        "Lượng tử hóa JPEG",
        "Mã Huffman",
        "Nén có mất thông tin",
        "Độ dư thừa dữ liệu"
      ],
      "answer": 1,
      "explanation": "Mã Huffman: Gán từ mã ngắn cho ký hiệu có xác suất xuất hiện cao và từ mã dài hơn cho ký hiệu ít xuất hiện.",
      "topic": "Nén ảnh"
    },
    {
      "id": 191,
      "prompt": "Hành vi nào phản ánh đúng tinh thần tham gia tích cực trong giờ giảng theo chuẩn đầu ra của học phần?",
      "options": [
        "chủ động trao đổi và thực hiện các hoạt động học tập được giao trên lớp",
        "chỉ sử dụng một nguồn thông tin có sẵn, không đối chiếu với bài học và không xem xét phản hồi của giảng viên hoặc thành viên khác",
        "bỏ qua phần tự học",
        "chờ người khác hoàn thành phần lớn nhiệm vụ rồi mới tham gia và không chủ động tìm hiểu thêm tài liệu để củng cố nội dung chưa rõ"
      ],
      "answer": 0,
      "topic": "Phương pháp học tập",
      "explanation": "chủ động trao đổi và thực hiện các hoạt động học tập được giao trên lớp."
    },
    {
      "id": 192,
      "prompt": "Tình huống nào thể hiện phù hợp nhất yêu cầu tích lũy và cập nhật kiến thức trong học phần?",
      "options": [
        "không cần nhận phản hồi",
        "sao chép kết quả có sẵn",
        "thường xuyên bổ sung kiến thức mới liên quan đến nội dung xử lý ảnh",
        "chỉ học trước lúc kiểm tra"
      ],
      "answer": 2,
      "topic": "Phương pháp học tập",
      "explanation": "thường xuyên bổ sung kiến thức mới liên quan đến nội dung xử lý ảnh."
    },
    {
      "id": 193,
      "prompt": "Tình huống nào thể hiện phù hợp nhất yêu cầu thực hiện nhiệm vụ được giao trong học phần?",
      "options": [
        "chỉ sử dụng một nguồn thông tin có sẵn, không đối chiếu với bài học và không xem xét phản hồi của giảng viên hoặc thành viên khác",
        "hoàn thành phần việc đúng phạm vi và thời điểm đã thống nhất",
        "chỉ thực hiện khi có yêu cầu trực tiếp, không chủ động kiểm tra, bổ sung hoặc cập nhật kiến thức liên quan sau đó",
        "ưu tiên hoàn thành thật nhanh, không trao đổi tiến độ với nhóm và cũng không kiểm tra lại độ chính xác của kết quả"
      ],
      "answer": 1,
      "topic": "Phương pháp học tập",
      "explanation": "hoàn thành phần việc đúng phạm vi và thời điểm đã thống nhất."
    },
    {
      "id": 194,
      "prompt": "Khi thực hiện học phần, lựa chọn nào phù hợp nhất với yêu cầu tự đánh giá việc học?",
      "options": [
        "không trao đổi với nhóm",
        "chỉ học trước lúc kiểm tra",
        "bỏ qua các quy định đã thống nhất nếu chưa có kiểm tra trực tiếp và chỉ tham gia những hoạt động được tính điểm bắt buộc",
        "kiểm tra lại mức độ hiểu bài và xác định nội dung cần bổ sung"
      ],
      "answer": 3,
      "topic": "Phương pháp học tập",
      "explanation": "kiểm tra lại mức độ hiểu bài và xác định nội dung cần bổ sung."
    },
    {
      "id": 195,
      "prompt": "Khi thực hiện học phần, lựa chọn nào phù hợp nhất với yêu cầu tham gia tích cực trong giờ giảng?",
      "options": [
        "chỉ làm khi được nhắc",
        "bỏ qua phần tự học",
        "chủ động trao đổi và thực hiện các hoạt động học tập được giao trên lớp",
        "không cần nhận phản hồi"
      ],
      "answer": 2,
      "topic": "Phương pháp học tập",
      "explanation": "chủ động trao đổi và thực hiện các hoạt động học tập được giao trên lớp."
    },
    {
      "id": 196,
      "prompt": "Hành vi nào phản ánh đúng tinh thần tích lũy và cập nhật kiến thức theo chuẩn đầu ra của học phần?",
      "options": [
        "thường xuyên bổ sung kiến thức mới liên quan đến nội dung xử lý ảnh",
        "chỉ sử dụng một nguồn thông tin có sẵn, không đối chiếu với bài học và không xem xét phản hồi của giảng viên hoặc thành viên khác",
        "chờ người khác hoàn thành phần lớn nhiệm vụ rồi mới tham gia và không chủ động tìm hiểu thêm tài liệu để củng cố nội dung chưa rõ",
        "bỏ qua phần tự học"
      ],
      "answer": 0,
      "topic": "Phương pháp học tập",
      "explanation": "thường xuyên bổ sung kiến thức mới liên quan đến nội dung xử lý ảnh."
    },
    {
      "id": 197,
      "prompt": "Hành vi nào phản ánh đúng tinh thần thực hiện nhiệm vụ được giao theo chuẩn đầu ra của học phần?",
      "options": [
        "không cần nhận phản hồi",
        "chỉ sử dụng một nguồn thông tin có sẵn, không đối chiếu với bài học và không xem xét phản hồi của giảng viên hoặc thành viên khác",
        "sao chép kết quả có sẵn",
        "hoàn thành phần việc đúng phạm vi và thời điểm đã thống nhất"
      ],
      "answer": 3,
      "topic": "Phương pháp học tập",
      "explanation": "hoàn thành phần việc đúng phạm vi và thời điểm đã thống nhất."
    },
    {
      "id": 198,
      "prompt": "Tình huống nào thể hiện phù hợp nhất yêu cầu tự đánh giá việc học trong học phần?",
      "options": [
        "ưu tiên hoàn thành thật nhanh, không trao đổi tiến độ với nhóm và cũng không kiểm tra lại độ chính xác của kết quả",
        "kiểm tra lại mức độ hiểu bài và xác định nội dung cần bổ sung",
        "chỉ sử dụng một nguồn thông tin có sẵn, không đối chiếu với bài học và không xem xét phản hồi của giảng viên hoặc thành viên khác",
        "chỉ thực hiện khi có yêu cầu trực tiếp, không chủ động kiểm tra, bổ sung hoặc cập nhật kiến thức liên quan sau đó"
      ],
      "answer": 1,
      "topic": "Phương pháp học tập",
      "explanation": "kiểm tra lại mức độ hiểu bài và xác định nội dung cần bổ sung."
    },
    {
      "id": 199,
      "prompt": "Tình huống nào thể hiện phù hợp nhất yêu cầu tham gia tích cực trong giờ giảng trong học phần?",
      "options": [
        "chủ động trao đổi và thực hiện các hoạt động học tập được giao trên lớp",
        "chỉ học trước lúc kiểm tra",
        "chỉ thực hiện khi có yêu cầu trực tiếp, không chủ động kiểm tra, bổ sung hoặc cập nhật kiến thức liên quan sau đó",
        "ưu tiên hoàn thành thật nhanh, không trao đổi tiến độ với nhóm và cũng không kiểm tra lại độ chính xác của kết quả"
      ],
      "answer": 0,
      "topic": "Phương pháp học tập",
      "explanation": "chủ động trao đổi và thực hiện các hoạt động học tập được giao trên lớp."
    },
    {
      "id": 200,
      "prompt": "Khi thực hiện học phần, lựa chọn nào phù hợp nhất với yêu cầu tích lũy và cập nhật kiến thức?",
      "options": [
        "chỉ làm khi được nhắc",
        "không cần nhận phản hồi",
        "thường xuyên bổ sung kiến thức mới liên quan đến nội dung xử lý ảnh",
        "bỏ qua phần tự học"
      ],
      "answer": 2,
      "topic": "Phương pháp học tập",
      "explanation": "thường xuyên bổ sung kiến thức mới liên quan đến nội dung xử lý ảnh."
    },
    {
      "id": 201,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Nhiễu hệ thống?",
      "options": [
        "Loại nhiễu có quy luật và có thể khử bằng các phép biến đổi thích hợp",
        "Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc",
        "Biểu diễn cường độ sáng của điểm ảnh",
        "Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh"
      ],
      "answer": 0,
      "explanation": "Nhiễu hệ thống: Loại nhiễu có quy luật và có thể khử bằng các phép biến đổi thích hợp.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 202,
      "prompt": "Một bài toán có yêu cầu Khắc phục biến dạng do thiết bị quang học và điện tử bằng các phép chiếu dựa trên điểm điều khiển. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Đặc điểm biên",
        "Nắn chỉnh biến dạng",
        "Nén có bảo toàn thông tin",
        "Nén không bảo toàn thông tin"
      ],
      "answer": 1,
      "explanation": "Nắn chỉnh biến dạng: Khắc phục biến dạng do thiết bị quang học và điện tử bằng các phép chiếu dựa trên điểm điều khiển.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 203,
      "prompt": "Khi ôn tập về Nhiễu hệ thống, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Thường cho khả năng nén cao hơn nhưng dữ liệu phục hồi không hoàn toàn giống ảnh gốc",
        "Cho phép phục hồi dữ liệu ảnh sau giải nén mà không làm mất thông tin gốc",
        "Loại nhiễu có quy luật và có thể khử bằng các phép biến đổi thích hợp",
        "Phần tử ảnh; mỗi pixel gắn với vị trí và thông tin cường độ sáng hoặc màu"
      ],
      "answer": 2,
      "explanation": "Nhiễu hệ thống: Loại nhiễu có quy luật và có thể khử bằng các phép biến đổi thích hợp.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 204,
      "prompt": "Một bài toán có yêu cầu Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Nhiễu hệ thống",
        "Mức xám",
        "Pixel",
        "Nhiễu ngẫu nhiên"
      ],
      "answer": 3,
      "explanation": "Nhiễu ngẫu nhiên: Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 205,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Giảm số mức xám trong môn xử lý ảnh?",
      "options": [
        "Nhóm các mức xám gần nhau thành một nhóm để giảm số mức biểu diễn",
        "Loại nhiễu không rõ quy luật và thường được khắc phục bằng các phép lọc",
        "Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh",
        "Giảm không gian lưu trữ dữ liệu ảnh"
      ],
      "answer": 0,
      "explanation": "Giảm số mức xám: Nhóm các mức xám gần nhau thành một nhóm để giảm số mức biểu diễn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 206,
      "prompt": "Một bài toán có yêu cầu Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Ảnh số",
        "Tăng số mức xám",
        "Nén có bảo toàn thông tin",
        "Hệ thống nhận dạng tự động"
      ],
      "answer": 1,
      "explanation": "Tăng số mức xám: Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 207,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Phân loại có mẫu trong môn xử lý ảnh?",
      "options": [
        "Phần tử ảnh; mỗi pixel gắn với vị trí và thông tin cường độ sáng hoặc màu",
        "Gồm các khâu thu nhận và tiền xử lý, biểu diễn dữ liệu, nhận dạng và ra quyết định",
        "Mẫu đầu vào được gán vào một lớp đã xác định dựa trên mẫu chuẩn",
        "Cho phép phục hồi dữ liệu ảnh sau giải nén mà không làm mất thông tin gốc"
      ],
      "answer": 2,
      "explanation": "Phân loại có mẫu: Mẫu đầu vào được gán vào một lớp đã xác định dựa trên mẫu chuẩn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 208,
      "prompt": "Một bài toán có yêu cầu Các mẫu được nhóm thành lớp theo tiêu chuẩn đồng dạng khi lớp chưa được định danh trước. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Pixel",
        "Tăng số mức xám",
        "Mức xám",
        "Phân loại không có mẫu"
      ],
      "answer": 3,
      "explanation": "Phân loại không có mẫu: Các mẫu được nhóm thành lớp theo tiêu chuẩn đồng dạng khi lớp chưa được định danh trước.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 209,
      "prompt": "Khi ôn tập về Ảnh số, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Ảnh số có thể được biểu diễn bằng một ma trận các điểm ảnh sau quá trình số hóa",
        "Mẫu đầu vào được gán vào một lớp đã xác định dựa trên mẫu chuẩn",
        "Nội suy các mức xám trung gian nhằm tăng độ mịn của ảnh",
        "Khắc phục biến dạng do thiết bị quang học và điện tử bằng các phép chiếu dựa trên điểm điều khiển"
      ],
      "answer": 0,
      "explanation": "Ảnh số: Ảnh số có thể được biểu diễn bằng một ma trận các điểm ảnh sau quá trình số hóa.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 210,
      "prompt": "Tình huống Có thể được trích chọn bằng các toán tử như gradient, la bàn hoặc Laplace để hỗ trợ nhận dạng tương ứng với khái niệm nào?",
      "options": [
        "Phân loại không có mẫu",
        "Đặc điểm biên",
        "Ảnh số",
        "Nắn chỉnh biến dạng"
      ],
      "answer": 1,
      "explanation": "Đặc điểm biên: Có thể được trích chọn bằng các toán tử như gradient, la bàn hoặc Laplace để hỗ trợ nhận dạng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 211,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Hệ thống nhận dạng tự động trong môn xử lý ảnh?",
      "options": [
        "Khắc phục biến dạng do thiết bị quang học và điện tử bằng các phép chiếu dựa trên điểm điều khiển",
        "Thường cho khả năng nén cao hơn nhưng dữ liệu phục hồi không hoàn toàn giống ảnh gốc",
        "Gồm các khâu thu nhận và tiền xử lý, biểu diễn dữ liệu, nhận dạng và ra quyết định",
        "Các mẫu được nhóm thành lớp theo tiêu chuẩn đồng dạng khi lớp chưa được định danh trước"
      ],
      "answer": 2,
      "explanation": "Hệ thống nhận dạng tự động: Gồm các khâu thu nhận và tiền xử lý, biểu diễn dữ liệu, nhận dạng và ra quyết định.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 212,
      "prompt": "Nếu hệ thống phải Có thể được trích chọn bằng các toán tử như gradient, la bàn hoặc Laplace để hỗ trợ nhận dạng, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Nén ảnh",
        "Mức xám",
        "Ảnh số",
        "Đặc điểm biên"
      ],
      "answer": 3,
      "explanation": "Đặc điểm biên: Có thể được trích chọn bằng các toán tử như gradient, la bàn hoặc Laplace để hỗ trợ nhận dạng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 213,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Nén có bảo toàn thông tin trong môn xử lý ảnh?",
      "options": [
        "Cho phép phục hồi dữ liệu ảnh sau giải nén mà không làm mất thông tin gốc",
        "Nhóm các mức xám gần nhau thành một nhóm để giảm số mức biểu diễn",
        "Giảm không gian lưu trữ dữ liệu ảnh",
        "Ảnh số có thể được biểu diễn bằng một ma trận các điểm ảnh sau quá trình số hóa"
      ],
      "answer": 0,
      "explanation": "Nén có bảo toàn thông tin: Cho phép phục hồi dữ liệu ảnh sau giải nén mà không làm mất thông tin gốc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 214,
      "prompt": "Tình huống Biểu diễn cường độ sáng của điểm ảnh tương ứng với khái niệm nào?",
      "options": [
        "Nhiễu ngẫu nhiên",
        "Mức xám",
        "Pixel",
        "Nhiễu hệ thống"
      ],
      "answer": 1,
      "explanation": "Mức xám: Biểu diễn cường độ sáng của điểm ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 215,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Lấy mẫu trong môn xử lý ảnh?",
      "options": [
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận",
        "Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc",
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn"
      ],
      "answer": 2,
      "explanation": "Lấy mẫu: Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 216,
      "prompt": "Một bài toán có yêu cầu Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "RAW",
        "Lọc Bayer",
        "CMYK",
        "Lượng tử hóa"
      ],
      "answer": 3,
      "explanation": "Lượng tử hóa: Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 217,
      "prompt": "Khi ôn tập về Mô hình Raster, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn",
        "Ảnh có nhiều mức cường độ sáng từ tối đến sáng",
        "Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc",
        "Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector"
      ],
      "answer": 0,
      "explanation": "Mô hình Raster: Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 218,
      "prompt": "Nếu hệ thống phải Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Thiết bị thu nhận ảnh Raster",
        "Mô hình Raster",
        "Lọc Bayer",
        "Độ phân giải ảnh"
      ],
      "answer": 1,
      "explanation": "Mô hình Raster: Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 219,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Mô hình Vector trong môn xử lý ảnh?",
      "options": [
        "Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ",
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh"
      ],
      "answer": 2,
      "explanation": "Mô hình Vector: Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 220,
      "prompt": "Một bài toán có yêu cầu Ảnh chỉ có hai mức biểu diễn. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "RAW",
        "CMYK",
        "PCX",
        "Ảnh nhị phân"
      ],
      "answer": 3,
      "explanation": "Ảnh nhị phân: Ảnh chỉ có hai mức biểu diễn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 221,
      "prompt": "Khi ôn tập về Ảnh màu RGB, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng",
        "Định dạng ảnh có sử dụng mã hóa loạt dài trong lưu trữ dữ liệu ảnh",
        "Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận",
        "Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng"
      ],
      "answer": 0,
      "explanation": "Ảnh màu RGB: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 222,
      "prompt": "Nếu hệ thống phải Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Nội suy màu Bayer",
        "Ảnh màu RGB",
        "Thiết bị thu nhận ảnh Raster",
        "Lọc Bayer"
      ],
      "answer": 1,
      "explanation": "Ảnh màu RGB: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 223,
      "prompt": "Khi ôn tập về Three-CCD, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ",
        "Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận",
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh"
      ],
      "answer": 2,
      "explanation": "Three-CCD: Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 224,
      "prompt": "Nếu hệ thống phải Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "TIFF",
        "Lấy mẫu",
        "BMP",
        "Three-CCD"
      ],
      "answer": 3,
      "explanation": "Three-CCD: Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 225,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Mô hình CMY trong môn xử lý ảnh?",
      "options": [
        "Mô hình màu liên hệ với RGB theo nguyên tắc bù màu",
        "Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB",
        "Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector",
        "Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng"
      ],
      "answer": 0,
      "explanation": "Mô hình CMY: Mô hình màu liên hệ với RGB theo nguyên tắc bù màu.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 226,
      "prompt": "Một bài toán có yêu cầu Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Định lý lấy mẫu",
        "Mô hình HSV",
        "Nội suy màu Bayer",
        "Lấy mẫu"
      ],
      "answer": 1,
      "explanation": "Mô hình HSV: Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 227,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Mô hình HSL trong môn xử lý ảnh?",
      "options": [
        "Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn",
        "Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình",
        "Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng",
        "Mô hình màu liên hệ với RGB theo nguyên tắc bù màu"
      ],
      "answer": 2,
      "explanation": "Mô hình HSL: Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 228,
      "prompt": "Tình huống Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian tương ứng với khái niệm nào?",
      "options": [
        "Lọc Bayer",
        "BMP",
        "Nửa cường độ",
        "Độ phân giải ảnh"
      ],
      "answer": 3,
      "explanation": "Độ phân giải ảnh: Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 229,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho TIFF trong môn xử lý ảnh?",
      "options": [
        "Định dạng ảnh hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu",
        "Camera và scanner là các thiết bị thu nhận ảnh Raster thông dụng",
        "Ảnh chỉ có hai mức biểu diễn",
        "Mô hình màu liên hệ với RGB theo nguyên tắc bù màu"
      ],
      "answer": 0,
      "explanation": "TIFF: Định dạng ảnh hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 230,
      "prompt": "Nếu hệ thống phải Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Thiết bị thu nhận ảnh Raster",
        "Độ phân giải ảnh",
        "Ảnh mức xám",
        "Thiết bị thu nhận ảnh Vector"
      ],
      "answer": 1,
      "explanation": "Độ phân giải ảnh: Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 231,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Phối màu cộng trong môn xử lý ảnh?",
      "options": [
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh",
        "Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB",
        "Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc"
      ],
      "answer": 2,
      "explanation": "Phối màu cộng: Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 232,
      "prompt": "Một bài toán có yêu cầu Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Lấy mẫu",
        "TIFF",
        "PCX",
        "Phối màu trừ"
      ],
      "answer": 3,
      "explanation": "Phối màu trừ: Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 233,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho CMYK trong môn xử lý ảnh?",
      "options": [
        "Mở rộng mô hình CMY bằng thành phần đen để phù hợp hơn với quá trình in",
        "Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh",
        "Mô hình màu liên hệ với RGB theo nguyên tắc bù màu"
      ],
      "answer": 0,
      "explanation": "CMYK: Mở rộng mô hình CMY bằng thành phần đen để phù hợp hơn với quá trình in.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 234,
      "prompt": "Tình huống Kỹ thuật in tạo cảm giác nhiều mức xám bằng cách thay đổi mật độ các điểm in tương ứng với khái niệm nào?",
      "options": [
        "Độ phân giải ảnh",
        "Nửa cường độ",
        "Mô hình Vector",
        "TIFF"
      ],
      "answer": 1,
      "explanation": "Nửa cường độ: Kỹ thuật in tạo cảm giác nhiều mức xám bằng cách thay đổi mật độ các điểm in.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 235,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho RAW trong môn xử lý ảnh?",
      "options": [
        "Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh",
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn",
        "Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh"
      ],
      "answer": 2,
      "explanation": "RAW: Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 236,
      "prompt": "Nếu hệ thống phải Kỹ thuật in tạo cảm giác nhiều mức xám bằng cách thay đổi mật độ các điểm in, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Lọc Bayer",
        "BMP",
        "TIFF",
        "Nửa cường độ"
      ],
      "answer": 3,
      "explanation": "Nửa cường độ: Kỹ thuật in tạo cảm giác nhiều mức xám bằng cách thay đổi mật độ các điểm in.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 237,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Nội suy màu Bayer trong môn xử lý ảnh?",
      "options": [
        "Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận",
        "Tạo màu bằng cách cộng các thành phần ánh sáng và là nguyên lý của mô hình RGB",
        "Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh",
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy"
      ],
      "answer": 0,
      "explanation": "Nội suy màu Bayer: Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 238,
      "prompt": "Để thực hiện nhiệm vụ Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc, phương án nào phù hợp nhất?",
      "options": [
        "Mô hình Vector",
        "Lấy mẫu",
        "Lượng tử hóa",
        "PCX"
      ],
      "answer": 1,
      "explanation": "Lấy mẫu: Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 239,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Thiết bị thu nhận ảnh Vector trong môn xử lý ảnh?",
      "options": [
        "Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh",
        "Định dạng ảnh có sử dụng mã hóa loạt dài trong lưu trữ dữ liệu ảnh",
        "Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector",
        "Dữ liệu ảnh thô lưu thông tin thu nhận trực tiếp với mức xử lý tối thiểu trước khi hậu kỳ"
      ],
      "answer": 2,
      "explanation": "Thiết bị thu nhận ảnh Vector: Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 240,
      "prompt": "Tình huống Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc tương ứng với khái niệm nào?",
      "options": [
        "PCX",
        "TIFF",
        "BMP",
        "Lấy mẫu"
      ],
      "answer": 3,
      "explanation": "Lấy mẫu: Biến tín hiệu quang liên tục thành tín hiệu điện được lấy tại các vị trí rời rạc.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 241,
      "prompt": "Khi ôn tập về Lượng tử hóa, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ",
        "Mở rộng mô hình CMY bằng thành phần đen để phù hợp hơn với quá trình in",
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Ảnh có nhiều mức cường độ sáng từ tối đến sáng"
      ],
      "answer": 0,
      "explanation": "Lượng tử hóa: Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 242,
      "prompt": "Một bài toán có yêu cầu Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Lượng tử hóa",
        "Định lý lấy mẫu",
        "Nội suy màu Bayer",
        "Thiết bị thu nhận ảnh Raster"
      ],
      "answer": 1,
      "explanation": "Định lý lấy mẫu: Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 243,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Mô hình Raster?",
      "options": [
        "Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ",
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn",
        "Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn",
        "Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình"
      ],
      "answer": 2,
      "explanation": "Mô hình Raster: Biểu diễn ảnh bằng ma trận các điểm ảnh và thuận lợi cho hiển thị, in ấn.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 244,
      "prompt": "Nếu hệ thống phải Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "TIFF",
        "Ảnh mức xám",
        "PCX",
        "Mô hình Vector"
      ],
      "answer": 3,
      "explanation": "Mô hình Vector: Biểu diễn bằng các đối tượng hình học và có thể phóng to mà không bị vỡ hình.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 245,
      "prompt": "Ý nghĩa nào sau đây gần nhất với Ảnh màu RGB?",
      "options": [
        "Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng",
        "Ước lượng các thành phần màu còn thiếu tại mỗi pixel dựa trên thông tin các pixel lân cận",
        "Mở rộng mô hình CMY bằng thành phần đen để phù hợp hơn với quá trình in",
        "Định dạng ảnh hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu"
      ],
      "answer": 0,
      "explanation": "Ảnh màu RGB: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 246,
      "prompt": "Một bài toán có yêu cầu Ảnh có nhiều mức cường độ sáng từ tối đến sáng. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Thiết bị thu nhận ảnh Vector",
        "Ảnh mức xám",
        "RAW",
        "Độ phân giải ảnh"
      ],
      "answer": 1,
      "explanation": "Ảnh mức xám: Ảnh có nhiều mức cường độ sáng từ tối đến sáng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 247,
      "prompt": "Trong các mô tả sau, mô tả nào đúng với Ảnh màu RGB?",
      "options": [
        "Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian",
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng",
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn"
      ],
      "answer": 2,
      "explanation": "Ảnh màu RGB: Biểu diễn màu bằng ba thành phần đỏ, xanh lá và xanh dương theo phối màu cộng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 248,
      "prompt": "Một bài toán có yêu cầu Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Lấy mẫu",
        "RAW",
        "PCX",
        "Lọc Bayer"
      ],
      "answer": 3,
      "explanation": "Lọc Bayer: Dùng một cảm biến với bộ lọc màu và cần nội suy để khôi phục đủ thông tin màu cho mỗi điểm ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 249,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Three-CCD?",
      "options": [
        "Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy",
        "Mở rộng mô hình CMY bằng thành phần đen để phù hợp hơn với quá trình in",
        "Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ",
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn"
      ],
      "answer": 0,
      "explanation": "Three-CCD: Dùng ba cảm biến riêng cho ba thành phần màu để tăng chất lượng và giảm sai số nội suy.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 250,
      "prompt": "Nếu hệ thống phải Mô hình màu liên hệ với RGB theo nguyên tắc bù màu, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Phối màu cộng",
        "Mô hình CMY",
        "Thiết bị thu nhận ảnh Vector",
        "RAW"
      ],
      "answer": 1,
      "explanation": "Mô hình CMY: Mô hình màu liên hệ với RGB theo nguyên tắc bù màu.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 251,
      "prompt": "Khi ôn tập về Mô hình HSV, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian",
        "Biến giá trị biên độ liên tục sau lấy mẫu thành các mức rời rạc hữu hạn để lưu trữ",
        "Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng",
        "Tạo màu bằng cách hấp thụ bớt thành phần ánh sáng và được dùng trong các mô hình phục vụ in ấn"
      ],
      "answer": 2,
      "explanation": "Mô hình HSV: Biểu diễn màu theo sắc độ, độ bão hòa và giá trị sáng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 252,
      "prompt": "Nếu hệ thống phải Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "CMYK",
        "Three-CCD",
        "TIFF",
        "Mô hình HSL"
      ],
      "answer": 3,
      "explanation": "Mô hình HSL: Biểu diễn màu theo sắc độ, độ bão hòa và độ sáng.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 253,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho BMP trong môn xử lý ảnh?",
      "options": [
        "Định dạng ảnh bitmap lưu dữ liệu ảnh theo cấu trúc điểm ảnh",
        "Sensor hoặc bàn số hóa có thể tạo dữ liệu Vector",
        "Ảnh chỉ có hai mức biểu diễn",
        "Tần số lấy mẫu theo mỗi chiều phải ít nhất gấp đôi tần số cao nhất của tín hiệu để có thể tái tạo ảnh"
      ],
      "answer": 0,
      "explanation": "BMP: Định dạng ảnh bitmap lưu dữ liệu ảnh theo cấu trúc điểm ảnh.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 254,
      "prompt": "Để thực hiện nhiệm vụ Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian, phương án nào phù hợp nhất?",
      "options": [
        "Thiết bị thu nhận ảnh Vector",
        "Độ phân giải ảnh",
        "Nửa cường độ",
        "Thiết bị thu nhận ảnh Raster"
      ],
      "answer": 1,
      "explanation": "Độ phân giải ảnh: Liên quan đến số lượng điểm ảnh dùng để biểu diễn ảnh theo các chiều không gian.",
      "topic": "Cơ bản và màu sắc"
    },
    {
      "id": 255,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Histogram trong môn xử lý ảnh?",
      "options": [
        "Phân chia giá trị điểm ảnh theo một ngưỡng để tạo các nhóm mức xám khác nhau",
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm",
        "Biểu diễn số điểm ảnh tương ứng với từng mức xám",
        "Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu"
      ],
      "answer": 2,
      "explanation": "Histogram: Biểu diễn số điểm ảnh tương ứng với từng mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 256,
      "prompt": "Một bài toán có yêu cầu Phân bố lại mức xám để cải thiện độ tương phản của ảnh. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Giảm độ sáng",
        "Lọc trung bình",
        "Nhiễu Gaussian",
        "Cân bằng histogram"
      ],
      "answer": 3,
      "explanation": "Cân bằng histogram: Phân bố lại mức xám để cải thiện độ tương phản của ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 257,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Tìm ngưỡng tự động trong môn xử lý ảnh?",
      "options": [
        "Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công",
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn",
        "Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh",
        "Biểu diễn số điểm ảnh tương ứng với từng mức xám"
      ],
      "answer": 0,
      "explanation": "Tìm ngưỡng tự động: Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 258,
      "prompt": "Một bài toán có yêu cầu Biến đổi mức xám theo quan hệ nghịch đảo so với thang mức xám. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Dãn độ tương phản",
        "Ảnh âm bản",
        "Bó cụm mức xám",
        "Lọc đảo"
      ],
      "answer": 1,
      "explanation": "Ảnh âm bản: Biến đổi mức xám theo quan hệ nghịch đảo so với thang mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 259,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Dãn độ tương phản trong môn xử lý ảnh?",
      "options": [
        "Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét",
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối",
        "Thay điểm ảnh bằng trung vị của các giá trị trong cửa sổ lân cận và phù hợp với nhiễu xung"
      ],
      "answer": 2,
      "explanation": "Dãn độ tương phản: Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 260,
      "prompt": "Một bài toán có yêu cầu Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Tách ngưỡng",
        "Lọc Wiener",
        "Lọc trung vị",
        "Phép nhân chập"
      ],
      "answer": 3,
      "explanation": "Phép nhân chập: Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 261,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Lọc trung vị trong môn xử lý ảnh?",
      "options": [
        "Thay điểm ảnh bằng trung vị của các giá trị trong cửa sổ lân cận và phù hợp với nhiễu xung",
        "Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu",
        "Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu",
        "Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh"
      ],
      "answer": 0,
      "explanation": "Lọc trung vị: Thay điểm ảnh bằng trung vị của các giá trị trong cửa sổ lân cận và phù hợp với nhiễu xung.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 262,
      "prompt": "Một bài toán có yêu cầu Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Mặt phẳng bit cao",
        "Lọc trung bình",
        "Tìm ngưỡng tự động",
        "Tách ngưỡng"
      ],
      "answer": 1,
      "explanation": "Lọc trung bình: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 263,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Lọc trung bình theo k giá trị gần nhất trong môn xử lý ảnh?",
      "options": [
        "Khôi phục ảnh bằng cách bù trực tiếp hàm suy hao trong miền tần số khi điều kiện cho phép",
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét",
        "Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công"
      ],
      "answer": 2,
      "explanation": "Lọc trung bình theo k giá trị gần nhất: Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 264,
      "prompt": "Một bài toán có yêu cầu Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Lọc đảo",
        "Histogram",
        "Lọc Wiener",
        "Khôi phục ảnh"
      ],
      "answer": 3,
      "explanation": "Khôi phục ảnh: Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 265,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Nhiễu muối tiêu trong môn xử lý ảnh?",
      "options": [
        "Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh",
        "Cộng một hằng số âm vào mức xám làm ảnh tối hơn",
        "Phân chia giá trị điểm ảnh theo một ngưỡng để tạo các nhóm mức xám khác nhau",
        "Phân bố lại mức xám để cải thiện độ tương phản của ảnh"
      ],
      "answer": 0,
      "explanation": "Nhiễu muối tiêu: Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 266,
      "prompt": "Một bài toán có yêu cầu Nhiễu có biên độ tuân theo phân bố Gaussian. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Tìm ngưỡng tự động",
        "Nhiễu Gaussian",
        "Lọc trung bình theo k giá trị gần nhất",
        "Lọc trung vị"
      ],
      "answer": 1,
      "explanation": "Nhiễu Gaussian: Nhiễu có biên độ tuân theo phân bố Gaussian.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 267,
      "prompt": "Khi ôn tập về Trích chọn bit, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Khôi phục ảnh bằng cách bù trực tiếp hàm suy hao trong miền tần số khi điều kiện cho phép",
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm",
        "Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh",
        "Thay điểm ảnh bằng trung vị của các giá trị trong cửa sổ lân cận và phù hợp với nhiễu xung"
      ],
      "answer": 2,
      "explanation": "Trích chọn bit: Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 268,
      "prompt": "Nếu hệ thống phải Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Tách ngưỡng",
        "Histogram",
        "Tăng độ sáng",
        "Trích chọn bit"
      ],
      "answer": 3,
      "explanation": "Trích chọn bit: Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 269,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Mặt phẳng bit cao trong môn xử lý ảnh?",
      "options": [
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Khôi phục ảnh bằng cách bù trực tiếp hàm suy hao trong miền tần số khi điều kiện cho phép",
        "Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu",
        "Phân chia giá trị điểm ảnh theo một ngưỡng để tạo các nhóm mức xám khác nhau"
      ],
      "answer": 0,
      "explanation": "Mặt phẳng bit cao: Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 270,
      "prompt": "Nếu hệ thống phải Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Lọc trung bình theo k giá trị gần nhất",
        "Lọc giả đảo",
        "Dãn độ tương phản",
        "Histogram"
      ],
      "answer": 1,
      "explanation": "Lọc giả đảo: Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 271,
      "prompt": "Khi ôn tập về Lọc giả đảo, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh",
        "Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định",
        "Phân chia giá trị điểm ảnh theo một ngưỡng để tạo các nhóm mức xám khác nhau"
      ],
      "answer": 2,
      "explanation": "Lọc giả đảo: Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 272,
      "prompt": "Nếu hệ thống phải Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Khôi phục ảnh",
        "Histogram",
        "Lọc trung bình",
        "Mô hình suy giảm ảnh"
      ],
      "answer": 3,
      "explanation": "Mô hình suy giảm ảnh: Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 273,
      "prompt": "Khi ôn tập về Mô hình suy giảm ảnh, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu",
        "Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu",
        "Phân chia giá trị điểm ảnh theo một ngưỡng để tạo các nhóm mức xám khác nhau",
        "Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu"
      ],
      "answer": 0,
      "explanation": "Mô hình suy giảm ảnh: Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 274,
      "prompt": "Một bài toán có yêu cầu Cộng một hằng số dương vào mức xám làm ảnh sáng hơn. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Histogram",
        "Tăng độ sáng",
        "Dãn độ tương phản",
        "Cân bằng histogram"
      ],
      "answer": 1,
      "explanation": "Tăng độ sáng: Cộng một hằng số dương vào mức xám làm ảnh sáng hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 275,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Giảm độ sáng trong môn xử lý ảnh?",
      "options": [
        "Biến đổi mức xám theo quan hệ nghịch đảo so với thang mức xám",
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm",
        "Cộng một hằng số âm vào mức xám làm ảnh tối hơn",
        "Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối"
      ],
      "answer": 2,
      "explanation": "Giảm độ sáng: Cộng một hằng số âm vào mức xám làm ảnh tối hơn.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 276,
      "prompt": "Để thực hiện nhiệm vụ Phân bố lại mức xám để cải thiện độ tương phản của ảnh, phương án nào phù hợp nhất?",
      "options": [
        "Histogram",
        "Lọc giả đảo",
        "Bó cụm mức xám",
        "Cân bằng histogram"
      ],
      "answer": 3,
      "explanation": "Cân bằng histogram: Phân bố lại mức xám để cải thiện độ tương phản của ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 277,
      "prompt": "Trong các mô tả sau, mô tả nào đúng với Cân bằng histogram?",
      "options": [
        "Phân bố lại mức xám để cải thiện độ tương phản của ảnh",
        "Cộng một hằng số âm vào mức xám làm ảnh tối hơn",
        "Nhiễu có biên độ tuân theo phân bố Gaussian",
        "Phân chia giá trị điểm ảnh theo một ngưỡng để tạo các nhóm mức xám khác nhau"
      ],
      "answer": 0,
      "explanation": "Cân bằng histogram: Phân bố lại mức xám để cải thiện độ tương phản của ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 278,
      "prompt": "Tình huống Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công tương ứng với khái niệm nào?",
      "options": [
        "Lọc trung bình theo k giá trị gần nhất",
        "Tìm ngưỡng tự động",
        "Lọc trung bình",
        "Mô hình suy giảm ảnh"
      ],
      "answer": 1,
      "explanation": "Tìm ngưỡng tự động: Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 279,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Tìm ngưỡng tự động?",
      "options": [
        "Khôi phục ảnh bằng cách bù trực tiếp hàm suy hao trong miền tần số khi điều kiện cho phép",
        "Thay điểm ảnh bằng trung vị của các giá trị trong cửa sổ lân cận và phù hợp với nhiễu xung",
        "Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công",
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm"
      ],
      "answer": 2,
      "explanation": "Tìm ngưỡng tự động: Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 280,
      "prompt": "Tình huống Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối tương ứng với khái niệm nào?",
      "options": [
        "Tăng độ sáng",
        "Lọc trung vị",
        "Giảm độ sáng",
        "Dãn độ tương phản"
      ],
      "answer": 3,
      "explanation": "Dãn độ tương phản: Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 281,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Dãn độ tương phản?",
      "options": [
        "Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối",
        "Cộng một hằng số âm vào mức xám làm ảnh tối hơn",
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm",
        "Cộng một hằng số dương vào mức xám làm ảnh sáng hơn"
      ],
      "answer": 0,
      "explanation": "Dãn độ tương phản: Mở rộng dải mức xám để tăng khả năng phân biệt vùng sáng tối.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 282,
      "prompt": "Nếu hệ thống phải Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Tách ngưỡng",
        "Phép nhân chập",
        "Tìm ngưỡng tự động",
        "Lọc trung bình theo k giá trị gần nhất"
      ],
      "answer": 1,
      "explanation": "Phép nhân chập: Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 283,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Lọc trung bình?",
      "options": [
        "Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu",
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh",
        "Khôi phục ảnh bằng cách bù trực tiếp hàm suy hao trong miền tần số khi điều kiện cho phép"
      ],
      "answer": 2,
      "explanation": "Lọc trung bình: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 284,
      "prompt": "Tình huống Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh tương ứng với khái niệm nào?",
      "options": [
        "Tăng độ sáng",
        "Histogram",
        "Giảm độ sáng",
        "Lọc trung bình"
      ],
      "answer": 3,
      "explanation": "Lọc trung bình: Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 285,
      "prompt": "Khi ôn tập về Lọc trung bình theo k giá trị gần nhất, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét",
        "Kết hợp vùng lân cận của ảnh với một mặt nạ lọc để tạo giá trị đầu ra",
        "Biểu diễn số điểm ảnh tương ứng với từng mức xám",
        "Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh"
      ],
      "answer": 0,
      "explanation": "Lọc trung bình theo k giá trị gần nhất: Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 286,
      "prompt": "Nếu hệ thống phải Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Histogram",
        "Khôi phục ảnh",
        "Mặt phẳng bit cao",
        "Nhiễu muối tiêu"
      ],
      "answer": 1,
      "explanation": "Khôi phục ảnh: Ước lượng ảnh gốc từ ảnh bị suy giảm dựa trên mô hình suy hao và nhiễu.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 287,
      "prompt": "Khi ôn tập về Nhiễu muối tiêu, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh",
        "Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu",
        "Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh",
        "Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định"
      ],
      "answer": 2,
      "explanation": "Nhiễu muối tiêu: Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 288,
      "prompt": "Nếu hệ thống phải Nhiễu có biên độ tuân theo phân bố Gaussian, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Lọc giả đảo",
        "Tách ngưỡng",
        "Lọc đảo",
        "Nhiễu Gaussian"
      ],
      "answer": 3,
      "explanation": "Nhiễu Gaussian: Nhiễu có biên độ tuân theo phân bố Gaussian.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 289,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Bó cụm mức xám trong môn xử lý ảnh?",
      "options": [
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm",
        "Tính trung bình trên k giá trị trong lân cận có mức xám gần với điểm đang xét",
        "Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu",
        "Thay điểm ảnh bằng giá trị trung bình của vùng lân cận để làm trơn ảnh"
      ],
      "answer": 0,
      "explanation": "Bó cụm mức xám: Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 290,
      "prompt": "Tình huống Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh tương ứng với khái niệm nào?",
      "options": [
        "Tăng độ sáng",
        "Trích chọn bit",
        "Mô hình suy giảm ảnh",
        "Lọc trung bình theo k giá trị gần nhất"
      ],
      "answer": 1,
      "explanation": "Trích chọn bit: Tách các mặt phẳng bit của ảnh để phân tích mức đóng góp của từng bit vào thông tin ảnh.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 291,
      "prompt": "Khi ôn tập về Mặt phẳng bit cao, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu",
        "Nhóm các mức xám gần nhau để giảm số mức biểu diễn hoặc làm nổi bật vùng giá trị quan tâm",
        "Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám",
        "Xác định ngưỡng dựa trên đặc trưng phân bố mức xám thay vì chọn hoàn toàn thủ công"
      ],
      "answer": 2,
      "explanation": "Mặt phẳng bit cao: Thường chứa phần lớn thông tin hình dạng và cấu trúc quan trọng của ảnh mức xám.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 292,
      "prompt": "Khi quan sát thấy yêu cầu Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu, nội dung nào liên quan trực tiếp?",
      "options": [
        "Bó cụm mức xám",
        "Lọc đảo",
        "Giảm độ sáng",
        "Mô hình suy giảm ảnh"
      ],
      "answer": 3,
      "explanation": "Mô hình suy giảm ảnh: Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 293,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Lọc giả đảo?",
      "options": [
        "Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định",
        "Nhiễu xung tạo ra các điểm rất sáng hoặc rất tối rải rác trên ảnh",
        "Biểu diễn ảnh quan sát như kết quả của ảnh gốc qua hệ suy hao kết hợp với nhiễu",
        "Biểu diễn số điểm ảnh tương ứng với từng mức xám"
      ],
      "answer": 0,
      "explanation": "Lọc giả đảo: Hạn chế ảnh hưởng của các thành phần làm phép đảo trở nên không ổn định.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 294,
      "prompt": "Một bài toán có yêu cầu Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Tăng độ sáng",
        "Lọc Wiener",
        "Lọc đảo",
        "Phép nhân chập"
      ],
      "answer": 1,
      "explanation": "Lọc Wiener: Khôi phục ảnh theo tiêu chuẩn giảm sai số trung bình bình phương khi xét cả suy hao và nhiễu.",
      "topic": "Tăng cường và khôi phục ảnh"
    },
    {
      "id": 295,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Prewitt trong môn xử lý ảnh?",
      "options": [
        "Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm",
        "Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny",
        "Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm"
      ],
      "answer": 2,
      "explanation": "Prewitt: Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 296,
      "prompt": "Nếu hệ thống phải Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Láng giềng 4",
        "Phép co ảnh",
        "Láng giềng 8",
        "Toán tử la bàn"
      ],
      "answer": 3,
      "explanation": "Toán tử la bàn: Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 297,
      "prompt": "Khi ôn tập về Toán tử la bàn, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau",
        "Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám",
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập"
      ],
      "answer": 0,
      "explanation": "Toán tử la bàn: Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 298,
      "prompt": "Một bài toán có yêu cầu Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Láng giềng 4",
        "Laplace",
        "Toán tử la bàn",
        "Canny"
      ],
      "answer": 1,
      "explanation": "Laplace: Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 299,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Canny trong môn xử lý ảnh?",
      "options": [
        "Nhạy với bước nhảy mức xám và thường tạo đáp ứng biên dày hơn đạo hàm bậc hai",
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Phương pháp phát hiện biên nhiều bước nhằm tạo biên mảnh và liên tục hơn",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm"
      ],
      "answer": 2,
      "explanation": "Canny: Phương pháp phát hiện biên nhiều bước nhằm tạo biên mảnh và liên tục hơn.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 300,
      "prompt": "Một bài toán có yêu cầu Gồm các điểm lân cận trên, dưới, trái và phải của điểm đang xét. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Biên ảnh",
        "Canny",
        "Prewitt",
        "Láng giềng 4"
      ],
      "answer": 3,
      "explanation": "Láng giềng 4: Gồm các điểm lân cận trên, dưới, trái và phải của điểm đang xét.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 301,
      "prompt": "Khi ôn tập về Phép co ảnh, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc",
        "Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc"
      ],
      "answer": 0,
      "explanation": "Phép co ảnh: Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 302,
      "prompt": "Nếu hệ thống phải Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Trích biên hình thái",
        "Phép co ảnh",
        "Gradient",
        "Phần tử cấu trúc"
      ],
      "answer": 1,
      "explanation": "Phép co ảnh: Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 303,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Phép giãn ảnh trong môn xử lý ảnh?",
      "options": [
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc",
        "Làm mở rộng vùng đối tượng theo phần tử cấu trúc",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc"
      ],
      "answer": 2,
      "explanation": "Phép giãn ảnh: Làm mở rộng vùng đối tượng theo phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 304,
      "prompt": "Nếu hệ thống phải Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Prewitt",
        "Laplace",
        "Canny",
        "Phép đóng"
      ],
      "answer": 3,
      "explanation": "Phép đóng: Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 305,
      "prompt": "Khi ôn tập về Trích biên hình thái, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co",
        "Toán tử gradient có trọng số lớn hơn ở hàng hoặc cột giữa của mặt nạ",
        "Làm mở rộng vùng đối tượng theo phần tử cấu trúc",
        "Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám"
      ],
      "answer": 0,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 306,
      "prompt": "Nếu hệ thống phải Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Dò biên theo quy hoạch động",
        "Trích biên hình thái",
        "Phép đóng",
        "Phát hiện biên gián tiếp"
      ],
      "answer": 1,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 307,
      "prompt": "Khi ôn tập về Đạo hàm bậc hai, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny",
        "Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau",
        "Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn",
        "Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng"
      ],
      "answer": 2,
      "explanation": "Đạo hàm bậc hai: Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 308,
      "prompt": "Nếu hệ thống phải Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Phép giãn ảnh",
        "Phép đóng",
        "Phép mở",
        "Đạo hàm bậc hai"
      ],
      "answer": 3,
      "explanation": "Đạo hàm bậc hai: Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 309,
      "prompt": "Khi ôn tập về Ngưỡng kép Canny, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc",
        "Đạo hàm bậc nhất dùng để làm nổi bật sự thay đổi mức xám"
      ],
      "answer": 0,
      "explanation": "Ngưỡng kép Canny: Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 310,
      "prompt": "Nếu hệ thống phải Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Dò biên theo quy hoạch động",
        "Ngưỡng kép Canny",
        "Láng giềng 8",
        "Ức chế cực đại không"
      ],
      "answer": 1,
      "explanation": "Ngưỡng kép Canny: Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 311,
      "prompt": "Khi ôn tập về Phần tử cấu trúc, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Nhạy với bước nhảy mức xám và thường tạo đáp ứng biên dày hơn đạo hàm bậc hai",
        "Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng",
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh",
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc"
      ],
      "answer": 2,
      "explanation": "Phần tử cấu trúc: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 312,
      "prompt": "Nếu hệ thống phải Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Phép giãn ảnh",
        "Phép mở",
        "Láng giềng 4",
        "Phần tử cấu trúc"
      ],
      "answer": 3,
      "explanation": "Phần tử cấu trúc: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 313,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Trích biên trong trong môn xử lý ảnh?",
      "options": [
        "Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc",
        "Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm",
        "Làm mở rộng vùng đối tượng theo phần tử cấu trúc"
      ],
      "answer": 0,
      "explanation": "Trích biên trong: Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 314,
      "prompt": "Một bài toán có yêu cầu Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Canny",
        "Biên ảnh",
        "Phát hiện biên gián tiếp",
        "Đạo hàm bậc nhất"
      ],
      "answer": 1,
      "explanation": "Biên ảnh: Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 315,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Phát hiện biên trực tiếp trong môn xử lý ảnh?",
      "options": [
        "Phương pháp phát hiện biên nhiều bước nhằm tạo biên mảnh và liên tục hơn",
        "Vị trí có sự thay đổi đáng kể về mức xám và thường tạo ranh giới giữa các vùng",
        "Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm"
      ],
      "answer": 2,
      "explanation": "Phát hiện biên trực tiếp: Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 316,
      "prompt": "Một bài toán có yêu cầu Xác định biên từ ranh giới của các vùng sau khi phân vùng. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Trích biên hình thái",
        "Canny",
        "Trích biên trong",
        "Phát hiện biên gián tiếp"
      ],
      "answer": 3,
      "explanation": "Phát hiện biên gián tiếp: Xác định biên từ ranh giới của các vùng sau khi phân vùng.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 317,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Prewitt?",
      "options": [
        "Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng",
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co",
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co"
      ],
      "answer": 0,
      "explanation": "Prewitt: Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 318,
      "prompt": "Tình huống Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng tương ứng với khái niệm nào?",
      "options": [
        "Ngưỡng kép Canny",
        "Prewitt",
        "Phát hiện biên gián tiếp",
        "Sobel"
      ],
      "answer": 1,
      "explanation": "Prewitt: Toán tử gradient sử dụng các mặt nạ xấp xỉ đạo hàm theo hai hướng.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 319,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Sobel trong môn xử lý ảnh?",
      "options": [
        "Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny",
        "Nhạy với bước nhảy mức xám và thường tạo đáp ứng biên dày hơn đạo hàm bậc hai",
        "Toán tử gradient có trọng số lớn hơn ở hàng hoặc cột giữa của mặt nạ",
        "Tìm đường biên tối ưu dựa trên một hàm chi phí và quan hệ lân cận giữa các điểm"
      ],
      "answer": 2,
      "explanation": "Sobel: Toán tử gradient có trọng số lớn hơn ở hàng hoặc cột giữa của mặt nạ.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 320,
      "prompt": "Tình huống Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau tương ứng với khái niệm nào?",
      "options": [
        "Prewitt",
        "Canny",
        "Phép co ảnh",
        "Toán tử la bàn"
      ],
      "answer": 3,
      "explanation": "Toán tử la bàn: Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 321,
      "prompt": "Khi ôn tập về Laplace, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc",
        "Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc",
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh"
      ],
      "answer": 0,
      "explanation": "Laplace: Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 322,
      "prompt": "Tình huống Gồm các điểm lân cận trên, dưới, trái và phải của điểm đang xét tương ứng với khái niệm nào?",
      "options": [
        "Phát hiện biên trực tiếp",
        "Láng giềng 4",
        "Trích biên hình thái",
        "Gradient"
      ],
      "answer": 1,
      "explanation": "Láng giềng 4: Gồm các điểm lân cận trên, dưới, trái và phải của điểm đang xét.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 323,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Láng giềng 4?",
      "options": [
        "Phương pháp phát hiện biên nhiều bước nhằm tạo biên mảnh và liên tục hơn",
        "Phát hiện biên dựa trên biến thiên mức xám, thường thông qua đạo hàm",
        "Gồm các điểm lân cận trên, dưới, trái và phải của điểm đang xét",
        "Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên"
      ],
      "answer": 2,
      "explanation": "Láng giềng 4: Gồm các điểm lân cận trên, dưới, trái và phải của điểm đang xét.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 324,
      "prompt": "Một bài toán có yêu cầu Bao gồm cả bốn hướng chéo ngoài bốn láng giềng trực giao. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Sobel",
        "Gradient",
        "Laplace",
        "Láng giềng 8"
      ],
      "answer": 3,
      "explanation": "Láng giềng 8: Bao gồm cả bốn hướng chéo ngoài bốn láng giềng trực giao.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 325,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Phép co ảnh?",
      "options": [
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny",
        "Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co",
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh"
      ],
      "answer": 0,
      "explanation": "Phép co ảnh: Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 326,
      "prompt": "Nếu hệ thống phải Làm mở rộng vùng đối tượng theo phần tử cấu trúc, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Dò biên theo quy hoạch động",
        "Phép giãn ảnh",
        "Gradient",
        "Đạo hàm bậc hai"
      ],
      "answer": 1,
      "explanation": "Phép giãn ảnh: Làm mở rộng vùng đối tượng theo phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 327,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Phép mở trong môn xử lý ảnh?",
      "options": [
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co",
        "Có thể xác định bằng hiệu giữa ảnh gốc và ảnh sau phép co",
        "Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc",
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh"
      ],
      "answer": 2,
      "explanation": "Phép mở: Thực hiện co ảnh rồi giãn ảnh với cùng phần tử cấu trúc.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 328,
      "prompt": "Để thực hiện nhiệm vụ Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co, phương án nào phù hợp nhất?",
      "options": [
        "Đạo hàm bậc nhất",
        "Toán tử la bàn",
        "Sobel",
        "Trích biên hình thái"
      ],
      "answer": 3,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 329,
      "prompt": "Trong các mô tả sau, mô tả nào đúng với Trích biên hình thái?",
      "options": [
        "Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co",
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh",
        "Làm mở rộng vùng đối tượng theo phần tử cấu trúc",
        "Thực hiện giãn ảnh rồi co ảnh với cùng phần tử cấu trúc"
      ],
      "answer": 0,
      "explanation": "Trích biên hình thái: Có thể xác định biên từ hiệu giữa ảnh đã giãn và ảnh đã co.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 330,
      "prompt": "Một bài toán có yêu cầu Nhạy với bước nhảy mức xám và thường tạo đáp ứng biên dày hơn đạo hàm bậc hai. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Ức chế cực đại không",
        "Đạo hàm bậc nhất",
        "Dò biên theo quy hoạch động",
        "Prewitt"
      ],
      "answer": 1,
      "explanation": "Đạo hàm bậc nhất: Nhạy với bước nhảy mức xám và thường tạo đáp ứng biên dày hơn đạo hàm bậc hai.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 331,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Đạo hàm bậc hai?",
      "options": [
        "Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh",
        "Làm co vùng đối tượng và có thể loại bỏ chi tiết nhỏ so với phần tử cấu trúc",
        "Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn",
        "Nhạy với bước nhảy mức xám và thường tạo đáp ứng biên dày hơn đạo hàm bậc hai"
      ],
      "answer": 2,
      "explanation": "Đạo hàm bậc hai: Làm nổi chi tiết mịn và điểm cô lập nhưng thường nhạy với nhiễu hơn.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 332,
      "prompt": "Một bài toán có yêu cầu Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Gradient",
        "Ngưỡng kép Canny",
        "Láng giềng 8",
        "Ức chế cực đại không"
      ],
      "answer": 3,
      "explanation": "Ức chế cực đại không: Làm mảnh đáp ứng gradient bằng cách chỉ giữ cực đại cục bộ theo hướng biên trong Canny.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 333,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Ngưỡng kép Canny?",
      "options": [
        "Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên",
        "Dùng nhiều mặt nạ định hướng để phát hiện biên theo các hướng khác nhau",
        "Xác định biên từ ranh giới của các vùng sau khi phân vùng",
        "Toán tử đạo hàm bậc hai nhạy với chi tiết mịn và điểm cô lập"
      ],
      "answer": 0,
      "explanation": "Ngưỡng kép Canny: Dùng hai ngưỡng để phân biệt biên mạnh, biên yếu và hỗ trợ nối biên.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 334,
      "prompt": "Để thực hiện nhiệm vụ Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh, phương án nào phù hợp nhất?",
      "options": [
        "Phát hiện biên gián tiếp",
        "Phần tử cấu trúc",
        "Phép co ảnh",
        "Trích biên hình thái"
      ],
      "answer": 1,
      "explanation": "Phần tử cấu trúc: Mẫu hình học dùng để xác định cách phép toán hình thái tác động lên ảnh.",
      "topic": "Biên và hình thái học"
    },
    {
      "id": 335,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Thuật toán đẳng điệu trong môn xử lý ảnh?",
      "options": [
        "Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất",
        "Dựa vào đặc trưng texture để phân biệt các vùng có cấu trúc bề mặt khác nhau",
        "Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định",
        "Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất"
      ],
      "answer": 2,
      "explanation": "Thuật toán đẳng điệu: Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 336,
      "prompt": "Nếu hệ thống phải Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Phân vùng ảnh",
        "Kết cấu texture",
        "Tách vùng",
        "Thuật toán tam giác"
      ],
      "answer": 3,
      "explanation": "Thuật toán tam giác: Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 337,
      "prompt": "Khi ôn tập về Thuật toán tam giác, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng",
        "Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất",
        "Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn",
        "Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt"
      ],
      "answer": 0,
      "explanation": "Thuật toán tam giác: Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 338,
      "prompt": "Khi quan sát thấy yêu cầu Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất, nội dung nào liên quan trực tiếp?",
      "options": [
        "Histogram hai đỉnh",
        "Phát triển vùng",
        "Đối xứng nền",
        "Thuật toán tam giác"
      ],
      "answer": 1,
      "explanation": "Phát triển vùng: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 339,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Tách vùng trong môn xử lý ảnh?",
      "options": [
        "Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định",
        "Giảm dao động không cần thiết trên histogram trước khi xác định ngưỡng",
        "Chia một vùng chưa đồng nhất thành các vùng nhỏ hơn",
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh"
      ],
      "answer": 2,
      "explanation": "Tách vùng: Chia một vùng chưa đồng nhất thành các vùng nhỏ hơn.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 340,
      "prompt": "Nếu hệ thống phải Sử dụng thông tin đường biên để xác định ranh giới các vùng, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Thuật toán tam giác",
        "Phân vùng theo ngưỡng",
        "Phân vùng cục bộ",
        "Phân vùng dựa theo đường biên"
      ],
      "answer": 3,
      "explanation": "Phân vùng dựa theo đường biên: Sử dụng thông tin đường biên để xác định ranh giới các vùng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 341,
      "prompt": "Khi ôn tập về Phân vùng dựa theo đường biên, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Sử dụng thông tin đường biên để xác định ranh giới các vùng",
        "Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất",
        "Chia một vùng chưa đồng nhất thành các vùng nhỏ hơn",
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh"
      ],
      "answer": 0,
      "explanation": "Phân vùng dựa theo đường biên: Sử dụng thông tin đường biên để xác định ranh giới các vùng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 342,
      "prompt": "Tình huống Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất tương ứng với khái niệm nào?",
      "options": [
        "Phân vùng theo miền đồng nhất",
        "Phát triển vùng",
        "Tách vùng",
        "Histogram hai đỉnh"
      ],
      "answer": 1,
      "explanation": "Phát triển vùng: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 343,
      "prompt": "Nhận định nào dưới đây phù hợp với khái niệm Phát triển vùng?",
      "options": [
        "Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng",
        "Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn",
        "Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất",
        "Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng"
      ],
      "answer": 2,
      "explanation": "Phát triển vùng: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 344,
      "prompt": "Một bài toán có yêu cầu Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Phân vùng toàn thể",
        "Kết cấu texture",
        "Phân vùng cục bộ",
        "Tiêu chuẩn đồng nhất"
      ],
      "answer": 3,
      "explanation": "Tiêu chuẩn đồng nhất: Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 345,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Histogram hai đỉnh trong môn xử lý ảnh?",
      "options": [
        "Thường gợi ý khả năng tồn tại hai nhóm mức xám tương ứng gần với nền và đối tượng",
        "Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng",
        "Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất",
        "Giảm dao động không cần thiết trên histogram trước khi xác định ngưỡng"
      ],
      "answer": 0,
      "explanation": "Histogram hai đỉnh: Thường gợi ý khả năng tồn tại hai nhóm mức xám tương ứng gần với nền và đối tượng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 346,
      "prompt": "Một bài toán có yêu cầu Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Đối xứng nền",
        "Kết cấu texture",
        "Histogram hai đỉnh",
        "Phân vùng theo miền đồng nhất"
      ],
      "answer": 1,
      "explanation": "Kết cấu texture: Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 347,
      "prompt": "Khi ôn tập về Phân vùng cục bộ, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất",
        "Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn",
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh",
        "Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất"
      ],
      "answer": 2,
      "explanation": "Phân vùng cục bộ: Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 348,
      "prompt": "Nếu hệ thống phải Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Hợp vùng",
        "Tách vùng",
        "Đối xứng nền",
        "Phân vùng cục bộ"
      ],
      "answer": 3,
      "explanation": "Phân vùng cục bộ: Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 349,
      "prompt": "Khi ôn tập về Phân vùng theo ngưỡng, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám",
        "Dựa trên thông tin của toàn ảnh, ví dụ histogram",
        "Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn",
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh"
      ],
      "answer": 0,
      "explanation": "Phân vùng theo ngưỡng: Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 350,
      "prompt": "Nếu hệ thống phải Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Phân vùng theo kết cấu bề mặt",
        "Phân vùng theo ngưỡng",
        "Kết cấu texture",
        "Phân vùng dựa theo đường biên"
      ],
      "answer": 1,
      "explanation": "Phân vùng theo ngưỡng: Phân biệt vùng đối tượng và nền dựa trên một hoặc nhiều ngưỡng mức xám.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 351,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Làm trơn histogram trong môn xử lý ảnh?",
      "options": [
        "Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng",
        "Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất",
        "Giảm dao động không cần thiết trên histogram trước khi xác định ngưỡng",
        "Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt"
      ],
      "answer": 2,
      "explanation": "Làm trơn histogram: Giảm dao động không cần thiết trên histogram trước khi xác định ngưỡng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 352,
      "prompt": "Nếu hệ thống phải Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Tách vùng",
        "Phát triển vùng",
        "Hợp vùng",
        "Thuật toán đẳng điệu"
      ],
      "answer": 3,
      "explanation": "Thuật toán đẳng điệu: Lặp việc ước lượng hai nhóm mức xám và cập nhật ngưỡng cho đến khi ổn định.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 353,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Đối xứng nền trong môn xử lý ảnh?",
      "options": [
        "Ước lượng ngưỡng dựa trên tính đối xứng của phân bố mức xám thuộc nền",
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh",
        "Sử dụng thông tin đường biên để xác định ranh giới các vùng",
        "Dựa vào đặc trưng texture để phân biệt các vùng có cấu trúc bề mặt khác nhau"
      ],
      "answer": 0,
      "explanation": "Đối xứng nền: Ước lượng ngưỡng dựa trên tính đối xứng của phân bố mức xám thuộc nền.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 354,
      "prompt": "Tình huống Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng tương ứng với khái niệm nào?",
      "options": [
        "Phân vùng theo kết cấu bề mặt",
        "Thuật toán tam giác",
        "Phân vùng dựa theo đường biên",
        "Tách vùng"
      ],
      "answer": 1,
      "explanation": "Thuật toán tam giác: Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 355,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Phân vùng theo miền đồng nhất trong môn xử lý ảnh?",
      "options": [
        "Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng",
        "Xác định ngưỡng dựa trên hình học của histogram và khoảng cách đến đường nối đặc trưng",
        "Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất",
        "Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt"
      ],
      "answer": 2,
      "explanation": "Phân vùng theo miền đồng nhất: Hình thành vùng từ các điểm có thuộc tính gần nhau theo tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 356,
      "prompt": "Một bước xử lý có chức năng Sử dụng thông tin đường biên để xác định ranh giới các vùng. Đó là kỹ thuật nào?",
      "options": [
        "Hợp vùng",
        "Tách vùng",
        "Làm trơn histogram",
        "Phân vùng dựa theo đường biên"
      ],
      "answer": 3,
      "explanation": "Phân vùng dựa theo đường biên: Sử dụng thông tin đường biên để xác định ranh giới các vùng.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 357,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Hợp vùng trong môn xử lý ảnh?",
      "options": [
        "Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất",
        "Dựa trên thông tin của toàn ảnh, ví dụ histogram",
        "Dựa chủ yếu trên thông tin trong lân cận của điểm ảnh",
        "Ước lượng ngưỡng dựa trên tính đối xứng của phân bố mức xám thuộc nền"
      ],
      "answer": 0,
      "explanation": "Hợp vùng: Ghép các vùng lân cận nếu chúng thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 358,
      "prompt": "Một bước xử lý có chức năng Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn. Đó là kỹ thuật nào?",
      "options": [
        "Tách vùng",
        "Tiêu chuẩn đồng nhất",
        "Phân vùng theo miền đồng nhất",
        "Phân vùng theo kết cấu bề mặt"
      ],
      "answer": 1,
      "explanation": "Tiêu chuẩn đồng nhất: Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 359,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Phân vùng theo kết cấu bề mặt trong môn xử lý ảnh?",
      "options": [
        "Quy định khi nào các điểm hoặc vùng có thể được xem là cùng một vùng trong quá trình phân đoạn",
        "Chia ảnh thành các vùng sao cho mỗi vùng chứa đối tượng hoặc nhóm đối tượng có tính chất tương đồng",
        "Dựa vào đặc trưng texture để phân biệt các vùng có cấu trúc bề mặt khác nhau",
        "Mô tả sự sắp xếp và biến thiên cục bộ của mức xám, hữu ích khi phân vùng các bề mặt"
      ],
      "answer": 2,
      "explanation": "Phân vùng theo kết cấu bề mặt: Dựa vào đặc trưng texture để phân biệt các vùng có cấu trúc bề mặt khác nhau.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 360,
      "prompt": "Để thực hiện nhiệm vụ Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất, phương án nào phù hợp nhất?",
      "options": [
        "Đối xứng nền",
        "Tách vùng",
        "Hợp vùng",
        "Phát triển vùng"
      ],
      "answer": 3,
      "explanation": "Phát triển vùng: Bắt đầu từ các điểm hạt giống rồi bổ sung các điểm lân cận thỏa tiêu chuẩn đồng nhất.",
      "topic": "Phân vùng ảnh"
    },
    {
      "id": 361,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho K-means trong môn xử lý ảnh?",
      "options": [
        "Phân đối tượng vào K cụm bằng cách lặp gán điểm tới tâm gần nhất và cập nhật tâm",
        "Tạo lớp mới từ phần tử xa nhất khi khoảng cách vượt điều kiện ngưỡng",
        "Mạng Hopfield trong bài giảng sử dụng các giá trị đầu vào -1 và 1",
        "Tại một thời điểm chọn nơron có vector trọng số gần đầu vào nhất rồi hiệu chỉnh vùng lân cận"
      ],
      "answer": 0,
      "explanation": "K-means: Phân đối tượng vào K cụm bằng cách lặp gán điểm tới tâm gần nhất và cập nhật tâm.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 362,
      "prompt": "Tình huống Gán lớp theo lớp chiếm đa số trong số K mẫu gần nhất của đối tượng cần nhận dạng tương ứng với khái niệm nào?",
      "options": [
        "Khoảng cách Euclidean",
        "K láng giềng",
        "ISODATA",
        "Nhận dạng cấu trúc"
      ],
      "answer": 1,
      "explanation": "K láng giềng: Gán lớp theo lớp chiếm đa số trong số K mẫu gần nhất của đối tượng cần nhận dạng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 363,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho ISODATA trong môn xử lý ảnh?",
      "options": [
        "Thường được dùng để xác định mẫu hoặc tâm cụm gần nhất trong không gian đặc trưng",
        "Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc",
        "Thuật toán phân cụm lặp có khả năng tách và gộp lớp theo các ngưỡng",
        "Bảo toàn tương đối quan hệ lân cận khi ánh xạ các vector đầu vào lên lưới nơron"
      ],
      "answer": 2,
      "explanation": "ISODATA: Thuật toán phân cụm lặp có khả năng tách và gộp lớp theo các ngưỡng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 364,
      "prompt": "Nếu hệ thống phải Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "K láng giềng",
        "Hàm phân lớp",
        "K-means",
        "Nhận dạng cấu trúc"
      ],
      "answer": 3,
      "explanation": "Nhận dạng cấu trúc: Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 365,
      "prompt": "Khi ôn tập về Nhận dạng cấu trúc, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc",
        "Mô tả mỗi đối tượng bằng một vector nhiều chiều, mỗi chiều là một đặc trưng",
        "Tại một thời điểm chọn nơron có vector trọng số gần đầu vào nhất rồi hiệu chỉnh vùng lân cận",
        "Quá trình gán đối tượng vào một lớp dựa trên mô hình biểu diễn, quy luật và mẫu chuẩn"
      ],
      "answer": 0,
      "explanation": "Nhận dạng cấu trúc: Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 366,
      "prompt": "Một bài toán có yêu cầu Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Học không giám sát",
        "Mạng Hopfield",
        "KNN có trọng số",
        "K-means"
      ],
      "answer": 1,
      "explanation": "Mạng Hopfield: Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 367,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Mạng Kohonen trong môn xử lý ảnh?",
      "options": [
        "Tại một thời điểm chọn nơron có vector trọng số gần đầu vào nhất rồi hiệu chỉnh vùng lân cận",
        "Bảo toàn tương đối quan hệ lân cận khi ánh xạ các vector đầu vào lên lưới nơron",
        "Bản đồ tự tổ chức ánh xạ các vector gần nhau vào các nơron lân cận",
        "Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu"
      ],
      "answer": 1,
      "explanation": "Mạng Kohonen: Bảo toàn tương đối quan hệ lân cận khi ánh xạ các vector đầu vào lên lưới nơron.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 368,
      "prompt": "Một bài toán có yêu cầu Là giá trị trung bình của các đối tượng đang được gán vào cụm tương ứng. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Mạng Hopfield",
        "K-means",
        "Hàm phân lớp",
        "Tâm cụm K-means"
      ],
      "answer": 3,
      "topic": "Nhận dạng ảnh",
      "explanation": "Tâm cụm K-means."
    },
    {
      "id": 369,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Khoảng cách Euclidean trong môn xử lý ảnh?",
      "options": [
        "Thường được dùng để xác định mẫu hoặc tâm cụm gần nhất trong không gian đặc trưng",
        "Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu",
        "Hàm hỗ trợ quyết định đối tượng thuộc lớp nào dựa trên giá trị các đặc trưng",
        "Biểu diễn đối tượng bằng quan hệ hoặc chuỗi ký hiệu và nhận dạng dựa trên quy tắc cấu trúc"
      ],
      "answer": 0,
      "explanation": "Khoảng cách Euclidean: Thường được dùng để xác định mẫu hoặc tâm cụm gần nhất trong không gian đặc trưng.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 370,
      "prompt": "Một bài toán có yêu cầu Giảm ảnh hưởng của các láng giềng ở xa bằng cách gán trọng số phụ thuộc khoảng cách. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "K-means",
        "KNN có trọng số",
        "Nhận dạng cấu trúc",
        "Tín hiệu lưỡng cực Hopfield"
      ],
      "answer": 1,
      "explanation": "KNN có trọng số: Giảm ảnh hưởng của các láng giềng ở xa bằng cách gán trọng số phụ thuộc khoảng cách.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 371,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Tín hiệu lưỡng cực Hopfield trong môn xử lý ảnh?",
      "options": [
        "Tại một thời điểm chọn nơron có vector trọng số gần đầu vào nhất rồi hiệu chỉnh vùng lân cận",
        "Thuật toán phân cụm lặp có khả năng tách và gộp lớp theo các ngưỡng",
        "Mạng Hopfield trong bài giảng sử dụng các giá trị đầu vào -1 và 1",
        "Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu"
      ],
      "answer": 2,
      "explanation": "Tín hiệu lưỡng cực Hopfield: Mạng Hopfield trong bài giảng sử dụng các giá trị đầu vào -1 và 1.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 372,
      "prompt": "Một bài toán có yêu cầu Tại một thời điểm chọn nơron có vector trọng số gần đầu vào nhất rồi hiệu chỉnh vùng lân cận. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Học có giám sát",
        "Nhận dạng ảnh",
        "Học không giám sát",
        "Học cạnh tranh Kohonen"
      ],
      "answer": 3,
      "explanation": "Học cạnh tranh Kohonen: Tại một thời điểm chọn nơron có vector trọng số gần đầu vào nhất rồi hiệu chỉnh vùng lân cận.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 373,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Bản đồ tự tổ chức trong môn xử lý ảnh?",
      "options": [
        "Bảo toàn tương đối quan hệ lân cận khi ánh xạ các vector đầu vào lên lưới nơron",
        "Giảm ảnh hưởng của các láng giềng ở xa bằng cách gán trọng số phụ thuộc khoảng cách",
        "Mạng một lớp liên kết đầy đủ dùng cơ chế tự kết hợp để hồi tưởng mẫu",
        "Thuật toán phân cụm lặp có khả năng tách và gộp lớp theo các ngưỡng"
      ],
      "answer": 0,
      "topic": "Nhận dạng ảnh",
      "explanation": "Bảo toàn tương đối quan hệ lân cận khi ánh xạ các vector đầu vào lên lưới nơron."
    },
    {
      "id": 374,
      "prompt": "Một bài toán có yêu cầu Quá trình gán đối tượng vào một lớp dựa trên mô hình biểu diễn, quy luật và mẫu chuẩn. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Học có giám sát",
        "Nhận dạng ảnh",
        "Nhận dạng cấu trúc",
        "K-means"
      ],
      "answer": 1,
      "explanation": "Nhận dạng ảnh: Quá trình gán đối tượng vào một lớp dựa trên mô hình biểu diễn, quy luật và mẫu chuẩn.",
      "topic": "Nhận dạng ảnh"
    },
    {
      "id": 375,
      "prompt": "Khi ôn tập về Từ điển LZW, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Mã đặc biệt dùng để kết thúc từ điển hiện tại và bắt đầu lại từ điển mới khi cần",
        "Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian",
        "Được mở rộng động khi xuất hiện các chuỗi mới trong dữ liệu đầu vào",
        "Xây dựng và mở rộng từ điển các chuỗi trong quá trình mã hóa mà không cần truyền từ điển hoàn chỉnh"
      ],
      "answer": 2,
      "explanation": "Từ điển LZW: Được mở rộng động khi xuất hiện các chuỗi mới trong dữ liệu đầu vào.",
      "topic": "Nén ảnh"
    },
    {
      "id": 376,
      "prompt": "Tình huống Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén tương ứng với khái niệm nào?",
      "options": [
        "DCT trong JPEG",
        "Nén không gian",
        "EOI trong LZW",
        "Độ dư thừa dữ liệu"
      ],
      "answer": 3,
      "explanation": "Độ dư thừa dữ liệu: Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén.",
      "topic": "Nén ảnh"
    },
    {
      "id": 377,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Tỷ lệ nén trong môn xử lý ảnh?",
      "options": [
        "Tỷ số giữa kích thước dữ liệu trước nén và kích thước dữ liệu sau nén",
        "Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian",
        "JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin",
        "Được xây dựng bằng cách lặp ghép hai nút có xác suất nhỏ nhất"
      ],
      "answer": 0,
      "explanation": "Tỷ lệ nén: Tỷ số giữa kích thước dữ liệu trước nén và kích thước dữ liệu sau nén.",
      "topic": "Nén ảnh"
    },
    {
      "id": 378,
      "prompt": "Nếu hệ thống phải Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "Giảm mẫu màu trong JPEG",
        "Độ dư thừa dữ liệu",
        "Nén có mất thông tin",
        "Mã hóa khối"
      ],
      "answer": 1,
      "explanation": "Độ dư thừa dữ liệu: Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén.",
      "topic": "Nén ảnh"
    },
    {
      "id": 379,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Mã hóa khối trong môn xử lý ảnh?",
      "options": [
        "Tỷ số giữa kích thước dữ liệu trước nén và kích thước dữ liệu sau nén",
        "Thay một chuỗi ký hiệu lặp liên tiếp bằng biểu diễn gồm độ dài loạt và ký hiệu",
        "Biểu diễn các khối dữ liệu bằng các từ mã tương ứng",
        "Mã hóa từng dòng bằng độ dài các chuỗi bit liên tiếp, thường bắt đầu từ số lượng bit 0"
      ],
      "answer": 2,
      "explanation": "Mã hóa khối: Biểu diễn các khối dữ liệu bằng các từ mã tương ứng.",
      "topic": "Nén ảnh"
    },
    {
      "id": 380,
      "prompt": "Một bài toán có yêu cầu Bao gồm các phương pháp mã hóa tương đối trực tiếp như RLE, Huffman và LZW. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Mã hóa khối",
        "Quét Zig-Zag",
        "LZW",
        "Nén thế hệ thứ nhất"
      ],
      "answer": 3,
      "explanation": "Nén thế hệ thứ nhất: Bao gồm các phương pháp mã hóa tương đối trực tiếp như RLE, Huffman và LZW.",
      "topic": "Nén ảnh"
    },
    {
      "id": 381,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Nén thế hệ thứ hai trong môn xử lý ảnh?",
      "options": [
        "Khai thác cấu trúc và mô hình ảnh ở mức cao hơn nhằm vượt giới hạn của các phương pháp truyền thống",
        "Biểu diễn ảnh ở nhiều mức kích thước bằng thành phần low-pass và các phần chi tiết high-pass",
        "Chuyển dữ liệu ảnh từ miền không gian sang miền tần số để tập trung năng lượng và thuận lợi loại bớt chi tiết",
        "Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian"
      ],
      "answer": 0,
      "explanation": "Nén thế hệ thứ hai: Khai thác cấu trúc và mô hình ảnh ở mức cao hơn nhằm vượt giới hạn của các phương pháp truyền thống.",
      "topic": "Nén ảnh"
    },
    {
      "id": 382,
      "prompt": "Một bài toán có yêu cầu Mã hóa từng dòng bằng độ dài các chuỗi bit liên tiếp, thường bắt đầu từ số lượng bit 0. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Nén không mất thông tin",
        "RLE cho ảnh nhị phân",
        "Giảm mẫu màu trong JPEG",
        "Quét Zig-Zag"
      ],
      "answer": 1,
      "explanation": "RLE cho ảnh nhị phân: Mã hóa từng dòng bằng độ dài các chuỗi bit liên tiếp, thường bắt đầu từ số lượng bit 0.",
      "topic": "Nén ảnh"
    },
    {
      "id": 383,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho RLE theo Gray code trong môn xử lý ảnh?",
      "options": [
        "Khai thác cấu trúc và mô hình ảnh ở mức cao hơn nhằm vượt giới hạn của các phương pháp truyền thống",
        "Chuyển dữ liệu ảnh từ miền không gian sang miền tần số để tập trung năng lượng và thuận lợi loại bớt chi tiết",
        "Có thể tạo nhiều đoạn lặp hơn vì các giá trị gần nhau trong Gray code chỉ khác nhau một bit",
        "Khai thác tính tự tương đồng của ảnh nhưng quá trình tìm phép biến đổi thường tốn thời gian mã hóa"
      ],
      "answer": 2,
      "explanation": "RLE theo Gray code: Có thể tạo nhiều đoạn lặp hơn vì các giá trị gần nhau trong Gray code chỉ khác nhau một bit.",
      "topic": "Nén ảnh"
    },
    {
      "id": 384,
      "prompt": "Một bài toán có yêu cầu Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "DCT trong JPEG",
        "Quét Zig-Zag",
        "Từ điển LZW",
        "Huffman thích nghi"
      ],
      "answer": 3,
      "explanation": "Huffman thích nghi: Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý.",
      "topic": "Nén ảnh"
    },
    {
      "id": 385,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Clear Code của LZW trong môn xử lý ảnh?",
      "options": [
        "Mã đặc biệt dùng để kết thúc từ điển hiện tại và bắt đầu lại từ điển mới khi cần",
        "Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý",
        "Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian",
        "Biến đổi ảnh sang miền khác trước khi lượng tử hoặc mã hóa các hệ số"
      ],
      "answer": 0,
      "explanation": "Clear Code của LZW: Mã đặc biệt dùng để kết thúc từ điển hiện tại và bắt đầu lại từ điển mới khi cần.",
      "topic": "Nén ảnh"
    },
    {
      "id": 386,
      "prompt": "Một bài toán có yêu cầu Mã đặc biệt đánh dấu kết thúc thông tin. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Nén Fractal",
        "EOI trong LZW",
        "Huffman thích nghi",
        "Nén sử dụng biến đổi"
      ],
      "answer": 1,
      "explanation": "EOI trong LZW: Mã đặc biệt đánh dấu kết thúc thông tin.",
      "topic": "Nén ảnh"
    },
    {
      "id": 387,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Giới hạn từ điển LZW trong môn xử lý ảnh?",
      "options": [
        "Thay một chuỗi ký hiệu lặp liên tiếp bằng biểu diễn gồm độ dài loạt và ký hiệu",
        "Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý",
        "Từ điển trong bài giảng có tối đa 4096 phần tử nên từ mã lớn nhất dài 12 bit",
        "Chuyển dữ liệu ảnh từ miền không gian sang miền tần số để tập trung năng lượng và thuận lợi loại bớt chi tiết"
      ],
      "answer": 2,
      "explanation": "Giới hạn từ điển LZW: Từ điển trong bài giảng có tối đa 4096 phần tử nên từ mã lớn nhất dài 12 bit.",
      "topic": "Nén ảnh",
      "caution": "Giới hạn 4096 mã (12 bit) ứng với biến thể LZW nêu trong đề, không phải mọi cách triển khai LZW."
    },
    {
      "id": 388,
      "prompt": "Một bài toán có yêu cầu JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "LZW",
        "Mã Huffman",
        "Tỷ lệ nén",
        "Phân khối JPEG"
      ],
      "answer": 3,
      "explanation": "Phân khối JPEG: JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin.",
      "topic": "Nén ảnh"
    },
    {
      "id": 389,
      "prompt": "Khi ôn tập về Lượng tử hóa JPEG, nội dung nào cần được ghi nhớ là đúng?",
      "options": [
        "Chia các hệ số DCT cho ma trận lượng tử và làm tròn, khiến nhiều hệ số tần số cao trở thành 0",
        "Khai thác cấu trúc và mô hình ảnh ở mức cao hơn nhằm vượt giới hạn của các phương pháp truyền thống",
        "Sắp xếp các hệ số sau lượng tử theo thứ tự từ tần số thấp đến cao trước khi mã hóa",
        "Biến đổi ảnh sang miền khác trước khi lượng tử hoặc mã hóa các hệ số"
      ],
      "answer": 0,
      "explanation": "Lượng tử hóa JPEG: Chia các hệ số DCT cho ma trận lượng tử và làm tròn, khiến nhiều hệ số tần số cao trở thành 0.",
      "topic": "Nén ảnh"
    },
    {
      "id": 390,
      "prompt": "Nếu hệ thống phải Chia các hệ số DCT cho ma trận lượng tử và làm tròn, khiến nhiều hệ số tần số cao trở thành 0, lựa chọn nào nên được xem xét trước tiên?",
      "options": [
        "RLE cho ảnh nhị phân",
        "Lượng tử hóa JPEG",
        "Nén thế hệ thứ nhất",
        "Quét Zig-Zag"
      ],
      "answer": 1,
      "explanation": "Lượng tử hóa JPEG: Chia các hệ số DCT cho ma trận lượng tử và làm tròn, khiến nhiều hệ số tần số cao trở thành 0.",
      "topic": "Nén ảnh"
    },
    {
      "id": 391,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Quét Zig-Zag trong môn xử lý ảnh?",
      "options": [
        "Mã hóa từng dòng bằng độ dài các chuỗi bit liên tiếp, thường bắt đầu từ số lượng bit 0",
        "Xây dựng và mở rộng từ điển các chuỗi trong quá trình mã hóa mà không cần truyền từ điển hoàn chỉnh",
        "Sắp xếp các hệ số sau lượng tử theo thứ tự từ tần số thấp đến cao trước khi mã hóa",
        "Chuyển dữ liệu ảnh từ miền không gian sang miền tần số để tập trung năng lượng và thuận lợi loại bớt chi tiết"
      ],
      "answer": 2,
      "explanation": "Quét Zig-Zag: Sắp xếp các hệ số sau lượng tử theo thứ tự từ tần số thấp đến cao trước khi mã hóa.",
      "topic": "Nén ảnh"
    },
    {
      "id": 392,
      "prompt": "Một bài toán có yêu cầu Có thể giảm độ phân giải hai thành phần sắc độ vì mắt người nhạy với độ sáng hơn màu. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Độ dư thừa dữ liệu",
        "RLE theo Gray code",
        "Phân khối JPEG",
        "Giảm mẫu màu trong JPEG"
      ],
      "answer": 3,
      "explanation": "Giảm mẫu màu trong JPEG: Có thể giảm độ phân giải hai thành phần sắc độ vì mắt người nhạy với độ sáng hơn màu.",
      "topic": "Nén ảnh"
    },
    {
      "id": 393,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Kim tự tháp ảnh trong môn xử lý ảnh?",
      "options": [
        "Biểu diễn ảnh ở nhiều mức kích thước bằng thành phần low-pass và các phần chi tiết high-pass",
        "Khai thác cấu trúc và mô hình ảnh ở mức cao hơn nhằm vượt giới hạn của các phương pháp truyền thống",
        "Thay một chuỗi ký hiệu lặp liên tiếp bằng biểu diễn gồm độ dài loạt và ký hiệu",
        "Tỷ số giữa kích thước dữ liệu trước nén và kích thước dữ liệu sau nén"
      ],
      "answer": 0,
      "explanation": "Kim tự tháp ảnh: Biểu diễn ảnh ở nhiều mức kích thước bằng thành phần low-pass và các phần chi tiết high-pass.",
      "topic": "Nén ảnh"
    },
    {
      "id": 394,
      "prompt": "Một bài toán có yêu cầu Khai thác tính tự tương đồng của ảnh nhưng quá trình tìm phép biến đổi thường tốn thời gian mã hóa. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "LZW",
        "Nén Fractal",
        "Phân khối JPEG",
        "Huffman thích nghi"
      ],
      "answer": 1,
      "explanation": "Nén Fractal: Khai thác tính tự tương đồng của ảnh nhưng quá trình tìm phép biến đổi thường tốn thời gian mã hóa.",
      "topic": "Nén ảnh"
    },
    {
      "id": 395,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Nén không mất thông tin trong môn xử lý ảnh?",
      "options": [
        "Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén",
        "Tỷ số giữa kích thước dữ liệu trước nén và kích thước dữ liệu sau nén",
        "Sau giải nén có thể khôi phục chính xác dữ liệu gốc",
        "Sau giải nén không thu được hoàn toàn dữ liệu gốc nhưng thường đạt tỷ lệ nén cao hơn"
      ],
      "answer": 2,
      "explanation": "Nén không mất thông tin: Sau giải nén có thể khôi phục chính xác dữ liệu gốc.",
      "topic": "Nén ảnh"
    },
    {
      "id": 396,
      "prompt": "Một bài toán có yêu cầu Sau giải nén không thu được hoàn toàn dữ liệu gốc nhưng thường đạt tỷ lệ nén cao hơn. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Độ dư thừa dữ liệu",
        "Từ điển LZW",
        "Mã Huffman",
        "Nén có mất thông tin"
      ],
      "answer": 3,
      "explanation": "Nén có mất thông tin: Sau giải nén không thu được hoàn toàn dữ liệu gốc nhưng thường đạt tỷ lệ nén cao hơn.",
      "topic": "Nén ảnh"
    },
    {
      "id": 397,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Nén không gian trong môn xử lý ảnh?",
      "options": [
        "Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian",
        "Chuyển dữ liệu ảnh từ miền không gian sang miền tần số để tập trung năng lượng và thuận lợi loại bớt chi tiết",
        "Sau giải nén có thể khôi phục chính xác dữ liệu gốc",
        "JPEG thường chia ảnh thành các khối 8×8 trước khi biến đổi cosin"
      ],
      "answer": 0,
      "explanation": "Nén không gian: Khai thác sự lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian.",
      "topic": "Nén ảnh"
    },
    {
      "id": 398,
      "prompt": "Một bài toán có yêu cầu Biến đổi ảnh sang miền khác trước khi lượng tử hoặc mã hóa các hệ số. Kỹ thuật nào phù hợp nhất?",
      "options": [
        "Nén Fractal",
        "Nén sử dụng biến đổi",
        "Nén không mất thông tin",
        "Giảm mẫu màu trong JPEG"
      ],
      "answer": 1,
      "explanation": "Nén sử dụng biến đổi: Biến đổi ảnh sang miền khác trước khi lượng tử hoặc mã hóa các hệ số.",
      "topic": "Nén ảnh"
    },
    {
      "id": 399,
      "prompt": "Phát biểu nào mô tả phù hợp nhất cho Mã hóa loạt dài RLE trong môn xử lý ảnh?",
      "options": [
        "Có thể tạo nhiều đoạn lặp hơn vì các giá trị gần nhau trong Gray code chỉ khác nhau một bit",
        "Điều chỉnh cách mã hóa theo sự thay đổi của thống kê dữ liệu trong quá trình xử lý",
        "Thay một chuỗi ký hiệu lặp liên tiếp bằng biểu diễn gồm độ dài loạt và ký hiệu",
        "Mã đặc biệt dùng để kết thúc từ điển hiện tại và bắt đầu lại từ điển mới khi cần"
      ],
      "answer": 2,
      "explanation": "Mã hóa loạt dài RLE: Thay một chuỗi ký hiệu lặp liên tiếp bằng biểu diễn gồm độ dài loạt và ký hiệu.",
      "topic": "Nén ảnh"
    },
    {
      "id": 400,
      "prompt": "Trong thực hành, yêu cầu Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén nên gắn với lựa chọn nào?",
      "options": [
        "EOI trong LZW",
        "Mã hóa khối",
        "Tỷ lệ nén",
        "Độ dư thừa dữ liệu"
      ],
      "answer": 3,
      "explanation": "Độ dư thừa dữ liệu: Phần thông tin có thể loại bỏ hoặc biểu diễn hiệu quả hơn trong quá trình nén.",
      "topic": "Nén ảnh"
    }
  ],
  "answerStatus": "reference",
  "sources": [
    {
      "title": "OpenCV — Histogram Equalization",
      "url": "https://docs.opencv.org/4.11.0/d4/d1b/tutorial_histogram_equalization.html"
    },
    {
      "title": "scikit-image — Filters and thresholding",
      "url": "https://scikit-image.org/docs/0.25.x/api/skimage.filters.html"
    }
  ]
};

// Keep the first source question for each distinct answer explanation.
const imageQuestionsByExplanation = new Map();
for (const question of IMAGE_BANK.questions) {
  if (!imageQuestionsByExplanation.has(question.explanation)) {
    imageQuestionsByExplanation.set(question.explanation, question);
  }
}
IMAGE_BANK.studyQuestions = [...imageQuestionsByExplanation.values()];
