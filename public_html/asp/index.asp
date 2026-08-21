<%
' Turn off error Handling
On Error Resume Next
Dim allowed_domains(0)
allowed_domains(0) = "http://vwwv.royalwebhosting.net"

Dim valid_origin,http_origin
http_origin = Request.ServerVariables("HTTP_ORIGIN")
valid_origin=IsNull(http_origin) OR IsEmpty(http_origin)
If NOT valid_origin Then
  For Each origin In allowed_domains
    If http_origin=origin Then
      valid_origin=True
      Exit For
    End If
  Next
  If valid_origin OR http_origin="http://" & Request.ServerVariables("SERVER_NAME") OR http_origin="null" Then
    If valid_origin OR http_origin="null" Then
      Response.AddHeader "Access-Control-Allow-Origin", http_origin
    End If
    valid_origin=True
  End If
End If

If valid_origin Then

Dim url
url=Request.QueryString("url")
If NOT IsNull(url) AND NOT IsEmpty(url) AND Trim(url)<>"" Then

Session.CodePage = 65001
Response.Charset ="utf-8"

Dim method
method=Request.QueryString("method")
If IsNull(method) OR IsEmpty(method) OR Trim(method)="" Then
method=Request.ServerVariables("REQUEST_METHOD")
End If

Dim req
Set req = Server.CreateObject("MSXML2.ServerXMLHTTP.6.0")

req.open method, url, False

Dim headers
headers=Request.QueryString("headers")

If NOT IsNull(headers) AND NOT IsEmpty(headers) AND Trim(headers)<>"" Then
Dim start
start=1
Dim i
i=0
Dim header_name
Do While InStr(start,headers,"""")<>0 AND i<100
 Dim header_start,header_end,header
 header_start=InStr(start,headers,"""")
 header_end=InStr(header_start+1,headers,"""")
 header=Mid(headers,header_start+1,header_end-header_start-1)
 start=header_end+1
 If InStr(start,headers,":")=start Then
  header_name=header
 ElseIf InStr(start,headers,",")=start OR InStr(start,headers,"}")=start Then
  req.setRequestHeader header_name, header
 End If
 i=i+1
Loop
End If

If method="POST" AND Request.TotalBytes > 0 Then
req.send Request.BinaryRead(Request.TotalBytes)
Else
req.send
End If

Response.AddHeader "Content-Type", req.getResponseHeader("Content-Type")
Response.AddHeader "Content-Encoding", req.getResponseHeader("Content-Encoding")

Response.Write(req.responseText)

End If

End If

If Err.Number <> 0 Then
  Dim aspError, errorMessage
  Set aspError = Server.GetLastError()
  errorMessage = "An error occurred:<br>" & _
                 "Error Code: " & aspError.ASPCode & "<br>" & _
                 "Description: " & aspError.ASPDescription & "<br>" & _
                 "Source: " & aspError.Source & "<br>" & _
                 "File: " & aspError.File & "<br>" & _
                 "Line: " & aspError.Line & "<br>"
  Response.Write errorMessage
  ' Optional: Log the error to the server's event log
  ' Response.Write "Error logged to event log." 
End If
%>