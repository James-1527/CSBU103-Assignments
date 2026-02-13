$(document).ready(function () {
    $('#createUserForm #btn-create').click(function (event) {

        const formData = {
            username: $('#createUserForm input[name=username]').val(),
            name: $('#createUserForm input[name=name]').val(),
            gender: $('#createUserForm input[name=gender]').val()
        }
        const userId = $('#createUserForm input[name="user_id"]').val()
        console.log(formData)
        if (!userId) {
            $.ajax({
                method: "POST",
                url: "http://localhost:3000/users",
                data: JSON.stringify(formData),
                contentType: 'application/json',
                encode: true,
            }).done(function (resp) {
                const { status, data } = resp
                console.log(resp)
                if (status && data) {
                    // resp.forEach(function(val) {
                    $('#userList tbody').append(
                        `<tr class="user-id" data-userid="${data.id}"><td scope="row">${data.id}</td><td class="username">${data.username}</td><td class="name">${data.name}</td><td class="gender">${data.gender}</td><td><button class="del-btn btn btn-danger" data-id="${data.id}">Delete</button><button class="update-btn btn btn-warning" data-id="${data.id}">Update</button></td></tr>`
                    )
                    $(`button.del-btn[data-id="${data.id}"]`).click(function (e) {
                        const userId = $(this).attr('data-id')
                        console.log(userId)
                        $.ajax({
                            method: "DELETE",
                            url: `http://localhost:3000/users/${userId}`,
                            contentType: 'application/json',
                            encode: true,
                        }).done(function (resp) {
                            const { status } = resp
                            if (status) {
                                $(`tr[data-userid="${userId}"]`).empty();
                            }
                        })
                    })
                    $(`button.update-btn[data-id="${data.id}"]`).click(function (e) {
                        const userId = $(this).attr('data-id')
                        $('#createUserForm input[name="user_id"]').val(userId)
                        $('#createUserForm input[name=username]').val($(`tr[data-userid="${userId}"] td.username`).text())
                        $('#createUserForm input[name=name]').val($(`tr[data-userid="${userId}"] td.name`).text())
                        $(`#createUserForm input[id="${$(`tr[data-userid="${userId}"] td.gender`).text()}"]`).attr('checked', 'true')

                        $('#createUserForm #btn-create').text('Update')

                    })

                }
                // })
            });
        } else {
            $.ajax({
                method: "PUT",
                url: `http://localhost:3000/users/${userId}`,
                data: JSON.stringify(formData),
                contentType: 'application/json',
                encode: true,
            }).done(function (resp) {
                const { status, data } = resp
                console.log(resp)
                if (status && data) {
                    $(`tr[data-userid="${userId}"]`).empty();

                    // resp.forEach(function(val) {
                    $('#userList tbody').append(
                        `<tr class="user-id" data-userid="${userId}"><td scope="row">${userId}</td><td class="username">${data.username}</td><td class="name">${data.name}</td><td class="gender">${data.gender}</td></span><td><button class="del-btn btn btn-danger" data-id="${data.id}">Delete</button><button class="update-btn btn btn-warning" data-id="${data.id}">Update</button></td></tr>`
                    )
                    $(`button.del-btn[data-id="${data.id}"]`).click(function (e) {
                        const updatedUserId = $(this).attr('data-id')
                        $.ajax({
                            method: "DELETE",
                            url: `http://localhost:3000/users/${userId}`,
                            contentType: 'application/json',
                            encode: true,
                        }).done(function (resp) {
                            const { status } = resp
                            if (status) {
                                $(`tr[data-userid="${userId}"]`).empty();
                            }
                        })
                    })
                    $('button.update-btn[data-id="${data.id}"]').click(function (e) {
                        const userId = $(this).attr('data-id')
                        console.log($(`tr[data-userid="${userId}"] td.username`).text())
                        $('#createUserForm input[name="user_id"]').val(userId)
                        $('#createUserForm input[name=username]').val($(`tr[data-userid="${userId}"] td.username`).text())
                        $('#createUserForm input[name=name]').val($(`tr[data-userid="${userId}"] td.name`).text())
                        $(`#createUserForm input[id="${$(`tr[data-userid="${userId}"] td.gender`).text()}"]`).attr('checked', 'true')
                        $('#createUserForm #btn-create').val('Update')

                    })

                }
                // })
            });
        }


        event.preventDefault();
    })
    // Get all
    /*
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/users",
        contentType: 'application/json',
        encode: true,
    }).done(function (data) {
        console.log(data)
        data.forEach(function (val) {
            $('#userList tbody').append(
                `<tr class="user-id" data-userid="${val.id}"><td scope="row">${val.id}</td><td class="username">${val.username}</td><td class="name">${val.name}</td><td class="gender">${val.gender}</td><td><button class="del-btn btn btn-danger" data-id="${val.id}">Delete</button><button class="update-btn btn btn-warning" data-id="${val.id}">Update</button></td></tr>`
            )
        })
        $('.del-btn').click(function (e) {
            const userId = $(this).attr('data-id')
            console.log(userId)
            $.ajax({
                method: "DELETE",
                url: `http://localhost:3000/users/${userId}`,
                contentType: 'application/json',
                encode: true,
            }).done(function (resp) {
                const { status } = resp
                if (status) {
                    $(`tr[data-userid="${userId}"]`).empty();
                }
            })
        })
        $('.update-btn').click(function (e) {
            const userId = $(this).attr('data-id')
            $('#createUserForm input[name="user_id"]').val(userId)
            $('#createUserForm input[name="user_id"]').val(userId)
            $('#createUserForm input[name=username]').val($(`tr[data-userid="${userId}"] td.username`).text())
            $('#createUserForm input[name=name]').val($(`tr[data-userid="${userId}"] td.name`).text())
            $(`#createUserForm input[id="${$(`tr[data-userid="${userId}"] td.gender`).text()}"]`).attr('checked', 'true')
            $('#createUserForm #btn-create').text('Update')
        })
    });
    $('#createUserForm input[name=user_id]').change(function (e) {
        if ($('#createUserForm #btn-create').text()) {
            $('#createUserForm #btn-create').text('Update')
        } else {
            $('#createUserForm #btn-create').text('Create')

        }
    })
    */
    $('.del-btn').click(function (e) {
        const userId = $(this).attr('data-id')
        console.log(userId)
        $.ajax({
            method: "DELETE",
            url: `http://localhost:3000/users/${userId}`,
            contentType: 'application/json',
            encode: true,
        }).done(function (resp) {
            const { status } = resp
            if (status) {
                $(`tr[data-userid="${userId}"]`).empty();
            }
        })
    })
    $('.update-btn').click(function (e) {
        const userId = $(this).attr('data-id')
        $('#createUserForm input[name="user_id"]').val(userId)
        $('#createUserForm input[name="user_id"]').val(userId)
        $('#createUserForm input[name=username]').val($(`tr[data-userid="${userId}"] td.username`).text())
        $('#createUserForm input[name=name]').val($(`tr[data-userid="${userId}"] td.name`).text())
        $(`#createUserForm input[id="${$(`tr[data-userid="${userId}"] td.gender`).text()}"]`).attr('checked', 'true')
        $('#createUserForm #btn-create').text('Update')
    })
    $('#createUserForm button.btn-warning').on('click', function (e) {
        $('#createUserForm input[name="user_id"]').val('')
        $('#createUserForm input[name=username]').val('')
        $('#createUserForm input[name=name]').val('')
        $('#createUserForm #btn-create').text('Create')
    })

    // Registration form validation and submission
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        $('#registerErrors').empty();
        const email = $('#reg_username').val().trim();
        const password = $('#reg_password').val();
        const confirmPassword = $('#reg_confirm').val();

        const errors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{6,}$/;

        if (!emailRegex.test(email)) {
            errors.push('Username must be a valid email address.')
        }
        if (!passwordRegex.test(password)) {
            errors.push('Password must be at least 6 chars and include 1 number and 1 special character.')
        }
        if (password !== confirmPassword) {
            errors.push('Password and confirm password do not match.')
        }

        if (errors.length > 0) {
            const $err = $('<div class="alert alert-danger" role="alert"></div>')
            $err.html(errors.join('<br>'))
            $('#registerErrors').append($err)
            return;
        }

        // Submit registration to server
        $.ajax({
            method: 'POST',
            url: '/register',
            data: JSON.stringify({ username: email, password: password }),
            contentType: 'application/json',
            encode: true
        }).done(function (resp) {
            try {
                if (resp && resp.status) {
                    const $s = $('<div class="alert alert-success" role="alert">Registration successful. You can now log in.</div>')
                    $('#registerErrors').append($s)
                    $('#registerForm')[0].reset()
                } else {
                    const msg = resp && resp.msg ? resp.msg : 'Registration failed.'
                    const $e = $(`<div class="alert alert-danger" role="alert">${msg}</div>`)
                    $('#registerErrors').append($e)
                }
            } catch (err) {
                const $e = $(`<div class="alert alert-danger" role="alert">Unexpected server response.</div>`)
                $('#registerErrors').append($e)
            }
        }).fail(function () {
            const $e = $(`<div class="alert alert-danger" role="alert">Unable to contact server.</div>`)
            $('#registerErrors').append($e)
        })
    })

})