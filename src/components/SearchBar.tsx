
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Patient, searchPatients } from '@/utils/mockData';
import { useSlideIn } from '@/utils/animations';

interface SearchBarProps {
  autoFocus?: boolean;
  onResultClick?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  autoFocus = false,
  onResultClick
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Patient[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const slideInStyle = useSlideIn(50, 300, 'up');

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    // Search when query changes
    if (query.trim()) {
      const searchResults = searchPatients(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    // Close search results when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (patient: Patient) => {
    // Handle result click, could navigate to patient view
    console.log('Selected patient:', patient.id);
    setQuery('');
    setIsFocused(false);
    onResultClick?.();
    // For demo purposes, we could implement setting the selected patient in a
    // global context or triggering navigation
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search patients, medications, conditions..."
          className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {query && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {isFocused && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute z-10 mt-2 w-full rounded-md border bg-popover shadow-md animate-scale-in overflow-hidden"
          style={slideInStyle}
        >
          <div className="max-h-80 overflow-y-auto subtle-scrollbar">
            <h3 className="px-4 py-2 text-xs font-medium text-muted-foreground bg-accent">
              Patients ({results.length})
            </h3>
            <div className="py-1">
              {results.map((patient, index) => (
                <div
                  key={patient.id}
                  className="px-4 py-2 flex items-center gap-3 hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleResultClick(patient)}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    patient.status === 'critical' ? 'bg-medical-critical' : 
                    patient.status === 'warning' ? 'bg-medical-warning' : 
                    'bg-medical-success'
                  }`} />
                  <div>
                    <div className="font-medium">
                      {patient.firstName} {patient.lastName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      MRN: {patient.mrn} • DOB: {patient.dateOfBirth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
