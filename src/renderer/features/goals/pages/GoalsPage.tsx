import { useParams } from "react-router-dom";

export const GoalsPage = () => {
  const { goalId } = useParams();

  return (
    <div className="goals-page">
      <h1>목표 관리</h1>
      {goalId ? (
        <p>목표 ID: {goalId}의 상세 정보</p>
      ) : (
        <p>목표 목록이 표시될 예정입니다.</p>
      )}
    </div>
  );
};
