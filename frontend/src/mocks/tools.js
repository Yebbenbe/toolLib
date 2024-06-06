const tool1 = {
  "id": "1",
  "location": {
    "city": "Montreal",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-1-Full.jpeg`,
    "regular": `${process.env.PUBLIC_URL}/Image-1-Regular.jpeg`
  },
  "user": {
    "id": "1",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool2 = {
  "id": "2",
  "location": {
    "city": "Toronto",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-2-Full.jpeg`,
    "regular": `${process.env.PUBLIC_URL}/Image-2-Regular.jpeg`
  },
  "user": {
    "id": "2",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool3 = {
  "id": "3",
  "location": {
    "city": "Ottawa",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-3-Full.jpeg`,
    "regular": `${process.env.PUBLIC_URL}/Image-3-Regular.jpeg`
  },
  "user": {
    "id": "3",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool4 = {
  "id": "4",
  "location": {
    "city": "Quebec",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-4-Full.jpg`,
    "regular": `${process.env.PUBLIC_URL}/Image-4-Regular.jpg`
  },
  "user": {
    "id": "4",
    "updated_at": "2016-07-10T11:00:01-05:00",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool5 = {
  "id": "5",
  "location": {
    "city": "Vancouver",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-5-Full.jpg`,
    "regular": `${process.env.PUBLIC_URL}/Image-5-Regular.jpg`
  },
  "user": {
    "id": "5",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool6 =  {
  "id": "6",
  "location": {
    "city": "Montreal",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-6-Full.jpg`,
    "regular": `${process.env.PUBLIC_URL}/Image-6-Regular.jpg`
  },
  "user": {
    "id": "6",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool7 = {
  "id": "7",
  "location": {
    "city": "Calgary",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-7-Full.jpg`,
    "regular": `${process.env.PUBLIC_URL}/Image-7-Regular.jpg`
  },
  "user": {
    "id": "7",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool8 = {
  "id": "8",
  "location": {
    "city": "Ottawa",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-8-Full.jpg`,
    "regular": `${process.env.PUBLIC_URL}/Image-8-Regular.jpg`
  },
  "user": {
    "id": "8",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool9 = {
  "id": "9",
  "location": {
    "city": "Nova Scotia",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-9-Full.jpg`,
    "regular": `${process.env.PUBLIC_URL}/Image-9-Regular.jpg`
  },
  "user": {
    "id": "9",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}

const tool10 = {
  "id": "10",
  "location": {
    "city": "Edmonton",
    "country": "Canada"
  },
  "urls": {
    "full": `${process.env.PUBLIC_URL}/Image-10-Full.jpg`,
    "regular": `${process.env.PUBLIC_URL}/Image-10-Regular.jpg`
  },
  "user": {
    "id": "10",
    "username": "exampleuser",
    "name": "Joe Example",
    "profile": `${process.env.PUBLIC_URL}/profile-1.jpg`
  }
}




const tools = [
  {
    ...tool1,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool2,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool3,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool4,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool5,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool6,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool7,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool8,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool9,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  },
  {
    ...tool10,
    similar_tools: {
      tool2,
      tool3,
      tool4,
      tool5,
    }
  }
]

export default tools;