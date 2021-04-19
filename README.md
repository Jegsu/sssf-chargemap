# Charge map

# Example Queries
```
{
  station(id: "ID") {
    Title
    Town
    AddressLine1
  }
}
```

```
{
  stations(start: 15, limit: 3) {
    Title
    Town
    AddressLine1
    Location {
      type
      coordinates
    }
    Connections {
      Quantity
      ConnectionTypeID {
        Title
      }
      CurrentTypeID {
        Title
      }
      LevelID {
        Title
        Comments
        IsFastChargeCapable
      }
    }
  }
}
```

```
{
  stations(bounds: {_southWest: {lat: 60.0918986743294, lng: 24.60319519042969}, _northEast: {lat: 60.38196898834704, lng: 24.94033813476563}}) {
    Title
    Town
    AddressLine1
    Location {
      type
      coordinates
    }
    Connections {
      Quantity
      ConnectionTypeID {
        Title
      }
      CurrentTypeID {
        Title
      }
      LevelID {
        Title
        Comments
        IsFastChargeCapable
      }
    }
  }
}
```

# Example Authentication

```
mutation {
 register(username: "", password: "")
 {
  id
  username
  token
 } 
}
```

```
query {
 login(username: "", password: "")
 {
  id
  username
  token
 } 
}
```

HTTP HEADERS
```
{
  "Authorization": "Bearer TOKEN_HERE"
}
```

# Example Mutations (needs auth)
```
mutation {
 addStation( 
   Connections: [
   {
        id: "60660126fa93153c3884280d",
        ConnectionTypeID: "5e39eecac5598269fdad81a0",
        CurrentTypeID: "5e39ef4a6921476aaf62404a",
        LevelID: "5e39edf7bb7ae768f05cf2bc",
        Quantity: 22
  },
  {
    id: "5e3a02368637aa01278b6806",
    ConnectionTypeID: "5e39eecac5598269fdad81c4",
    LevelID: "5e39edf7bb7ae768f05cf2bd",
    CurrentTypeID:"5e39ef4a6921476aaf62404b",
    Quantity: 2,
  }
  ],
   Postcode: "69",
   Title: "yes5252",
   AddressLine1: "yesss",
   StateOrProvince: "yessses",
   Town: "ys town",
   Location: {
      coordinates: [60.0918986743294, 24.60319519042969]
  }
 )
 {
   Title
   AddressLine1
   Town
 }
}
```

```
mutation {
 modifyStation(    
   id: "60660126fa93153c3884280e",
   Connections: [
   {
        id: "60660126fa93153c3884280d",
        ConnectionTypeID: "5e39eecac5598269fdad81a0",
        CurrentTypeID: "5e39ef4a6921476aaf62404a",
        LevelID: "5e39edf7bb7ae768f05cf2bc",
        Quantity: 22
  },
  {
    id: "5e3a02368637aa01278b6806",
    ConnectionTypeID: "5e39eecac5598269fdad81c4",
    LevelID: "5e39edf7bb7ae768f05cf2bd",
    CurrentTypeID:"5e39ef4a6921476aaf62404b",
    Quantity: 2,
  }
  ],
   Postcode: "69",
   Title: "yes5252",
   AddressLine1: "yesss",
   StateOrProvince: "yessses",
   Town: "ys town",
 )
 {
   Title
   AddressLine1
   Town
 }
}
```