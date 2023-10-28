'use client';

import { Spinner } from 'flowbite-react';

export default function LoadingSkeleton() {
  return (     
      <div className="text-center">
        <Spinner aria-label="Center-aligned" size="xl"/>
      </div>
  )
}


