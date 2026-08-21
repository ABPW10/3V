perform=(url,headers=undefined,body=undefined,method='GET')=>new Promise(resolve => {
  var xhr = new XMLHttpRequest()

  xhr.open('GET', 'http://ftphomeustc.web3v.work/asp/?url='+encodeURIComponent(url)+(method=='GET'?'':'&method='+method)+(headers?'&headers='+encodeURIComponent(JSON.stringify(headers)):''))

  xhr.send(body)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let result=xhr.responseText
      try {
        result=JSON.parse(result)
      } catch (error) {
        
      }
      resolve(result)
    }
  }
})

get=(url, options=undefined)=>window[options?.headers?'getHeaders':'perform'](url,options?.headers,undefined,options?.method)
post=(url, options=undefined)=>perform(url,options?.headers,options?.body,'POST')

getHeaders=(url,headers=undefined,body=undefined,method='GET')=>new Promise(resolve => {
  var xhr = new XMLHttpRequest()

  xhr.open('POST', 'https://nr-zone-3lgxmyst75hm-1301130919.eo-edgefunctions.com')

  xhr.send(JSON.stringify({url,headers}))

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let result=xhr.responseText
      try {
        result=JSON.parse(result)
      } catch (error) {
        
      }
      resolve(result)
    }
  }
})