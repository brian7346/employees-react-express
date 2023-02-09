import { Layout as AntLayout} from "antd";
import styles from "./index.module.css";
import { Header } from "../header";

type Props = {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: '100%' }}>
        {children}
      </AntLayout.Content>
    </div>
  );
};
