import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VehiclePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const VehiclePagination: React.FC<VehiclePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      <span className="px-4 py-2 text-gray-700">
        Página {currentPage} de {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}; 