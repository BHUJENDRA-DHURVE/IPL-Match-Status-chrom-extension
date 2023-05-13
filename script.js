async function getMatchData() {
    const Cricketdata1 = await fetch("https://api.cricapi.com/v1/cricScore?apikey=cdd6ceb4-4176-4a1e-8692-87d820aaa25c")
      .then(data => data.json())
      .then(data => {
        if (data.status != "success") return;
        const matchesList = data.data;
        if (!matchesList) return [];
        const teams = ["Gujrat Titans [GT]","Chennai Super Kings [CSK]","Mumbai Indians [MI]","Rajasthan Royals [RR]","Lucknow Super Gians [LSG]","Royal Challangers Bangalore [RCB]","kolkata Knight Riders [KKR]","Punjab Kings [PBKS]","Sunriser Hyderrabad [SH]","Delhi Capitals [DC]"];

        const relevantData = matchesList.filter(match => teams.includes(match.t1) || teams.includes(match.t2)).map(match => `${match.t1} VS ${match.t2},${match.status}`);
        
        console.log({ relevantData });
  
        document.getElementById("matches").innerHTML = relevantData.map(matches => `<li> ${matches} </li>`).join('');
        return relevantData;
  
      })
      .catch(e => console.log(e));
      
      const Cricketdata2 = await fetch("https://api.cricapi.com/v1/currentMatches?apikey=cdd6ceb4-4176-4a1e-8692-87d820aaa25c&offset=0")
      .then(data =>data.json())
      .then(data => {
        if (data.status != "success") return;
        const matchesList = data.data;
        if (!matchesList) return []
        const relevantData = matchesList.filter(match => match.series_id =="c75f8952-74d4-416f-b7b4-7da4b4e3ae6e").map(match => `${match.name},${match.status},${match.teamInfo.map(team => `${team.name} (${team.shortname})`)},${match.score.map(s => `${s.inning}: ${s.r}/${s.w} (${s.o} ov)`)}`);
   

        console.log({ relevantData });
  
        document.getElementById("matches2").innerHTML = relevantData.map(matches => `<li> ${matches} </li>`).join('');
        return relevantData;
      })
      .catch(e => console.log(e));

      return { Cricketdata1,Cricketdata2 };
  }
  getMatchData();
  