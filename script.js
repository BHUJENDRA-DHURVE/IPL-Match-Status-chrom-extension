async function getMatchData() {
    return await fetch("https://api.cricapi.com/v1/cricScore?apikey=cdd6ceb4-4176-4a1e-8692-87d820aaa25c")
      .then(data => data.json())
      .then(data => {
        if (data.status != "success") return;
        const matchesList = data.data;
        if (!matchesList) return [];
        const relevantData = matchesList.filter(match => match.matchType == "t20").map(match => `${match.t1} VS ${match.t2}`);
        console.log({ relevantData });
  
        document.getElementById("matches").innerHTML = relevantData.map(matches => `<li> ${matches} </li>`).join('');
        return relevantData;
  
      })
      .catch(e => console.log(e));
  }
  getMatchData();
  