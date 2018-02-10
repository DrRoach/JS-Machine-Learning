var scroller = {};

scroller.pageSelector = '.page';
scroller.scrollDown = '.page-down';
scroller.scrollUp = '.page-up';
scroller.startPage = 1;
scroller.speed = 2000;

scroller.setup = function(settings) {
    this.pageSelector = settings.pageSelector || this.pageSelector;
    this.scrollDown = settings.scrollDown || this.scrollDown;
    this.scrollUp = settings.scrollUp || this.scrollUp;
    this.startPage = settings.startPage || this.startPage;
    this.speed = settings.speed || this.speed;

    var curPage = 0;
    var pages = $(scroller.pageSelector).length;

    //Work out where to scoll to for starting page
    var to = 0;
    for(var i = 1; i < this.startPage; i++) {
        to += $(this.pageSelector).eq(i).position().top;
    }

    curPage = this.startPage - 1;

    //Scroll to the starting page
    $('html, body').animate({
        scrollTop: to+"px"
    }, this.speed);

    $(this.scrollUp).on('click', function() {
        if(curPage != 0) {
            curPage--;
        }
        var to = $(scroller.pageSelector).eq(curPage).position().top;
        $('html, body').animate({
            scrollTop: to+"px"
        }, scroller.speed);
    });

    $(this.scrollDown).on('click', function() {
        var to = $(scroller.pageSelector).eq(++curPage).position().top;
        $('html, body').animate({
            scrollTop: to+"px"
        }, scroller.speed);
    });

    var im = 0;
    $(window).on('scroll', function() {
        var newTop = $(this).scrollTop();
        var page = curPage;
        if (page > 0) {
            page -= 1;
        }
        if(newTop <= $(scroller.pageSelector).eq(page).position().top) {
            if(curPage != 0) {
                curPage--;
            }
        }
        page += 1;
        if ($(scroller.pageSelector).eq(page).length != 0) {
            if(newTop >= $(scroller.pageSelector).eq(page).position().top) {
                if (curPage != pages) {
                    curPage++;
                }
            }
        }
    });
};

