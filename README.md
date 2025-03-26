# Book-Bazzar

Book-Bazzar is an online bookstore where users can browse, buy books. The platform supports both buyers  offering a seamless book trading experience.

## Features
- **User Authentication**: Sign up, log in, and manage accounts.
- **Book Listings**: Users can add books for sale with details like price, description, and images.
- **Dark & Light Mode**: Toggle between themes for a better user experience.
- **Seller Dashboard**: Manage listed books, view sales, and track orders.
- **Admin Panel**: Admins can edit users, manage book listings, and monitor transactions.
- **Payment Gateway**: A simple payment system for book purchases (without Stripe).

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- Git

### Setup Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/trynalearny/book-bazar.git
   ```
2. Navigate into the project folder:
   ```sh
   cd book-bazzar
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables (`.env` file):
   ```
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
5. Start the development server:
   ```sh
   npm start
   ```

## Usage
- Visit `http://localhost:5000` in your browser to access the platform.
- Sign up or log in to explore book listings.
-  buyers can purchase them securely.

## Contributing
Contributions are welcome! Fork the repository and submit a pull request with your improvements.
