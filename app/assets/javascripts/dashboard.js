$( document ).ready(function() {
    $('#submit').click(function () {
        const client = new ApiAi.ApiAiClient({accessToken: 'fd71e081c5c345d090f8b29f35b81f0f'});
        var message = $('#message').val()
        const promise = client.textRequest(message);

        promise
            .then(handleResponse)
            .catch(handleError);

        function handleResponse(serverResponse) {
            console.log(serverResponse);
            $("h4").append('</br>' + 'User says : ' + message);
            $( "p" ).append('</br>' + 'Bot says : ' + serverResponse.result.fulfillment.speech);
        }

        function handleError(serverError) {
            console.log(serverError);
        }
    });


});