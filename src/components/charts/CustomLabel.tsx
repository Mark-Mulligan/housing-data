//
import { FC } from "react";

interface IProps {
  labelText: string;
}

const CustomLabel: FC<IProps> = ({ labelText }) => {
  return (
    <g>
      <foreignObject x={0} y={150} width={100} height={20}>
        <div>{labelText}</div>
      </foreignObject>
    </g>
  );
};

export default CustomLabel;
