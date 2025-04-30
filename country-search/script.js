const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const flag = document.getElementById('flag');
const countryName = document.getElementById('country-name');
const capitalName = document.getElementById('capital-name');


searchButton.addEventListener('click', async () => {
  const country = searchInput.value.trim();

  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if (!response.ok) {
      throw new Error('국가를 찾을 수 없습니다.');
    }

    const data = await response.json();
    const countryData = data[0];
    
    flag.src = countryData.flags.png;
    countryName.textContent = countryData.name.common;
    capitalName.textContent = countryData.capital;
    }
    
    catch(error) {
        alert(error.message);
      }
});  
