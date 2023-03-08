import React from "react";
import styled from "@emotion/styled";

interface Props {
  num: number;
  potted: boolean;
  onClick: () => void;
}

const colors = [
  "yellow",
  "blue",
  "red",
  "pink",
  "orange",
  "green",
  "brown",
  "black",
];

const BallOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${(props) => props.color};
`;

const BallInnerSolid = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  line-height: 40px;
  vertical-align: middle;
  font-size: 24px;
  background-color: white;
  color: black;
  border: black 2px solid;
`;

const BallInnerStripes = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  line-height: 70px;
  vertical-align: middle;
  font-size: 24px;
  background-color: white;
  color: black;
  border: black 2px solid;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const PoolBall = ({ num, potted, onClick }: Props) => {
  return (
    <BallOuter
      onClick={onClick}
      className="poolball"
      color={colors[(num - 1) % 8]}
    >
      {num <= 8 && <BallInnerSolid>{potted ? "x" : num}</BallInnerSolid>}
      {num > 8 && (
        <BallInnerStripes>
          <BallInnerSolid>{potted ? "x" : num}</BallInnerSolid>
        </BallInnerStripes>
      )}
    </BallOuter>
  );
};

export default PoolBall;
