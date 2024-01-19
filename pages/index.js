import React from 'react'
import { useEffect, useState, Suspense } from 'react';
// import Skeleton from 'react-loading-skeleton';
import Calculator_Skeleton from './component/Calculator_Skeleton';
const Home = React.lazy(() => import('./component/Home'));

export default function index() {
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    return () => clearTimeout(delay); 
  }, []);

  return (
    <div>
      <Suspense fallback={<Calculator_Skeleton height={100} width={200} />}>
        {isLoading ? (
          <Calculator_Skeleton height={400} width={'100%'} />
        ) : (
          <Home />
        )}
      </Suspense>
    </div>
  )
}
