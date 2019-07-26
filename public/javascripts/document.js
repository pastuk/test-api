$(document).ready(function () {
    $.get('/profile/all').then(resp => {
        resp.forEach(row => {
            $('#selectProfile').append('<option value="' + row._id + '">' + row.lastName + ', ' + row.firstName + '</option>');
        });
    });

    /**
     * Web service POST call to insert new record when submit button is clicked.
     */
    $('#submitButton').on('click', function (event) {
        event.preventDefault();
        event.stopPropagation();

        const postData = $('#profileForm').serializeArray();

        $.ajax({
            type: 'POST',
            url: '/profile',
            data: JSON.stringify(postData),
            datatype: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .done(appendOption)
            .fail(errorHandler);
    });

    $('#deleteButton').on('click', function () {
       $.ajax({
           type: 'DELETE',
           url: '/profile?_id=' + $('#selectProfile').val(),
           done: window.location.reload()
       })
    });

    /**
     * Web service GET call to display selected profile on option change.
     */
    $('#selectProfile').on('change', function () {
        $.get('/profile?_id=' + this.value).then(function (resp) {
            $('input').toArray().forEach(input => input.value = resp[0][input.attributes.name.value]);
            $('#selectState').val(resp[0].state);
        });
    });

    /**
     * Append new option tag to selection
     * @param resp = response data from web service call
     */
    function appendOption(resp) {
        alert('Successfully Added');
        $('#selectProfile').append('<option value="' + resp._id + '">' + resp.lastName + ', ' + resp.firstName + '</option>');
        window.location.reload();
    }

    /**
     * Displays error message on server response error
     * @param err = server response
     */
    function errorHandler(err) {
        alert(err.statusText);
    }
});