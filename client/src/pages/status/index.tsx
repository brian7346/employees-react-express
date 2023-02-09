import { Button, Result, Row } from "antd";
import { Link, useParams } from "react-router-dom";

const Statuses: Record<string, string> = {
  created: "Пользователь успешно создан",
  updated: "Пользователь успешно обновлён",
  deleted: "Пользователь успешно удалён",
};

export const Status = () => {
  const { status } = useParams();

  return (
    <Row align="middle" justify="center" style={{ width: "100%" }}>
      <Result
        status={ status ? 'success' : 404 }
        title={status ? Statuses[status] : 'Не найдено'}
        extra={
          <Button key="dashboard">
            <Link to="/">На главную</Link>
          </Button>
        }
      />
    </Row>
  );
};
