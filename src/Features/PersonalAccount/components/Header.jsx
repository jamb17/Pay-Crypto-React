import useStore from "../../../store";
import "../styles/css/header.css"

function Header () {

    const nickname = useStore(state => state.nickname);

    return (
        <div>
            <header>
                <div className="container">
                    <img
                        src="https://raw.githubusercontent.com/jamb17/pay-crypto/ea98f7c2b493ec3bf3ea7109c0ca2b96a1e78262/casty%20pay%20logo.svg"
                        alt=""
                        className="logo"
                    />
                    <nav>
                        <a href="#" className="nav-item">
                            <img
                                src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/tabler-icon-home.svg"
                                alt=""
                            />
                            Home
                        </a>
                        <a href="#" className="nav-item">
                            <img
                                src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/tabler-icon-settings.svg"
                                alt=""
                            />
                            Settings
                        </a>
                        <a href="#" className="nav-item">
                            <img
                                src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/tabler-icon-book-2.svg"
                                alt=""
                            />
                            Blog
                        </a>
                    </nav>
                    <div className="info">
                        <p className="nickname">{nickname}</p>
                        <div className="dropdown">
                            <img
                                src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/%D0%B7%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.svg"
                                alt=""
                                className="avatar"
                            />
                            <img
                                src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/tabler-icon-chevron-left.svg"
                                alt=""
                                className="icon"
                            />
                        </div>
                    </div>
                    <div className="menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="nav-mobile">
                    <a href="#" className="nav-item">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/tabler-icon-home.svg"
                            alt=""
                        />
                        Home
                    </a>
                    <a href="#" className="nav-item">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/tabler-icon-settings.svg"
                            alt=""
                        />
                        Settings
                    </a>
                    <a href="#" className="nav-item">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/tabler-icon-book-2.svg"
                            alt=""
                        />
                        Blog
                    </a>
                    <div className="info mobile">
                        <p className="nickname">Nickname</p>
                        <div className="dropdown">
                            <img
                                src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/%D0%B7%D0%B0%D0%B3%D0%BB%D1%83%D1%88%D0%BA%D0%B0.svg"
                                alt=""
                                className="avatar"
                            />
                            <img
                                src="https://raw.githubusercontent.com/jamb17/pay-crypto/df83f92b3e101c7d6da486549fa722325630307e/tabler-icon-chevron-left.svg"
                                alt=""
                                className="icon"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <div className="tabs">
                <div className="container">
                    <a className="item back-btn" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-arrow-left.svg"
                            alt=""
                        />
                        back
                    </a>
                    <a className="item pc" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-layout-dashboard.svg"
                            alt=""
                        />
                        Dashboard
                    </a>
                    <a className="item pc" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-wallet.svg"
                            alt=""
                        />
                        Payments
                    </a>
                    <a className="item pc" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-settings.svg"
                            alt=""
                        />
                        Payment setup
                    </a>
                    <a className="item pc" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-settings-star.svg"
                            alt=""
                        />
                        General settings
                    </a>
                </div>
            </div>
            <div className="tabs-mobile">
                <div className="container">
                    <a style={{ opacity: 1 }} className="item" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-layout-dashboard.svg"
                            alt=""
                        />
                        Dashboard
                    </a>
                    <a className="item" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-wallet.svg"
                            alt=""
                        />
                        Payments
                    </a>
                    <a className="item" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-settings.svg"
                            alt=""
                        />
                        Payment setup
                    </a>
                    <a className="item" href="#">
                        <img
                            src="https://raw.githubusercontent.com/jamb17/pay-crypto/9c2778e6a17436c9a8a27f660e3cde2f631d5457/tabler-icon-settings-star.svg"
                            alt=""
                        />
                        General settings
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Header;