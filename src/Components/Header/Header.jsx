import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { FiUser } from "react-icons/fi"; // User Icon
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../Store/userSlice";
import toast from "react-hot-toast";
import FooterWrapper from "../FooterWrapper/footerWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user?.user?.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };

  const searchQueryHandler = (event) => {
    const inputValue = event.target.value;
    if (event.key === "Enter" && inputValue.length > 0) {
      navigate(`/search/${inputValue}`);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
    setShowSearch(false);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const handleSignOut = () => {
    dispatch(userData({}));
    localStorage.removeItem("user");
    toast.success("Logged out Successfully!");
  };

  const handleListNavigation = () => {
    if (user) {
      navigate("/mywatchlist");
    } else {
      toast("Please log in into your account");
      setTimeout(() => {
        navigate("/auth");
      }, 1000);
    }
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <FooterWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" />
        </div>

        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>

          <li className="menuItem" onClick={handleListNavigation}>
            My Watchlist
          </li>

          {user && (
            <>
              <li className="menuItem">
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          )}

          {!user && (
            <li className="menuItem ">
              <button className="!text-[16px]" onClick={() => navigate("/auth")}>Sign In</button>
            </li>
          )}

          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
          {user && (
            <li className="menuItem userProfile">
              <FiUser />
              <span className="">{user?.username}</span>
            </li>
          )}
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </FooterWrapper>

      {showSearch && (
        <div className="searchBar">
          <FooterWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </FooterWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
