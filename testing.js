const fav = [
    { actress: 'Millie Bobby Brown', age: 16, city: 'New York' },
    { actress: 'Kiernan Shipka', age: 19, city: 'Boston' },
    { actress: 'Emma Watson', age: 29, city: 'Los Angeles' }
  ];
  
  const result = fav.find(({ actress }) => actress === 'Millie Bobby Brown');
  
  console.log(result)
  console.log(result.city)

  // Object destructuring --> ...