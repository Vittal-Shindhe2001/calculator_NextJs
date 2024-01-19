import React from 'react';
import Skeleton from 'react-loading-skeleton';

const CalculatorSkeleton = () => {
  return (
    <div className="calculator-skeleton">
      <div className="display-skeleton">
        <Skeleton height={50} />
      </div>
      <div className="buttons-skeleton">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="button-skeleton">
            <Skeleton height={40} width={60} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalculatorSkeleton;
