import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.logo}>My Voice Agent</span>
        <nav className={styles.nav}>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Чат
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Личный кабинет
          </NavLink>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Авторизация
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
