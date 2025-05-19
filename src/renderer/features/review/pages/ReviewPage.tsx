import { useParams } from "react-router-dom";

export const ReviewPage = () => {
  const { week } = useParams();

  return (
    <div className="review-page">
      <h1>주간 회고</h1>
      {week ? <p>{week} 주차 회고</p> : <p>이번 주 회고를 작성해보세요.</p>}
    </div>
  );
};
