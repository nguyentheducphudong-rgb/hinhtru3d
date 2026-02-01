# 🔷 Hình Trụ 3D - Web App Tương Tác

Web app mô phỏng **Hình Trụ 3D** và **Khai triển hình trụ** phục vụ dạy học Toán tiểu học.

## 🚀 Cài đặt & Chạy

```bash
# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt: **http://localhost:5173**

## ✨ Tính năng

### 🎮 Tương tác 3D
- **Xoay**: Kéo chuột trái để xoay hình
- **Zoom**: Cuộn chuột để phóng to/thu nhỏ
- **Reset Camera**: Nút khôi phục góc nhìn ban đầu

### 📐 Khai triển hình trụ
- Slider **"Mở khối"** (0% → 100%)
- Animation mượt realtime
- Khi 100%: 
  - Mặt xung quanh → Hình chữ nhật (chiều dài = 2πr)
  - 2 đáy → 2 hình tròn gắn trên/dưới

### 🎛️ Điều khiển
| Control | Mô tả |
|---------|-------|
| **Bán kính (r)** | 0.5 - 5 cm |
| **Chiều cao (h)** | 1 - 10 cm |
| **Độ trong suốt** | 20 - 100% |
| **Mở khối** | 0 - 100% |

### 🔴🔵🔷🟢 Nút Thành phần
- **ĐỈNH**: Highlight 2 đáy tròn
- **CẠNH**: Highlight các cạnh
- **MẶT**: Highlight mặt xung quanh
- **NHÃN**: Hiển thị r, h, C = 2πr

### 🧮 Công thức Toán học

```
Chu vi đáy:         C = 2πr
Diện tích xung quanh: Sxq = 2πrh
Diện tích toàn phần:  Stp = 2πr(r + h)
Thể tích:           V = πr²h
```

## 🛠️ Công nghệ

- **React 19** + **TypeScript**
- **Three.js** với @react-three/fiber & drei
- **Vite** - Build tool

## 📁 Cấu trúc

```
src/
├── components/
│   ├── Cylinder3D.tsx    # Hình trụ 3D với animation unfold
│   ├── Scene.tsx         # Canvas, lighting, controls
│   ├── ControlPanel.tsx  # Panel điều khiển
│   ├── CalculationPanel.tsx  # Bảng công thức
│   ├── Slider.tsx        # Custom slider
│   └── PillButton.tsx    # Nút pill
├── App.tsx               # Component chính
├── App.css               # Layout styles
└── index.css             # Base styles
```

## 📝 Ghi chú Animation Khai triển

```typescript
// Mặt xung quanh: interpolate từ hình trụ → hình chữ nhật
const cylinderX = Math.sin(theta) * radius;  // Vị trí trên đường tròn
const flatX = (t - 0.5) * circumference;     // Vị trí trên đường thẳng
const x = lerp(cylinderX, flatX, progress);  // Nội suy theo progress

// 2 đáy: tách ra và xoay
const topCapY = height/2 + separation;       // Đáy trên trượt lên
const bottomCapY = -height/2 - separation;   // Đáy dưới trượt xuống
const capRotation = progress * Math.PI/2;    // Xoay từ ngang → đứng
```

---

**Được thiết kế cho học sinh tiểu học** 📚🎓
