function getJD(d){return (d-(-37000)/*TAI*/+32184/*TT*/)/86400000.0+2440587.5}
function getD(jd){return new Date((jd-2440587.5)*86400000-32184-37000)}
solarTerms=['冬至','小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪']

now=new Date
day=new Date(new Date(now).setMonth(0,1))

lastSolarTermJD=calculateSolarTerm(getJD(day),true)
winterSolstice=getD(lastSolarTermJD)

day=winterSolstice;
solarTermIndex=0;
solarTermsYear=[]
htmlSolarTerms='<br><table style=border-spacing:0>'
htmlSolarTerms+=`<tr><td>${day.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}</td><td>${solarTerms[(solarTermIndex++)%24]}</td></tr>`;
solarTermsYear.push(day);
for(;;){
  nextSolarTermD=day;
  while(nextSolarTermD<=day){
    day=new Date(day-(-86400000))
    nextSolarTermJD=calculateSolarTerm(getJD(day));
    nextSolarTermD=getD(nextSolarTermJD);
  }
  day=nextSolarTermD;
  htmlSolarTerms+=`<tr><td>${day.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}</td><td>${solarTerms[(solarTermIndex++)%24]}</td></tr>`;
  solarTermsYear.push(day);
  if(solarTermsYear.length==29){break}
}
htmlSolarTerms+='</table>'

winterSolsticeThisYear=solarTermsYear[24];

moonInit=new Date(winterSolstice-31*86400000);
day=moonInit;
cntNewMoon=0;
mStarts=[];
for(;;){
  nextMonthD=day;
  while(nextMonthD<=day){
    day=new Date(day-(-86400000))
    nextMonthJD=CalculateNewMoonJD(getJD(day));
    nextMonthD=getD(nextMonthJD);
  }
  day=nextMonthD;
  if(day>=winterSolstice){
    if(mStarts.length==0){
      mStarts.push(lastNewMoon)
      majorSolarTermIndex=0;
      candidateLeapMonth=[];
    }
    let stopAfterNextOutput
    if(day<winterSolsticeThisYear){
      cntNewMoon++;
      if(day>solarTermsYear[majorSolarTermIndex]){
        majorSolarTermIndex+=2;
      }else{
        candidateLeapMonth.push(lastNewMoon);
      }
    }else{
      if(cntNewMoon==12){
        leap=false;
        if(lastNewMoon<winterSolsticeThisYear){
          remainingMonth=0;
          cntNewMoonNextYear=1;
          leapMonth11=false;
          if(day>solarTermsYear[majorSolarTermIndex]){
            majorSolarTermIndex+=2;
          }
        }else{
          cntNewMoonNextYear++
          if(remainingMonth==0){
            if(day>solarTermsYear[majorSolarTermIndex]
              ||!lookUpNextYear(winterSolsticeThisYear,solarTermsYear[majorSolarTermIndex],cntNewMoonNextYear,day)){
              remainingMonth++
              if(day>solarTermsYear[majorSolarTermIndex]){
                majorSolarTermIndex+=2;
              }
            }else{
              leapMonth11=true
            }
          }else{
            if(leapMonth11||day>solarTermsYear[majorSolarTermIndex]
              ||!lookUpNextYear(winterSolsticeThisYear,solarTermsYear[majorSolarTermIndex],cntNewMoonNextYear,day)){break}
            else{stopAfterNextOutput=true}
          }
        }
      }else{
        leap=true;
        if(lastNewMoon>=winterSolsticeThisYear){stopAfterNextOutput=true}
      }
    }
    mStarts.push(day)
    if(stopAfterNextOutput){break}
  }
  lastNewMoon=day;
}

months=['正','二','三','四','五','六','七','八','九','十','十一','十二']

mIndex=10;
htmlMoons='<br><table style=border-spacing:0>'
if(!leap){
  for(mCnt=0;mCnt<=12;mCnt++){
    mIndex=mIndex%12+1
    mStart=mStarts[mCnt];
    htmlMoons+=`<tr><td>${months[mIndex-1]}月　${mStart.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}</td></tr>`;
  }
  for(;mCnt<mStarts.length;mCnt++){
    mStart=mStarts[mCnt];
    if(mCnt==13&&leapMonth11){
      htmlMoons+=`<tr><td>闰${months[mIndex-1]}月　${mStart.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}</td></tr>`;
    }else if(mCnt==14&&mStarts.length>15&&!leapMonth11){
      htmlMoons+=`<tr><td>闰${months[mIndex-1]}月　${mStart.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}</td></tr>`;
    }else{
      mIndex=mIndex%12+1
      htmlMoons+=`<tr><td>${months[mIndex-1]}月　${mStart.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}</td></tr>`;
    }
  }
}else{
  for(mCnt=0;mCnt<mStarts.length;mCnt++){
    mStart=mStarts[mCnt];
    if(mStart==candidateLeapMonth[0]){
      htmlMoons+=`<tr><td>闰${months[mIndex-1]}月　${mStart.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}</td></tr>`;
      candidateLeapMonth=[];
    }else{
      mIndex=mIndex%12+1
      htmlMoons+=`<tr><td>${months[mIndex-1]}月　${mStart.toLocaleString(undefined,{dateStyle:'medium',timeStyle:'medium'})}</td></tr>`;
    }
  }
}
htmlMoons+='</table>'

function lookUpNextYear(winterSolsticeThisYear,solarTerm330,currCntNewMoon,timeNewMoon){

currSolarTerm=solarTerm330;
for(repeatCount=0;repeatCount<20;repeatCount++){
  nextSolarTerm=getD(calculateSolarTerm(getJD(new Date(currSolarTerm-(-86400)))));
  currSolarTerm=nextSolarTerm;
}
winterSolsticeNextYear=currSolarTerm;

moonInit=timeNewMoon;
dayNextYear=moonInit;
cntNewMoon=currCntNewMoon;
for(;;){
  nextMonthD=dayNextYear;
  while(nextMonthD<=dayNextYear){
    dayNextYear=new Date(dayNextYear-(-86400000))
    nextMonthJD=CalculateNewMoonJD(getJD(dayNextYear));
    nextMonthD=getD(nextMonthJD);
  }
  dayNextYear=nextMonthD;

    if(dayNextYear<winterSolsticeNextYear){
      cntNewMoon++;
    }else{
      return cntNewMoon==13
    }
  
}

}