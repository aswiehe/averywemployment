$( document ).ready(function() {

    console.log( "Custom script successfully loaded." );
    
    let path = window.location.pathname;
    let file_name = get_file_name(path);
    let page_name = get_page_name(file_name);

    reinitialize_site(page_name);
    
    function reinitialize_site(page_name) {
        // Load navbar into top of page
        $("#nav_section").load("../includes/navbar.html");

        // Set <title> to my name + name of the page user is on
        let title = "Avery Wiehe - " + page_name;
        $("title").html(title);

        // Do the scripted stuff specific to page user is on
        // This is where any new functionality should go, assuming this remains a small and simple site requiring only one .js file
        switch(page_name) {
            case "Home":
                populate_welcome_text();
                // Define event handler for "Go To Site Overview" button
                $("#go_to_overview").on('click', function() {
                    window.location.href = "./site_overview.html";
                });
                break;
            case "Site Overview":
                $(".modal_button").on('click', function() {
                    modal_requested = $(this).data('request');
                    console.log("Modal Requested: " + modal_requested);
                    populate_overview_modal(modal_requested);
                });                
                break;
            case "Employment History":
                populate_employment_history();
                break;
            case "Education":
                define_education_handlers();
                break;
        }
    }

    function get_file_name(path) {
        var file_name = path.split("/").pop();
        return file_name;
    }

    function get_page_name(file_name) {
        switch(file_name) {
            case "":
                var page_name = "Home";
                break;
            case "index.html":
                var page_name = "Home";
                break;
            case "site_overview.html":
                var page_name = "Site Overview";
                break;
            case "employment_history.html":
                var page_name = "Employment History";
                break;
            case "education.html":
                var page_name = "Education";
                break;
            case "download_online_resume.html":
                var page_name = "Download Online Resume";
                break;
            default:
                var page_name = "Unrecognized Filename";
                break;
        }
        return page_name;
    }
    
    function populate_employment_history() {
        $.ajax({
            url : "../text_files/employment_history/ups_employment.txt",
            dataType: "text",
            success : function (data) {
                $("#ups_employment").html(data);
            }
        });
        $.ajax({
            url : "../text_files/employment_history/btg_employment.txt",
            dataType: "text",
            success : function (data) {
                $("#btg_employment").html(data);
            }
        });
        $.ajax({
            url : "../text_files/employment_history/citibank_employment.txt",
            dataType: "text",
            success : function (data) {
                $("#citibank_employment").html(data);
            }
        });
    }

    function populate_welcome_text() {  
        $.ajax({
            url : "../text_files/welcome_part_one.txt",
            dataType: "text",
            success : function (data) {
                $("#welcome_text_one").html(data);
            }
        });
    
        $.ajax({
            url : "../text_files/welcome_part_two.txt",
            dataType: "text",
            success : function (data) {
                $("#welcome_text_two").html(data);
            }
        });
    }

    function populate_overview_modal(modal_requested) {
        switch(modal_requested) {
            case "frontend":
                $("#modal_title").html("Process for designing this site");
                $.ajax({
                    url : "../text_files/overviews/frontend.txt",
                    dataType: "text",
                    success : function (data) {
                        $("#modal_text").html(data);
                    }
                });
                break;
            case "backend":
                $("#modal_title").html("Configuring the site's back-end");
                $.ajax({
                    url : "../text_files/overviews/backend.txt",
                    dataType: "text",
                    success : function (data) {
                        $("#modal_text").html(data);
                    }
                });
                break;
        }
        $.ajax({
            url : "../text_files/welcome_part_two.txt",
            dataType: "text",
            success : function (data) {
                $("#welcome_text_two").html(data);
            }
        });

    }

    function define_education_handlers() {
        $('#csctc_toggle').on('click', function() {
            $('#select_school_prompt').css('display', 'none');
            $('.course_list').each(function() {
                $(this).css('display', 'none');
            });
            $('#csctc_courses').slideDown("slow");
        });
        $('#gctc_toggle').on('click', function() {
            $('#select_school_prompt').css('display', 'none');
            $('.course_list').each(function() {
                $(this).css('display', 'none');
            });
            $('#gctc_courses').slideDown("slow");
        });
        $('#nku_toggle').on('click', function() {
            $('#select_school_prompt').css('display', 'none');
            $('.course_list').each(function() {
                $(this).css('display', 'none');
            });
            $('#nku_courses').slideDown("slow");
        });
    }
});

// After page loads, this scrolls back to the top to put navbar where it should be
$(window).scrollTop(0);