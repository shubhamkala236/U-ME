import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
// searchquery used in use Effect to change the loading whenever seraches new term
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
// masonry grid is a view for random grid sizes

const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState(null);
    // use params hook to grab the category changed in url to use in useeffect later on 
    const {categoryId} = useParams();

    useEffect(() => {
      setLoading(true);

      if(categoryId){
        const query = searchQuery(categoryId);
          // client getting data and setting it to the pins and then setting loading to false to stop it  
        client.fetch(query)
          .then((data)=>{
            setPins(data);
            setLoading(false)
          })

      } 
      // already presented query not the searched one 
      else {
        client.fetch(feedQuery)
          .then((data)=>{
            setPins(data)
            setLoading(false)
          })

      }
    }, [categoryId]);
    
       
    if (loading) {
          return (
            <Spinner message= 'We are adding new ideas to your feed!'/>
          ) }
   
  if(!pins?.length) return <h2>No pins availables</h2> 

  
    

return (
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
    )
};

export default Feed;
