// REST API EXAMPLE

// SIMPLE REST API EXAMPLE

const getButton = document.getElementById('get');
const postButton = document.getElementById('post');

getButton.addEventListener('click', () => {
  console.log('getButton is clicked!');
  
  fetch('http://localhost:3001/feed/posts')
  .then(res => res.json())
  .then(result => {
    // res.json() is a Promise  
    console.log('result.....', result);
  })
  .catch(err => {
    console.log('Error..... ', err);
  })
});

postButton.addEventListener('click', () => {
  console.log('postButton is cicked!');
  
  const data = {
    title: 'sending POST',
    content: 'sending POST via frontend in REST API lesson!'
  }
  
  fetch('http://localhost:3001/feed/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'    // set the content-type as json format in order to parse the request body
    },
    body: JSON.stringify(data)    // send the data as json in order to parse the request body
  })
  .then(res => res.json())
  .then(result => {
    console.log('result..... ', result);
  })
  .catch(err => {
    console.log('Error..... ', err);
  })
});


// ------------------- ADVANCED REST API ---------------------------------------

const initEl = document.querySelector('[name=init]');
const someFileEl = document.querySelector('[name=someFile]');
const advancedPostButton = document.getElementById('advanced-post');
let someFile;

someFileEl.addEventListener('change', ($event) => {
  console.log('image..... ', $event.target.files);
  
  someFile = $event.target.files[0];
});

advancedPostButton.addEventListener('click', () => {
  console.log('init..... ', initEl.value);
  console.log('image..... ', someFileEl.value);
  
  const formData = new FormData();
  formData.append('init', initEl.value);
  formData.append('someFile', someFile);
  
  fetch('http://localhost:3001/feed/advanced-post', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(result => {
    console.log('result..... ', result);
  })
  .catch(err => {
    console.log(err);
  });
});


// =====================================================================
// GRAPHQL EXAMPLE

// SIMPLE GRAPHQL API EXAMPLE - QUERY

const getGraphqlBtn = document.getElementById('getGraphql');
const postGraphqlBtn = document.getElementById('postGraphql');

const graphqlQuery = {
  query: 
  `
    { hello { text } }
  `
};

getGraphqlBtn.addEventListener('click', () => {
  fetch('http://localhost:3001/graphql', {
    method: 'POST',   // graphql request always POST request
    headers: {  
      'Content-Type': 'application/json'    // graphql data is json data
    },
    body: JSON.stringify(graphqlQuery)
  })
  .then(res => res.json())
  .then(result => {
    console.log('graphql simple query..... ', result);
  })
  .catch(err => {
    console.log(err);
  })
});


// SIMPLE GRAPHQL API EXAMPLE - MUTATION

const title = "Harry Potter";
const content = "Story about a kid who is a wizard...";
const graphqlMutationQuery = {
  query:
  `
    mutation { 
      createPost(postInput: { title: "${title}", content: "${content}" }) {
          message
          postData { title createdDate }
      } 
    }
  `
};

postGraphqlBtn.addEventListener('click', () => {
  fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(graphqlMutationQuery)
  })
  .then(res => res.json())
  .then(result => {
    console.log('graphql simple mutation..... ', result);
  })
  .catch(err => {
    console.log(err);
  });
});


// ------------------- ADVANCED GRAPHQL API ---------------------------------------

const initElGraphql = document.querySelector('[name=initGraphql]');
const someFileElGraphql = document.querySelector('[name=someFileGraphql]');
const advancedPostGraphqlBtn = document.getElementById('advanced-postGraphql');
let someFileGraphql;


someFileElGraphql.addEventListener('change', ($event) => {
  console.log('image..... ', $event.target.files);
  
  someFileGraphql = $event.target.files[0];
});

advancedPostGraphqlBtn.addEventListener('click', () => {
  console.log('initGraphql..... ', initElGraphql.value);
  console.log('image..... ', someFileElGraphql.value);
  
  const formData = new FormData();
  // formData.append('initGraphql', initElGraphql.value);
  formData.append('someFileGraphql', someFileGraphql);

  fetch('http://localhost:3001/advanced-post', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(({file}) => {   // object destructuring: extract the value of property 'file' from the result
    console.log('advancedPostGraphql_result_file..... ', file);

    const advancedGraphqlMutationQuery = {
    query: 
    `
      mutation {
        createAdvancedPost(advancedPostInput: { init: "${initElGraphql.value}", filePath: "${file.path}" }) {
          message
          init
          filePath
          createdDate
          id
        }
      }
    `
    };

    return fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(advancedGraphqlMutationQuery)
    });
  })
  .then(res => res.json())
  .then(result => {
    console.log('advanedPostGraphql_result..... ', result);
  })
  .catch(err => {
    console.log(err);
  });
});















