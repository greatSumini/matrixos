import { useParams } from "react-router-dom";

export const FocusPage = () => {
  const { taskId } = useParams();

  return (
    <div className="focus-page">
      <h1>포커스 모드</h1>
      {taskId ? (
        <p>태스크 ID: {taskId}에 집중 중입니다.</p>
      ) : (
        <p>포커스할 태스크를 선택하세요.</p>
      )}
    </div>
  );
};
