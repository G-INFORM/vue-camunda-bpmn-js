function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var $ = _interopDefault(require('jquery'));

function _getCommentsElement(element, create) {
  var bo = element.businessObject;
  var docs = bo.get('documentation');
  var comments; // get comments node

  docs.some(function (d) {
    return d.textFormat === 'text/x-comments' && (comments = d);
  }); // create if not existing

  if (!comments && create) {
    comments = bo.$model.create('bpmn:Documentation', {
      textFormat: 'text/x-comments'
    });
    docs.push(comments);
  }

  return comments;
}
function getComments(element) {
  var doc = _getCommentsElement(element);

  if (!doc || !doc.text) {
    return [];
  } else {
    return doc.text.split(/;\r?\n;/).map(function (str) {
      return str.split(/:/, 2);
    });
  }
}
function setComments(element, comments) {
  var doc = _getCommentsElement(element, true);

  var str = comments.map(function (c) {
    return c.join(':');
  }).join(';\n;');
  doc.text = str;
}
function addComment(element, author, str) {
  var comments = getComments(element);
  comments.push([author, str]);
  setComments(element, comments);
}
function removeComment(element, comment) {
  var comments = getComments(element);
  var idx = -1;
  comments.some(function (c, i) {
    var matches = c[0] === comment[0] && c[1] === comment[1];

    if (matches) {
      idx = i;
    }

    return matches;
  });

  if (idx !== -1) {
    comments.splice(idx, 1);
  }

  setComments(element, comments);
}

function Comments(eventBus, overlays, bpmnjs) {
  function toggleCollapse(element) {
    var o = overlays.get({
      element: element,
      type: 'comments'
    })[0];
    var $overlay = o && o.html;

    if ($overlay) {
      var expanded = $overlay.is('.expanded');
      eventBus.fire('comments.toggle', {
        element: element,
        active: !expanded
      });

      if (expanded) {
        $overlay.removeClass('expanded');
      } else {
        $overlay.addClass('expanded');
        $overlay.find('textarea').focus();
      }
    }
  }

  function createCommentBox(element) {
    var $overlay = $(Comments.OVERLAY_HTML);
    $overlay.find('.toggle').click(function (e) {
      toggleCollapse(element);
    });
    var $commentCount = $overlay.find('[data-comment-count]'),
        $textarea = $overlay.find('textarea'),
        $comments = $overlay.find('.comments');

    function renderComments() {
      // clear innerHTML
      $comments.html('');
      var comments = getComments(element);
      comments.forEach(function (val) {
        var $comment = $(Comments.COMMENT_HTML);
        $comment.find('[data-text]').text(val[1]);
        $comment.find('[data-delete]').click(function (e) {
          e.preventDefault();
          removeComment(element, val);
          renderComments();
          $textarea.val(val[1]);
        });
        $comments.append($comment);
      });
      $overlay[comments.length ? 'addClass' : 'removeClass']('with-comments');
      $commentCount.text(comments.length ? '(' + comments.length + ')' : '');
      eventBus.fire('comments.updated', {
        comments: comments
      });
    }

    $textarea.on('keydown', function (e) {
      if (e.which === 13 && !e.shiftKey) {
        e.preventDefault();
        var comment = $textarea.val();

        if (comment) {
          addComment(element, '', comment);
          $textarea.val('');
          renderComments();
        }
      }
    }); // attach an overlay to a node

    overlays.add(element, 'comments', {
      position: {
        bottom: 10,
        right: 10
      },
      html: $overlay
    });
    renderComments();
  }

  eventBus.on('shape.added', function (event) {
    var element = event.element;

    if (element.labelTarget || !element.businessObject.$instanceOf('bpmn:FlowNode')) {
      return;
    }

    defer(function () {
      createCommentBox(element);
    });
  });

  this.collapseAll = function () {
    overlays.get({
      type: 'comments'
    }).forEach(function (c) {
      var html = c.html;

      if (html.is('.expanded')) {
        toggleCollapse(c.element);
      }
    });
  };
}
Comments.$inject = ['eventBus', 'overlays', 'bpmnjs'];
Comments.OVERLAY_HTML = '<div class="comments-overlay">' + '<div class="toggle">' + '<span class="icon-comment"></span>' + '<span class="comment-count" data-comment-count></span>' + '</div>' + '<div class="content">' + '<div class="comments"></div>' + '<div class="edit">' + '<textarea tabindex="1" placeholder="Add a comment"></textarea>' + '</div>' + '</div>' + '</div>';
Comments.COMMENT_HTML = '<div class="comment">' + '<div data-text></div><a href class="delete icon-delete" data-delete></a>' + '</div>'; // helpers ///////////////

function defer(fn) {
  setTimeout(fn, 0);
}

var index = {
  __init__: ['comments'],
  'comments': ['type', Comments]
};

module.exports = index;
//# sourceMappingURL=index.js.map
