# URL-Shortener
Minimalistic API serving as a URL Shortener Service

## Tech Stack
- TypeScript
- Express
- Prisma
- SQLite

## Endpoint definitions
-  /shorten
> Shortens Long URL and returns ShortCode
>> Method: POST
>
> Headers
>> Content-Type: application/json
>
> Example Request
>> ```bash
>>  curl -X POST -H 'Content-Type: application/json' -d '{"url": "https://youtube.com"}' localhost:3000/shorten
>> ```  
>
> Response
>> ```json
>>  {
>>     "message": "Shortcode created successfully",
>>     "shortCode": "XYZ12DW"
>>  }
>> ```
>> StatusCode: 201

- /shorten/:shortCode
> Redirects you to long URL
>> Method: GET
>
> Example Request
>> ```bash
>>  curl localhost:3000/shorten/XYZ12DW
>> ```  
>
> Error Response
>> ```json
>>  {
>>     "message": "Shortcode not found",
>>  }
>> ```
>> StatusCode: 404