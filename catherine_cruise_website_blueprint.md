# Blueprint website Catherine Cruise & Catherine Horizon

Tài liệu này là bản đặc tả nội dung, cấu trúc giao diện và yêu cầu triển khai website luxury cruise cho hệ sản phẩm Catherine Cruise và Catherine Horizon. Mục tiêu là xây một website có cảm giác cao cấp, giàu cảm hứng, có logic chuyển đổi rõ ràng giống mô hình website cruise quốc tế: bắt đầu bằng cảm hứng thương hiệu, chuyển sang sản phẩm có thể chọn, sau đó dẫn người dùng vào inquiry/booking form.

> Lưu ý triển khai: Đây là bản tái thiết kế theo tinh thần luxury travel website, không sao chép bố cục, hình ảnh, copy hay nhận diện của bất kỳ thương hiệu nào khác. Dữ liệu sản phẩm được lấy từ catalog Catherine & Horizon; phần pricing, availability, cancellation policy và phụ phí chưa có dữ liệu đầy đủ nên chỉ nên hiển thị dạng `Request a Quote`, `Check Availability` hoặc `Contact Sales` ở giai đoạn L1.

## 1. Mục tiêu website

Website cần phục vụ 4 mục tiêu chính:

1. Định vị Catherine Cruise là sản phẩm overnight cruise cao cấp trên Vịnh Hạ Long, mang tinh thần Đông Dương, sang trọng, riêng tư và giàu trải nghiệm.
2. Định vị Catherine Horizon là sản phẩm day cruise/night dinner cruise hiện đại, cảm hứng Địa Trung Hải, phù hợp khách đi trong ngày, nhóm gia đình, khách MICE và khách trải nghiệm ngắn.
3. Tạo funnel thu lead/inquiry rõ ràng thông qua các CTA `Check Availability`, `Request a Quote`, `Plan My Voyage`.
4. Chuẩn hóa dữ liệu để dev có thể dựng homepage, trang danh sách du thuyền, trang chi tiết du thuyền, trang itinerary, room detail và inquiry form.

## 2. Định vị thương hiệu & concept sáng tạo

### 2.1. Big idea

**One bay, two ways to sail beautifully.**

Catherine Cruise và Catherine Horizon cùng khai thác vẻ đẹp Vịnh Hạ Long nhưng ở hai trải nghiệm khác nhau: Catherine Cruise dành cho hành trình nghỉ dưỡng qua đêm, còn Catherine Horizon dành cho hành trình trong ngày hoặc bữa tối trên vịnh.

### 2.2. Brand tone

- Sang trọng nhưng không phô trương.
- Tinh tế, giàu cảm xúc, nhiều hình ảnh ánh sáng, mặt nước, hoàng hôn, chất liệu nội thất.
- Copy ngắn, giàu hình ảnh, tránh mô tả quá dài ngay trên màn hình đầu.
- Ưu tiên các động từ trải nghiệm: sail, discover, unwind, indulge, celebrate, awaken.

### 2.3. Bảng màu đề xuất

| Nhóm màu | Màu gợi ý | Vai trò |
|---|---|---|
| Deep Navy | #071A2F | Nền header, footer, lớp overlay premium |
| Warm Gold | #C8A45D | CTA, icon, highlight, viền card |
| Ivory | #F8F3EA | Nền section sáng, tạo cảm giác luxury hospitality |
| Charcoal Black | #111111 | Text chính, nền Horizon sang trọng |
| Soft Sand | #E9DDC7 | Nền phụ, block editorial |
| Emerald Bay | #1E6F68 | Accent liên quan vịnh, nước, thiên nhiên |

### 2.4. Typography

- Heading: `Cormorant Garamond`, `Playfair Display`, hoặc `Instrument Serif`.
- Body: `Inter`, `Manrope`, hoặc `Satoshi`.
- H1 desktop: 64-84px.
- H2 desktop: 40-56px.
- Body: 16-18px, line-height 1.65.
- Button: 14-16px, uppercase nhẹ hoặc title case.

## 3. Information Architecture

```text
/
  Home
/cruises
  Cruise listing
/cruises/catherine-cruise
  Catherine Cruise detail
/cruises/catherine-horizon
  Catherine Horizon detail
/itineraries
  All itineraries
/itineraries/catherine-2d1n
/itineraries/catherine-3d2n
/itineraries/horizon-heritage-day
/itineraries/horizon-expanded-heritage-day
/itineraries/horizon-night
/offers
  Seasonal offers / inquiry campaigns
/experience
  Dining, wellness, activities, facilities
/guidebook
  Travel guide, safety, FAQs, destination content
/contact
  Inquiry and sales contact
```

## 4. Homepage structure

### 4.1. Header

**Mục đích:** Giữ nhận diện thương hiệu, giúp khách chuyển nhanh sang chọn du thuyền hoặc gửi inquiry.

**Menu desktop đề xuất:**

- Catherine Cruise
- Catherine Horizon
- Itineraries
- Experience
- Offers
- Guidebook
- Contact

**CTA:** `Book Now` hoặc `Request a Quote`.

**Layout:**

- Header absolute trên hero, nền trong suốt với text trắng.
- Khi scroll 60px: đổi sang nền Deep Navy hoặc Ivory, thêm shadow nhẹ.
- Desktop: container 1320px, logo trái, menu giữa, CTA phải.
- Mobile: logo trái, hamburger phải, CTA `Book` dạng pill nhỏ.

**Kích thước:**

- Desktop height: 88-104px.
- Mobile height: 64-72px.
- Logo height: 40-48px.
- CTA height: 44-52px.

### 4.2. Hero

**Hero direction:** tàu trên Vịnh Hạ Long lúc bình minh/hoàng hôn, nhiều khoảng trống để đặt chữ, overlay 30-40%.

**Headline đề xuất:**

```text
Sail Beyond the Horizon
```

**Subheadline:**

```text
Discover Ha Long Bay through two signature journeys: an Indochine-inspired overnight escape with Catherine Cruise and a modern Mediterranean day or night experience with Catherine Horizon.
```

**CTA:**

- Primary: `Explore Our Cruises`
- Secondary: `Check Availability`

**Hero layout:**

- Full width, cao 90-100vh.
- Text đặt bên trái, max-width 640px.
- Có thể đặt label nhỏ phía trên H1: `Catherine Cruises - Ha Long Bay`.
- Background video nếu có: 12-18 giây, cảnh tàu, sundeck, dining, vịnh, hoàng hôn.

### 4.3. Quick inquiry strip

**Mục đích:** thu lead nhanh khi chưa có booking engine giá/slot thật.

**Fields:**

- Cruise interest: Catherine Cruise / Catherine Horizon.
- Itinerary: 2D1N / 3D2N / Heritage Day / Expanded Heritage Day / Night Cruise.
- Desired departure date.
- Guests.
- CTA: `Check Availability`.

**UX:**

- Desktop: card nổi đè lên cuối hero, 5 cột.
- Mobile: sticky bottom CTA mở modal full-screen.
- Nếu khách chọn Catherine Cruise thì hiện thêm room preference.
- Nếu khách chọn Catherine Horizon thì hiện day/night package.

### 4.4. Featured cruise cards

| Cruise | Type | Tagline | Launch | Scale | Port | CTA |
| --- | --- | --- | --- | --- | --- | --- |
| Catherine Cruise | Overnight | Trải nghiệm những giá trị vượt thời gian | 2023 | 90m x 15m / 5 decks / 39 cabins | Số 42, Cảng quốc tế Tuần Châu, Hạ Long, Quảng Ninh | View details / Request a quote |
| Catherine Horizon | Day + Night dinner | Sailing beyond the horizon | 2026 | 64.79m x 12.89m / 3 decks / 320 guests capacity | Day - Số 42, Cảng quốc tế Tuần Châu; Night - Cảng Quốc tế Hạ Long | View details / Request a quote |


**Card style:**

- Ảnh chiếm 58-62% chiều cao card.
- Badge trên ảnh: `Overnight` hoặc `Day & Night`.
- Tên du thuyền là H3.
- Không hiển thị giá nếu chưa có pricing chính thức; thay bằng `From request` hoặc `Contact for quote`.
- CTA kép: `Explore` và `Request a Quote`.

### 4.5. Brand story split section

**Layout:** 2 cột. Bên trái là ảnh lifestyle/sundeck, bên phải là text editorial.

**Heading:**

```text
Two vessels, one timeless bay
```

**Copy:**

```text
Catherine Cruise celebrates the quiet grandeur of Indochine elegance, designed for guests who want to slow down, stay overnight and experience Ha Long Bay in depth. Catherine Horizon brings a brighter rhythm to the bay - a modern day and night cruise shaped by sunset, cuisine, music and open-air celebration.
```

### 4.6. Itinerary preview section

**Section heading:** `Choose Your Signature Voyage`

| Itinerary | Cruise | Duration | Type | Highlights | Departure | Surcharge |
| --- | --- | --- | --- | --- | --- | --- |
| Hải trình 2N1Đ | Catherine Cruise | 2 ngày 1 đêm | Overnight | Hang Sửng Sốt → Đảo Titop → Hang Luồn | Cảng quốc tế Tuần Châu | Không |
| Hải trình 3N2Đ | Catherine Cruise | 3 ngày 2 đêm | Overnight | Hang Sửng Sốt → Đảo Titop → Hang Trinh Nữ → Bãi Biển Ba Trái Đào → Làng Ngọc Trai → Hang Luồn | Cảng quốc tế Tuần Châu | Không |
| Hải trình Di Sản | Catherine Horizon | 1 ngày (08:15-16:30) | Day | Động Mê Cung → Làng nghề Ngọc Trai → Hang Trinh Nữ | Cảng tàu khách Quốc tế Hạ Long (Cảng Sun) | Không |
| Hải trình Di Sản Mở Rộng | Catherine Horizon | 1 ngày (08:15-16:30) | Day | Đảo Ti Tốp → Hang Sửng Sốt → Hang Trinh Nữ | Cảng tàu khách Quốc tế Hạ Long (Cảng Sun) | CÓ |
| Hải trình Đêm | Catherine Horizon | Tối (17:30-21:30) | Night dinner | Thưởng phong vị trên Vịnh Di Sản; ngắm Núi Bài Thơ, Cầu Bãi Cháy, vòng quay Mặt Trời | Cảng tàu khách Quốc tế Hạ Long | Không |


**UX đề xuất:**

- Tabs: `Overnight`, `Day Cruise`, `Night Cruise`.
- Mỗi itinerary có card gồm duration, route highlights, port, CTA.
- Với itinerary có phụ phí, hiển thị note nhỏ: `Surcharge may apply - sales team will confirm`.

### 4.7. Experience section

**Heading:** `Life Onboard, Curated Beautifully`

**Experience pillars:**

- Dining & Culinary
- Sundeck & Sunset
- Wellness & Spa
- Water Activities
- Entertainment
- Private Celebration

**Layout:** 6 card icon hoặc ảnh, có hover reveal.

### 4.8. Rooms & suites preview

Chỉ áp dụng cho Catherine Cruise vì Catherine Horizon là day/night cruise không có cabin overnight.

| Room | English | Size | Floor | Occupancy | View | Perks |
| --- | --- | --- | --- | --- | --- | --- |
| Villa President | Villa President | 200 m2 | Tầng 3 | 2 | Bao quát vịnh | 01 chai rượu vang; Hoa quả đón tiếp; Dịch vụ quản gia; 60' mát-xa toàn thân; Limousine 2 chiều |
| Grand Suite | Grand Suite | 85 m2 | Tầng 2 & 4 | 2 | Ban công hướng biển | Hoa quả đón tiếp; 30' mát-xa toàn thân |
| Royal Suite | Royal Suite | 56 m2 | Tầng 3 | 2 | Ban công hướng biển | Hoa quả đón tiếp; 30' mát-xa chân |
| Premier Suite | Premier Suite | 40 m2 | Tầng 1, 2, 3 | 2-3 (tùy bed config) | Ban công hướng biển | Hoa quả đón tiếp |


**Room card UX:**

- Ảnh phòng 4:3.
- Quick facts: size, floor, occupancy, balcony, bathtub/jacuzzi.
- CTA: `View Suite` và `Request This Room`.
- Với Premier Suite, mở dropdown cấu hình giường.

### 4.9. Social proof / trust layer

Vì catalog chưa có dữ liệu review/passenger/voyages chính thức, không bịa số. Giai đoạn đầu nên dùng các chỉ số có thật từ catalog:

- Catherine Cruise: launched 2023, 90m length, 5 decks, 39 cabins.
- Catherine Horizon: launched 2026, 64.79m length, 3 decks, 320 guests capacity.
- Ha Long Bay routes: Surprise Cave, Titop Island, Luon Cave, Trinh Nu Cave, Pearl Farm.

**Layout:** 4 blocks lớn, nền Ivory hoặc Deep Navy.

### 4.10. Offers / campaign section

**Heading:** `Curated Offers for Your Next Voyage`

Vì chưa có pricing chính thức, offer nên đi theo hướng inquiry campaign:

| Offer idea | Áp dụng | CTA |
|---|---|---|
| Honeymoon Escape | Catherine Cruise / Grand Suite, Royal Suite, Villa President | Request honeymoon plan |
| Family Bay Retreat | Catherine Cruise / Premier Connecting, Triple | Plan family trip |
| Sunset Dinner on the Bay | Catherine Horizon Night | Reserve dinner cruise |
| Corporate Day Cruise | Catherine Horizon Day / Day Plus | Request group proposal |
| Wellness Overnight | Catherine Cruise / Spa, Tai Chi, Salt Sauna | Ask for wellness package |

### 4.11. Guidebook / SEO content hub

**Section heading:** `Guidebook to Ha Long Bay`

**Bài viết gợi ý:**

- 2D1N or 3D2N: Which Catherine Cruise itinerary should you choose?
- Best time to cruise Ha Long Bay.
- What to pack for an overnight cruise.
- Family guide to day cruise in Ha Long Bay.
- Sunset dinner cruise: what to expect on Catherine Horizon.
- Cave, kayak and beach: signature experiences around Ha Long Bay.

### 4.12. Newsletter / soft lead capture

**Headline:** `Your Voyage, Beautifully Planned`

**Copy:**

```text
Receive curated cruise updates, seasonal offers and travel inspiration for your next Ha Long Bay journey.
```

**Fields:** Email, name optional, cruise interest optional.

### 4.13. Footer

**Footer columns:**

- Brand: short description + social icons.
- Cruises: Catherine Cruise, Catherine Horizon, Itineraries, Offers.
- Experience: Dining, Wellness, Activities, Private Events.
- Support: Contact, FAQs, Policies, Travel Agents.
- Contact: Hanoi Office, Halong Port, Hotline, Email.

| Brand | Office | Address | Hotline | Email | Website |
| --- | --- | --- | --- | --- | --- |
| Catherine Cruise | Hanoi Office | Level 9, Nam Long Tower, 66A Tran Hung Dao, Hoan Kiem, Ha Noi | 0911 28 2222 | info@catherinecruises.vn | www.catherinecruises.vn |
| Catherine Cruise | Halong Port | No.42, Tuan Chau Port, Ha Long, Quang Ninh | 0911 28 2222 | info@catherinecruises.vn | www.catherinecruises.vn |
| Catherine Horizon | Hanoi Office | Level 9, Nam Long Tower, 66A Tran Hung Dao Street, Cua Nam Ward, Ha Noi | 0911 28 2222 | info@catherinehorizon.com | www.catherinecruises.vn |
| Catherine Horizon | Halong Port | No.42, Tuan Chau Port, Ha Long, Quang Ninh | 0911 28 2222 | info@catherinehorizon.com | www.catherinecruises.vn |


## 5. Trang chi tiết Catherine Cruise

### 5.1. Hero detail

**H1:** `Catherine Cruise - Timeless Indochine Elegance on Ha Long Bay`

**Intro:**

```text
Inspired by the charm of Indochine design, Catherine Cruise is an overnight luxury vessel where Vietnamese spirit meets European elegance. With 39 cabins, refined dining spaces, wellness facilities and curated bay activities, every journey is designed to feel intimate, graceful and deeply memorable.
```

**Quick facts:**

- Type: Overnight Cruise.
- Launch year: 2023.
- Length: 90m.
- Width: 15m.
- Decks: 5.
- Cabins: 39.
- Port: Terminal No.42, Tuan Chau Port, Ha Long, Quang Ninh.

### 5.2. Room section structure

1. Villa President - flagship suite, private sundeck, Jacuzzi, butler, wine, fruit, 60-minute massage, two-way limousine.
2. Grand Suite - 85m2, balcony, bathtub, Jacuzzi, fruit, 30-minute full-body massage.
3. Royal Suite - 56m2, private sundeck, panoramic views, fruit, 30-minute foot massage.
4. Premier Suite - 40m2, flexible bed configurations: Double, Twin, Triple, Connecting.

### 5.3. Premier bed configurations

| Config | Occupancy | Bed setup | Ideal for | Description |
| --- | --- | --- | --- | --- |
| Double | 2 | 1 King-size bed | Cặp đôi / honeymoon | Phù hợp cho các cặp đôi, phòng có giường đôi lớn, ban công riêng và đầy đủ tiện nghi. |
| Twin | 2 | 2 single beds | Bạn bè, đồng nghiệp | Phù hợp cho bạn bè hoặc đồng nghiệp, phòng Twin có hai giường đơn, ban công riêng và tiện nghi hiện đại. |
| Triple | 3 | 3 beds | Gia đình nhỏ, nhóm 3 người | Thiết kế dành cho nhóm nhỏ hoặc gia đình, phòng Triple có ba giường và không gian rộng rãi. |
| Connecting | 4 | 2 connecting rooms | Gia đình lớn, nhóm 4 người | Hai phòng thông nhau, lý tưởng cho gia đình hoặc nhóm muốn riêng tư và rộng rãi. |


### 5.4. Catherine Cruise facilities

| Facility | Type | Floor | Description | Notes |
| --- | --- | --- | --- | --- |
| Quầy Lễ Tân | reception | Tầng 1 (giả định) | Khu vực lễ tân thiết kế sang trọng, ấm áp, là nơi chào đón đầu tiên trong hành trình. | Brochure không nêu size |
| Nhà Hàng Harmonia | restaurant | Tầng 2 | Nhà hàng Harmonia mang đến trải nghiệm buffet tinh tế, kết hợp đa dạng món ăn quốc tế và Việt Nam. |  |
| Nhà Hàng Ambrosia | restaurant | Tầng 4 | Nhà hàng Ambrosia mang đến trải nghiệm fine dining riêng tư, lý tưởng cho bữa tối lãng mạn. |  |
| Khu Vực Bar | bar | Tầng 5 (sundeck) | Bar lounge là điểm hẹn lý tưởng để thưởng thức cocktail, nghe nhạc sống và thư giãn lúc hoàng hôn. | Happy Hour Buy 2 Get 1 |
| Sun Deck | outdoor_deck | Tầng 5 | Sundeck lý tưởng để thư giãn, tắm nắng hoặc thưởng thức cocktail lúc hoàng hôn; phù hợp Tai Chi sáng, ngắm sao đêm. |  |
| Bể Bơi 4 Mùa | pool |  | Bể bơi bốn mùa với hệ thống nước ấm, kèm Jacuzzi và view vịnh. |  |
| Sân Golf Mini | entertainment | Tầng cao nhất | Khu chơi golf mini trên tầng cao nhất, thư giãn nhẹ nhàng giữa biển trời. |  |
| Phòng Gym | wellness |  | Phòng gym trang bị thiết bị hiện đại, không gian yên tĩnh. |  |
| Phòng Karaoke | entertainment |  | Phòng karaoke trang bị âm thanh chất lượng cao. | Có phụ phí |
| Phòng Spa | wellness |  | Phòng spa cung cấp massage và trị liệu thảo dược trong không gian yên tĩnh, riêng tư. | Có phụ phí |
| Phòng Xông Hơi Đá Muối Himalaya | wellness |  | Trải nghiệm xông hơi với đá muối Himalaya - thải độc, tăng tuần hoàn, giảm căng thẳng. | Có phụ phí |
| Phòng Cầu Nguyện | spiritual |  | Không gian yên tĩnh, trang nghiêm dành cho khách có nhu cầu cầu nguyện hay chiêm nghiệm. |  |


### 5.5. Catherine Cruise services & activities

| Service | Category | Included | Surcharge | Description |
| --- | --- | --- | --- | --- |
| Lớp Thái Cực Quyền / Yoga | wellness | Có | Không | Lớp học buổi sáng trên sundeck tầng 5. |
| Kayaking / Thuyền nan | water_sport | Có | Không | Chèo kayak hoặc thuyền nan tại Hang Luồn / Hang Trinh Nữ. |
| Tham quan hang động | sightseeing | Có | Không | Hang Sửng Sốt, Hang Trinh Nữ, Hang Luồn. |
| Leo núi Đảo Titop / tắm biển | outdoor | Có | Không | Leo núi hoặc tắm biển tại Đảo Titop. |
| Tham quan Làng Ngọc Trai + Bãi Ba Trái Đào | sightseeing | Có | Không | Tham quan làng ngọc trai và bơi tại bãi biển. |
| Lớp học nấu Bánh Xèo | culinary | Có | Không | Lớp học nấu món Bánh Xèo truyền thống Việt Nam trên sundeck. |
| Happy Hour (Mua 2 tặng 1) | beverage | Khuyến mãi | Không | Khuyến mãi đồ uống tại sundeck bar. |
| Câu mực đêm | entertainment | Không | Có | Câu mực trong tối tự do. |
| Sân golf mini | entertainment | Có (Villa President) | Có (các hạng khác) | Chơi golf mini trên tầng cao nhất. |
| Spa massage | wellness | Một phần (welcome massage tùy hạng phòng) | Có (services thêm) | Dịch vụ massage và trị liệu thảo dược. |
| Xông hơi đá muối Himalaya | wellness | Không | Có | Xông hơi với đá muối Himalaya. |
| Karaoke | entertainment | Không | Có | Phòng karaoke âm thanh chất lượng cao. |
| Dịch vụ Limousine 2 chiều | transport | Có (Villa President) | Có (các hạng khác - nếu yêu cầu) | Đưa đón Limousine 2 chiều (chỉ Villa President). |
| Dịch vụ quản gia (Butler) | concierge | Có (Villa President) | Không | Dịch vụ quản gia riêng (chỉ Villa President). |
| Welcome perks (rượu vang, trái cây) | amenity | Có (tùy hạng phòng) | Không | Đồ chào đón trong phòng. |


## 6. Trang chi tiết Catherine Horizon

### 6.1. Hero detail

**H1:** `Catherine Horizon - Sailing Beyond the Horizon`

**Intro:**

```text
Catherine Horizon is a modern day and night cruise inspired by the golden line of sunset over Ha Long Bay. Designed with Mediterranean warmth, luxurious black and gold accents, open dining spaces and panoramic decks, it is made for guests who want a refined bay experience within a single day or evening.
```

**Quick facts:**

- Type: Day Cruise + Night Dinner Cruise.
- Launch year: 2026.
- Length: 64.79m.
- Width: 12.89m.
- Decks: 3.
- Capacity: 320 guests.
- Day port: Terminal No.42, Tuan Chau Port.
- Night port: Ha Long International Port.

### 6.2. Catherine Horizon facilities

| Facility | Type | Floor | Size | Capacity | Description |
| --- | --- | --- | --- | --- | --- |
| Quầy Lễ Tân | reception | Tầng 1 (Deck 1) | 85 |  | Sảnh lễ tân chào đón du khách với ánh sáng ấm áp, trang trọng và thanh lịch. |
| Nhà Hàng Oceania | restaurant | Tầng 1 (Deck 1) | 325 | 170 khách | Nhà hàng Oceania phong cách hiện đại, thiết kế mở, không gian rộng rãi và tinh tế. |
| Nhà Hàng Panorama | restaurant | Tầng 2 (Deck 2) | 180 | 100 khách | Trần sóng nghệ thuật + quầy bar sơn mài. Sang trọng và hiện đại. |
| Aurora Sky Bar | bar | Tầng 3 (Deck 3) | 215 | 70 khách | Aurora SkyBar với góc nhìn vô cực, chân trời kéo dài vô tận. |
| Bể Bơi 4 Mùa | pool | Tầng 2 (Deck 2) | 42 |  | Bể bơi vô cực thiết kế mở, tầm nhìn toàn cảnh vịnh. |
| Sân Khấu | entertainment | Tầng 2 (Deck 2) | 16 |  | Sân khấu biểu diễn nhạc sống/canapé party. |
| Phòng Ăn Riêng | restaurant_private | Tầng hầm (Basement) |  | 12 khách | Phòng ăn riêng dành cho nhóm tối đa 12 khách. |
| Phòng Spa | wellness | Tầng hầm (Basement) | 60 | 5 giường | Phòng spa với 5 giường massage. |
| Phòng Nghỉ Thư Giãn | wellness | Tầng hầm (Basement) |  | 10 ghế thư giãn | Phòng nghỉ với 10 ghế thư giãn. |


### 6.3. Catherine Horizon services & activities

| Service | Category | Included | Surcharge | Itineraries | Description |
| --- | --- | --- | --- | --- | --- |
| Welcome drink + briefing | amenity | Có | Không | IT-HRZ-DAY, IT-HRZ-DAYPLUS | Đồ uống chào đón + giới thiệu hành trình. |
| Tham quan hang động | sightseeing | Có | Không | IT-HRZ-DAY, IT-HRZ-DAYPLUS | Động Mê Cung / Hang Sửng Sốt / Hang Trinh Nữ tùy hành trình. |
| Tham quan Làng Ngọc Trai | sightseeing | Có | Không | IT-HRZ-DAY | Tham quan làng nghề nuôi cấy ngọc trai. |
| Tham quan Đảo Ti Tốp + Hang Sửng Sốt | sightseeing | Có (Expanded) | Có (vs Heritage Day cơ bản) | IT-HRZ-DAYPLUS | Tắm biển/leo núi tại Đảo Titop + tham quan Hang Sửng Sốt. |
| Kayak tại Hang Trinh Nữ | water_sport | Có | Không | IT-HRZ-DAY, IT-HRZ-DAYPLUS | Kayak / tham quan động / tắm biển. |
| Bữa trưa gourmet | culinary | Có | Không | IT-HRZ-DAY, IT-HRZ-DAYPLUS | Hải sản tươi + ẩm thực Á-Âu. |
| Bữa tối gourmet (Night) | culinary | Có | Không | IT-HRZ-NIGHT | Hải sản tươi + ẩm thực Á-Âu cho hải trình đêm. |
| Tiệc Hoàng Hôn | experience | Có | Không | IT-HRZ-NIGHT | Tiệc trà nhẹ, trái cây và ngắm hoàng hôn trên vịnh. |
| Tiệc Canapé + nhạc sống | experience | Có | Không | IT-HRZ-DAY, IT-HRZ-DAYPLUS | Tiệc canapé với chương trình nhạc sống đặc sắc. |
| Spa massage | wellness | Không | Có | IT-HRZ-DAY, IT-HRZ-DAYPLUS, IT-HRZ-NIGHT | Massage tại phòng spa basement (5 giường). |


## 7. Itinerary detail pages

Mỗi itinerary nên có một trang riêng hoặc block accordion trong trang chi tiết. Cấu trúc trang gồm:

- Hero image theo route.
- Duration, type, departure port, return port.
- Route highlights.
- Timeline theo thời gian.
- Included experiences.
- Notes về phụ phí nếu có.
- CTA sticky: `Request this itinerary`.


### 7.1. Hải trình 2N1Đ - 2 ngày 1 đêm

**Cruise:** Catherine Cruise  
**Route:** Hang Sửng Sốt → Đảo Titop → Hang Luồn  
**Departure:** Cảng quốc tế Tuần Châu  
**Return:** Cảng quốc tế Tuần Châu  
**Surcharge:** Không

| Day | Time | Activity | Location | Optional | Surcharge |
| --- | --- | --- | --- | --- | --- |
| 1 | 11:30 | Đến nhà chờ Catherine Cruise tại cảng tàu quốc tế Tuần Châu | Tuan Chau Port | Không | Không |
| 1 | 12:15 | Quản lý tàu giới thiệu thông tin tàu và nhận phòng | Reception | Không | Không |
| 1 | 12:45 | Bữa trưa buffet hoặc set menu tại nhà hàng HARMONIA | Harmonia Restaurant | Không | Không |
| 1 | 14:10 | Tham quan Hang Sửng Sốt - hang động lớn nhất Vịnh Hạ Long | Surprise Cave | Không | Không |
| 1 | 16:00 | Tham quan Đảo Titop - leo núi hoặc tắm biển | Titop Island | Không | Không |
| 1 | 17:30 | Happy Hour (Mua 2 tặng 1) tại quầy bar sundeck tầng 5 | Sundeck Bar | Có | Không |
| 1 | 18:00 | Lớp học nấu ăn món Bánh Xèo truyền thống trên sundeck tầng 5 | Sundeck | Có | Không |
| 1 | 19:00 | Bữa tối thịnh soạn tại nhà hàng AMBROSIA tầng 4 | Ambrosia Restaurant | Không | Không |
| 1 | 21:00 | Tự do: Câu mực, mini golf, spa, xông hơi đá muối, karaoke | Onboard | Có | Có |
| 1 | 21:30 | Happy Hour lần 2 tại sundeck tầng 5 | Sundeck Bar | Có | Không |
| 2 | 06:15 | Lớp học Thái Cực Quyền hoặc Yoga trên sundeck tầng 5 | Sundeck | Có | Không |
| 2 | 06:45 | Bữa sáng nhẹ tại nhà hàng HARMONIA tầng 2 | Harmonia Restaurant | Không | Không |
| 2 | 07:15 | Khám phá Vịnh Hạ Long bằng kayak/thuyền nan tại Hang Luồn | Luon Cave | Không | Không |
| 2 | 09:30 | Trả phòng | Reception | Không | Không |
| 2 | 09:45 | Bữa trưa sớm tại nhà hàng tầng 2 trên đường quay về cảng | Harmonia Restaurant | Không | Không |
| 2 | 10:30 | Rời tàu Catherine, quay trở lại cảng quốc tế Tuần Châu | Tuan Chau Port | Không | Không |

### 7.2. Hải trình 3N2Đ - 3 ngày 2 đêm

**Cruise:** Catherine Cruise  
**Route:** Hang Sửng Sốt → Đảo Titop → Hang Trinh Nữ → Bãi Biển Ba Trái Đào → Làng Ngọc Trai → Hang Luồn  
**Departure:** Cảng quốc tế Tuần Châu  
**Return:** Cảng quốc tế Tuần Châu  
**Surcharge:** Không

| Day | Time | Activity | Location | Optional | Surcharge |
| --- | --- | --- | --- | --- | --- |
| 1 | 11:30 | Đến nhà chờ Catherine Cruise tại cảng quốc tế Tuần Châu | Tuan Chau Port | Không | Không |
| 1 | 12:15 | Quản lý tàu giới thiệu và nhận phòng | Reception | Không | Không |
| 1 | 12:45 | Bữa trưa buffet/set menu tại HARMONIA tầng 2 | Harmonia Restaurant | Không | Không |
| 1 | 14:10 | Tham quan Hang Sửng Sốt | Surprise Cave | Không | Không |
| 1 | 16:00 | Tham quan Đảo Titop | Titop Island | Không | Không |
| 1 | 17:30 | Happy Hour tại sundeck | Sundeck Bar | Có | Không |
| 1 | 18:00 | Lớp học nấu ăn Bánh Xèo | Sundeck | Có | Không |
| 1 | 19:00 | Bữa tối tại nhà hàng AMBROSIA tầng 4 | Ambrosia Restaurant | Không | Không |
| 1 | 21:00 | Tự do: câu mực, mini golf, spa, xông hơi, karaoke | Onboard | Có | Có |
| 1 | 21:30 | Happy Hour lần 2 | Sundeck Bar | Có | Không |
| 2 | 06:15 | Thái Cực Quyền trên sundeck | Sundeck | Có | Không |
| 2 | 06:45 | Bữa sáng tại HARMONIA | Harmonia Restaurant | Không | Không |
| 2 | 08:30 | Chuyển sang tàu ngày khám phá Vịnh, tham quan Hang Trinh Nữ bằng xuồng gỗ/kayak | Trinh Nu Cave | Không | Không |
| 2 | 12:00 | Bữa trưa trên tàu ngày, bơi tại Bãi Ba Trái Đào, tham quan Làng Ngọc Trai | Day cruise | Không | Không |
| 2 | 15:00 | Trở lại tàu chính, thư giãn hồ bơi hoặc quầy bar | Onboard | Có | Không |
| 2 | 17:30 | Happy Hour tại sundeck | Sundeck Bar | Có | Không |
| 2 | 18:00 | Lớp học nấu ăn Bánh Xèo trên sundeck | Sundeck | Có | Không |
| 2 | 19:00 | Bữa tối tại AMBROSIA | Ambrosia Restaurant | Không | Không |
| 2 | 21:00 | Tự do: câu mực, mini golf, spa, xông hơi, karaoke | Onboard | Có | Có |
| 2 | 21:30 | Happy Hour lần 2 | Sundeck Bar | Có | Không |
| 3 | 06:15 | Thái Cực Quyền trên sundeck | Sundeck | Có | Không |
| 3 | 06:45 | Bữa sáng nhẹ tại HARMONIA | Harmonia Restaurant | Không | Không |
| 3 | 07:30 | Kayak/thuyền nan tại Hang Luồn | Luon Cave | Không | Không |
| 3 | 09:30 | Trả phòng | Reception | Không | Không |
| 3 | 09:45 | Bữa trưa sớm tại nhà hàng tầng 2 | Harmonia Restaurant | Không | Không |
| 3 | 11:00 | Rời tàu Catherine, về cảng quốc tế Tuần Châu | Tuan Chau Port | Không | Không |

### 7.3. Hải trình Di Sản - 1 ngày (08:15-16:30)

**Cruise:** Catherine Horizon  
**Route:** Động Mê Cung → Làng nghề Ngọc Trai → Hang Trinh Nữ  
**Departure:** Cảng tàu khách Quốc tế Hạ Long (Cảng Sun)  
**Return:** Cảng Tuần Châu  
**Surcharge:** Không

| Day | Time | Activity | Location | Optional | Surcharge |
| --- | --- | --- | --- | --- | --- |
| 1 | 08:15 | Đón khách tại Cảng tàu khách Quốc tế Hạ Long (Cảng Sun); welcome drink + giới thiệu | Sun Port | Không | Không |
| 1 | 09:15 | Khởi hành tour Vịnh Hạ Long; thư giãn boong tàu/bể bơi/nhà hàng | Onboard | Không | Không |
| 1 | 10:15 | Tham quan Động Mê Cung + Làng nghề Ngọc Trai | Me Cung Cave & Pearl Farm | Không | Không |
| 1 | 12:15 | Bữa trưa cao cấp với hải sản tươi và ẩm thực Á-Âu | Onboard restaurant | Không | Không |
| 1 | 14:00 | Tham quan Hang Trinh Nữ - kayak, tham quan động, tắm biển | Trinh Nu Cave | Không | Không |
| 1 | 15:15 | Tiệc Canapé + nhạc sống trên đường về cảng | Onboard | Không | Không |
| 1 | 16:30 | Cập cảng Tuần Châu, kết thúc hành trình | Tuan Chau Port | Không | Không |

### 7.4. Hải trình Di Sản Mở Rộng - 1 ngày (08:15-16:30)

**Cruise:** Catherine Horizon  
**Route:** Đảo Ti Tốp → Hang Sửng Sốt → Hang Trinh Nữ  
**Departure:** Cảng tàu khách Quốc tế Hạ Long (Cảng Sun)  
**Return:** Cảng Tuần Châu  
**Surcharge:** CÓ

| Day | Time | Activity | Location | Optional | Surcharge |
| --- | --- | --- | --- | --- | --- |
| 1 | 08:15 | Đón khách tại Cảng Sun; welcome drink + giới thiệu | Sun Port | Không | Không |
| 1 | 09:15 | Khởi hành tour Vịnh Hạ Long | Onboard | Không | Không |
| 1 | 10:15 | Tham quan Đảo Ti Tốp (tắm biển/leo núi) + Hang Sửng Sốt | Titop Island & Sung Sot | Không | Có |
| 1 | 12:15 | Bữa trưa cao cấp hải sản + ẩm thực Á-Âu | Onboard restaurant | Không | Không |
| 1 | 14:00 | Tham quan Hang Trinh Nữ | Trinh Nu Cave | Không | Không |
| 1 | 15:15 | Tiệc Canapé + nhạc sống | Onboard | Không | Không |
| 1 | 16:30 | Cập cảng Tuần Châu | Tuan Chau Port | Không | Không |

### 7.5. Hải trình Đêm - Tối (17:30-21:30)

**Cruise:** Catherine Horizon  
**Route:** Thưởng phong vị trên Vịnh Di Sản; ngắm Núi Bài Thơ, Cầu Bãi Cháy, vòng quay Mặt Trời  
**Departure:** Cảng tàu khách Quốc tế Hạ Long  
**Return:** Cảng Quốc tế Hạ Long  
**Surcharge:** Không

| Day | Time | Activity | Location | Optional | Surcharge |
| --- | --- | --- | --- | --- | --- |
| 1 | 17:30 | Đón khách tại Cảng tàu khách Quốc tế Hạ Long | Ha Long Port | Không | Không |
| 1 | 18:15 | Khởi hành + Tiệc Hoàng Hôn (trà nhẹ, trái cây, ngắm hoàng hôn) | Onboard | Không | Không |
| 1 | 19:00 | Bữa tối cao cấp hải sản + ẩm thực Á-Âu | Onboard restaurant | Không | Không |
| 1 | 20:00 | Giải trí + ngắm cảnh: Núi Bài Thơ, Cầu Bãi Cháy, vòng quay Mặt Trời | Onboard | Không | Không |
| 1 | 21:30 | Quay về cảng, kết thúc hành trình | Ha Long Port | Không | Không |


## 8. Inquiry form specification

Website giai đoạn L1 nên dùng inquiry form thay vì booking engine có thanh toán, vì catalog chưa có pricing, availability, cancellation policy và phụ phí đầy đủ.

### 8.1. Form logic

- Step 1: Guest information.
- Step 2: Cruise interest.
- Step 3: Itinerary and date.
- Step 4: Guests and room preference.
- Step 5: Special request and submit.

### 8.2. Field schema

| Code | Label VN | Label EN | Type | Required | Options/source | UX order |
| --- | --- | --- | --- | --- | --- | --- |
| full_name | Họ và tên | Full name | text | Yes | - | 1 |
| email | Email | Email | email | Yes | - | 2 |
| phone | Số điện thoại | Phone number | phone | Yes | - | 3 |
| country | Quốc tịch | Nationality | dropdown | Yes | ISO country list | 4 |
| cruise_choice | Du thuyền quan tâm | Cruise interest | dropdown | Yes | Source: 01_Cruises (Catherine / Horizon) | 5 |
| itinerary_choice | Hành trình | Itinerary | dropdown (conditional) | Yes | Source: 03_Itineraries (filtered by cruise_choice) | 6 |
| checkin_date | Ngày khởi hành mong muốn | Desired departure date | date | Yes | Date picker, today+1 trở đi | 7 |
| duration_nights | Số đêm (nếu overnight) | Number of nights | number (conditional) | No | Auto-set theo itinerary 2D1N/3D2N | 8 |
| num_adults | Số người lớn | Number of adults | number | Yes | 1-20 | 9 |
| num_children | Số trẻ em | Number of children | number | No | 0-10 | 10 |
| num_infants | Số em bé | Number of infants | number | No | 0-5 | 11 |
| room_preference | Hạng phòng mong muốn (Catherine) | Preferred room type (Catherine) | dropdown (conditional) | No | Source: 02_Room_Types (chỉ hiện khi cruise=Catherine) | 12 |
| bed_config | Cấu hình giường (Premier) | Bed configuration (Premier) | dropdown (conditional) | No | Source: 02b_Bed_Configs (chỉ hiện khi room=Premier) | 13 |
| addons | Dịch vụ bổ sung quan tâm | Add-on services of interest | multi-checkbox | No | Source: 06_Activities_Services (has_surcharge=Yes) | 14 |
| special_requests | Yêu cầu đặc biệt | Special requests | textarea | No | free text | 15 |
| source | Bạn biết đến chúng tôi qua đâu? | How did you hear about us? | dropdown | No | Google / Facebook / Instagram / Friend / TripAdvisor / Other | 16 |


### 8.3. Success message

```text
Thank you for your inquiry. Our cruise specialist will contact you shortly with availability, room options and a tailored quotation for your preferred journey.
```

### 8.4. Tracking events

| Event | Trigger | Suggested parameter |
|---|---|---|
| `hero_cta_click` | Click CTA trên hero | cta_label, page |
| `quick_inquiry_start` | Click Check Availability | cruise_interest |
| `inquiry_step_complete` | Hoàn thành mỗi step | step_number |
| `inquiry_submit` | Submit form thành công | cruise, itinerary, guests |
| `room_request_click` | Click Request This Room | room_type |
| `itinerary_request_click` | Click Request This Itinerary | itinerary_id |
| `phone_click` | Click hotline | location, cruise |
| `email_click` | Click email | location, cruise |

## 9. Visual direction & image requirements

### 9.1. Homepage image list

- 3 hero images: exterior cruise at golden hour, sundeck lifestyle, bay panorama.
- 2 image sets for Catherine Cruise: exterior, suite, restaurant, sundeck, spa, activities.
- 2 image sets for Catherine Horizon: exterior, Oceania/Panorama restaurant, Aurora Sky Bar, pool, sunset party, night dinner.
- 5 destination images: Surprise Cave, Titop Island, Luon Cave, Trinh Nu Cave, Pearl Farm.
- 6 blog thumbnails.

### 9.2. Recommended sizes

| Placement | Ratio | Recommended size | Notes |
|---|---|---|---|
| Homepage hero | 16:9 / 21:9 | 2400x1350 or 2880x1620 | Need negative space for headline |
| Mobile hero | 4:5 / 9:16 | 1080x1350 or 1170x1463 | Crop separately |
| Cruise card | 4:3 | 1200x900 | Keep subject clear |
| Room card | 4:3 | 1200x900 | Interior should be bright and clean |
| Facility card | 3:2 | 1200x800 | Consistent crop across grid |
| Blog thumbnail | 3:2 | 1200x800 | Story-driven photo |
| Detail gallery | 4:3 | 1600x1200 | Mix wide, interior, lifestyle, detail |

### 9.3. Image prompts for asset creation

**Hero:**

```text
Luxury cruise ship sailing through emerald Ha Long Bay at golden hour, cinematic travel editorial photography, premium hospitality atmosphere, warm sunlight, elegant composition, wide negative space for headline, no text, no logo.
```

**Catherine Cruise suite:**

```text
Luxury Indochine-style cruise suite interior, warm wood, elegant brass details, private balcony overlooking Ha Long Bay, soft morning light, premium hotel photography, no text, no logo.
```

**Catherine Horizon sunset party:**

```text
Modern Mediterranean-inspired cruise deck at sunset, black and gold luxury accents, guests enjoying canapé party and live music, panoramic Ha Long Bay background, elegant travel lifestyle photography, no text, no logo.
```

## 10. SEO structure

### 10.1. Homepage SEO

**Meta title:**

```text
Catherine Cruises - Luxury Ha Long Bay Cruises | Overnight, Day & Night Cruises
```

**Meta description:**

```text
Explore Ha Long Bay with Catherine Cruise and Catherine Horizon. Choose from luxury overnight itineraries, day cruises and night dinner cruises with refined dining, wellness and curated bay experiences.
```

### 10.2. Detail page SEO templates

**Catherine Cruise:**

```text
Catherine Cruise Ha Long Bay - Luxury Overnight Cruise 2D1N & 3D2N
```

**Catherine Horizon:**

```text
Catherine Horizon Ha Long Bay - Day Cruise & Night Dinner Cruise
```

**Itinerary pages:**

```text
[Itinerary Name] - [Duration] Ha Long Bay Cruise | Catherine Cruises
```

### 10.3. Schema suggestions

- `TravelAgency` or `Organization` for brand/company.
- `TouristTrip` for each itinerary.
- `FAQPage` for FAQs.
- `BreadcrumbList` for all detail pages.
- `Product` can be used only when pricing/availability is added later.

## 11. Component library

### 11.1. Buttons

- Primary: gold background, navy text, height 48-56px.
- Secondary: transparent border, white/gold text depending on background.
- Text link: gold underline on hover.

### 11.2. Cards

- Cruise card: image, badge, H3, short copy, facts, CTA.
- Room card: image, size, occupancy, benefits, CTA.
- Itinerary card: route, duration, type, highlights, CTA.
- Facility card: image/icon, name, description.
- Blog card: image, category, title, excerpt, read more.

### 11.3. Modal

- Desktop width: 960-1160px.
- Mobile: full-screen bottom sheet.
- Progress indicator: Step 1/5.
- Sticky submit button on mobile.

## 12. Development notes

### 12.1. Front-end

- Responsive breakpoints: 375px, 768px, 1024px, 1280px, 1440px.
- Use image lazy loading below first viewport.
- Use WebP/AVIF with fallback JPG.
- Hero video should have poster image, muted autoplay, no audio.
- Add accessibility labels for form fields, buttons and carousel controls.

### 12.2. CMS/content model

Recommended content types:

```text
Cruise
  id
  name
  type
  tagline
  story
  specs
  ports
  hero_image
  gallery

RoomType
  id
  cruise_id
  name
  size
  floor
  occupancy
  amenities
  perks
  gallery

Itinerary
  id
  cruise_id
  name
  duration
  type
  highlights
  departure_port
  return_port
  has_surcharge
  schedule[]

Facility
  id
  cruise_id
  name
  type
  floor
  size
  capacity
  description
  image

Service
  id
  cruise_id
  name
  category
  included
  surcharge
  itinerary_ids

Inquiry
  full_name
  email
  phone
  country
  cruise_choice
  itinerary_choice
  checkin_date
  guests
  room_preference
  bed_config
  addons
  special_requests
  source
```

### 12.3. CRM/email handling

- Submit form to CRM or Google Sheet at minimum.
- Auto-email to sales team with all lead details.
- Auto-confirmation email to customer.
- Tag source: website, campaign, landing page, CTA position.

## 13. Data gaps cần bổ sung trước khi go-live

| Gap | Mức độ ảnh hưởng | Gợi ý xử lý |
|---|---|---|
| Pricing | Rất cao | Không hiển thị giá. Dùng Request a Quote tới khi có bảng giá chính thức |
| Availability | Rất cao | Dùng inquiry form thay vì booking real-time |
| Cancellation policy | Cao | Cần trang policy riêng trước khi chạy ads mạnh |
| Surcharge prices | Cao | Các dịch vụ spa, karaoke, squid fishing, Day Plus cần sales confirm |
| Photo URLs | Cao | Cần CDN/asset folder cho từng cruise, room, facility, activity |
| Room inventory breakdown | Trung bình | Cần số lượng từng hạng phòng nếu muốn hiển thị availability |
| Departure days | Trung bình | Nếu daily departure chưa xác nhận, chỉ ghi `Available on request` |
| Legal/company info | Trung bình | Cần bổ sung giấy phép, thông tin doanh nghiệp nếu có |

## 14. MVP launch recommendation

Giai đoạn 1 nên làm các trang sau:

1. Homepage.
2. Catherine Cruise detail.
3. Catherine Horizon detail.
4. Itineraries page.
5. Inquiry/contact page.
6. Offers landing page dạng campaign.
7. 6-8 bài guidebook SEO nền tảng.

Không nên triển khai payment hoặc instant booking ở giai đoạn này nếu chưa có dữ liệu giá, slot, chính sách hoàn hủy và phụ phí hoàn chỉnh.

## 15. Checklist bàn giao designer/dev

### Designer

- Wireframe desktop + mobile cho homepage.
- UI kit: màu, font, button, card, form, modal.
- Hero crop desktop/mobile.
- Component states: hover, active, disabled, loading, error.
- Gallery layout cho room/itinerary.

### Content team

- Final copy cho hero, cruise cards, room cards, itinerary cards.
- FAQ về đặt tour, thời tiết, trẻ em, ăn uống, đón tiễn, phụ phí.
- SEO title/meta cho toàn bộ page.
- Bài guidebook đầu tiên.

### Dev

- Responsive chuẩn mobile.
- Form gửi được dữ liệu.
- Tracking CTA/form/click phone/email.
- Lazy load ảnh.
- CMS data model đúng với catalog.
- Không hard-code giá khi chưa có giá chính thức.

## 16. Gợi ý copy nhanh cho homepage

### Hero

```text
Sail Beyond the Horizon

Discover Ha Long Bay through two signature journeys: an Indochine-inspired overnight escape with Catherine Cruise and a modern Mediterranean day or night experience with Catherine Horizon.

CTA 1: Explore Our Cruises
CTA 2: Check Availability
```

### Cruise section

```text
Choose Your Way to Experience Ha Long Bay

Stay overnight in timeless Indochine elegance or spend a remarkable day and evening on the bay. Catherine Cruises brings together refined hospitality, curated routes and unforgettable moments on Vietnam's most iconic seascape.
```

### Inquiry CTA

```text
Let Us Curate Your Voyage

Tell us your preferred date, cruise and travel style. Our cruise specialist will help you check availability and prepare a tailored quotation.
```

### Footer brand line

```text
Catherine Cruises crafts refined journeys across Ha Long Bay, from overnight luxury escapes to day and night experiences shaped by cuisine, culture and the beauty of the horizon.
```
