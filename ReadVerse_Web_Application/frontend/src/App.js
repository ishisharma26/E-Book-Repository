// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Mycomponants/Pages/Home';
import DataHome from './Mycomponants/Pages/DataHome';

import ItemDetails from './Mycomponants/Pages/ItemDetails';
import Category from './Mycomponants/Pages/Category';
import Login from './Mycomponants/UserPages/Login';
import SignUp from './Mycomponants/UserPages/SignUp';
import AdminLogin from './Mycomponants/AdminPages.js/AdminLogin';
import AuthorLogin from './Mycomponants/AuthorPages/AuthorLogin';
import AuthorSignUp from './Mycomponants/AuthorPages/AuthorSignUp';
import AdminDashBoard from './Mycomponants/AdminPages.js/AdminDashBoard';
import AdminPanel from './Mycomponants/AdminPages.js/AdminPanel';
import UserDashBoard from './Mycomponants/UserPages/UserDashBoard';
import UserPanel from './Mycomponants/UserPages/UserPanel';
import Cart from './Mycomponants/UserPages/Cart';
import AuthorPanel from './Mycomponants/AuthorPages/AuthorPanel';
import AuthorDashBoard from './Mycomponants/AuthorPages/AuthorDashBoard';
import UserChangePassword from './Mycomponants/UserPages/UserChangePassword';
import AdminChangePassword from './Mycomponants/AdminPages.js/AdminChangePassword';
import AuthorChangePassword from './Mycomponants/AuthorPages/AuthorChangePassword';
import UserMyProfile from './Mycomponants/UserPages/UserMyProfile';
import UpdateUserProfile from './Mycomponants/UserPages/UpdateUserProfile';
import AuthorMyProfile from './Mycomponants/AuthorPages/AuthorMyProfile';
import UpdateAuthorProfile from './Mycomponants/AuthorPages/UpdateAuthorProfile';
import ViewAllUser from './Mycomponants/AdminPages.js/ViewAllUser';
import ViewAllAthors from './Mycomponants/AdminPages.js/ViewAllAuthors';
import ViewAllRquestedAuthor from './Mycomponants/AdminPages.js/ViewAllRquestedAuthor';
import AddGenres from './Mycomponants/AdminPages.js/AddGenres';
import ViewAllGenre from './Mycomponants/AdminPages.js/ViewAllGenre';
import UpdateGenres from './Mycomponants/AdminPages.js/UpdatedGenres';
import AddBook from './Mycomponants/AuthorPages/AddBook';
import ViewMyBook from './Mycomponants/AuthorPages/ViewMyBook';
import UpdateBook from './Mycomponants/AuthorPages/UpdateBook';
import ViewAllBook from './Mycomponants/AdminPages.js/ViewAllBook';
import ViewShops from './Mycomponants/UserPages/ViewShops';
import UserItemDetails from './Mycomponants/UserPages/UserItemDetails';
import PaymentPage from './Mycomponants/UserPages/PaymentPage';
import ViewUserBooking from './Mycomponants/UserPages/ViewUserBooking';
import ViewBookingDetails from './Mycomponants/UserPages/ViewBookingDetails';
import ViewAllBooking from './Mycomponants/AdminPages.js/ViewAllBooking';
import AdminBookingDetails from './Mycomponants/AdminPages.js/AdminBookDetails';
import FrontViewShops from './Mycomponants/Pages/FrontViewShops';
import FrontItemDetails from './Mycomponants/Pages/FrontItemDetails';
import WishList from './Mycomponants/UserPages/WishList';
import ViewAuthorOrder from './Mycomponants/AuthorPages/ViewAuthorOrder';
import AuthorBookingDetails from './Mycomponants/AuthorPages/AuthorBookingDetails';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} >
        <Route index element={<DataHome />}  />
        <Route path="itemDetails" element={<ItemDetails/>}  />
        <Route path="category" element={<Category/>}  />
        <Route path="login" element={<Login/>}  />
        <Route path="signUp" element={<SignUp/>}  />
        <Route path="adminLogin" element={<AdminLogin/>}  />
        <Route path="authorLogin" element={<AuthorLogin/>}  />
        <Route path="AuthorSignUp" element={<AuthorSignUp/>}  />
        <Route path="frontViewShops" element={<FrontViewShops/>}  />
        <Route path="frontItemDetails" element={<FrontItemDetails/>}  />

      </Route>
    
     <Route path="/" element={<AdminPanel />} >
              <Route path="adminDashBoard" element={<AdminDashBoard/>}  />
              <Route path="adminChangePassword" element={<AdminChangePassword/>}  />
              <Route path="viewAllUser" element={<ViewAllUser/>}  />
              <Route path="viewAllAthors" element={<ViewAllAthors/>}  />
              <Route path="viewAllRquestedAuthor" element={<ViewAllRquestedAuthor/>}  />
              <Route path="addGenres" element={<AddGenres/>}  />
              <Route path="viewAllGenre" element={<ViewAllGenre/>}  />
              <Route path="updateGenre" element={<UpdateGenres/>}  />
              <Route path="viewAllBook" element={<ViewAllBook/>}  />
              <Route path="viewAllBooking" element={<ViewAllBooking/>}  />
              <Route path="adminBookingDetails" element={<AdminBookingDetails/>}  />
             
      </Route>
     
      <Route path="/" element={<UserPanel />} >
      <Route path="userDashBoard" element={<UserDashBoard/>}  />
      <Route path="userChangePassword" element={<UserChangePassword/>}  />
      <Route path="userMyProfile" element={<UserMyProfile/>}  />
      <Route path="updateUserProfile" element={<UpdateUserProfile/>}  />
      <Route path="viewShops" element={<ViewShops/>}  /> 
      <Route path="userItemDetails" element={<UserItemDetails/>}  /> 
      <Route path="cart" element={<Cart/>}  />
      <Route path="paymentPage" element={<PaymentPage/>}  />
      <Route path="viewUserBooking" element={<ViewUserBooking/>}  />
      <Route path="viewBookingDetails" element={<ViewBookingDetails/>}  />
      <Route path="wishList" element={<WishList/>}/>
     
       
      </Route>

      <Route path="/" element={<AuthorPanel />} >
      <Route path="authorDashBoard" element={<AuthorDashBoard/>}  />
      <Route path="authorChangePassword" element={<AuthorChangePassword/>}  />
      <Route path="authorMyProfile" element={<AuthorMyProfile/>}  />
      <Route path="updateAuthorProfile" element={<UpdateAuthorProfile/>}  />
      <Route path="addBook" element={<AddBook/>}  />
      <Route path="viewMyBook" element={<ViewMyBook/>}  />
      <Route path="updateBook" element={<UpdateBook/>}  />
      <Route path="viewAuthorOrder" element={<ViewAuthorOrder/>}/>
      <Route path="authorBookingDetails" element={<AuthorBookingDetails/>}/>

      </Route>
     
      
    </Routes>
  </div>
  );
}


export default App;
