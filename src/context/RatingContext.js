import React, {createContext, useContext, useState} from 'react';

export const RatingContext = createContext();

export const RatingProvider = ({children}) => {
  const [ratings, setRatings] = useState({});

  const updateRating = (movie, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [movie.id]: {...movie, rating},
    }));
  };

  return (
    <RatingContext.Provider value={{ratings, updateRating}}>
      {children}
    </RatingContext.Provider>
  );
};

export const useMovieRatings = () => useContext(RatingContext);
