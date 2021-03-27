# Endpoint

```http://jerevl-app.jelastic.metropolia.fi/station/```

# Example GET

```http://jerevl-app.jelastic.metropolia.fi/station?limit=4```

```http://jerevl-app.jelastic.metropolia.fi/station?topRight={"lat":60.2821946,"lng":25.036108}&bottomLeft={"lat":60.1552076,"lng":24.7816538}```

```http://jerevl-app.jelastic.metropolia.fi/station?limit=4&topRight={"lat":60.2821946,"lng":25.036108}&bottomLeft={"lat":60.1552076,"lng":24.7816538}```

# Example POST

```
{
    "Station": {
        "Title": "New Station",
        "Town": "Espoo",
        "AddressLine1": "Some Address",
        "StateOrProvince": "Southern Finland",
        "Postcode": "02630",
        "Location": {
        "coordinates": [24.77772323548868, 60.203353130088146]
        }
    },
    "Connections":[
        {
        "ConnectionTypeID": "5e39eecac5598269fdad81a0",
        "CurrentTypeID": "5e39ef4a6921476aaf62404a",
        "LevelID": "5e39edf7bb7ae768f05cf2bc",
        "Quantity": 2
        }
    ]
}
```

# Example PUT

```http://jerevl-app.jelastic.metropolia.fi/station/ID```

```
{
"Station": {
    "_id": "Some ID",
    "Title": "New Title",
    "Town": "Espoo",
    "AddressLine1": "New Address",
    "StateOrProvince": "Southern Finland",
    "Postcode": "02630",
    "Location": {
        "coordinates": [24.77772323548868, 60.203353130088146]
        }
},
"Connections":[
        {
        "_id": "Some ID",
        "ConnectionTypeID": "5e39eecac5598269fdad81a0",
        "CurrentTypeID": "5e39ef4a6921476aaf62404a",
        "LevelID": "5e39edf7bb7ae768f05cf2bc",
        "Quantity": 7
        }
  ]
}
```

# Example DELETE

```http://jerevl-app.jelastic.metropolia.fi/station/ID```
