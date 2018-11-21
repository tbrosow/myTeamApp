$(document).ready(function() {

    $('#mupdob').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

    $('#ug_gameday').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

    $('#ng_gameday').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

    $( '#npdob').datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'yy-mm-dd'
    });

    $('#shirtSelector').on( 'click', 'a', function() {

        $('#npshirt').val($(this).html())
    });


    $('#modalUpdateGame').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal

        var gameObj = {
            _id: button.data('_id'),
            number: button.data('number'),
            location: button.data('location'),
            oponent: button.data('oponent'),
            homegame: "" + button.data('homegame'),
            result: button.data('result'),
            goalsscored: button.data('goalsscored'),
            goalsconceded: button.data('goalsconceded'),
            gameday:button.data('gameday')
            // mobile: button.data('mobile')
        }
        // alert("GAME "+JSON.stringify(gameObj))
        var modal = $(this)
        modal.find('.modal-title').text('Update Game # ' + gameObj.number)
        modal.find('#ug_number').val(gameObj.number)
        modal.find('#ug_gameday').val(gameObj.gameday)
        modal.find('#ug_location').val(gameObj.location)
        modal.find('#ug_result').val(gameObj.result)
        modal.find('#ug_homegame').val(gameObj.homegame)
        // modal.find('#ug_homegame').val("true")
        modal.find('#ug_oponent').val(gameObj.oponent)
        modal.find('#ug_goalsscored').val(gameObj.goalsscored)
        modal.find('#ug_goalsconceded').val(gameObj.goalsconceded)
        // modal.find('#mupdob').val(userObj.dob)
        // modal.find('#mupemail').val(userObj.email)
        // modal.find('#mupmobile').val(userObj.mobile)
        modal.find('#ug_id').val(gameObj._id)
    })
    $('#modalDeleteGame').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal

        var gameObj = {
            _id: button.data('_id'),
            number: button.data('number'),
            oponent: button.data('oponent')
        }

        var modal = $(this)
        modal.find('.modal-title').text('Delete Game # ' + gameObj.number + " (" + gameObj.oponent+ ")")
        modal.find('#dg_id').val(gameObj._id)
    })

    $('#btn-new-game').on('click', function() {

        console.log("Btn New Game")
        var valid = true;

        if ($('#ng_location').val().length < 1) {
            valid = false
            $('#ng_location').attr("placeholder", "Please enter a ground or oval");
        }
        if ($('#ng_oponent').val().length < 1) {
            valid = false
            $('#ng_oponent').attr("placeholder", "Please enter a team");
        }
        if ($('#ng_gameday').val().length < 1) {
            valid = false
            $('#ng_gameday').attr("placeholder", "Please enter a game date");
        }

        if (!valid)
            return false

        $.ajax({
            type:'PUT',
            url: '/createGame',
            data: {
                number: $('#ng_number').val(),
                homegame: $('#ng_homegame').val(),
                location: $('#ng_location').val(),
                oponent: $('#ng_oponent').val(),
                gameday: $('#ng_gameday').val()
            }
        }).done(function(response){
            console.log(response);
            location.reload();
        }).fail(function(response){
            console.log("Oops not working");
        });

        //$('#value').text( $('#newGoal').val() );
        $('#modalNewGame').modal('hide');
        return false;
    });
    $('#btn-update-game-score').on('click', function() {

        console.log("Update Game Score - Save")
        $.ajax({
            type:'PUT',
            url: '/updateGame',
            data: {
                _id:$('#ug_id').val(),
                goalsscored:$('#ug_goalsscored').val(),
                goalsconceded: $('#ug_goalsconceded').val()
            }
        }).done(function(response){
            console.log(response);
            location.reload();
        }).fail(function(response){
            console.log("Oops not working");
        });

        //$('#value').text( $('#newGoal').val() );
        $('#modalUpdateGame').modal('hide');
        return false;
    });
    $('#btn-update-game').on('click', function() {

        console.log("Update Game - Save")
        $.ajax({
            type:'PUT',
            url: '/updateGame',
            data: {
                _id:$('#ug_id').val(),
                goalsscored:$('#ug_goalsscored').val(),
                goalsconceded: $('#ug_goalsconceded').val(),
                homegame: $('#ug_homegame').val(),
                location: $('#ug_location').val(),
                oponent: $('#ug_oponent').val(),
                number: $('#ug_number').val(),
                gameday: $('#ug_gameday').val()
            }
        }).done(function(response){
            console.log(response);
            location.reload();
        }).fail(function(response){
            console.log("Oops not working");
        });

        //$('#value').text( $('#newGoal').val() );
        $('#modalUpdateGame').modal('hide');
        return false;
    });
    $('#btn-delete-game').on('click', function() {

        var id = "G_"+ $('#dg_id').val();

        $('tr').each( function(elem) {
            if (id == $(this).attr('id')) {
                console.log("Delete " + $(this).attr('id'))
                $(this).remove()
            }
        })

        console.log("Delete Game" + $('#dg_id').val())
        $.ajax({
            type:'PUT',
            url: '/deleteGame/',
            data: {
                _id: $('#dg_id').val()
            }
        }).done(function(response){
            console.log(response);
            location.reload();
        }).fail(function(response){
            console.log("Oops not working");
        });

        //$('#value').text( $('#newGoal').val() );
        $('#modalDeleteGame').modal('hide');
        return false;
    });

    $('#modalUpdatePlayer').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal

        var userObj = {
            _id: button.data('_id'),
            shirt: button.data('shirt'),
            firstname: button.data('firstname'),
            lastname: button.data('lastname'),
            dob: button.data('dob'),
            email: button.data('email'),
            mobile: button.data('mobile')
        }

        var modal = $(this)
        modal.find('.modal-title').text('Update Player # ' + userObj.shirt)
        modal.find('#mupshirt').val(userObj.shirt)
        modal.find('#mupfirstname').val(userObj.firstname)
        modal.find('#muplastname').val(userObj.lastname)
        modal.find('#mupdob').val(userObj.dob)
        modal.find('#mupemail').val(userObj.email)
        modal.find('#mupmobile').val(userObj.mobile)
        modal.find('#mup_id').val(userObj._id)
    })
    $('#modalDeletePlayer').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal

        var userObj = {
            _id: button.data('_id'),
            shirt: button.data('shirt'),
            firstname: button.data('firstname'),
            lastname: button.data('lastname'),
            dob: button.data('dob'),
            email: button.data('email'),
            mobile: button.data('mobile')
        }

        var modal = $(this)
        modal.find('.modal-title').text('Delete Player # ' + userObj.shirt + " (" + userObj.firstname + " " + userObj.lastname + ")")
        modal.find('#dp_id').val(userObj._id)
    })

    $('#btn-new-player').on('click', function() {
        var validated = true;
        if ($('#npmobile').val() == '') {
            validated = false;
            $('#npmobile').attr("placeholder", "Please enter a mobile number");
        }
        if ($('#npfirstname').val() == '') {
            validated = false;
            $('#npfirstname').attr("placeholder", "Please enter a name");
        }
        if ($('#nplastname').val() == '') {
            validated = false;
            $('#nplastname').attr("placeholder", "Please enter a name");
        }
        if ($('#npdob').val() == '') {
            validated = false;
            $('#npdob').attr("placeholder", "Please enter a date of birth");
        }
        if ($('#npmobile').val() == '') {
            validated = false;
            $('#npmobile').attr("placeholder", "Please enter a phone number");
        }
        if ($('#npemail').val() == '') {
            validated = false;
            $('#npemail').attr("placeholder", "Please enter an email address");
        }
        if ($('#npshirt').val() == '') {
            validated = false;
            $('#npshirt').attr("placeholder", "Please select a shirt number");
        }
        if (!validated) {
            return false;
        }

        console.log("CP Save")
        $.ajax({
            type:'PUT',
            url: '/newPlayer/',
            data: {
                shirt:$('#npshirt').val(),
                firstname: $('#npfirstname').val(),
                lastname: $('#nplastname').val(),
                dob: $('#npdob').val(),
                email: $('#npemail').val(),
                mobile: $('#npmobile').val()
            }
        }).done(function(response){
            console.log(response);
            location.reload();
        }).fail(function(response){
            console.log("Oops not working");
        });

        //$('#value').text( $('#newGoal').val() );
        $('#modalNewPlayer').modal('hide');
        return false;
    });
    $('#btn-update-player').on('click', function() {

        console.log("MUP Save")
        $.ajax({
            type:'PUT',
            url: '/updatePlayer',
            data: {
                _id:$('#mup_id').val(),
                shirt:$('#mupshirt').val(),
                firstname: $('#mupfirstname').val(),
                lastname: $('#muplastname').val(),
                dob: $('#mupdob').val(),
                email: $('#mupemail').val(),
                mobile: $('#mupmobile').val()
            }
        }).done(function(response){
            console.log(response);
            location.reload()
        }).fail(function(response){
            console.log("Oops not working");
        });

        //$('#value').text( $('#newGoal').val() );
        $('#modalUpdatePlayer').modal('hide');
        return false;
    });
    $('#btn-delete-player').on('click', function() {

        console.log("Delete Player")
        $.ajax({
            type:'PUT',
            url: '/deletePlayer/',
            data: {
                _id:$('#dp_id').val()
            }
        }).done(function(response){
            console.log(response);
            // window.location.replace('http://localhost:3030/');
        }).fail(function(response){
            console.log(response);
            location.reload()
        });

        $('#modalDeletePlayer').modal('hide');
        return false;
    });

    if ($('#chart').length > 0) {
        var url = "/getGames";
        $.ajax({
            type: 'GET',
            url: url,
            data: {}
        }).done(function (response) {
            console.log(response.games.length)
            var data = [];
            var label = [];

            response.games.forEach(function (game) {
                if (game.played) {
                    var value = 1;
                    if (game.goalsscored > game.goalsconceded) {
                        value = 10;
                    } else if (game.goalsscored == game.goalsconceded) {
                        value = 5;
                    }

                    data.push(value)
                    label.push("#" + game.number + " " + game.oponent + " " + game.result)
                }
            });

            var options = {
                annotations: {
                    yaxis: [{
                        y: 1,
                        borderColor: '#e35426',
                        label: {
                            borderColor: '#e35426',
                            style: {
                                color: '#fff',
                                background: '#e35426',
                            },
                            text: 'Lost',
                        }
                    }, {
                        y: 5,
                        borderColor: '#e3e15e',
                        label: {
                            borderColor: '#e3e15e',
                            style: {
                                color: '#fff',
                                background: '#e3e15e',
                            },
                            text: 'Draw',
                        }
                    },
                        {
                            y: 10,
                            borderColor: '#00E396',
                            label: {
                                borderColor: '#00E396',
                                style: {
                                    color: '#fff',
                                    background: '#00E396',
                                },
                                text: 'Win',
                            }
                        }]
                },
                grid: {
                    padding: {
                        top: 10,
                        left: 10,
                        right: 10
                    },
                    yaxis: {
                        lines: {
                            show: false,
                            offsetX: 10,
                            offsetY: 10
                        }
                    }
                },
                chart: {
                    type: 'line',
                    height: 350
                },
                stroke: {
                    curve: 'smooth',
                    lineCap: 'butt',
                    colors: undefined,
                    width: 5,
                    dashArray: 3

                },
                plotOptions: {
                    bar: {
                        barHeight: '100%',
                        distributed: true,
                        horizontal: false,
                        dataLabels: {
                            position: 'bottom'
                        },
                    }
                },
                tooltip: {
                    shared: true,
                    y: {
                        formatter: function (val) {
                            if (val == 1)
                                return "Lost"
                            if (val == 5)
                                return "Draw"
                            if (val == 10)
                                return "Win"
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                xaxis: {
                    categories: label,
                    labels: {
                        rotate: -65,
                        rotateAlways: true,
                        show: true,
                        style: {
                            colors: [],
                            fontSize: '10px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            cssClass: 'apexcharts-xaxis-label',
                        },
                        trim: false,
                        minHeight: 150
                    }
                },
                series: [{
                    name: 'Games',
                    data: data
                }]
                // title: {
                //     text: 'Last Games',
                //     align: 'left'
                // }
            }

            var chart = new ApexCharts(document.querySelector("#chart"), options);
            if (response.games.length > 0) {
                chart.render();
            } else {
                $('#LAST_GAMES').css("display", "none")
            }
        });
    }

    var toggle = true;

    $(".sidebar-icon").click(function() {
        if (toggle)
        {
            $(".page-container").addClass("sidebar-collapsed").removeClass("sidebar-collapsed-back");
            $("#menu span").css({"position":"absolute"});
        }
        else
        {
            $(".page-container").removeClass("sidebar-collapsed").addClass("sidebar-collapsed-back");
            setTimeout(function() {
                $("#menu span").css({"position":"relative"});
            }, 400);
        }
        toggle = !toggle;
    });

});

