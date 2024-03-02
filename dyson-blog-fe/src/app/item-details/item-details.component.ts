import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {HackerNewsAPIService} from '../shared/services/hackernews-api.service';
import {SettingsService} from '../shared/services/settings.service';

import {Story} from '../shared/models/story';
import {Settings} from '../shared/models/settings';
const fakeData ="<div class=\"md-contents\" style=\"font-size: 18px; line-height: 1.75;\"><h2 id=\"_cloud-hosting-linux-la-gi-0\">Cloud Hosting Linux là gì?</h2>\n" +
  "<p>Cloud Hosting Linux là một dịch vụ lưu trữ trực tuyến được cung cấp bởi các nhà cung cấp dịch vụ đám mây (cloud) cho các máy chủ chạy hệ điều hành Linux. Thay vì phải tự mua và quản lý các máy chủ vật lý, người dùng có thể thuê không gian lưu trữ trên các máy chủ ảo hoặc máy chủ đám mây chạy Linux từ nhà cung cấp dịch vụ đám mây.</p>\n" +
  "<p>Hệ điều hành Linux là một loại phần mềm chạy trên máy chủ, giúp quản lý và điều hành các ứng dụng và dữ liệu trên máy chủ một cách hiệu quả. Cloud Hosting Linux cho phép bạn sử dụng các tính năng và ưu điểm của Linux trong môi trường đám mây, bao gồm tính ổn định, bảo mật, và khả năng tùy chỉnh.</p>\n" +
  "<p>Với dịch vụ này, bạn có thể triển khai các ứng dụng web, trang web, cơ sở dữ liệu và các dịch vụ trực tuyến khác trên máy chủ đám mây chạy Linux. Điều này giúp bạn tận dụng tính linh hoạt và tiện ích của đám mây để quản lý và phát triển dự án của mình một cách dễ dàng và hiệu quả hơn.\n" +
  "<img src=\"https://images.viblo.asia/c6c6963c-7861-4eb5-9542-437e49187cdd.jpg\" alt=\"\" class=\"article-img\"></p>\n" +
  "<h2 id=\"_tinh-nang-cua-cloud-hosting-linux-1\">Tính năng của Cloud Hosting Linux</h2>\n" +
  "<p>Dưới đây là một số tính năng quan trọng của Cloud Hosting Linux:</p>\n" +
  "<p><strong>Đa dạng hệ điều hành Linux:</strong> Cloud Hosting Linux hỗ trợ nhiều phiên bản hệ điều hành Linux phổ biến như Ubuntu, CentOS, Debian, và nhiều loại khác. Điều này cho phép bạn lựa chọn phiên bản Linux phù hợp với ứng dụng và yêu cầu cụ thể của bạn.</p>\n" +
  "<p><strong>Tính linh hoạt:</strong> Bạn có thể tùy chỉnh và cấu hình máy chủ Linux theo nhu cầu của dự án. Tính linh hoạt này giúp bạn thay đổi tài nguyên máy chủ, cài đặt phần mềm, và điều chỉnh cấu hình một cách dễ dàng.</p>\n" +
  "<p><strong>Bảo mật mạnh mẽ:</strong> Linux được biết đến với tính bảo mật cao và thường được cập nhật đều đặn để bảo vệ khỏi các lỗ hổng bảo mật. Cloud Hosting Linux cung cấp các công cụ và tùy chọn bảo mật để bảo vệ dữ liệu và ứng dụng của bạn.</p>\n" +
  "<p><strong>Ổn định và đáng tin cậy:</strong> Hệ điều hành Linux thường rất ổn định và có thể hoạt động trong thời gian dài mà không cần khởi động lại. Điều này đảm bảo rằng ứng dụng của bạn luôn có thể truy cập và hoạt động.</p>\n" +
  "<p><strong>Hỗ trợ cho các ngôn ngữ lập trình:</strong> Cloud Hosting Linux thích hợp cho phát triển ứng dụng bằng nhiều ngôn ngữ lập trình như PHP, Python, Ruby, Node.js, và nhiều ngôn ngữ khác.</p>\n" +
  "<p><strong>Quản lý từ xa:</strong> Bạn có thể quản lý máy chủ Linux từ xa thông qua giao diện dòng lệnh hoặc giao diện đồ họa, cho phép bạn kiểm soát và theo dõi tình trạng máy chủ từ mọi nơi.</p>\n" +
  "<p><strong>Sao lưu và phục hồi dữ liệu:</strong> Cloud Hosting Linux thường cung cấp các công cụ sao lưu và phục hồi dữ liệu để đảm bảo rằng dữ liệu của bạn được bảo vệ và có thể khôi phục khi cần thiết.</p>\n" +
  "<p><strong>Cân bằng tải:</strong> Bạn có thể cấu hình cân bằng tải để phân phối lưu lượng truy cập đều đặn giữa các máy chủ, đảm bảo hiệu suất ổn định cho ứng dụng của bạn.</p>\n" +
  "<h2 id=\"_loi-ich-cua-viec-su-dung-cloud-hosting-linux-2\">Lợi ích của việc sử dụng Cloud Hosting Linux</h2>\n" +
  "<p>Sử dụng Cloud Hosting Linux mang lại nhiều lợi ích đáng kể cho các doanh nghiệp và cá nhân trong việc quản lý và triển khai ứng dụng trực tuyến. Dưới đây là một số lợi ích chính của việc sử dụng Cloud Hosting Linux:</p>\n" +
  "<p><strong>Tiết kiệm chi phí:</strong> Cloud Hosting Linux thường có chi phí thấp hơn so với các dịch vụ dựa trên Windows, do Linux là một hệ điều hành mã nguồn mở, không đòi hỏi phí sử dụng giấy phép đắt đỏ.</p>\n" +
  "<p><strong>Tính linh hoạt:</strong> Bạn có khả năng tùy chỉnh và cấu hình máy chủ Linux theo nhu cầu cụ thể của dự án, giúp tối ưu hóa tài nguyên và hiệu suất.</p>\n" +
  "<p><strong>Bảo mật:</strong> Linux được coi là một hệ điều hành có tính bảo mật cao. Cộng đồng mã nguồn mở lớn giúp phát hiện và khắc phục lỗ hổng bảo mật nhanh chóng.</p>\n" +
  "<p><strong>Ổn định và đáng tin cậy:</strong> Máy chủ Linux thường có khả năng hoạt động liên tục trong thời gian dài mà không cần khởi động lại, đảm bảo sự ổn định cho ứng dụng của bạn.</p>\n" +
  "<p><strong>Hỗ trợ đa ngôn ngữ:</strong> Linux hỗ trợ nhiều ngôn ngữ lập trình, từ các ngôn ngữ mã nguồn mở như PHP, Python, Ruby đến các ngôn ngữ chính thống như Java và Node.js.</p>\n" +
  "<p><strong>Quản lý từ xa:</strong> Bạn có thể quản lý máy chủ Linux từ xa thông qua giao diện dòng lệnh hoặc giao diện đồ họa, giúp bạn kiểm soát và theo dõi tình trạng máy chủ từ bất kỳ đâu.</p>\n" +
  "<p><strong>Sao lưu và phục hồi dữ liệu:</strong> Cloud Hosting Linux thường cung cấp các công cụ sao lưu và phục hồi dữ liệu để đảm bảo an toàn dữ liệu và khả năng khôi phục khi cần thiết.</p>\n" +
  "<p><strong>Cân bằng tải:</strong> Bạn có thể cấu hình cân bằng tải để phân phối đều lưu lượng truy cập giữa các máy chủ, đảm bảo hiệu suất ổn định và tăng khả năng chịu tải cho ứng dụng của bạn.</p>\n" +
  "<p><strong>Phù hợp cho các ứng dụng web và dự án mã nguồn mở:</strong> Linux là nền tảng lý tưởng cho phát triển và triển khai ứng dụng web và dự án mã nguồn mở, giúp bạn tận dụng sức mạnh của cộng đồng phát triển.</p>\n" +
  "<h2 id=\"_diem-han-che-cua-cloud-hosting-linux-3\">Điểm hạn chế của cloud hosting linux</h2>\n" +
  "<p>Mặc dù Cloud Hosting Linux có nhiều lợi ích, nhưng cũng tồn tại một số hạn chế và điểm yếu mà bạn cần xem xét:</p>\n" +
  "<p><strong>Khả năng quản lý phức tạp:</strong> Linux có thể yêu cầu kiến thức kỹ thuật cao hơn so với một số hệ điều hành khác. Điều này có thể khiến việc cấu hình và quản lý máy chủ trở nên phức tạp đối với người không có kinh nghiệm Linux.</p>\n" +
  "<p><strong>Hạn chế ứng dụng Windows:</strong> Nếu bạn có nhu cầu sử dụng các ứng dụng dựa trên Windows, ví dụ như .NET Framework hoặc SQL Server, Cloud Hosting Linux không phải là lựa chọn phù hợp, và bạn sẽ cần đến Cloud Hosting Windows.</p>\n" +
  "<p><strong>Yêu cầu kiến thức kỹ thuật:</strong> Sử dụng Linux đòi hỏi bạn phải có kiến thức về lệnh dòng lệnh và cấu hình hệ thống. Điều này có thể là một rào cản cho người không có kinh nghiệm.</p>\n" +
  "<p><strong>Hạn chế tương thích phần cứng:</strong> Một số phần cứng đặc biệt có thể không tương thích tốt với Linux, dẫn đến khó khăn trong việc cài đặt và sử dụng.</p>\n" +
  "<p><strong>Hạn chế trong số ứng dụng thương mại:</strong> Một số ứng dụng thương mại có thể không có phiên bản dành riêng cho Linux, do đó bạn có thể phải tìm giải pháp thay thế hoặc sử dụng công nghệ ảo hóa.</p>\n" +
  "<p><strong>Khả năng tương thích phần mềm hạn chế:</strong> Một số phần mềm hoặc ứng dụng có thể không hỗ trợ Linux hoặc cần phải được tùy chỉnh để hoạt động trên nền tảng này.</p>\n" +
  "<p><strong>Thời gian cài đặt và cấu hình ban đầu:</strong> Việc cài đặt và cấu hình Linux có thể tốn thời gian hơn so với việc sử dụng các dịch vụ lưu trữ được quản lý trước.</p>\n" +
  "<h2 id=\"_so-sanh-cloud-hosting-linux-voi-cloud-hosting-windows-4\">So sánh Cloud Hosting Linux với Cloud Hosting Windows</h2>\n" +
  "<p><strong>Hệ điều hành:</strong>\n" +
  "<strong>Cloud Hosting Linux:</strong> Sử dụng hệ điều hành Linux, như Ubuntu, CentOS, Debian. Linux phù hợp cho các ứng dụng web phát triển dựa trên mã nguồn mở.\n" +
  "<strong>Cloud Hosting Windows:</strong> Sử dụng hệ điều hành Windows Server. Windows thường được ưa chuộng cho các ứng dụng .NET và các ứng dụng dựa trên công nghệ Microsoft.</p>\n" +
  "<p><strong>Tính năng và ứng dụng:</strong>\n" +
  "<strong>Cloud Hosting Linux:</strong> Phù hợp cho các ứng dụng web phát triển trên nền tảng mã nguồn mở như PHP, Python, Ruby, và Node.js. Nó cũng thường được sử dụng cho các máy chủ web Apache hoặc Nginx.\n" +
  "<strong>Cloud Hosting Windows:</strong> Thích hợp cho các ứng dụng phát triển bằng các ngôn ngữ và công nghệ Microsoft như <a href=\"http://ASP.NET\" target=\"_blank\">ASP.NET</a>, .NET Core, và SQL Server.</p>\n" +
  "<p><strong>Hiệu suất:</strong>\n" +
  "<strong>Cloud Hosting Linux:</strong> Thường có hiệu suất tốt trên các máy chủ vì hệ điều hành Linux có thể quản lý tài nguyên một cách hiệu quả.\n" +
  "<strong>Cloud Hosting Windows:</strong> Hiệu suất phụ thuộc vào ứng dụng và tải trang web cụ thể, nhưng có thể cần tài nguyên hệ thống lớn hơn.</p>\n" +
  "<p><strong>Bảo mật:</strong>\n" +
  "<strong>Cloud Hosting Linux:</strong> Linux thường được coi là mạnh về mặt bảo mật với cộng đồng mã nguồn mở lớn giúp phát hiện và khắc phục lỗ hổng nhanh chóng.\n" +
  "<strong>Cloud Hosting Windows:</strong> Windows Server cũng cung cấp các công cụ bảo mật mạnh mẽ, nhưng việc bảo vệ phụ thuộc vào cách cấu hình và quản lý của người sử dụng.</p>\n" +
  "<p><strong>Chi phí:</strong>\n" +
  "<strong>Cloud Hosting Linux:</strong> Thường có chi phí thấp hơn do sử dụng mã nguồn mở và không cần phải mua các giấy phép Windows.\n" +
  "<strong>Cloud Hosting Windows:</strong> Có thể đắt hơn do phải mua các giấy phép Windows và các ứng dụng liên quan.</p>\n" +
  "<p><strong>Sự phù hợp với dự án cụ thể:</strong>\n" +
  "<strong>Cloud Hosting Linux:</strong> Tốt cho các dự án phát triển mã nguồn mở, web ứng dụng đa nền tảng, và các ứng dụng nhẹ.\n" +
  "<strong>Cloud Hosting Windows:</strong> Phù hợp cho các ứng dụng .NET, cơ sở dữ liệu SQL Server, và các ứng dụng Windows chuyên biệt.</p>\n" +
  "<h2 id=\"_can-chu-y-dieu-gi-khi-mua-dich-vu-hosting-linux-5\">Cần chú ý điều gì khi mua dịch vụ Hosting Linux?</h2>\n" +
  "<p>Khi mua dịch vụ Hosting Linux, bạn cần chú ý đến một số điểm quan trọng sau để đảm bảo bạn chọn được giải pháp phù hợp với nhu cầu của mình:</p>\n" +
  "<p><strong>Yêu cầu của dự án:</strong> Đầu tiên, hãy xác định rõ yêu cầu của dự án của bạn. Bạn cần biết cần bao nhiêu tài nguyên (bộ nhớ, băng thông, CPU) và loại hệ điều hành Linux nào phù hợp với ứng dụng của bạn.</p>\n" +
  "<p><strong>Dung lượng lưu trữ:</strong> Xác định dung lượng lưu trữ cần thiết cho dự án của bạn. Đảm bảo dịch vụ Hosting Linux bạn chọn có đủ không gian để lưu trữ tất cả dữ liệu và tệp tin.</p>\n" +
  "<p><strong>Hiệu suất và khả năng mở rộng:</strong> Kiểm tra hiệu suất của máy chủ và khả năng mở rộng. Bạn cần đảm bảo rằng dịch vụ có khả năng đáp ứng tăng trưởng của bạn mà không gây gián đoạn.</p>\n" +
  "<p><strong>Bảo mật:</strong> Đảm bảo rằng nhà cung cấp Hosting Linux cung cấp các biện pháp bảo mật như tường lửa, mã hóa, và cập nhật hệ thống định kỳ để bảo vệ dữ liệu của bạn.</p>\n" +
  "<p><strong>Sao lưu và phục hồi:</strong> Kiểm tra xem dịch vụ có cung cấp công cụ sao lưu và khả năng phục hồi dữ liệu dễ dàng hay không. Điều này quan trọng để đảm bảo an toàn dữ liệu.</p>\n" +
  "<p><strong>Hỗ trợ và độ tin cậy:</strong> Xem xét mức độ hỗ trợ của nhà cung cấp. Cần kiểm tra xem họ có hỗ trợ 24/7 và có thời gian hoạt động đáng tin cậy không.</p>\n" +
  "<p><strong>Giá cả và hợp đồng:</strong> So sánh giá cả và hợp đồng của các nhà cung cấp khác nhau. Đảm bảo bạn hiểu rõ chi phí và điều khoản trong hợp đồng trước khi ký kết.</p>\n" +
  "<p><strong>Đánh giá và đánh giá:</strong> Tra cứu đánh giá và đánh giá từ các người dùng khác về nhà cung cấp Hosting Linux mà bạn quan tâm. Điều này có thể giúp bạn đánh giá chất lượng của dịch vụ.</p>\n" +
  "<p><strong>Cấu hình và quản lý:</strong> Xem xét cách cấu hình và quản lý máy chủ trong dịch vụ Hosting Linux. Giao diện quản lý phải dễ sử dụng và phù hợp với nhu cầu của bạn.</p>\n" +
  "<p><strong>Chính sách hỗ trợ và bảo mật:</strong> Kiểm tra chính sách hỗ trợ và bảo mật của nhà cung cấp. Đảm bảo rằng chúng tuân theo các quy định và luật pháp hiện hành.</p>\n" +
  "<p>Nhớ luôn thực hiện nghiên cứu kỹ lưỡng và thảo luận với nhà cung cấp trước khi quyết định mua dịch vụ Hosting Linux. Điều này sẽ giúp bạn chọn được giải pháp phù hợp nhất với dự án của bạn và đảm bảo rằng bạn sẽ có trải nghiệm dịch vụ tốt nhất có thể.\n" +
  "<strong>Vinh Phạm</strong></p>\n" +
  "</div>"

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  item: Story | undefined;
  errorMessage = '';
  settings: Settings;

  constructor(
    private _hackerNewsAPIService: HackerNewsAPIService,
    private _settingsService: SettingsService,
    private route: ActivatedRoute,
    private _location: Location
  ) {
    this.settings = this._settingsService.settings;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let itemID = +params['id'];
      this._hackerNewsAPIService.fetchItemContent(itemID).subscribe(item => {
        this.item = item;
        this.item.content = fakeData;
      }, error => this.errorMessage = 'Could not load item comments.');
    });
    window.scrollTo(0, 0);
  }

  goBack() {
    this._location.back();
  }

  get hasUrl(): boolean {
    return this.item?.url.indexOf('http') === 0;
  }

}
