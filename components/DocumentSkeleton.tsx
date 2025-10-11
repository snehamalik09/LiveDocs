'use client';

import React from 'react';

const DocumentSkeleton = () => {
  return (
    <div className="animate-pulse flex justify-between items-center bg-dark-350 p-4 rounded-lg w-full max-w-[780px] my-2">
      <div className="flex gap-4 items-center">
        <div className="bg-dark-500 rounded-lg w-[60px] h-[60px]" />
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-700 rounded" />
          <div className="h-3 w-20 bg-gray-700 rounded" />
        </div>
      </div>
      <div className="h-6 w-6 bg-gray-700 rounded" />
    </div>
  );
};

export default DocumentSkeleton;
