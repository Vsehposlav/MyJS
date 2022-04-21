// ==UserScript==
// @name         ISMU Usability Addon
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  provide additional functions to ISMU site
// @author       ArPi
// @match        https://*.ismu.baikal.ru/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var location = document.location.href;
    if (/^http[s]*:\/\/((mir|www)\.)*ismu\.baikal\.ru\/ismu\/page_dept\.php\?id=\d+&cat=docs[&]{1,2}folder=\d+/m.test(location)) {
        upgradeTableDoc();
    }

    if (/^http[s]*:\/\/((mir|www)\.)*ismu\.baikal\.ru\/ismu\/common\.php\?page_doc&doc=\d+/m.test(location)) {
        upgradeDocView();
    }



    function upgradeTableDoc() {
        var png_pdf = jQuery('table.orange tr > td > img');
        var links = Array();

        png_pdf.parent().prev().find("a").each( function()
                                               {
            jQuery(this).css('font-size','14px');
            var link = jQuery(this).attr("href") + "&action=get_file";
            links.push(link);
            var img = jQuery(this).parent().next().find("img")
            img.wrap('<a href="' + link + '"></a>');

            //img.attr('src', 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE4LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0DQoJCWMwLjgwOCwwLDEuNDYzLTAuNjU1LDEuNDYzLTFWMTIuOTc4YzAtMC42OTYtMC4wOTMtMC45Mi0wLjI1Ny0xLjA4NUwzNy42MDcsMC4yNTdDMzcuNDQyLDAuMDkzLDM3LjIxOCwwLDM2Ljk4NSwweiIvPg0KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiNEOUQ3Q0E7IiBwb2ludHM9IjM3LjUsMC4xNTEgMzcuNSwxMiA0OS4zNDksMTIgCSIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNDQzRCNEM7IiBkPSJNMTkuNTE0LDMzLjMyNEwxOS41MTQsMzMuMzI0Yy0wLjM0OCwwLTAuNjgyLTAuMTEzLTAuOTY3LTAuMzI2DQoJCWMtMS4wNDEtMC43ODEtMS4xODEtMS42NS0xLjExNS0yLjI0MmMwLjE4Mi0xLjYyOCwyLjE5NS0zLjMzMiw1Ljk4NS01LjA2OGMxLjUwNC0zLjI5NiwyLjkzNS03LjM1NywzLjc4OC0xMC43NQ0KCQljLTAuOTk4LTIuMTcyLTEuOTY4LTQuOTktMS4yNjEtNi42NDNjMC4yNDgtMC41NzksMC41NTctMS4wMjMsMS4xMzQtMS4yMTVjMC4yMjgtMC4wNzYsMC44MDQtMC4xNzIsMS4wMTYtMC4xNzINCgkJYzAuNTA0LDAsMC45NDcsMC42NDksMS4yNjEsMS4wNDljMC4yOTUsMC4zNzYsMC45NjQsMS4xNzMtMC4zNzMsNi44MDJjMS4zNDgsMi43ODQsMy4yNTgsNS42Miw1LjA4OCw3LjU2Mg0KCQljMS4zMTEtMC4yMzcsMi40MzktMC4zNTgsMy4zNTgtMC4zNThjMS41NjYsMCwyLjUxNSwwLjM2NSwyLjkwMiwxLjExN2MwLjMyLDAuNjIyLDAuMTg5LDEuMzQ5LTAuMzksMi4xNg0KCQljLTAuNTU3LDAuNzc5LTEuMzI1LDEuMTkxLTIuMjIsMS4xOTFjLTEuMjE2LDAtMi42MzItMC43NjgtNC4yMTEtMi4yODVjLTIuODM3LDAuNTkzLTYuMTUsMS42NTEtOC44MjgsMi44MjINCgkJYy0wLjgzNiwxLjc3NC0xLjYzNywzLjIwMy0yLjM4Myw0LjI1MUMyMS4yNzMsMzIuNjU0LDIwLjM4OSwzMy4zMjQsMTkuNTE0LDMzLjMyNHogTTIyLjE3NiwyOC4xOTgNCgkJYy0yLjEzNywxLjIwMS0zLjAwOCwyLjE4OC0zLjA3MSwyLjc0NGMtMC4wMSwwLjA5Mi0wLjAzNywwLjMzNCwwLjQzMSwwLjY5MkMxOS42ODUsMzEuNTg3LDIwLjU1NSwzMS4xOSwyMi4xNzYsMjguMTk4eg0KCQkgTTM1LjgxMywyMy43NTZjMC44MTUsMC42MjcsMS4wMTQsMC45NDQsMS41NDcsMC45NDRjMC4yMzQsMCwwLjkwMS0wLjAxLDEuMjEtMC40NDFjMC4xNDktMC4yMDksMC4yMDctMC4zNDMsMC4yMy0wLjQxNQ0KCQljLTAuMTIzLTAuMDY1LTAuMjg2LTAuMTk3LTEuMTc1LTAuMTk3QzM3LjEyLDIzLjY0OCwzNi40ODUsMjMuNjcsMzUuODEzLDIzLjc1NnogTTI4LjM0MywxNy4xNzQNCgkJYy0wLjcxNSwyLjQ3NC0xLjY1OSw1LjE0NS0yLjY3NCw3LjU2NGMyLjA5LTAuODExLDQuMzYyLTEuNTE5LDYuNDk2LTIuMDJDMzAuODE1LDIxLjE1LDI5LjQ2NiwxOS4xOTIsMjguMzQzLDE3LjE3NHoNCgkJIE0yNy43MzYsOC43MTJjLTAuMDk4LDAuMDMzLTEuMzMsMS43NTcsMC4wOTYsMy4yMTZDMjguNzgxLDkuODEzLDI3Ljc3OSw4LjY5OCwyNy43MzYsOC43MTJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0NDNEI0QzsiIGQ9Ik00OC4wMzcsNTZINy45NjNDNy4xNTUsNTYsNi41LDU1LjM0NSw2LjUsNTQuNTM3VjM5aDQzdjE1LjUzN0M0OS41LDU1LjM0NSw0OC44NDUsNTYsNDguMDM3LDU2eiIvPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTE3LjM4NSw1M2gtMS42NDFWNDIuOTI0aDIuODk4YzAuNDI4LDAsMC44NTIsMC4wNjgsMS4yNzEsMC4yMDUNCgkJCWMwLjQxOSwwLjEzNywwLjc5NSwwLjM0MiwxLjEyOCwwLjYxNWMwLjMzMywwLjI3MywwLjYwMiwwLjYwNCwwLjgwNywwLjk5MXMwLjMwOCwwLjgyMiwwLjMwOCwxLjMwNg0KCQkJYzAsMC41MTEtMC4wODcsMC45NzMtMC4yNiwxLjM4OGMtMC4xNzMsMC40MTUtMC40MTUsMC43NjQtMC43MjUsMS4wNDZjLTAuMzEsMC4yODItMC42ODQsMC41MDEtMS4xMjEsMC42NTYNCgkJCXMtMC45MjEsMC4yMzItMS40NDksMC4yMzJoLTEuMjE3VjUzeiBNMTcuMzg1LDQ0LjE2OHYzLjk5MmgxLjUwNGMwLjIsMCwwLjM5OC0wLjAzNCwwLjU5NS0wLjEwMw0KCQkJYzAuMTk2LTAuMDY4LDAuMzc2LTAuMTgsMC41NC0wLjMzNWMwLjE2NC0wLjE1NSwwLjI5Ni0wLjM3MSwwLjM5Ni0wLjY0OWMwLjEtMC4yNzgsMC4xNS0wLjYyMiwwLjE1LTEuMDMyDQoJCQljMC0wLjE2NC0wLjAyMy0wLjM1NC0wLjA2OC0wLjU2N2MtMC4wNDYtMC4yMTQtMC4xMzktMC40MTktMC4yOC0wLjYxNWMtMC4xNDItMC4xOTYtMC4zNC0wLjM2LTAuNTk1LTAuNDkyDQoJCQljLTAuMjU1LTAuMTMyLTAuNTkzLTAuMTk4LTEuMDEyLTAuMTk4SDE3LjM4NXoiLz4NCgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMi4yMTksNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3DQoJCQlzLTAuNjcyLDAuMzk4LTAuOTkxLDAuNTEzYy0wLjMxOSwwLjExNC0wLjYxMSwwLjE4Ny0wLjg3NSwwLjIxOUMyOC4yMjIsNTIuOTg0LDI4LjAyNiw1MywyNy44OTgsNTNoLTMuODE0VjQyLjkyNGgzLjAzNQ0KCQkJYzAuODQ4LDAsMS41OTMsMC4xMzUsMi4yMzUsMC40MDNzMS4xNzYsMC42MjcsMS42LDEuMDczczAuNzQsMC45NTUsMC45NSwxLjUyNEMzMi4xMTQsNDYuNDk0LDMyLjIxOSw0Ny4wOCwzMi4yMTksNDcuNjgyeg0KCQkJIE0yNy4zNTIsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NA0KCQkJYy0wLjEwMS0wLjQxLTAuMjk0LTAuNzgxLTAuNTgxLTEuMTE0cy0wLjY3Ny0wLjYwMi0xLjE2OS0wLjgwN3MtMS4xMy0wLjMwOC0xLjkxNC0wLjMwOGgtMC45NTd2Ny42MjlIMjcuMzUyeiIvPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM2LjI2Niw0NC4xNjh2My4xNzJoNC4yMTF2MS4xMjFoLTQuMjExVjUzaC0xLjY2OFY0Mi45MjRINDAuOXYxLjI0NEgzNi4yNjZ6Ii8+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=');
            img.attr('width','32');
            img.attr('height','32');
        });
        //console.log(links);
        jQuery('table.orange').before('<input type="button" value="Скачать все" id ="getall" /><input type="button" value="Скачать выделенные" id ="getchecked" />');

        jQuery('#getall').on("click", function() {

            let link = document.createElement('a');

            link.setAttribute('download','');
            link.style.display = 'none';

            document.body.appendChild(link);

            for (var i = 0; i < links.length; i++) {
                link.setAttribute('href', links[i]);
                link.click();
            }

            document.body.removeChild(link);


        });
        jQuery('#getchecked').on("click", function() {

            let links = new Array();
            jQuery('.dwnld_link:checkbox:checked').each(function() {
               links.push(jQuery(this).val());
            });
            let link = document.createElement('a');

            link.setAttribute('download','');
            link.style.display = 'none';

            document.body.appendChild(link);

            for (var i = 0; i < links.length; i++) {
                link.setAttribute('href', links[i]);
                link.click();
            }

            document.body.removeChild(link);


        });
       
        var checkboxs = new Array();
        checkboxs.push('<td>Скачать?</td>');
        for (var i = 0; i < links.length; i++) {
            checkboxs.push('<td><input type="checkbox" class="dwnld_link" value="' + links[i] + '"/></td>');
        }
        //console.log(checkboxs);
        i =0;
        jQuery('table.orange td:last-child').each(function() {

            jQuery(this).after(checkboxs[i++]);
        });

    }



    function upgradeDocView() {
        jQuery('table.orange td').css("font-size","18px");
        jQuery('table.orange').css("width", "100%");
        jQuery('table.orange td img ').css("width", "32px");
        jQuery('table.orange td a ').css("margin-right", "10px");
        jQuery('table.orange td a ').css("font-size","18px");
    }



    
})();
