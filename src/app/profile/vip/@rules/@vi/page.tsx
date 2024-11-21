export default function ProfileVipRulesSlot() {
  return (
    <>
      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Tiêu chí thăng cấp</strong>

        <p className="text-[0.5rem]">
          Điểm kinh nghiệm của thành viên VIP (số tiền cược hợp lệ) đạt yêu cầu của cấp bậc tương ứng, sẽ được thăng cấp
          VIP tương ứng, thời gian thống kê dữ liệu VIP của thành viên bắt đầu từ 00:00:00 ngày hệ thống VIP ra mắt.Tính
          toán cấp độ VIP được làm mới sau 10 phút! Mức kinh nghiệm tương ứng được tính theo tỷ lệ cá cược hợp lệ 1000:1
          !
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Thứ tự thăng cấp</strong>

        <p className="text-[0.5rem]">
          Cấp độ VIP đáp ứng các yêu cầu tương ứng mỗi ngày có thể thăng một cấp, nhưng cấp độ VIP không thể vượt cấp độ
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Yêu cầu duy trì cấp</strong>

        <p className="text-[0.5rem]">
          Thành viên VIP sau khi &quot;thay đổi cấp độ VIP&quot;, cần hoàn thành các yêu cầu duy trì của cấp độ tương
          ứng trong vòng 30 ngày; nếu hoàn thành thăng cấp trong thời gian này, Các yêu cầu duy trì cấp độ sẽ được tính
          toán lại theo cập độ hiện tại
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Tiêu chí giảm cấp</strong>

        <p className="text-[0.5rem]">
          Nếu thành viên VIP trong vòng 30 ngày không hoàn thành yêu cầu duy trì cấp độ tương ứng, hệ thống sẽ tự động
          khấu trừ điểm kinh nghiệm tương ứng với cấp độ, nếu điểm kinh nghiệm không đủ sẽ bị giảm cấp, ưu đãi tương ứng
          cũng sẽ được điều chỉnh xuống cấp độ sau khi hạ cấp
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Tiền thưởng thăng cấp</strong>

        <p className="text-[0.5rem]">
          Sau khi thành viên đạt cấp thành viên VIP, Các lợi ích thăng cấp có thể được nhận trên giao diện VIP và mỗi
          thành viên VIP chỉ có thể nhận được phần thưởng thăng cấp của mỗi cấp một lần.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Tiền thưởng mỗi tháng</strong>

        <p className="text-[0.5rem]">
          Thành viên VIP có thể kiếm được phần thưởng VIP ở mức cao nhất mỗi tháng một lần.Chỉ có thể được nhận một lần
          một tháng. Giải thưởng không được cộng dồn. Và mọi phần thưởng chưa được nhận sẽ được làm mới vào ngày thanh
          toán tiếp theo. Khi nhận được phần thưởng hàng tháng ở mức cao nhất trong tháng này Phần thưởng hàng tháng
          kiếm được trong tháng này sẽ bị khấu trừ, ví dụ: khi VIP1 kiếm được 500 và nâng cấp lên VIP2 để nhận phần
          thưởng hàng tháng sẽ bị trừ 500.
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Hoàn cược theo thời gian thực</strong>

        <p className="text-[0.5rem]">
          Cấp VIP càng cao thì nhận tỷ lệ hoàn trả cược càng cao, tất cả các trò chơi được tính theo thời gian thực và
          có thể tự nhận thưởng !
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 rounded-2xl bg-blue-100 p-2.5">
        <strong className="text-[0.625rem]">Két sắt</strong>

        <p className="text-[0.5rem]">
          Thành viên VIP khi đạt cấp độ tương ứng sẽ được tính thêm lợi nhuận khi gửi két sắt dựa trên cấp độ VIP của
          thành viên.
        </p>
      </div>
    </>
  );
}
