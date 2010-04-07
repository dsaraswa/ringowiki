export('Page');
module.shared = true;

var Page = require('./config').store.defineClass('Page',
        {name: {type: 'string', nullable: false},
         body: {type: 'text',   nullable: false}});

Page.byName = function(name) {
    name = name.toLowerCase();
    var pages = Page.all()
        .filter(function(page) page.name.toLowerCase() == name);
    return pages[0];
};

Page.prototype.updateFrom = function(obj) {
    this.name = obj.name;
    this.body = obj.body;
    // if (typeof this.revisions === 'undefined') {
    //     this.revisions = [];
    // }
    // this.revisions.unshift(obj.body);
};
