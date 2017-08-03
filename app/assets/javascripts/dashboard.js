$( document ).ready(function() {
    $('#submit').click(function () {
        const client = new ApiAi.ApiAiClient({accessToken: 'fd71e081c5c345d090f8b29f35b81f0f'});
        var message1 = $('.message_input').val()
        const promise = client.textRequest(message1);

        promise
            .then(handleResponse)
            .catch(handleError);

        function handleResponse(serverResponse) {
            sendMessage(message1)
            sendMessage(serverResponse.result.fulfillment.speech);
        }

        function handleError(serverError) {
            console.log(serverError);
        }
    });

    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        }

});

