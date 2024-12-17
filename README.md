# Chat App

![Project Screenshot](https://via.placeholder.com/800x400.png?text=Chat+App+Preview)

## 📜 **Description**
A fully functional **Real-Time Chat Application** built using the **MERN Stack** with features like real-time messaging, online user status, and secure authentication. The app uses **Socket.io** for real-time communication and state management with **Zustand**.

---

## 🚀 **Features**
- **Authentication & Authorization**: Secure user login with **JWT**.
- **Real-Time Messaging**: Instant messaging powered by **Socket.io**.
- **User Status Tracking**: Shows online/offline status for users.
- **Global State Management**: Handled efficiently with **Zustand**.
- **Error Handling**: Robust error management on both server and client sides.
- **Modern UI**: Styled with **TailwindCSS** and **DaisyUI**.

---

## 🛠 **Tech Stack**

| **Technology**    | **Details**                 |
|--------------------|-----------------------------|
| **Frontend**       | React.js, Zustand, TailwindCSS, DaisyUI |
| **Backend**        | Node.js, Express.js        |
| **Real-time**      | Socket.io                  |
| **Database**       | MongoDB                    |
| **Authentication** | JWT                        |
| **Version Control**| Git & GitHub               |

---

## 🔧 **Setup & Installation**
Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/chat-app.git
cd chat-app
```

### 2. Install Dependencies
**Install server and client dependencies:**
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 3. Environment Setup
Create a `.env` file in the `server` folder and add:
```env
PORT=5001
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the Application
Run the server and client:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend client
cd frontend
npm run dev
```
Access the app at: `http://localhost:5173`

---

## 📸 **Screenshots**
### **1. Login Page**
![Login Screenshot](https://via.placeholder.com/600x300.png?text=Login+Page)

### **2. Chat Interface**
![Chat Screenshot](https://via.placeholder.com/600x300.png?text=Chat+Interface)

### **3. Real-Time Updates**
![Real-Time Screenshot](https://via.placeholder.com/600x300.png?text=Real-Time+Updates)

---

## 🤝 **Contributing**
Feel free to **fork** this repository and submit a pull request for any feature suggestions or bug fixes.

---

### ⭐ **If you like this project, don't forget to give it a star!** ⭐

