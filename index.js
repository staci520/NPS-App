'use strict';

// const apiKey = 'O4uscFdrW1mucCDjMKQgcMcLumWe0j22pfs4z32B';
// const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
      </li>`
        )
    };
    $('#results').removeClass('hidden');
};

function getNationalParkData(stateCode, maxResults) {
    const params = {
        api_key: apiKey,
        stateCode: stateCode,
        limit: maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey
        })
    };

    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("Response OK: ", url)
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-state').val();
        const maxResults = $('#js-max-results').val();
        getNationalParkData(searchTerm, maxResults);
    });
}

$(watchForm);

