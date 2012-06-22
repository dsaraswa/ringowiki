var md = require('ringo/markdown');
var {Page} = require('./model');
var {app} = require('./actions');

var strings = require('ringo/utils/strings');
var dates = require('ringo/utils/dates');
var mustache = require("ringo/mustache");

export(
    'baseUrl',
    'editUrl',
    'listUrl',
    'recentUrl',
    'markdown',
    'navigation',
    'timeFormat'
);

function baseUrl(name) {
    name = name && name.replace(/\s/g, '_');
    var url = (app.base || "") + "/";
    return name ? url + encodeURI(name) : url;
}

function editUrl(name) {
    return baseUrl(name || "home") + "/edit";
}

function listUrl() {
    return baseUrl() + "list";
}

function recentUrl() {
    return baseUrl() + "recent";
}

function markdown(content) {
    return md.process(content, {
        lookupLink: function(id) {
            if (!strings.startsWith(id, "/") && !strings.isUrl(id.isUrl)) {
                return [baseUrl(id),
                        "link to wiki page"];
            }
            return null;
        },
        openTag: function(tag, buffer) {
            buffer.append('<').append(tag);
            if (tag == "pre") {
                buffer.append(' class="sh_javascript"');
            }
            buffer.append('>');
        }
    });
}

function navigation() {
    var page = Page.byName("navigation");
    if (page) {
        return mustache.to_html(
            getResource('./templates/navigation.txt').getContent(), {
                markdown: markdown,
                content: page.getRevision().body
            }
        );
    }
    return '';
}

function timeFormat(date) {
    return dates.format(date, "HH:mm");
}
