/// <reference types="cypress" />

describe('API Response Time Test', () => 
{
    const apiUrls = [
      '/posts',
      '/posts/1',
      '/posts/1/comments',
	  '/comments?postId=1'
      // ... add more API URLs
    ];
  
    const postRequestBodies = 
    [
        {
            // First POST request body data here
            id: 201,
            title: "This is the title of POST 201",
            body: 'This is body of POST 201',
            userId: 201
        },
        {
            // Second POST request body data here
            id: 202,
            title: "This is the title of POST 202",
            body: 'This is body of POST 202',
            userId: 202
        },
        {
            // Third POST request body data here
            id: 203,
            title: "This is the title of POST 203",
            body: 'This is body of POST 203',
            userId: 203
        },
        // Add more request bodies as needed
    ];

    const putRequestBodies = 
    [
        {
            // First PUT request body data here
            id: 201,
            title: "This is the title of POST 201 updated",
            body: 'This is body of POST 201 updated',
            userId: 201
        },
        {
            // Second PUT request body data here
            id: 202,
            title: "This is the title of POST 202 updated",
            body: 'This is body of POST 202 updated',
            userId: 202
        },
        {
            // Third PUT request body data here
            id: 203, 
            title: "This is the title of POST 203 updated",
            body: 'This is body of POST 203 updated',
            userId: 203
        },
        // Add more request bodies as needed
    ];

    const getSlowApis = [], postSlowApis = [], putSlowApis = [];
  
    it('should check get API endpoints response time', () => 
    {
        // You don't need to visit a website, as you're making direct API requests
        cy.wrap(apiUrls).each((url) => 
        {
            cy.request(`https://jsonplaceholder.typicode.com${url}`)
            .then((response) => 
            {
                expect(response.status).to.eq(200)
                const responseTime = response.duration;
                if (responseTime >= 1000)        // Time in Milliseconds
                {
                    getSlowApis.push({url, responseTime });
                }
            }); 
        }).then(() => 
        {
            // Log the slow APIs
            cy.log('Slow APIs:', getSlowApis);
            // You can also make assertions or other checks on the slowApis array
            // expect(slowApis.length).to.be.greaterThan(0);
        })
    })

    it('should check Post API endpoints response time', () => 
    {
        let newUrl;
        postRequestBodies.forEach((requestBody) => 
        {
            cy.request(
            {
                method: 'POST',
                url: 'https://jsonplaceholder.typicode.com/posts', // Replace with your actual API endpoint
                body: requestBody,
                headers: 
                {
                    // Set any required headers such as authentication token
                },
            }).then((response) => 
            {
                expect(response.status).to.eq(201)  // 201 for created
                expect(response.body).to.not.be.null
                const responseTime = response.duration;
                if (responseTime >= 1000)        // Time in Milliseconds
                {
                    newUrl = `https://jsonplaceholder.typicode.com/posts/${requestBody.id}`
                    postSlowApis.push({newUrl, responseTime });
                }
                cy.log(postSlowApis)
            })
        })
    })

    it('should check Put API endpoints response time', () => {
        const postSlowApis = [];
        let i = 0;
    
        putRequestBodies.forEach((requestBody) => 
        {
            const postId = postRequestBodies[i++].id
            console.log(postId)
            const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    
            cy.request(
            {
                method: 'PUT',
                url: url,
                body: requestBody,
                headers: 
                {
                    // Set any required headers such as authentication token
                },
            }).then((response) => 
            {
                expect(response.status).to.eq(200);
                expect(response.body).to.not.be.nul
                const responseTime = response.duration
                if (responseTime >= 1000) 
                {
                    putSlowApis.push({ url, responseTime })
                }
                cy.log(putSlowApis)
            })
        })
    })    
})

  