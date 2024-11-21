export default function TermOfUsePage() {
  const url = new URL(process.env.NEXT_PUBLIC_BASE_URL!);

  return (
    <>
      <div className="text-[0.625rem]">
        <p>
          Chào mừng bạn đến với {url.hostname} (&quot;Trang web&quot;). Bằng cách sử dụng Trang web của chúng tôi, bạn
          đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản sử dụng sau đây. Vui lòng xem lại các điều khoản này một
          cách cẩn thận. Nếu bạn không đồng ý với các điều khoản này, bạn không nên sử dụng Trang web này.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">1. Chấp nhận các điều khoản</h2>

        <p>
          Bằng cách truy cập và sử dụng {url.hostname}, bạn thừa nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc về
          mặt pháp lý bởi các Điều khoản sử dụng này và Chính sách quyền riêng tư của chúng tôi.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">2. Đủ điều kiện</h2>

        <p>
          Việc tham gia vào bất kỳ xổ số hoặc trò chơi nào được cung cấp trên {url.hostname} được giới hạn ở những cá
          nhân ít nhất 18 tuổi hoặc độ tuổi hợp pháp để tham gia vào các hoạt động đó trong phạm vi quyền hạn của bạn,
          tùy theo độ tuổi nào cao hơn. Bằng cách sử dụng Trang web, bạn tuyên bố và đảm bảo rằng bạn đáp ứng yêu cầu đủ
          điều kiện này.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">3. Đăng ký người dùng</h2>

        <p>
          Để sử dụng một số tính năng nhất định của Trang web, bạn có thể phải đăng ký tài khoản. Bạn đồng ý cung cấp
          thông tin đúng, chính xác, cập nhật và đầy đủ trong quá trình đăng ký và cập nhật thông tin đó khi cần thiết
          để duy trì tính chính xác của thông tin đó.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">4. Sử dụng trang web</h2>

        <p>
          Bạn đồng ý sử dụng Trang web tuân thủ tất cả các luật và quy định hiện hành của Việt Nam. Bạn sẽ không làm thế
          đâu:
        </p>

        <ul className="list-disc pl-3 text-[0.625rem]">
          <li>Sử dụng Trang web cho bất kỳ mục đích trái pháp luật nào.</li>
          <li>
            Tái sản xuất, nhân bản, sao chép, bán, bán lại hoặc khai thác bất kỳ phần nào của Trang web mà không có sự
            cho phép rõ ràng bằng văn bản của {url.hostname}.
          </li>
          <li>Tham gia vào bất kỳ hoạt động nào can thiệp hoặc làm gián đoạn Trang web.</li>
        </ul>
      </div>
      <div className="text-[0.625rem]">
        <h2 className="font-bold">5. Quy tắc xổ số</h2>

        <p>
          Mỗi loại xổ số được cung cấp trên Trang web sẽ có các quy tắc và điều khoản cụ thể riêng. Bạn đồng ý tuân thủ
          các quy tắc và điều khoản này sẽ được cung cấp trước khi tham gia mỗi đợt xổ số.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">6. Tuyên bố miễn trừ trách nhiệm</h2>

        <p>
          Trang web và nội dung của nó được cung cấp trên cơ sở &quot;nguyên trạng&quot; và &quot;có sẵn&quot;.{" "}
          {url.hostname} không bảo đảm, rõ ràng hay ngụ ý, về hoạt động của Trang web hoặc thông tin, nội dung hoặc tài
          liệu có trong đó.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">7. Giới hạn trách nhiệm pháp lý</h2>

        <p>
          Trong phạm vi tối đa được pháp luật cho phép, {url.hostname} sẽ không chịu trách nhiệm pháp lý đối với mọi
          thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt hoặc do hậu quả phát sinh từ hoặc liên quan đến việc sử
          dụng hoặc không thể sử dụng Trang web.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">8. Chấm dứt</h2>

        <p>
          {url.hostname} có quyền chấm dứt hoặc đình chỉ tài khoản và quyền truy cập vào Trang web của bạn theo quyết
          định riêng của chúng tôi mà không cần thông báo trước đối với hành vi mà chúng tôi tin rằng vi phạm các Điều
          khoản sử dụng này hoặc có hại cho người dùng khác của Trang web, chúng tôi hoặc bên thứ ba, hoặc vì bất kỳ lý
          do nào khác.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">9. Luật điều chỉnh</h2>

        <p>
          Các Điều khoản sử dụng này được điều chỉnh và hiểu theo luật pháp Việt Nam, bất kể xung đột với các nguyên tắc
          luật pháp.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">10. Thay đổi Điều khoản sử dụng</h2>

        <p>
          {url.hostname} có quyền sửa đổi các Điều khoản sử dụng này bất cứ lúc nào. Mọi thay đổi sẽ có hiệu lực ngay
          khi đăng lên Trang web. Việc bạn tiếp tục sử dụng Trang web sau khi đăng các thay đổi có nghĩa là bạn chấp
          nhận những thay đổi đó.
        </p>
      </div>

      <div className="text-[0.625rem]">
        <h2 className="font-bold">11. Thông tin liên hệ</h2>

        <p>
          Nếu có bất kỳ câu hỏi nào liên quan đến Điều khoản sử dụng này, vui lòng liên hệ với chúng tôi theo địa chỉ{" "}
          <a className="text-blue-500 underline" href="mailto:cs@xosotot.com">
            cs@xosotot.com
          </a>
          .
        </p>
      </div>
    </>
  );
}
